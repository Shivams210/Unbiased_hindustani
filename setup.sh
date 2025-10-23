#!/bin/bash

# Quick Setup Script for Unbiased Hindustani.ai

echo "========================================"
echo "  Unbiased Hindustani.ai - Setup"
echo "========================================"
echo ""

# Check if Node.js is installed
echo "Checking Node.js installation..."
if command -v node &> /dev/null
then
    NODE_VERSION=$(node --version)
    echo "✓ Node.js installed: $NODE_VERSION"
else
    echo "✗ Node.js not found. Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed successfully!"
else
    echo "✗ Failed to install dependencies"
    exit 1
fi

# Check for .env.local file
echo ""
if [ -f ".env.local" ]; then
    echo "✓ .env.local file found"
else
    echo "⚠ .env.local file not found!"
    echo ""
    echo "Creating .env.local template..."
    
    cat > .env.local << 'EOF'
# Google Gemini AI API Key
# Get your free key from: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_api_key_here

# Alternative (both work):
# GOOGLE_AI_API_KEY=your_api_key_here
EOF
    
    echo "✓ Created .env.local template"
    echo ""
    echo "⚠ IMPORTANT: Please edit .env.local and add your Gemini API key!"
    echo "   1. Visit: https://aistudio.google.com/app/apikey"
    echo "   2. Create API Key"
    echo "   3. Paste it in .env.local file"
    echo ""
    read -p "Press Enter when you've added your API key..."
fi

# Start the development server
echo ""
echo "========================================"
echo "  Setup Complete!"
echo "========================================"
echo ""
echo "Starting development server..."
echo ""
echo "Access your website at:"
echo "  • Homepage: http://localhost:3000"
echo "  • Admin Panel: http://localhost:3000/admin-panel.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
