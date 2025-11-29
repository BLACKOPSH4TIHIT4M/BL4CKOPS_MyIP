import { refererCheck } from '../common/referer-check.js';
import os from 'os';

export default (req, res) => {
  if (!refererCheck(req.headers.referer || '', req.headers['x-forwarded-host'] || req.headers.host)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const ifaces = os.networkInterfaces();
  const addresses = [];
  Object.keys(ifaces).forEach((ifname) => {
    ifaces[ifname].forEach((iface) => {
      // skip internal (i.e. 127.0.0.1) and non IPv4
      if ('IPv4' !== iface.family || iface.internal !== false) {
        return;
      }
      addresses.push({ iface: ifname, ip: iface.address });
    });
  });

  const hostIPs = addresses.map((a) => a.ip);
  const frontendPort = process.env.FRONTEND_PORT || 18966;
  const backendPort = process.env.BACKEND_PORT || 11966;
  const adminEnabled = (process.env.ADMIN_MONITOR_ENABLED || 'false').toLowerCase() === 'true';
  const connInfoEnabled = (process.env.CONN_INFO_ENABLED || 'false').toLowerCase() === 'true';
  const tracerouteEnabled = (process.env.TRACEROUTE_ENABLED || 'false').toLowerCase() === 'true';
  const connInfoLocalOnly = (process.env.CONN_INFO_LOCAL_ONLY || 'true').toLowerCase() === 'true';
  const tracerouteLocalOnly = (process.env.TRACEROUTE_LOCAL_ONLY || 'true').toLowerCase() === 'true';

  const accessUrls = {
    localhost: `http://localhost:${frontendPort}`,
    hostIPs: hostIPs.map((ip) => `http://${ip}:${frontendPort}`),
    backend: `http://localhost:${backendPort}/api`,
  };

  res.json({
    frontendPort: Number(frontendPort),
    backendPort: Number(backendPort),
    hostIPs,
    accessUrls,
    adminEnabled,
    connInfoEnabled,
    tracerouteEnabled,
    connInfoLocalOnly,
    tracerouteLocalOnly,
  });
};
