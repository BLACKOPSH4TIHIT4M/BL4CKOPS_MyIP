#!/usr/bin/env node

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import CryptoJS from 'crypto-js';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function generateSecureKey(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

function hashPassword(password) {
  return CryptoJS.SHA256(password).toString();
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function main() {
  console.log('\n' + '═'.repeat(70));
  console.log('🔐 BL4CKOPS ADMIN PASSWORD SETUP');
  console.log('═'.repeat(70) + '\n');

  // Generate security keys
  const adminSecret = generateSecureKey(32);
  const encryptionKey = generateSecureKey(32);

  console.log('📋 STEP 1: SET ADMIN PASSWORD\n');
  console.log('Requirements:');
  console.log('  • Min 8 karakter');
  console.log('  • Harus ada huruf kecil (a-z)');
  console.log('  • Harus ada huruf BESAR (A-Z)');
  console.log('  • Harus ada angka (0-9)\n');

  let password = '';
  let passwordValid = false;

  while (!passwordValid) {
    const pass1 = await question('Masukkan password: ');

    if (pass1.length < 8) {
      console.log('❌ Min 8 karakter!\n');
      continue;
    }

    if (!/[a-z]/.test(pass1) || !/[A-Z]/.test(pass1) || !/[0-9]/.test(pass1)) {
      console.log('❌ Harus ada huruf kecil, BESAR, dan angka!\n');
      continue;
    }

    const pass2 = await question('Konfirmasi password: ');

    if (pass1 !== pass2) {
      console.log('❌ Tidak cocok!\n');
      continue;
    }

    password = pass1;
    passwordValid = true;
    console.log('✅ Password accepted!\n');
  }

  const passwordHash = hashPassword(password);

  // Read .env
  const envPath = path.join(__dirname, '.env');
  let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

  // Update config
  let lines = envContent.split('\n');
  
  lines = lines.map(line => {
    if (line.startsWith('ADMIN_SECRET=')) return `ADMIN_SECRET="${adminSecret}"`;
    if (line.startsWith('ADMIN_PASSWORD_HASH=')) return `ADMIN_PASSWORD_HASH="${passwordHash}"`;
    if (line.startsWith('ENCRYPTION_KEY=')) return `ENCRYPTION_KEY="${encryptionKey}"`;
    return line;
  });

  // Add if missing
  if (!envContent.includes('ADMIN_SECRET=')) lines.push(`ADMIN_SECRET="${adminSecret}"`);
  if (!envContent.includes('ADMIN_PASSWORD_HASH=')) lines.push(`ADMIN_PASSWORD_HASH="${passwordHash}"`);
  if (!envContent.includes('ENCRYPTION_KEY=')) lines.push(`ENCRYPTION_KEY="${encryptionKey}"`);

  fs.writeFileSync(envPath, lines.join('\n'), 'utf8');

  console.log('═'.repeat(70));
  console.log('✅ SETUP COMPLETE!\n');
  console.log('Next: npm start\n');
  console.log('═'.repeat(70) + '\n');

  rl.close();
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
