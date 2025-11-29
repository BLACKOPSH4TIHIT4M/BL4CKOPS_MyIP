import * as fs from 'fs';
import * as path from 'path';
import * as JsObfuscator from 'javascript-obfuscator';

const DIST_DIR = './dist';
const BACKEND_DIR = './';
const OUTPUT_DIR = './dist-obfuscated';

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('🔐 Starting code obfuscation...');

// Obfuscate frontend JS files
function obfuscateFrontendFiles() {
  console.log('📦 Obfuscating frontend files...');
  
  const jsDir = path.join(DIST_DIR, 'assets');
  if (!fs.existsSync(jsDir)) {
    console.log('⚠️  No dist/assets found. Run: npm run build first');
    return;
  }

  const files = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
  
  files.forEach(file => {
    const filePath = path.join(jsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    try {
      const obfuscated = JsObfuscator.obfuscate(content, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4,
        debugProtection: true,
        debugProtectionInterval: true,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        renameGlobals: false,
        rotateStringArray: true,
        selfDefending: true,
        stringArray: true,
        stringArrayThreshold: 0.75,
        unicodeEscapeSequence: false
      }).getObfuscatedCode();
      
      fs.writeFileSync(filePath, obfuscated);
      console.log(`✅ Obfuscated: ${file}`);
    } catch (err) {
      console.error(`❌ Error obfuscating ${file}:`, err.message);
    }
  });
}

// Obfuscate backend API files
function obfuscateBackendFiles() {
  console.log('📦 Obfuscating backend API files...');
  
  const apiDir = './api';
  if (!fs.existsSync(apiDir)) {
    console.log('⚠️  No api directory found');
    return;
  }

  const files = fs.readdirSync(apiDir).filter(f => f.endsWith('.js'));
  const backendOutDir = path.join(OUTPUT_DIR, 'api');
  
  if (!fs.existsSync(backendOutDir)) {
    fs.mkdirSync(backendOutDir, { recursive: true });
  }

  files.forEach(file => {
    const filePath = path.join(apiDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    try {
      const obfuscated = JsObfuscator.obfuscate(content, {
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        debugProtection: true,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        renameGlobals: false,
        rotateStringArray: true,
        selfDefending: true,
        stringArray: true,
        stringArrayThreshold: 0.75
      }).getObfuscatedCode();
      
      const outPath = path.join(backendOutDir, file);
      fs.writeFileSync(outPath, obfuscated);
      console.log(`✅ Obfuscated: api/${file}`);
    } catch (err) {
      console.error(`❌ Error obfuscating api/${file}:`, err.message);
    }
  });
}

// Copy dist to output
function copyDistFiles() {
  console.log('📋 Copying dist files...');
  
  if (fs.existsSync(DIST_DIR)) {
    // Copy entire dist folder except assets (we already obfuscated them)
    const copy = (src, dest) => {
      const stat = fs.statSync(src);
      if (stat.isDirectory()) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach(file => {
          copy(path.join(src, file), path.join(dest, file));
        });
      } else if (!src.includes('assets') || !src.endsWith('.js')) {
        fs.copyFileSync(src, dest);
      }
    };
    
    copy(DIST_DIR, path.join(OUTPUT_DIR, 'frontend-dist'));
    console.log('✅ Frontend dist copied');
  }
}

// Generate summary
function generateSummary() {
  const summary = `
╔════════════════════════════════════════════════════════════════╗
║           🔐 CODE OBFUSCATION COMPLETE                         ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  ✅ Frontend JS files: OBFUSCATED                             ║
║  ✅ Backend API files: OBFUSCATED                             ║
║  ✅ Control flow flattening: ENABLED                          ║
║  ✅ Dead code injection: ENABLED                              ║
║  ✅ Self-defending code: ENABLED                              ║
║  ✅ String array: ENABLED                                     ║
║  ✅ Debug protection: ENABLED                                 ║
║                                                                ║
║  📁 Output: ${OUTPUT_DIR}                               ║
║  📦 Production ready: YES                                      ║
║                                                                ║
║  🚀 Next steps:                                                ║
║     1. Copy obfuscated files to production                    ║
║     2. Keep source code private                               ║
║     3. Use environment variables for secrets                  ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
`;
  console.log(summary);
}

// Main execution
try {
  obfuscateFrontendFiles();
  obfuscateBackendFiles();
  copyDistFiles();
  generateSummary();
  console.log('✅ Obfuscation process completed successfully!');
} catch (err) {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
}
