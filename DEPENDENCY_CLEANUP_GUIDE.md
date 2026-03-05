# 🧹 Dependency Cleanup Guide

**Part of Phase 3 Refactoring**
**Date**: March 5, 2026

---

## 🎯 Objective

Remove unused dependencies to:
- Reduce bundle size
- Faster npm install
- Smaller node_modules
- Better security (fewer packages = fewer vulnerabilities)
- Cleaner codebase

---

## 📦 Dependencies to Remove

### 1. Duplicate HTTP Clients
**Remove**: `axios`
**Keep**: Native `fetch`
**Reason**: fetch is built-in, no need for axios
**Savings**: ~500 KB

```bash
npm uninstall axios
```

**Update Code**:
```typescript
// Before
import axios from 'axios';
const response = await axios.get(url);

// After
const response = await fetch(url);
const data = await response.json();
```

---

### 2. Duplicate Routing Libraries
**Remove**: `react-router-dom`
**Keep**: `wouter`
**Reason**: wouter is lighter and already in use
**Savings**: ~200 KB

```bash
npm uninstall react-router-dom
```

**Update Code**:
```typescript
// Before
import { BrowserRouter, Route } from 'react-router-dom';

// After
import { Route } from 'wouter';
```

---

### 3. Duplicate Charting Libraries
**Remove**: `chart.js` and `react-chartjs-2`
**Keep**: `recharts`
**Reason**: recharts is more React-friendly
**Savings**: ~300 KB

```bash
npm uninstall chart.js react-chartjs-2
```

**Update Code**:
```typescript
// Before
import { Line } from 'react-chartjs-2';

// After
import { LineChart, Line } from 'recharts';
```

---

### 4. Passport Authentication
**Remove**: `passport` and `passport-local`
**Keep**: `bcrypt` (Phase 2)
**Reason**: bcrypt is simpler and more secure
**Savings**: ~150 KB

```bash
npm uninstall passport passport-local
```

**Already Replaced**: Phase 2 implemented bcrypt auth

---

### 5. Unused Math Library
**Remove**: `mathjs`
**Keep**: Native JavaScript Math
**Reason**: Not used in codebase
**Savings**: ~500 KB

```bash
npm uninstall mathjs
```

---

### 6. Development Artifacts
**Remove**: `open`, `lovable-tagger`, `puppeteer`
**Reason**: Not needed for production
**Savings**: ~50 MB (puppeteer is huge!)

```bash
npm uninstall open lovable-tagger puppeteer
```

---

### 7. Unused Radix UI Components

**Currently Installed**: 22 components
**Actually Used**: ~13 components

**Remove These** (if not used):
```bash
npm uninstall @radix-ui/react-aspect-ratio
npm uninstall @radix-ui/react-collapsible
npm uninstall @radix-ui/react-context-menu
npm uninstall @radix-ui/react-hover-card
npm uninstall @radix-ui/react-menubar
npm uninstall @radix-ui/react-navigation-menu
npm uninstall @radix-ui/react-toggle
npm uninstall @radix-ui/react-toggle-group
npm uninstall @radix-ui/react-avatar
```

**Savings**: ~100 KB

**Note**: Only remove if you're sure they're not used. Check with:
```bash
grep -r "@radix-ui/react-aspect-ratio" client/
```

---

## 📊 Total Savings

| Package | Size | Status |
|---------|------|--------|
| axios | ~500 KB | Remove |
| react-router-dom | ~200 KB | Remove |
| chart.js + react-chartjs-2 | ~300 KB | Remove |
| passport + passport-local | ~150 KB | Remove |
| mathjs | ~500 KB | Remove |
| puppeteer | ~50 MB | Remove |
| open | ~10 KB | Remove |
| lovable-tagger | ~5 KB | Remove |
| Unused Radix UI | ~100 KB | Review |
| **Total** | **~52 MB** | **Savings** |

---

## 🔧 Cleanup Script

Create `scripts/cleanup-dependencies.sh`:

