# 🔧 Manual Execution Guide - Phase 2

**Current Status**: Code committed to GitHub ✅
**Next Steps**: Install dependencies and clean up

---

## Step 1: Install Phase 2 Dependencies

### Open PowerShell in Project Directory
```powershell
cd E:\Rajkumar\ClaimEvaluator
```

### Set Node.js Path
```powershell
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
```

### Install Production Dependencies
```powershell
npm install bcrypt
```
Wait for completion, then:

```powershell
npm install pdf-parse
```
Wait for completion, then:

```powershell
npm install mammoth
```
Wait for completion, then:

```powershell
npm install xlsx
```

### Install Dev Dependencies
```powershell
npm install --save-dev @types/bcrypt
```

### Verify Installation
```powershell
npm list bcrypt pdf-parse mammoth xlsx
```

You should see all 4 packages listed.

---

## Step 2: Test the Installation

### Check for Errors
```powershell
npm run check
```

This will run TypeScript compiler to check for errors.

### Start the Server
```powershell
npm start
```

Server should start on http://localhost:5003

### Test in Browser
1. Open http://localhost:5003
2. Check that the app loads
3. Try navigating pages
4. Check browser console for errors

### Stop the Server
Press `Ctrl+C` in PowerShell

---

## Step 3: Clean Up Unused Dependencies

### Phase 3A: Safe Removals (~50 MB)
```powershell
npm uninstall mathjs
```

```powershell
npm uninstall puppeteer
```

```powershell
npm uninstall open
```

```powershell
npm uninstall lovable-tagger
```

### Phase 3B: Duplicate Removals (~1 MB)
```powershell
npm uninstall axios
```

```powershell
npm uninstall react-router-dom
```

```powershell
npm uninstall chart.js
```

```powershell
npm uninstall react-chartjs-2
```

### Phase 3C: Auth Cleanup (~150 KB)
```powershell
npm uninstall passport
```

```powershell
npm uninstall passport-local
```

### Update package-lock.json
```powershell
npm install
```

---

## Step 4: Commit Dependency Changes

### Check Status
```powershell
git status
```

You should see changes to `package.json` and `package-lock.json`

### Add Changes
```powershell
git add package.json package-lock.json
```

### Commit
```powershell
git commit -m "chore: Install Phase 2 dependencies and remove unused packages

- Install bcrypt, pdf-parse, mammoth, xlsx for Phase 2 features
- Remove unused dependencies: mathjs, puppeteer, open, lovable-tagger
- Remove duplicate dependencies: axios, react-router-dom, chart.js
- Remove old auth: passport, passport-local
- Reduce from ~80 to ~45 packages (~52 MB savings)"
```

### Push to GitHub
```powershell
git push origin main
```

---

## Step 5: Final Verification

### Test Everything Again
```powershell
npm start
```

### Check Package Count
```powershell
npm list --depth=0 | measure-object -line
```

Should show around 45-50 packages (down from 80+)

### Check node_modules Size
```powershell
Get-ChildItem node_modules -Recurse | Measure-Object -Property Length -Sum
```

Should be around 450 MB (down from 500 MB)

---

## ✅ Success Indicators

You'll know everything worked when:
- ✅ All 4 Phase 2 packages installed without errors
- ✅ TypeScript shows no errors (`npm run check`)
- ✅ Server starts successfully (`npm start`)
- ✅ App loads in browser (http://localhost:5003)
- ✅ Unused packages removed
- ✅ Package count reduced to ~45
- ✅ node_modules size reduced to ~450 MB
- ✅ Changes committed and pushed to GitHub

---

## 🆘 Troubleshooting

### If bcrypt fails to install
```powershell
# Install build tools
npm install --global windows-build-tools

# Try again
npm install bcrypt
```

### If pdf-parse fails
```powershell
# Clear cache
npm cache clean --force

# Try again
npm install pdf-parse
```

### If any package fails
```powershell
# Try with legacy peer deps
npm install <package-name> --legacy-peer-deps
```

### If TypeScript errors appear
```powershell
# Check diagnostics
npm run check

# Most errors should be resolved after installing @types/bcrypt
```

---

## 📊 Expected Results

### Before
- Dependencies: ~80 packages
- node_modules: ~500 MB
- Install time: ~2 minutes
- Missing: bcrypt, pdf-parse, mammoth, xlsx

### After
- Dependencies: ~45 packages
- node_modules: ~450 MB
- Install time: ~1.5 minutes
- Installed: bcrypt, pdf-parse, mammoth, xlsx
- Removed: mathjs, puppeteer, axios, passport, etc.

---

## 🎯 What This Achieves

### Phase 2 Dependencies Installed
- ✅ `bcrypt` - Secure password hashing (12 rounds)
- ✅ `pdf-parse` - Real PDF parsing
- ✅ `mammoth` - Real DOCX parsing
- ✅ `xlsx` - Real Excel parsing

### Unused Dependencies Removed
- ✅ `mathjs` - Not used
- ✅ `puppeteer` - Dev artifact (50 MB!)
- ✅ `axios` - Using fetch instead
- ✅ `react-router-dom` - Using wouter
- ✅ `chart.js` - Using recharts
- ✅ `passport` - Using bcrypt

### Benefits
- ✅ Real document parsing works
- ✅ Secure authentication works
- ✅ Smaller bundle size
- ✅ Faster installs
- ✅ Fewer vulnerabilities
- ✅ Cleaner dependencies

---

## 📝 Quick Command Reference

```powershell
# Install Phase 2 dependencies
npm install bcrypt pdf-parse mammoth xlsx
npm install --save-dev @types/bcrypt

# Remove unused dependencies
npm uninstall mathjs puppeteer open lovable-tagger axios react-router-dom chart.js react-chartjs-2 passport passport-local

# Update package-lock.json
npm install

# Test
npm run check
npm start

# Commit
git add package.json package-lock.json
git commit -m "chore: Install Phase 2 dependencies and remove unused packages"
git push origin main
```

---

## ⏱️ Estimated Time

- **Step 1** (Install): 5-10 minutes
- **Step 2** (Test): 2-3 minutes
- **Step 3** (Cleanup): 3-5 minutes
- **Step 4** (Commit): 1-2 minutes
- **Step 5** (Verify): 2-3 minutes

**Total**: 15-25 minutes

---

## 🎉 When Complete

You'll have:
- ✅ All Phase 2 features functional
- ✅ Real document parsing (PDF, DOCX, XLSX)
- ✅ Secure bcrypt authentication
- ✅ Optimized dependencies (~52 MB saved)
- ✅ Everything committed to GitHub
- ✅ Production-ready application

**Your ClaimEvaluator v2.2.0 will be fully operational!** 🚀

---

*Follow these steps carefully and you'll be done in 15-25 minutes!*
