# Script de test complet - Lance, teste, et nettoie automatiquement
# Utilise npm pour un demarrage ultra-rapide sans Docker

Write-Host ""
Write-Host ">> Jtheberg Docs - Test Rapide" -ForegroundColor Cyan
Write-Host ""

# Verifier si node_modules et docusaurus sont installes
$needsInstall = $false
if (-not (Test-Path "node_modules")) {
    $needsInstall = $true
} elseif (-not (Test-Path "node_modules/.bin/docusaurus.cmd")) {
    $needsInstall = $true
}

if ($needsInstall) {
    Write-Host "[1/3] Installation des dependances..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "      OK" -ForegroundColor Green
    } else {
        Write-Host "      ERREUR - Verifiez que Node.js est installe" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "[1/3] Dependances OK" -ForegroundColor Green
}

# Demarrer le serveur en arriere-plan
Write-Host "[2/3] Demarrage du serveur..." -ForegroundColor Yellow -NoNewline

$job = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    npm start 2>&1
}

# Attendre que le serveur demarre avec indicateur de progression
$serverReady = $false
$attempts = 0
$maxAttempts = 120  # 60 secondes max pour webpack

while (-not $serverReady -and $attempts -lt $maxAttempts) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 1 -UseBasicParsing -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200 -and $response.Content.Length -gt 100) {
            # Verifier que la page est completement chargee
            $serverReady = $true
        }
    } catch {
        # Pas encore pret
    }
    
    if (-not $serverReady) {
        Write-Host "." -ForegroundColor DarkGray -NoNewline
        Start-Sleep -Milliseconds 500
        $attempts++
    }
}

if ($serverReady) {
    Write-Host " OK" -ForegroundColor Green
    Write-Host "[3/3] Ouverture du navigateur..." -ForegroundColor Yellow
    
    # Ouvrir le navigateur automatiquement
    Start-Process "http://localhost:3000" 2>&1 | Out-Null
    
    Write-Host ""
    Write-Host ">> Serveur pret sur http://localhost:3000" -ForegroundColor Green
    Write-Host "   FR: /fr  |  EN: /en  |  Hot Reload: ON" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host ">> Logs en temps reel:" -ForegroundColor Cyan
    Write-Host "---------------------------------------------------" -ForegroundColor DarkGray
    
    # Afficher les logs en temps reel
    $logJob = Start-Job -ScriptBlock {
        param($jobId)
        while ($true) {
            $output = Receive-Job -Id $jobId -ErrorAction SilentlyContinue
            if ($output) {
                $output | ForEach-Object {
                    if ($_ -match "Compiled|success|ready") {
                        Write-Host $_ -ForegroundColor Green
                    } elseif ($_ -match "error|failed|Error") {
                        Write-Host $_ -ForegroundColor Red
                    } elseif ($_ -match "warn") {
                        Write-Host $_ -ForegroundColor Yellow
                    } else {
                        Write-Host $_ -ForegroundColor DarkGray
                    }
                }
            }
            Start-Sleep -Milliseconds 100
        }
    } -ArgumentList $job.Id
    
    Write-Host ""
    Write-Host ">> Appuyez sur une touche pour arreter..." -ForegroundColor Yellow
    
    # Attendre que l'utilisateur appuie sur une touche
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    
    # Arreter le job de logs
    Stop-Job -Job $logJob -ErrorAction SilentlyContinue
    Remove-Job -Job $logJob -Force -ErrorAction SilentlyContinue
    
} else {
    Write-Host " TIMEOUT" -ForegroundColor Red
    Write-Host ""
    Write-Host "Le serveur n'a pas demarre. Verifiez le port 3000." -ForegroundColor Yellow
    
    # Afficher les logs d'erreur
    $errorLogs = Receive-Job -Job $job -ErrorAction SilentlyContinue
    if ($errorLogs) {
        Write-Host ""
        Write-Host "Logs d'erreur:" -ForegroundColor Red
        $errorLogs | ForEach-Object { Write-Host $_ -ForegroundColor DarkRed }
    }
}

# Arreter le serveur
Write-Host ""
Write-Host ">> Nettoyage..." -ForegroundColor Yellow -NoNewline

Stop-Job -Job $job -ErrorAction SilentlyContinue 2>&1 | Out-Null
Remove-Job -Job $job -Force -ErrorAction SilentlyContinue 2>&1 | Out-Null

# Tuer tous les processus Node.js qui pourraient rester
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue 2>&1 | Out-Null

Start-Sleep -Milliseconds 500

Write-Host " OK" -ForegroundColor Green
Write-Host ""
Write-Host ">> Serveur arrete. Port 3000 libre." -ForegroundColor Green
Write-Host ""
