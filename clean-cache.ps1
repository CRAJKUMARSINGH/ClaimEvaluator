#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Clean all caches and temporary files from ClaimEvaluator project
.DESCRIPTION
    Removes node_modules, dist, build outputs, and all cache files
#>

Write-Host "🧹 ClaimEvaluator Cache Cleanup" -ForegroundColor Cyan
Write-Host "=" * 60

$totalSize = 0
$removed = @()

# ============================================================================
# 1. NODE MODULES
# ============================================================================

Write-Host "`n📦 Cleaning node_modules..." -ForegroundColor Yellow

if (Test-Path "node_modules") {
    $size = (Get-ChildItem -Path "node_modules" -Recurse -File | Measure-Object -Property Length -Sum).Sum
    $sizeMB = [math]::Round($size / 1MB, 2)
    Write-Host "  ❌ Removing node_modules ($sizeMB MB)" -ForegroundColor Red
    Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
    $totalSize += $size
    $removed += "node_modules"
} else {
    Write-Host "  ✓ node_modules not found" -ForegroundColor Gray
}

# ============================================================================
# 2. BUILD OUTPUTS
# ============================================================================

Write-Host "`n🏗️  Cleaning build outputs..." -ForegroundColor Yellow

$buildDirs = @("dist", ".vite", ".turbo", "build", "out")

foreach ($dir in $buildDirs) {
    if (Test-Path $dir) {
        $size = (Get-ChildItem -Path $dir -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
        $sizeMB = [math]::Round($size / 1MB, 2)
        Write-Host "  ❌ Removing $dir ($sizeMB MB)" -ForegroundColor Red
        Remove-Item -Path $dir -Recurse -Force -ErrorAction SilentlyContinue
        $totalSize += $size
        $removed += $dir
    }
}

# ============================================================================
# 3. CACHE DIRECTORIES
# ============================================================================

Write-Host "`n💾 Cleaning cache directories..." -ForegroundColor Yellow

$cacheDirs = @(
    ".cache",
    ".parcel-cache",
    ".next",
    ".nuxt",
    ".output",
    ".vercel",
    ".netlify"
)

foreach ($dir in $cacheDirs) {
    if (Test-Path $dir) {
        $size = (Get-ChildItem -Path $dir -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
        $sizeMB = [math]::Round($size / 1MB, 2)
        Write-Host "  ❌ Removing $dir ($sizeMB MB)" -ForegroundColor Red
        Remove-Item -Path $dir -Recurse -Force -ErrorAction SilentlyContinue
        $totalSize += $size
        $removed += $dir
    }
}

# ============================================================================
# 4. LOCK FILES (optional - uncomment to remove)
# ============================================================================

Write-Host "`n🔒 Checking lock files..." -ForegroundColor Yellow

$lockFiles = @(
    # "package-lock.json",
    # "yarn.lock",
    # "pnpm-lock.yaml"
)

Write-Host "  ℹ️  Lock files preserved (recommended)" -ForegroundColor Gray
Write-Host "     Uncomment in script to remove if needed" -ForegroundColor DarkGray

# ============================================================================
# 5. TEMPORARY FILES
# ============================================================================

Write-Host "`n🗑️  Cleaning temporary files..." -ForegroundColor Yellow

$tempFiles = @(
    "*.log",
    "*.tmp",
    "*.temp",
    ".DS_Store",
    "Thumbs.db",
    "desktop.ini"
)

foreach ($pattern in $tempFiles) {
    $files = Get-ChildItem -Path . -Filter $pattern -Recurse -File -ErrorAction SilentlyContinue
    foreach ($file in $files) {
        $size = $file.Length
        Write-Host "  ❌ Removing $($file.Name)" -ForegroundColor Red
        Remove-Item -Path $file.FullName -Force -ErrorAction SilentlyContinue
        $totalSize += $size
        $removed += $file.Name
    }
}

# ============================================================================
# 6. TYPESCRIPT CACHE
# ============================================================================

Write-Host "`n📘 Cleaning TypeScript cache..." -ForegroundColor Yellow

$tsCacheDirs = @("*.tsbuildinfo", ".tsbuildinfo")

foreach ($pattern in $tsCacheDirs) {
    $files = Get-ChildItem -Path . -Filter $pattern -Recurse -File -ErrorAction SilentlyContinue
    foreach ($file in $files) {
        Write-Host "  ❌ Removing $($file.Name)" -ForegroundColor Red
        Remove-Item -Path $file.FullName -Force -ErrorAction SilentlyContinue
        $removed += $file.Name
    }
}

# ============================================================================
# 7. UPLOADS DIRECTORY (optional)
# ============================================================================

Write-Host "`n📎 Checking uploads directory..." -ForegroundColor Yellow

if (Test-Path "uploads") {
    $fileCount = (Get-ChildItem -Path "uploads" -File -Recurse -ErrorAction SilentlyContinue).Count
    if ($fileCount -gt 0) {
        Write-Host "  ⚠️  uploads/ contains $fileCount files" -ForegroundColor Yellow
        Write-Host "     Run manually: Remove-Item uploads/* -Recurse -Force" -ForegroundColor DarkGray
    } else {
        Write-Host "  ✓ uploads/ is empty" -ForegroundColor Gray
    }
} else {
    Write-Host "  ✓ uploads/ not found" -ForegroundColor Gray
}

# ============================================================================
# 8. NPM CACHE (global)
# ============================================================================

Write-Host "`n🌐 Cleaning npm cache (global)..." -ForegroundColor Yellow

try {
    $npmPath = "C:\Program Files\nodejs\npm.cmd"
    if (Test-Path $npmPath) {
        Write-Host "  🔄 Running npm cache clean..." -ForegroundColor Cyan
        & $npmPath cache clean --force 2>&1 | Out-Null
        Write-Host "  ✅ npm cache cleaned" -ForegroundColor Green
    } else {
        Write-Host "  ℹ️  npm not found at expected path" -ForegroundColor Gray
    }
} catch {
    Write-Host "  ⚠️  Could not clean npm cache: $($_.Exception.Message)" -ForegroundColor Yellow
}

# ============================================================================
# SUMMARY
# ============================================================================

Write-Host "`n" + ("=" * 60) -ForegroundColor Cyan
Write-Host "📊 CACHE CLEANUP SUMMARY" -ForegroundColor Cyan
Write-Host ("=" * 60) -ForegroundColor Cyan

$totalSizeMB = [math]::Round($totalSize / 1MB, 2)
$totalSizeGB = [math]::Round($totalSize / 1GB, 2)

Write-Host "`n✅ Cleanup Complete!" -ForegroundColor Green
Write-Host "   Items removed: $($removed.Count)" -ForegroundColor White
Write-Host "   Space freed: $totalSizeMB MB ($totalSizeGB GB)" -ForegroundColor White

if ($removed.Count -gt 0) {
    Write-Host "`n📋 Removed items:" -ForegroundColor Yellow
    $removed | Select-Object -Unique | ForEach-Object { 
        Write-Host "   - $_" -ForegroundColor DarkGray 
    }
}

Write-Host "`n💡 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Run: npm install" -ForegroundColor White
Write-Host "   2. Run: npm run build" -ForegroundColor White
Write-Host "   3. Run: npm start" -ForegroundColor White

Write-Host "`n✨ Cache cleanup complete!" -ForegroundColor Green
Write-Host ""
