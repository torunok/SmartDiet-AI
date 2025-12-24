#!/usr/bin/env bash

# SmartDiet.AI - Installation Verification
# Перевірка що всього встановлено правильно

set -e  # Exit on error

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║         SmartDiet.AI - Installation Verification         ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

success() { echo -e "${GREEN}✅ $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; }
info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
warn() { echo -e "${YELLOW}⚠️  $1${NC}"; }

# Check 1: Node.js
echo ""
echo "1️⃣  Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    success "Node.js $NODE_VERSION installed"
else
    error "Node.js not found. Install from https://nodejs.org/"
    exit 1
fi

# Check 2: npm
echo ""
echo "2️⃣  Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    success "npm $NPM_VERSION installed"
else
    error "npm not found"
    exit 1
fi

# Check 3: .env file
echo ""
echo "3️⃣  Checking .env file..."
if [ -f .env ]; then
    success ".env file exists"
    
    # Check for API key
    if grep -q "VITE_GEMINI_API_KEY" .env; then
        success "VITE_GEMINI_API_KEY found in .env"
    else
        error "VITE_GEMINI_API_KEY not found in .env"
    fi
else
    warn ".env file not found. Creating from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        success ".env created from template"
        warn "Please edit .env and add your API keys!"
    else
        error ".env.example not found"
        exit 1
    fi
fi

# Check 4: package.json
echo ""
echo "4️⃣  Checking package.json..."
if [ -f package.json ]; then
    success "package.json found"
else
    error "package.json not found"
    exit 1
fi

# Check 5: node_modules
echo ""
echo "5️⃣  Checking dependencies..."
if [ -d node_modules ]; then
    success "node_modules directory exists"
else
    warn "node_modules not found. Running npm install..."
    npm install
fi

# Check 6: Required files
echo ""
echo "6️⃣  Checking required files..."
REQUIRED_FILES=("index.html" "server.js" ".env" "package.json")
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        success "$file exists"
    else
        error "$file not found"
        exit 1
    fi
done

# Check 7: Security checks
echo ""
echo "7️⃣  Running security checks..."

# Check if API key is in index.html
if grep -q "AIzaSyD8pwLwm8WzTf0RBwItWFWXD0Fngmp11yY" index.html 2>/dev/null; then
    error "DANGER! API key found in index.html"
    exit 1
else
    success "API key NOT hardcoded in index.html"
fi

# Check if API_URL is defined in index.html
if grep -q "const API_URL" index.html; then
    success "API_URL is defined in index.html"
else
    warn "API_URL not found in index.html"
fi

# Check if server.js uses process.env
if grep -q "process.env.VITE_GEMINI_API_KEY" server.js; then
    success "server.js uses environment variables"
else
    warn "server.js doesn't use process.env for API key"
fi

# Check if .env is in .gitignore
echo ""
echo "8️⃣  Checking .gitignore..."
if grep -q ".env" .gitignore 2>/dev/null; then
    success ".env is in .gitignore"
else
    error ".env not in .gitignore - might expose secrets!"
fi

# Final checks
echo ""
echo "9️⃣  Checking ports..."
info "Port 3000 will be used for backend (server.js)"
info "Port 5173 will be used for frontend (Vite)"

# Port availability
if command -v lsof &> /dev/null; then
    if lsof -i :3000 &> /dev/null; then
        warn "Port 3000 is already in use"
        warn "You might need to close existing process or use different port"
    else
        success "Port 3000 is available"
    fi
    
    if lsof -i :5173 &> /dev/null; then
        warn "Port 5173 is already in use"
    else
        success "Port 5173 is available"
    fi
else
    info "lsof not available - skipping port check"
fi

# Summary
echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                    ✅ VERIFICATION PASSED                  ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""
echo "🚀 You're ready to start development!"
echo ""
echo "Next steps:"
echo ""
echo "1️⃣  Make sure .env has correct API keys:"
echo "   nano .env"
echo ""
echo "2️⃣  Start backend (Terminal 1):"
echo "   npm run server"
echo ""
echo "3️⃣  Start frontend (Terminal 2):"
echo "   npm run dev"
echo ""
echo "4️⃣  Open in browser:"
echo "   http://localhost:5173"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Full project overview"
echo "   - SECURITY_SETUP.md - Security & setup guide"
echo "   - QUICK_REFERENCE.md - Quick commands reference"
echo ""
