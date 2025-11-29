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

// Setup readline untuk input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  console.log('\n' + '═'.repeat(60));
  console.log('🔐 BL4CKOPS Admin Security Setup');
  console.log('═'.repeat(60) + '\n');

  console.log('📋 Ini akan setup admin password dan security keys untuk aplikasi Anda.\n');

  // Generate security keys
  const adminSecret = generateSecureKey(32);
  const encryptionKey = generateSecureKey(32);

  console.log('✅ Generated Security Keys:\n');

  // Ask for admin password
  let password = '';
  let confirmPassword = '';
  let passwordMatch = false;

  while (!passwordMatch) {
    password = await question(
      '🔐 Masukkan admin password (minimum 8 karakter): '
    );

    if (password.length < 8) {
      console.log('❌ Password harus minimal 8 karakter!\n');
      continue;
    }

    confirmPassword = await question('🔐 Konfirmasi password: ');

    if (password !== confirmPassword) {
      console.log('❌ Password tidak cocok! Coba lagi.\n');
      continue;
    }

    passwordMatch = true;
  }

  const passwordHash = hashPassword(password);

  console.log('\n✅ Generated Tokens:\n');
  console.log(`Admin Secret (simpan di aman!):\n   ${adminSecret}\n`);
  console.log(`Encryption Key (untuk sensitive data):\n   ${encryptionKey}\n`);
  console.log(
    `Password Hash (akan disimpan di .env):\n   ${passwordHash}\n`
  );

  // Check if .env exists
  const envPath = path.join(__dirname, '.env');
  const envExamplePath = path.join(__dirname, '.env.example');

  if (!fs.existsSync(envPath)) {
    console.log('📝 .env file tidak ditemukan. Membuat dari .env.example...\n');

    if (fs.existsSync(envExamplePath)) {
      let envContent = fs.readFileSync(envExamplePath, 'utf8');

      // Replace placeholders
      envContent = envContent.replace(
        'your_secure_random_secret_here_change_this',
        adminSecret
      );
      envContent = envContent.replace('ADMIN_PASSWORD_HASH=""', `ADMIN_PASSWORD_HASH="${passwordHash}"`);
      envContent = envContent.replace(
        'your_encryption_key_here_minimum_32_characters',
        encryptionKey
      );

      fs.writeFileSync(envPath, envContent, 'utf8');
      console.log('✅ .env file sudah dibuat dengan security tokens!\n');
    } else {
      console.log('⚠️  .env.example tidak ditemukan. Buat .env manually.\n');
    }
  } else {
    console.log(
      '⚠️  .env file sudah ada. Update manual dengan nilai di bawah:\n'
    );
    console.log(`ADMIN_SECRET="${adminSecret}"`);
    console.log(`ADMIN_PASSWORD_HASH="${passwordHash}"`);
    console.log(`ENCRYPTION_KEY="${encryptionKey}"\n`);
  }

  console.log('═'.repeat(60));
  console.log('✅ SETUP SELESAI!\n');
  console.log('📖 Next steps:\n');
  console.log('1. Admin password Anda sudah tersimpan dan ter-hash di .env');
  console.log('2. Gunakan password ini untuk login ke admin panel');
  console.log('3. Jangan share password ke siapa pun!');
  console.log('4. Jalankan: npm start\n');
  console.log('📝 Tips Keamanan:');
  console.log('   - Simpan ADMIN_SECRET di tempat aman');
  console.log('   - Gunakan password yang kuat (kombinasi huruf, angka, simbol)');
  console.log('   - Ganti password secara berkala\n');
  console.log('═'.repeat(60) + '\n');

  rl.close();
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});

