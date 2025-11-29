import { refererCheck } from '../common/referer-check.js';
import { execFile } from 'child_process';
import os from 'os';

function runCommand(cmd, args, timeout = 5000) {
  return new Promise((resolve, reject) => {
    execFile(cmd, args, { timeout }, (err, stdout, stderr) => {
      if (err) return reject({ err, stderr });
      resolve(stdout);
    });
  });
}

async function getSocketInfo() {
  // Try ss -> netstat -> lsof fallbacks
  try {
    const ssout = await runCommand('ss', ['-tunap'], 5000);
    return { tool: 'ss', raw: ssout };
  } catch (e) {
    // fallback netstat
    try {
      const nsout = await runCommand('netstat', ['-tunap'], 5000);
      return { tool: 'netstat', raw: nsout };
    } catch (e2) {
      try {
        const lsofout = await runCommand('lsof', ['-i', '-n', '-P'], 5000);
        return { tool: 'lsof', raw: lsofout };
      } catch (e3) {
        throw new Error('No socket tool available');
      }
    }
  }
}

async function getNeighbors() {
  try {
    const ipneigh = await runCommand('ip', ['neigh'], 3000);
    return { tool: 'ip neigh', raw: ipneigh };
  } catch (e) {
    try {
      const arpRaw = await runCommand('arp', ['-n'], 3000);
      return { tool: 'arp', raw: arpRaw };
    } catch (e2) {
      return { tool: 'none', raw: '' };
    }
  }
}

function parseSs(raw) {
  const lines = raw.split(/\r?\n/).filter(Boolean);
  // First line may be header - try to find header and parse with simple spaces
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    // split by whitespace, but the program name may be last
    const parts = line.split(/\s+/);
    // Common ss output: Netid State Recv-Q Send-Q Local Address:Port Peer Address:Port Process
    if (parts.length < 6) continue;
    const [netid, state, recv, send, local, peer, ...rest] = parts;
    const proc = rest.join(' ');
    data.push({ netid, state, recvQ: recv, sendQ: send, local, peer, proc });
  }
  return data;
}

function parseNetstat(raw) {
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const data = [];
  // Skip header and parse
  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim();
    const parts = line.split(/\s+/);
    // Proto Recv-Q Send-Q Local Address Foreign Address State PID/Program name
    if (parts.length < 6) continue;
    const [proto, recv, send, local, foreign, state, ...rest] = parts;
    const proc = rest.join(' ');
    data.push({ proto, state, recvQ: recv, sendQ: send, local, foreign, proc });
  }
  return data;
}

function parseLsof(raw) {
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const data = [];
  // skip header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    const parts = line.split(/\s+/);
    // COMMAND PID USER FD TYPE DEVICE SIZE/OFF NODE NAME
    // Keep whole line
    data.push({ raw: line });
  }
  return data;
}

function parseNeighbors(raw, tool) {
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const data = [];
  if (tool === 'ip neigh') {
    // format: 192.XXX.XXX.1 dev eth0 lladdr aa:bb:cc:dd:ee:ff REACHABLE
    lines.forEach(l => {
      const m = l.match(/^(\S+)\s+dev\s+(\S+)\s+(?:lladdr\s+(\S+)\s+)?(\S+)/);
      if (m) data.push({ ip: m[1], dev: m[2], mac: m[3] || '', state: m[4] });
    });
  } else if (tool === 'arp') {
    // IP HWtype HWaddress Flags Mask Iface
    lines.forEach(l => {
      const parts = l.split(/\s+/);
      if (parts.length >= 6) {
        data.push({ ip: parts[0], mac: parts[2], flags: parts[3], dev: parts[5] });
      }
    });
  }
  return data;
}

export default async (req, res) => {
  if (!refererCheck(req.headers.referer || '', req.headers['x-forwarded-host'] || req.headers.host)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const enabled = (process.env.CONN_INFO_ENABLED || 'false').toLowerCase() === 'true';
  const localOnly = (process.env.CONN_INFO_LOCAL_ONLY || 'true').toLowerCase() === 'true';
  const ip = req.headers['x-forwarded-for']?.split(',')?.[0] || req.connection?.remoteAddress || req.ip;
  const isLocal = ['::1', '127.0.0.1', '::ffff:127.0.0.1'].includes(ip);
  if (!enabled) return res.status(403).json({ error: 'Conn info disabled' });
  if (localOnly && !isLocal) return res.status(403).json({ error: 'Conn info only available from local host' });

  try {
    const socketTool = await getSocketInfo();
    let sockets = [];
    if (socketTool.tool === 'ss') sockets = parseSs(socketTool.raw);
    else if (socketTool.tool === 'netstat') sockets = parseNetstat(socketTool.raw);
    else if (socketTool.tool === 'lsof') sockets = parseLsof(socketTool.raw);

    const neigh = await getNeighbors();
    const neighborsJson = neigh.tool !== 'none' ? parseNeighbors(neigh.raw, neigh.tool) : [];

    // Also include IPs
    const ifaces = os.networkInterfaces();
    const addresses = [];
    Object.keys(ifaces).forEach((ifname) => {
      ifaces[ifname].forEach((iface) => {
        if ('IPv4' !== iface.family || iface.internal !== false) return;
        addresses.push({ iface: ifname, ip: iface.address });
      });
    });

    res.json({ sockets: sockets.slice(0, 200), neighbors: neighborsJson.slice(0, 200), hostIPs: addresses });
  } catch (err) {
    console.error('conn-info error', err);
    return res.status(500).json({ error: 'Failed to retrieve connection info', details: err.message || err });
  }
};
