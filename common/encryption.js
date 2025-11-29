import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'bl4ckops_default_key_change_this';

/**
 * Encrypt sensitive data
 * @param {string} data - Data to encrypt
 * @returns {string} - Encrypted data
 */
export function encryptSensitive(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
}

/**
 * Decrypt sensitive data
 * @param {string} encrypted - Encrypted data
 * @returns {any} - Decrypted data
 */
export function decryptSensitive(encrypted) {
  try {
    const decrypted = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY).toString(
      CryptoJS.enc.Utf8
    );
    return JSON.parse(decrypted);
  } catch (err) {
    console.error('Decryption failed:', err.message);
    return null;
  }
}

/**
 * Hash sensitive data (one-way)
 * @param {string} data - Data to hash
 * @returns {string} - Hashed data
 */
export function hashSensitive(data) {
  return CryptoJS.SHA256(data + ENCRYPTION_KEY).toString();
}

/**
 * Verify hashed data
 * @param {string} data - Original data
 * @param {string} hash - Hash to verify against
 * @returns {boolean} - Match or not
 */
export function verifySensitive(data, hash) {
  return hashSensitive(data) === hash;
}
