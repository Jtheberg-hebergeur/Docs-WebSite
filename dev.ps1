# Script de developpement simple - Lance et laisse tourner

Write-Host ""
Write-Host ">> Jtheberg Docs - Serveur de Developpement" -ForegroundColor Cyan
Write-Host ""

# Verifier si node_modules et docusaurus sont installes
$needsInstall = $false
if (-not (Test-Path "node_modules")) {
    $needsInstall = $true
} elseif (-not (Test-Path "node_modules/.bin/docusaurus.cmd")) {
    $needsInstall = $true
}

if ($needsInstall) {
    Write-Host "Installation des dependances..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "OK" -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host "ERREUR - Verifiez que Node.js est installe" -ForegroundColor Red
        exit 1
    }
}

Write-Host "Demarrage du serveur..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Le serveur va demarrer sur http://localhost:3000" -ForegroundColor Cyan
Write-Host "Webpack va compiler (20-30 secondes)..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Appuyez sur Ctrl+C pour arreter le serveur" -ForegroundColor Red
Write-Host ""

# Lancer npm start directement (pas en arriere-plan)
npm start
