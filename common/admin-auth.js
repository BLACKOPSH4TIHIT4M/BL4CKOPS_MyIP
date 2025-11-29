import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';

const ADMIN_SECRET = process.env.ADMIN_SECRET;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

/**
 * Generate admin token dengan password
 * @param {string} password - Admin password
 * @returns {object} - { token, expiresIn }
 */
export function generateTokenWithPassword(password) {
  if (!ADMIN_SECRET || !ADMIN_PASSWORD_HASH) {
    throw new Error('Admin security not configured');
  }

  // Verify password
  const passwordHash = CryptoJS.SHA256(password).toString();
  if (passwordHash !== ADMIN_PASSWORD_HASH) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ role: 'admin', access: 'full', iat: Date.now() }, ADMIN_SECRET, {
    expiresIn: '24h',
  });

  return { token, expiresIn: '24h' };
}

/**
 * Hash admin password untuk disimpan di .env
 * @param {string} password - Plain password
 * @returns {string} - SHA256 hash
 */
export function hashAdminPassword(password) {
  return CryptoJS.SHA256(password).toString();
}

// Middleware untuk validasi admin token
export function adminAuthMiddleware(req, res, next) {
  if (!ADMIN_SECRET) {
    return res.status(403).json({ error: 'Admin access not configured' });
  }

  // Cek dari header Authorization atau query param (untuk dev)
  const token = req.headers.authorization?.replace('Bearer ', '') || req.query.admin_token;

  if (!token) {
    return res.status(401).json({ error: 'Admin token required' });
  }

  try {
    const decoded = jwt.verify(token, ADMIN_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}

// Quick token validation (untuk standalone check)
export function validateAdminToken(token) {
  try {
    const decoded = jwt.verify(token, ADMIN_SECRET);
    return decoded.role === 'admin';
  } catch (err) {
    return false;
  }
}
