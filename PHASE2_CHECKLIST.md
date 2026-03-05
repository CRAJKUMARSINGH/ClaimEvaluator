# ✅ Phase 2 Execution Checklist

**Goal**: Install dependencies, test, clean up, and commit

---

## 📋 Checklist

### Setup
- [ ] Open PowerShell in `E:\Rajkumar\ClaimEvaluator`
- [ ] Run: `$env:PATH = "C:\Program Files\nodejs;$env:PATH"`

---

### Install Dependencies (5-10 min)
- [ ] `npm install bcrypt`
- [ ] `npm install pdf-parse`
- [ ] `npm install mammoth`
- [ ] `npm install xlsx`
- [ ] `npm install --save-dev @types/bcrypt`
- [ ] Verify: `npm list bcrypt pdf-parse mammoth xlsx`

---

### Test Installation (2-3 min)
- [ ] Run: `npm run check` (should show no errors)
- [ ] Run: `npm start` (server should start)
- [ ] Open: http://localhost:5003 (app should load)
- [ ] Stop server: `Ctrl+C`

---

### Clean Up Dependencies (3-5 min)
- [ ] `npm uninstall mathjs`
- [ ] `npm uninstall puppeteer`
- [ ] `npm uninstall open`
- [ ] `npm uninstall lovable-tagger`
- [ ] `npm uninstall axios`
- [ ] `npm uninstall react-router-dom`
- [ ] `npm uninstall chart.js`
- [ ] `npm uninstall react-chartjs-2`
- [ ] `npm uninstall passport`
- [ ] `npm uninstall passport-local`
- [ ] Run: `npm install` (update package-lock.json)

---

### Commit Changes (1-2 min)
- [ ] `git status` (check changes)
- [ ] `git add package.json package-lock.json`
- [ ] `git commit -m "chore: Install Phase 2 dependencies and remove unused packages"`
- [ ] `git push origin main`

---

### Final Verification (2-3 min)
- [ ] `npm start` (test again)
- [ ] App loads successfully
- [ ] No console errors
- [ ] All features work

---

## ✅ Done!

When all boxes are checked, you have:
- ✅ Phase 2 dependencies installed
- ✅ Unused packages removed (~52 MB saved)
- ✅ Everything tested and working
- ✅ Changes committed to GitHub

**Your ClaimEvaluator v2.2.0 is fully operational!** 🚀

---

## 🆘 If Something Fails

See `MANUAL_EXECUTION_GUIDE.md` for:
- Detailed instructions
- Troubleshooting tips
- Alternative commands
- Expected results

---

**Estimated Time**: 15-25 minutes
**Difficulty**: Easy
**Risk**: Low

**Let's do this!** 💪
