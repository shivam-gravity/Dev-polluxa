# Strapi Backend Startup Script
# Run this from PowerShell: .\start-backend.ps1

$fnm = "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\Schniz.fnm_Microsoft.Winget.Source_8wekyb3d8bbwe\fnm.exe"

if (-not (Test-Path $fnm)) {
    Write-Error "fnm not found. Install it with: winget install Schniz.fnm"
    exit 1
}

# Activate Node 20
$envOutput = & $fnm env --shell "power-shell" 2>&1
$envOutput | ForEach-Object {
    if ($_ -match '\$env:(\w+)\s*=\s*"([^"]*)"') {
        [System.Environment]::SetEnvironmentVariable($matches[1], $matches[2], "Process")
    }
}
& $fnm use 20 2>&1 | Out-Null

Write-Host "Node: $(node --version)  |  npm: $(npm --version)" -ForegroundColor Cyan
Write-Host "Starting Strapi backend on http://localhost:1337 ..." -ForegroundColor Green
Write-Host "Admin panel: http://localhost:1337/admin" -ForegroundColor Yellow
Write-Host ""

Set-Location $PSScriptRoot
npm run develop
