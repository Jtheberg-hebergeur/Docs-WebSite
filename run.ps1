# Script pour lancer le conteneur Docker
Write-Host "Lancement du conteneur Docker..." -ForegroundColor Cyan

# Arreter et supprimer le conteneur existant s'il existe
docker stop jtheberg-docs 2>$null
docker rm jtheberg-docs 2>$null

# Lancer le nouveau conteneur avec volume pour les docs
docker run -d `
  --name jtheberg-docs `
  -p 80:80 `
  -v "${PWD}/docs:/docs" `
  jtheberg-docs:latest

if ($LASTEXITCODE -eq 0) {
    Write-Host "Conteneur lance avec succes!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Votre documentation est accessible sur:" -ForegroundColor Yellow
    Write-Host "  http://localhost" -ForegroundColor White
    Write-Host "  http://localhost/fr (Francais)" -ForegroundColor White
    Write-Host "  http://localhost/en (English)" -ForegroundColor White
    Write-Host ""
    Write-Host "Les dossiers suivants sont montes en volume:" -ForegroundColor Cyan
    Write-Host "  - docs/ (documentation)" -ForegroundColor White
    Write-Host ""
    Write-Host "Modifiez vos fichiers .md et relancez le conteneur pour voir les changements" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Pour arreter:" -ForegroundColor Yellow
    Write-Host "  docker stop jtheberg-docs" -ForegroundColor White
} else {
    Write-Host "Erreur lors du lancement du conteneur" -ForegroundColor Red
    exit 1
}
