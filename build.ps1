# Script de build de l'image Docker
Write-Host "🐳 Construction de l'image Docker..." -ForegroundColor Cyan

docker build -t jtheberg-docs:latest .

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Image construite avec succès!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Pour lancer le conteneur, utilisez:" -ForegroundColor Yellow
    Write-Host "  .\run.ps1" -ForegroundColor White
} else {
    Write-Host "❌ Erreur lors de la construction de l'image" -ForegroundColor Red
    exit 1
}
