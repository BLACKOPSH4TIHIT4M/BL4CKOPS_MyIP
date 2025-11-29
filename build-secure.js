import { JavaScriptObfuscator } from 'javascript-obfuscator';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Moderate obfuscation config - bukan terlalu heavy, biar tidak bikin jalan lambat
 */
const obfuscatorConfig = {
  compact: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: false,
  debugProtectionInterval: false,
  disableConsoleOutput: false,
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  renameGlobals: false,
  rotateStringArray: true,
  selfDefending: false,
  stringArray: true,
  stringArrayThreshold: 0.75,
  unicodeEscapeSequence: false,
};

function obfuscateFile(filePath) {
  try {
    const code = fs.readFileSync(filePath, 'utf8');

    // Skip jika file udah punya marker obfuscated
    if (code.includes('/* OBFUSCATED */')) {
      console.log(`⏭️  Skipped (already obfuscated): ${filePath}`);
      return;
    }

    const obfuscated = JavaScriptObfuscator.obfuscate(code, obfuscatorConfig);
    const outputCode = `/* OBFUSCATED */\n${obfuscated.getObfuscatedCode()}`;

    fs.writeFileSync(filePath, outputCode, 'utf8');
    console.log(`✅ Obfuscated: ${filePath}`);
  } catch (err) {
    console.error(`❌ Error obfuscating ${filePath}:`, err.message);
  }
}

function obfuscateDirectory(dirPath, extensions = ['.js']) {
  if (!fs.existsSync(dirPath)) {
    console.error(`Directory not found: ${dirPath}`);
    return;
  }

  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    // Skip node_modules dan directories tertentu
    if (stat.isDirectory()) {
      if (!['node_modules', 'dist', '.git'].includes(file)) {
        obfuscateDirectory(filePath, extensions);
      }
    } else if (extensions.some((ext) => file.endsWith(ext))) {
      obfuscateFile(filePath);
    }
  });
}

// Main build process
console.log('🔐 Starting code obfuscation...\n');

// Obfuscate API handlers
const apiDir = path.join(__dirname, 'api');
console.log(`📁 Processing API handlers: ${apiDir}`);
obfuscateDirectory(apiDir);

// Obfuscate common utilities
const commonDir = path.join(__dirname, 'common');
console.log(`\n📁 Processing common utilities: ${commonDir}`);
obfuscateDirectory(commonDir);

// Obfuscate backend server
const backendFile = path.join(__dirname, 'backend-server.js');
console.log(`\n📄 Processing backend server...`);
obfuscateFile(backendFile);

console.log('\n✨ Obfuscation complete!\n');
console.log('⚠️  Note: This is moderate obfuscation for prevent reverse-engineering.');
console.log('⚠️  Make sure to keep source backup in private repository!\n');
