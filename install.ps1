# Script d'installation rapide des dependances

Write-Host ""
Write-Host ">> Installation des dependances npm..." -ForegroundColor Cyan
Write-Host ""

npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host ">> Installation terminee!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Vous pouvez maintenant lancer:" -ForegroundColor Yellow
    Write-Host "  .\test.ps1" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host ">> Erreur lors de l'installation" -ForegroundColor Red
    Write-Host ""
    Write-Host "Verifiez que Node.js est installe:" -ForegroundColor Yellow
    Write-Host "  node --version" -ForegroundColor White
    Write-Host "  npm --version" -ForegroundColor White
    Write-Host ""
    exit 1
}
