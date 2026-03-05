# Convert HTML Report to PDF
Write-Host "Converting Test Report to PDF..." -ForegroundColor Cyan
Write-Host ""

$htmlFile = "TEST_REPORT_DETAILED.html"
$pdfFile = "TEST_REPORT_DETAILED.pdf"

if (Test-Path $htmlFile) {
    Write-Host "Found HTML report: $htmlFile" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "Opening in browser..." -ForegroundColor Yellow
    Start-Process $htmlFile
    
    Write-Host ""
    Write-Host "To save as PDF:" -ForegroundColor Cyan
    Write-Host "   1. Press Ctrl+P in your browser" -ForegroundColor White
    Write-Host "   2. Select Save as PDF" -ForegroundColor White
    Write-Host "   3. Save as: $pdfFile" -ForegroundColor White
    Write-Host ""
    Write-Host "Tip: Use Chrome or Edge for best results" -ForegroundColor Yellow
    Write-Host ""
    
} else {
    Write-Host "HTML report not found!" -ForegroundColor Red
    Write-Host "Run: node generate-pdf-report.cjs first" -ForegroundColor Yellow
}
