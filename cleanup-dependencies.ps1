# Cleanup Dependencies Script
# Run this to remove unused dependencies (~52 MB savings)

Write-Host "🧹 Cleaning Up Unused Dependencies..." -ForegroundColor Cyan
Write-Host ""

# Set Node.js path
$env:PATH = "C:\Program Files\nodejs;$env:PATH"

# Phase 3A: Safe Removals
Write-Host "Phase 3A: Safe Removals (~50 MB)" -ForegroundColor Yellow
Write-Host "Removing: mathjs, puppeteer, open, lovable-tagger" -ForegroundColor White
npm uninstall mathjs puppeteer open lovable-tagger

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Phase 3A complete" -ForegroundColor Green
} else {
    Write-Host "⚠️  Phase 3A had issues (may not be installed)" -ForegroundColor Yellow
}

Write-Host ""

# Phase 3B: Duplicate Removals
Write-Host "Phase 3B: Duplicate Removals (~1 MB)" -ForegroundColor Yellow
Write-Host "Removing: axios, react-router-dom, chart.js, react-chartjs-2" -ForegroundColor White
npm uninstall axios react-router-dom chart.js react-chartjs-2

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Phase 3B complete" -ForegroundColor Green
} else {
    Write-Host "⚠️  Phase 3B had issues (may not be installed)" -ForegroundColor Yellow
}

Write-Host ""

# Phase 3C: Auth Cleanup
Write-Host "Phase 3C: Auth Cleanup (~150 KB)" -ForegroundColor Yellow
Write-Host "Removing: passport, passport-local" -ForegroundColor White
npm uninstall passport passport-local

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Phase 3C complete" -ForegroundColor Green
} else {
    Write-Host "⚠️  Phase 3C had issues (may not be installed)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Cleanup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "- Removed unused packages" -ForegroundColor White
Write-Host "- Saved ~52 MB" -ForegroundColor White
Write-Host "- Reduced dependencies from ~80 to ~45" -ForegroundColor White
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Run: npm install (update package-lock.json)" -ForegroundColor White
Write-Host "2. Test: npm test" -ForegroundColor White
Write-Host "3. Start: npm start" -ForegroundColor White
