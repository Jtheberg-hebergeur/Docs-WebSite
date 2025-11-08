# Script de test PRODUCTION - Build, teste, et nettoie automatiquement
# Simule l'environnement de production sans Docker

Write-Host ""
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  JTHEBERG DOCS - TEST PRODUCTION" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

# Verifier si node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "Installation des dependances..." -ForegroundColor Yellow
    Write-Host "Cela peut prendre 1-2 minutes..." -ForegroundColor Yellow
    Write-Host ""
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "Dependances installees!" -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "Erreur lors de l'installation des dependances" -ForegroundColor Red
        Write-Host "Verifiez que Node.js est installe" -ForegroundColor Yellow
        exit 1
    }
}

# Build la documentation
Write-Host "Compilation de la documentation..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Cela peut prendre 2-3 minutes..." -ForegroundColor Yellow
Write-Host ""

$buildOutput = npm run build 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build reussi!" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Red
    Write-Host "  ERREUR LORS DU BUILD" -ForegroundColor Red
    Write-Host "========================================================" -ForegroundColor Red
    Write-Host ""
    Write-Host $buildOutput
    Write-Host ""
    Write-Host "Corrigez les erreurs et relancez le script." -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

# Demarrer le serveur de production en arriere-plan
Write-Host "Demarrage du serveur de production..." -ForegroundColor Cyan
Write-Host ""

$job = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    npm run serve 2>&1 | Out-Null
}

# Attendre que le serveur demarre
Write-Host "Attente du demarrage du serveur..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Verifier si le serveur est demarre
$serverReady = $false
$attempts = 0
$maxAttempts = 15

while (-not $serverReady -and $attempts -lt $maxAttempts) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 2 -UseBasicParsing -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            $serverReady = $true
        }
    } catch {
        Start-Sleep -Seconds 1
        $attempts++
    }
}

if ($serverReady) {
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Green
    Write-Host "  SERVEUR PRODUCTION DEMARRE!" -ForegroundColor Green
    Write-Host "========================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Version PRODUCTION accessible sur:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "   http://localhost:3000" -ForegroundColor White -BackgroundColor Blue
    Write-Host ""
    Write-Host "   Francais : http://localhost:3000/fr" -ForegroundColor Gray
    Write-Host "   English  : http://localhost:3000/en" -ForegroundColor Gray
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "INFORMATIONS:" -ForegroundColor Yellow
    Write-Host "   Version de PRODUCTION (build optimise)" -ForegroundColor White
    Write-Host "   Pas de hot reload - rechargez manuellement" -ForegroundColor White
    Write-Host "   Testez comme si c'etait en production" -ForegroundColor White
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host ""
    
    # Ouvrir le navigateur automatiquement
    Start-Process "http://localhost:3000"
    
    Write-Host "TESTEZ LA VERSION PRODUCTION" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Verifiez que tout fonctionne correctement..." -ForegroundColor White
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Red
    Write-Host "  APPUYEZ SUR UNE TOUCHE POUR ARRETER" -ForegroundColor Red
    Write-Host "========================================================" -ForegroundColor Red
    Write-Host ""
    
    # Attendre que l'utilisateur appuie sur une touche
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    
} else {
    Write-Host ""
    Write-Host "Le serveur n'a pas pu demarrer" -ForegroundColor Red
    Write-Host ""
}

# Arreter le serveur
Write-Host ""
Write-Host "========================================================" -ForegroundColor Yellow
Write-Host "  NETTOYAGE EN COURS..." -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Yellow
Write-Host ""

Write-Host "Arret du serveur..." -ForegroundColor Cyan
Stop-Job -Job $job -ErrorAction SilentlyContinue
Remove-Job -Job $job -Force -ErrorAction SilentlyContinue

Write-Host "Nettoyage des processus..." -ForegroundColor Cyan
Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*$PWD*" } | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host "Suppression du dossier build..." -ForegroundColor Cyan
if (Test-Path "build") {
    Remove-Item -Path "build" -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "Nettoyage du cache..." -ForegroundColor Cyan
if (Test-Path ".docusaurus") {
    Remove-Item -Path ".docusaurus" -Recurse -Force -ErrorAction SilentlyContinue
}

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "========================================================" -ForegroundColor Green
Write-Host "  NETTOYAGE TERMINE!" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
Write-Host ""
Write-Host "RESUME:" -ForegroundColor Cyan
Write-Host "   Serveur arrete" -ForegroundColor White
Write-Host "   Processus nettoyes" -ForegroundColor White
Write-Host "   Dossier build supprime" -ForegroundColor White
Write-Host "   Cache nettoye" -ForegroundColor White
Write-Host "   Port 3000 libere" -ForegroundColor White
Write-Host ""
Write-Host "Prochaines etapes:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   Test rapide (dev):" -ForegroundColor Cyan
Write-Host "      .\test.ps1" -ForegroundColor White
Write-Host ""
Write-Host "   Test production:" -ForegroundColor Cyan
Write-Host "      .\test-prod.ps1" -ForegroundColor White
Write-Host ""
Write-Host "   Build Docker:" -ForegroundColor Cyan
Write-Host "      .\build.ps1" -ForegroundColor White
Write-Host ""
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""
