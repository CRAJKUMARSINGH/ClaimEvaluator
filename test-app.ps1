# Test script for ClaimEvaluator app
Write-Host "=== ClaimEvaluator Test Run ===" -ForegroundColor Cyan
Write-Host ""

# Test 1: Health Check
Write-Host "Test 1: Health Check API" -ForegroundColor Yellow
try {
    $health = Invoke-WebRequest -Uri "http://localhost:5003/api/health" -UseBasicParsing
    Write-Host "Status: $($health.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($health.Content)" -ForegroundColor Green
} catch {
    Write-Host "Failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test 2: Frontend HTML
Write-Host "Test 2: Frontend HTML" -ForegroundColor Yellow
try {
    $frontend = Invoke-WebRequest -Uri "http://localhost:5003" -UseBasicParsing
    Write-Host "Status: $($frontend.StatusCode)" -ForegroundColor Green
    Write-Host "Content Length: $($frontend.Content.Length) bytes" -ForegroundColor Green
} catch {
    Write-Host "Failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test 3: JavaScript Assets
Write-Host "Test 3: JavaScript Assets" -ForegroundColor Yellow
try {
    $js = Invoke-WebRequest -Uri "http://localhost:5003/assets/index-DpWwdqpH.js" -UseBasicParsing
    Write-Host "Status: $($js.StatusCode)" -ForegroundColor Green
    Write-Host "JS Bundle Size: $($js.Content.Length) bytes" -ForegroundColor Green
} catch {
    Write-Host "Failed: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "=== Test Complete ===" -ForegroundColor Cyan
Write-Host "Server: http://localhost:5003" -ForegroundColor Green
