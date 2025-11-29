import { refererCheck } from '../common/referer-check.js';
import { execFile } from 'child_process';

function sanitizeHost(target) {
  // Very basic sanitize: allow only hostnames, IPs, or domain name chars
  if (!target || typeof target !== 'string') return null;
  const cleaned = target.trim();
  if (/^[A-Za-z0-9\.\-:]+$/.test(cleaned)) return cleaned;
  return null;
}

export default (req, res) => {
  const enabled = (process.env.TRACEROUTE_ENABLED || 'false').toLowerCase() === 'true';
  const localOnly = (process.env.TRACEROUTE_LOCAL_ONLY || 'true').toLowerCase() === 'true';
  const ip = req.headers['x-forwarded-for']?.split(',')?.[0] || req.connection?.remoteAddress || req.ip;
  const isLocal = ['::1', '127.0.0.1', '::ffff:127.0.0.1'].includes(ip);
  if (!enabled) return res.status(403).json({ error: 'Traceroute disabled' });
  if (localOnly && !isLocal) return res.status(403).json({ error: 'Traceroute only available from local host' });
  if (!refererCheck(req.headers.referer || '', req.headers['x-forwarded-host'] || req.headers.host)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const { target = '' } = req.query;
  const sanitized = sanitizeHost(target);
  if (!sanitized) return res.status(400).json({ error: 'Invalid target' });

  // Additional: Rate limiting should apply at middleware level; here we trust middleware
  // Try to use system traceroute if available; fallback to ping if not
  const tracerouteCmd = 'traceroute';
  const args = ['-n', '-w', '1', '-q', '1', sanitized];
  execFile(tracerouteCmd, args, { timeout: 30 * 1000 }, (err, stdout, stderr) => {
    if (err) {
      // If traceroute not available (Windows), fallback to tracert (Windows) or return error
      if (err.code === 'ENOENT' && process.platform === 'win32') {
        execFile('tracert', [sanitized], { timeout: 30 * 1000 }, (err2, stdout2, stderr2) => {
          if (err2) return res.json({ error: 'Traceroute failed', details: stderr2 || err2.message });
          return res.json({ rawOutput: stdout2 });
        });
        return;
      }
      return res.json({ error: 'Traceroute failed', details: stderr || err.message });
    }
    return res.json({ rawOutput: stdout });
  });
};
