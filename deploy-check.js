#!/usr/bin/env node

/**
 * Pre-Deployment Checklist Script
 * Verifies all requirements before deploying ClaimEvaluator
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  const exists = fs.existsSync(path.join(__dirname, filePath));
  if (exists) {
    log(`✅ ${description}`, 'green');
    return true;
  } else {
    log(`❌ ${description} - Missing: ${filePath}`, 'red');
    return false;
  }
}

function checkEnvFile() {
  const envPath = path.join(__dirname, '.env');
  const envExamplePath = path.join(__dirname, '.env.example');
  
  if (!fs.existsSync(envPath)) {
    log('⚠️  .env file not found', 'yellow');
    if (fs.existsSync(envExamplePath)) {
      log('   Copy .env.example to .env and configure it', 'yellow');
    }
    return false;
  }
  
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const checks = {
    'NODE_ENV': envContent.includes('NODE_ENV'),
    'DATABASE_URL or STORAGE_TYPE': envContent.includes('DATABASE_URL') || envContent.includes('STORAGE_TYPE=memory'),
    'AI API Key': envContent.includes('GROK_API_KEY') || envContent.includes('OPENAI_API_KEY') || 
                  envContent.includes('ANTHROPIC_API_KEY') || envContent.includes('GOOGLE_API_KEY'),
    'SESSION_SECRET': envContent.includes('SESSION_SECRET')
  };
  
  let allGood = true;
  for (const [key, value] of Object.entries(checks)) {
    if (value) {
      log(`✅ ${key} configured`, 'green');
    } else {
      log(`❌ ${key} not configured in .env`, 'red');
      allGood = false;
    }
  }
  
  return allGood;
}

function checkPackageJson() {
  const pkgPath = path.join(__dirname, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    log('❌ package.json not found', 'red');
    return false;
  }
  
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  
  log(`✅ Package: ${pkg.name} v${pkg.version}`, 'green');
  
  const requiredScripts = ['dev', 'start', 'build'];
  let allScripts = true;
  
  for (const script of requiredScripts) {
    if (pkg.scripts && pkg.scripts[script]) {
      log(`✅ Script '${script}' defined`, 'green');
    } else {
      log(`❌ Script '${script}' missing`, 'red');
      allScripts = false;
    }
  }
  
  return allScripts;
}

function checkDist() {
  const distPath = path.join(__dirname, 'dist');
  const indexJsPath = path.join(distPath, 'index.js');
  const indexHtmlPath = path.join(distPath, 'index.html');
  const assetsPath = path.join(distPath, 'assets');
  
  if (!fs.existsSync(distPath)) {
    log('❌ dist/ directory not found', 'red');
    return false;
  }
  
  let allGood = true;
  
  if (fs.existsSync(indexJsPath)) {
    const stats = fs.statSync(indexJsPath);
    log(`✅ dist/index.js exists (${(stats.size / 1024).toFixed(2)} KB)`, 'green');
  } else {
    log('❌ dist/index.js not found', 'red');
    allGood = false;
  }
  
  if (fs.existsSync(indexHtmlPath)) {
    log('✅ dist/index.html exists', 'green');
  } else {
    log('❌ dist/index.html not found', 'red');
    allGood = false;
  }
  
  if (fs.existsSync(assetsPath)) {
    const assets = fs.readdirSync(assetsPath);
    log(`✅ dist/assets/ exists (${assets.length} files)`, 'green');
  } else {
    log('⚠️  dist/assets/ not found', 'yellow');
  }
  
  return allGood;
}

function checkNodeModules() {
  const nmPath = path.join(__dirname, 'node_modules');
  if (fs.existsSync(nmPath)) {
    log('✅ node_modules/ exists', 'green');
    return true;
  } else {
    log('⚠️  node_modules/ not found - run: npm install', 'yellow');
    return false;
  }
}

function main() {
  log('\n🚀 ClaimEvaluator Deployment Readiness Check\n', 'cyan');
  
  log('📦 Checking Core Files...', 'blue');
  const coreFiles = [
    ['package.json', 'Package configuration'],
    ['package-lock.json', 'Dependency lock file'],
    ['dist/index.js', 'Server bundle'],
    ['dist/index.html', 'Frontend entry'],
    ['.gitignore', 'Git ignore file']
  ];
  
  let coreOk = true;
  for (const [file, desc] of coreFiles) {
    if (!checkFile(file, desc)) coreOk = false;
  }
  
  log('\n📝 Checking Configuration Files...', 'blue');
  const configFiles = [
    ['vite.config.ts', 'Vite configuration'],
    ['tsconfig.json', 'TypeScript configuration'],
    ['drizzle.config.ts', 'Database configuration'],
    ['vercel.json', 'Vercel deployment config'],
    ['.env.example', 'Environment template']
  ];
  
  let configOk = true;
  for (const [file, desc] of configFiles) {
    if (!checkFile(file, desc)) configOk = false;
  }
  
  log('\n📚 Checking Documentation...', 'blue');
  const docFiles = [
    ['README.md', 'Main documentation'],
    ['DEPLOYMENT_GUIDE.md', 'Deployment guide'],
    ['STREAM_DEPLOY_GUIDE.md', 'Stream deploy guide'],
    ['FEATURES_INTEGRATED.md', 'Features documentation']
  ];
  
  let docsOk = true;
  for (const [file, desc] of docFiles) {
    if (!checkFile(file, desc)) docsOk = false;
  }
  
  log('\n🔧 Checking Build Artifacts...', 'blue');
  const distOk = checkDist();
  
  log('\n📦 Checking Dependencies...', 'blue');
  const depsOk = checkNodeModules();
  
  log('\n🔐 Checking Environment Configuration...', 'blue');
  const envOk = checkEnvFile();
  
  log('\n📋 Checking Package Scripts...', 'blue');
  const scriptsOk = checkPackageJson();
  
  log('\n' + '='.repeat(60), 'cyan');
  
  const allChecks = coreOk && configOk && docsOk && distOk && envOk && scriptsOk;
  
  if (allChecks && depsOk) {
    log('\n✅ ALL CHECKS PASSED! Ready for deployment! 🎉\n', 'green');
    log('Next steps:', 'cyan');
    log('  1. Commit your changes: git add . && git commit -m "Ready for deployment"', 'cyan');
    log('  2. Push to GitHub: git push origin main', 'cyan');
    log('  3. Deploy to Vercel: npm run deploy:vercel', 'cyan');
    log('  4. Or use one-click deploy from STREAM_DEPLOY_GUIDE.md\n', 'cyan');
    process.exit(0);
  } else if (allChecks && !depsOk) {
    log('\n⚠️  Almost ready! Run: npm install\n', 'yellow');
    process.exit(1);
  } else {
    log('\n❌ Some checks failed. Please fix the issues above.\n', 'red');
    log('For help, see:', 'yellow');
    log('  - README.md for setup instructions', 'yellow');
    log('  - STREAM_DEPLOY_GUIDE.md for deployment guide', 'yellow');
    log('  - .env.example for environment configuration\n', 'yellow');
    process.exit(1);
  }
}

main();