```bash
#!/bin/bash

echo "🧹 Cleaning up unused dependencies..."

# Remove duplicate HTTP clients
npm uninstall axios

# Remove duplicate routing
npm uninstall react-router-dom

# Remove duplicate charting
npm uninstall chart.js react-chartjs-2

# Remove old auth
npm uninstall passport passport-local

# Remove unused math
npm uninstall mathjs

# Remove dev artifacts
npm uninstall open lovable-tagger puppeteer

echo "✅ Cleanup complete!"
echo "📊 Savings: ~52 MB"
echo ""
echo "Run 'npm install' to update package-lock.json"
```

**Run**:
```bash
chmod +x scripts/cleanup-dependencies.sh
./scripts/cleanup-dependencies.sh
```

---

## ⚠️ Before Removing

### 1. Search for Usage
```bash
# Check if package is used
grep -r "axios" client/ server/
grep -r "react-router-dom" client/
grep -r "chart.js" client/
```

### 2. Run Tests
```bash
npm test
node run-tests.cjs
```

### 3. Check Build
```bash
npm run build
```

---

## ✅ After Removing

### 1. Update package-lock.json
```bash
npm install
```

### 2. Test Everything
```bash
npm test
npm start
# Test in browser
```

### 3. Check Bundle Size
```bash
npm run build
# Check dist/ folder size
```

### 4. Commit Changes
```bash
git add package.json package-lock.json
git commit -m "chore: Remove unused dependencies (~52 MB savings)"
git push origin main
```

---

## 📝 Dependencies to Keep

### Core Dependencies
- ✅ `express` - Server framework
- ✅ `react` - UI framework
- ✅ `wouter` - Routing
- ✅ `recharts` - Charts
- ✅ `bcrypt` - Auth (Phase 2)
- ✅ `pdf-parse` - PDF parsing (Phase 2)
- ✅ `mammoth` - DOCX parsing (Phase 2)
- ✅ `xlsx` - Excel parsing (Phase 2)
- ✅ `multer` - File uploads
- ✅ `express-session` - Sessions

### UI Components (Radix UI)
- ✅ `@radix-ui/react-dialog` - Modals
- ✅ `@radix-ui/react-dropdown-menu` - Dropdowns
- ✅ `@radix-ui/react-select` - Selects
- ✅ `@radix-ui/react-tabs` - Tabs
- ✅ `@radix-ui/react-toast` - Notifications
- ✅ `@radix-ui/react-tooltip` - Tooltips
- ✅ And others actually used

### AI Providers
- ✅ `@anthropic-ai/sdk` - Anthropic
- ✅ `@google/generative-ai` - Gemini
- ✅ `openai` - OpenAI

### Database
- ✅ `@neondatabase/serverless` - Neon DB
- ✅ `drizzle-orm` - ORM
- ✅ `drizzle-kit` - Migrations

---

## 🎯 Recommended Approach

### Phase 3A: Safe Removals (Do First)
```bash
npm uninstall mathjs open lovable-tagger puppeteer
```
**Risk**: Very Low
**Savings**: ~50 MB

### Phase 3B: Duplicate Removals (Do Second)
```bash
npm uninstall axios react-router-dom chart.js react-chartjs-2
```
**Risk**: Low (if code updated)
**Savings**: ~1 MB

### Phase 3C: Auth Cleanup (Do Third)
```bash
npm uninstall passport passport-local
```
**Risk**: Low (Phase 2 replaced it)
**Savings**: ~150 KB

### Phase 3D: Radix UI Audit (Do Last)
Review and remove unused Radix UI components
**Risk**: Medium (need to verify usage)
**Savings**: ~100 KB

---

## 📈 Expected Results

### Before Cleanup
- **node_modules**: ~500 MB
- **Dependencies**: ~80 packages
- **Install Time**: ~2 minutes

### After Cleanup
- **node_modules**: ~450 MB
- **Dependencies**: ~45 packages
- **Install Time**: ~1.5 minutes

### Benefits
- ✅ Faster installs
- ✅ Smaller bundle
- ✅ Fewer vulnerabilities
- ✅ Cleaner codebase
- ✅ Easier maintenance

---

## 🚀 Next Steps

1. **Review this guide**
2. **Run Phase 3A** (safe removals)
3. **Test everything**
4. **Run Phase 3B** (duplicates)
5. **Test again**
6. **Commit changes**

---

*Part of Phase 3: Advanced Optimizations*
*ClaimEvaluator v2.2.0*
