# PowerShell Script to Clean Up Duplicate Frontend Files
# This script removes duplicate files that are NOT used by Vite
# Vite only reads from the src/ folder

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Frontend Cleanup Script" -ForegroundColor Cyan
Write-Host "Removing duplicate files outside src/" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Confirm before proceeding
$confirm = Read-Host "This will delete duplicate folders outside src/. Continue? (yes/no)"
if ($confirm -ne "yes") {
    Write-Host "Cleanup cancelled." -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "Starting cleanup..." -ForegroundColor Green
Write-Host ""

# List of root-level folders to delete (duplicates of src/)
$foldersToDelete = @(
    "pages",
    "components",
    "services",
    "routes",
    "contexts",
    "hooks",
    "features",
    "layouts",
    "lib",
    "store",
    "types",
    "utils",
    "data",
    "i18n"
)

# Delete root-level duplicate folders
foreach ($folder in $foldersToDelete) {
    if (Test-Path $folder) {
        Write-Host "Deleting root-level folder: $folder" -ForegroundColor Yellow
        Remove-Item -Recurse -Force $folder -ErrorAction SilentlyContinue
        if (Test-Path $folder) {
            Write-Host "  ⚠️  Warning: Could not fully delete $folder" -ForegroundColor Red
        } else {
            Write-Host "  ✅ Deleted: $folder" -ForegroundColor Green
        }
    } else {
        Write-Host "  ℹ️  Folder not found: $folder (already deleted or never existed)" -ForegroundColor Gray
    }
}

# Delete nested src/src folder (definitely wrong)
if (Test-Path "src\src") {
    Write-Host ""
    Write-Host "Deleting nested src/src folder (this is definitely wrong)..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "src\src" -ErrorAction SilentlyContinue
    if (Test-Path "src\src") {
        Write-Host "  ⚠️  Warning: Could not fully delete src/src" -ForegroundColor Red
    } else {
        Write-Host "  ✅ Deleted: src/src" -ForegroundColor Green
    }
}

# Delete root-level App files (check if they're duplicates)
# Note: We'll keep them for now and let user verify manually
Write-Host ""
Write-Host "Root-level App files found:" -ForegroundColor Yellow
if (Test-Path "App.jsx") { Write-Host "  - App.jsx (check if src/App.jsx is the one being used)" -ForegroundColor Gray }
if (Test-Path "AppAdmin.jsx") { Write-Host "  - AppAdmin.jsx (check if src/AppAdmin.jsx is the one being used)" -ForegroundColor Gray }
if (Test-Path "AppClient.jsx") { Write-Host "  - AppClient.jsx (check if src/AppClient.jsx is the one being used)" -ForegroundColor Gray }
if (Test-Path "main.jsx") { Write-Host "  - main.jsx (Vite uses src/main.jsx, this is likely unused)" -ForegroundColor Gray }

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Cleanup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Verify that src/main.jsx imports from src/App.jsx" -ForegroundColor White
Write-Host "2. Run 'npm run dev' to test if everything still works" -ForegroundColor White
Write-Host "3. Check browser console for any import errors" -ForegroundColor White
Write-Host "4. If everything works, you can manually delete root-level App*.jsx and main.jsx files" -ForegroundColor White
Write-Host ""

