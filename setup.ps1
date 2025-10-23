# Quick Setup Script for Unbiased Hindustani.ai

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Unbiased Hindustani.ai - Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "✓ Node.js installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js not found. Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Red
    exit
}

# Install dependencies
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    exit
}

# Check for .env.local file
Write-Host ""
if (Test-Path ".env.local") {
    Write-Host "✓ .env.local file found" -ForegroundColor Green
} else {
    Write-Host "⚠ .env.local file not found!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Creating .env.local template..." -ForegroundColor Yellow
    
    @"
# Google Gemini AI API Key
# Get your free key from: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_api_key_here

# Alternative (both work):
# GOOGLE_AI_API_KEY=your_api_key_here
"@ | Out-File -FilePath ".env.local" -Encoding UTF8
    
    Write-Host "✓ Created .env.local template" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠ IMPORTANT: Please edit .env.local and add your Gemini API key!" -ForegroundColor Red
    Write-Host "   1. Visit: https://aistudio.google.com/app/apikey" -ForegroundColor Cyan
    Write-Host "   2. Create API Key" -ForegroundColor Cyan
    Write-Host "   3. Paste it in .env.local file" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Press Enter when you've added your API key"
}

# Start the development server
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Starting development server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Access your website at:" -ForegroundColor Cyan
Write-Host "  • Homepage: http://localhost:3000" -ForegroundColor White
Write-Host "  • Admin Panel: http://localhost:3000/admin-panel.html" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm run dev
