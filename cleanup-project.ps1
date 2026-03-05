#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Cleanup redundant files and folders from ClaimEvaluator project
.DESCRIPTION
    Removes duplicate documentation, old test files, and unused folders
#>

Write-Host "🧹 ClaimEvaluator Project Cleanup" -ForegroundColor Cyan
Write-Host "=" * 60

# Track what we're doing
$removed = @()
$kept = @()

# ============================================================================
# 1. REMOVE REDUNDANT FOLDERS
# ============================================================================

Write-Host "`n📁 Removing redundant folders..." -ForegroundColor Yellow

$foldersToRemove = @(
    "ClaimEvaluator-v3-Refactored",  # Old refactored version (duplicate)
    "PWD-Tools-Genspark"              # Empty folder
)

foreach ($folder in $foldersToRemove) {
    if (Test-Path $folder) {
        Write-Host "  ❌ Removing: $folder" -ForegroundColor Red
        Remove-Item -Path $folder -Recurse -Force
        $removed += $folder
    }
}

# ============================================================================
# 2. CONSOLIDATE DOCUMENTATION - Remove Duplicates
# ============================================================================

Write-Host "`n📄 Removing duplicate/redundant documentation..." -ForegroundColor Yellow

$docsToRemove = @(
    # Phase summaries (consolidated into docs/)
    "PHASE1_SUMMARY.md",
    "PHASE1_COMPLETION_REPORT.md",
    "PHASE2_SUMMARY.md",
    "PHASE2_COMPLETION_REPORT.md",
    "PHASE3_SUMMARY.md",
    "PHASE3_COMPLETION_REPORT.md",
    "PHASE2_CHECKLIST.md",
    
    # Execution summaries (consolidated)
    "EXECUTION_SUMMARY.md",
    "MANUAL_EXECUTION_GUIDE.md",
    "QUICK_START.md",
    
    # Transformation docs (consolidated into FEATURES.md)
    "TRANSFORMATION_COMPLETE.md",
    "REFACTORING_COMPLETE.md",
    "V3_COMPARISON_AND_MIGRATION_GUIDE.md",
    
    # Enhancement docs (consolidated)
    "ENHANCEMENT_ROADMAP.md",
    "FEATURES_IMPLEMENTED.md",
    "INTEGRATION_GUIDE.md",
    "IMPLEMENTATION_PLAN.md",
    
    # ClaimMaster docs (consolidated into docs/)
    "CLAIMMASTER_ENHANCEMENT_PHASE1.md",
    "CLAIMMASTER_PHASE1_COMPLETE.md",
    
    # Test reports (old, superseded by CLAIMMASTER_TEST_REPORT.md)
    "TEST_RESULTS.md",
    "TEST_REPORT.md",
    
    # Git summaries (temporary)
    "GIT_PUSH_SUMMARY.md",
    "GITHUB_REACH_MAXIMUM.md",
    
    # Final summaries (consolidated)
    "FINAL_SUMMARY.md",
    
    # PDF guides (consolidated into docs/)
    "PDF_REPORT_GUIDE.md",
    "VIEW_PDF_REPORT.md",
    
    # Dependency guides (consolidated)
    "DEPENDENCY_CLEANUP_GUIDE.md"
)

foreach ($doc in $docsToRemove) {
    if (Test-Path $doc) {
        Write-Host "  ❌ Removing: $doc" -ForegroundColor Red
        Remove-Item -Path $doc -Force
        $removed += $doc
    }
}

# ============================================================================
# 3. REMOVE DUPLICATE TEST FILES
# ============================================================================

Write-Host "`n🧪 Removing duplicate test files..." -ForegroundColor Yellow

$testFilesToRemove = @(
    "run-tests.js",           # Duplicate of run-tests.cjs
    "test-suite.ts"           # Old test suite
)

foreach ($test in $testFilesToRemove) {
    if (Test-Path $test) {
        Write-Host "  ❌ Removing: $test" -ForegroundColor Red
        Remove-Item -Path $test -Force
        $removed += $test
    }
}

# ============================================================================
# 4. REMOVE OLD SCRIPTS
# ============================================================================

Write-Host "`n📜 Removing old/redundant scripts..." -ForegroundColor Yellow

$scriptsToRemove = @(
    "test-app.ps1",           # Old test script
    "convert-to-pdf.ps1",     # Superseded by generate-pdf-report.cjs
    "deploy-check.js"         # Old deployment check
)

foreach ($script in $scriptsToRemove) {
    if (Test-Path $script) {
        Write-Host "  ❌ Removing: $script" -ForegroundColor Red
        Remove-Item -Path $script -Force
        $removed += $script
    }
}

# ============================================================================
# 5. REMOVE OLD HTML REPORTS
# ============================================================================

Write-Host "`n📊 Removing old HTML reports..." -ForegroundColor Yellow

$reportsToRemove = @(
    "TEST_REPORT_DETAILED.html"  # Old test report
)

foreach ($report in $reportsToRemove) {
    if (Test-Path $report) {
        Write-Host "  ❌ Removing: $report" -ForegroundColor Red
        Remove-Item -Path $report -Force
        $removed += $report
    }
}

# ============================================================================
# 6. KEEP ESSENTIAL FILES
# ============================================================================

Write-Host "`n✅ Keeping essential files..." -ForegroundColor Green

$essentialFiles = @(
    # Core config
    "package.json",
    "package-lock.json",
    "tsconfig.json",
    "vite.config.ts",
    "tailwind.config.ts",
    "postcss.config.js",
    "drizzle.config.ts",
    "vercel.json",
    "components.json",
    
    # Environment
    ".env",
    ".env.example",
    ".gitignore",
    
    # Documentation (consolidated)
    "README.md",
    "LICENSE",
    "DEPLOYMENT_GUIDE.md",
    "CLAIMMASTER_TEST_REPORT.md",
    
    # Scripts (essential)
    "install-dependencies.ps1",
    "cleanup-dependencies.ps1",
    "generate-pdf-report.cjs",
    
    # Tests (current)
    "run-tests.cjs",
    "test-helpers-constants.cjs",
    
    # Entry points
    "index.html"
)

foreach ($file in $essentialFiles) {
    if (Test-Path $file) {
        $kept += $file
    }
}

# ============================================================================
# SUMMARY
# ============================================================================

Write-Host "`n" + ("=" * 60) -ForegroundColor Cyan
Write-Host "📊 CLEANUP SUMMARY" -ForegroundColor Cyan
Write-Host ("=" * 60) -ForegroundColor Cyan

Write-Host "`n❌ Removed: $($removed.Count) items" -ForegroundColor Red
if ($removed.Count -gt 0) {
    $removed | ForEach-Object { Write-Host "   - $_" -ForegroundColor DarkGray }
}

Write-Host "`n✅ Kept: $($kept.Count) essential files" -ForegroundColor Green

Write-Host "`n📁 Project structure cleaned!" -ForegroundColor Green
Write-Host "   - Removed duplicate documentation" -ForegroundColor White
Write-Host "   - Removed old test files" -ForegroundColor White
Write-Host "   - Removed redundant folders" -ForegroundColor White
Write-Host "   - Kept all essential files" -ForegroundColor White

Write-Host "`n✨ Cleanup complete! Your project is now organized." -ForegroundColor Cyan
Write-Host ""
