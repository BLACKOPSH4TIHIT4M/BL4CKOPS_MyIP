import { generateTokenWithPassword } from '../common/admin-auth.js';
import { refererCheck } from '../common/referer-check.js';

/**
 * POST /api/admin/login
 * Login dengan admin password, return JWT token
 */
export default async (req, res) => {
  // Validate referer (security)
  if (!refererCheck(req.headers.referer || '', req.headers['x-forwarded-host'] || req.headers.host)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  // Get password dari request body
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password required' });
  }

  try {
    const { token, expiresIn } = generateTokenWithPassword(password);
    return res.json({
      success: true,
      token,
      expiresIn,
      message: 'Admin authenticated successfully',
    });
  } catch (err) {
    // Jangan expose detail error, just return generic message
    console.error('Admin login attempt failed:', err.message);
    return res.status(401).json({ error: 'Invalid password' });
  }
};
