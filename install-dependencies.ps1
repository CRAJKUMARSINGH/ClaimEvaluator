# Install Dependencies Script
# Run this to install all Phase 2 dependencies

Write-Host "🔧 Installing Phase 2 Dependencies..." -ForegroundColor Cyan
Write-Host ""

# Set Node.js path
$env:PATH = "C:\Program Files\nodejs;$env:PATH"

# Install production dependencies
Write-Host "📦 Installing production dependencies..." -ForegroundColor Yellow
npm install bcrypt pdf-parse mammoth xlsx

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Production dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install production dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install dev dependencies
Write-Host "📦 Installing dev dependencies..." -ForegroundColor Yellow
npm install --save-dev @types/bcrypt

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dev dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install dev dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 All dependencies installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Run tests: npm test" -ForegroundColor White
Write-Host "2. Start server: npm start" -ForegroundColor White
Write-Host "3. Clean up unused: .\cleanup-dependencies.ps1" -ForegroundColor White
