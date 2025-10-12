#!/bin/bash

# Jasa Web Pekanbaru Deployment Script
# This script helps deploy the static website to Cloudflare

echo "🚀 Jasa Web Pekanbaru Deployment Script"
echo "========================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed successfully"
else
    echo "✅ Dependencies already installed"
fi

# Ask user which deployment method they prefer
echo ""
echo "Choose deployment method:"
echo "1) Cloudflare Pages (Recommended for static sites)"
echo "2) Cloudflare Workers (For serverless functions)"
echo "3) Local development server only"

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "📋 Cloudflare Pages Deployment Instructions:"
        echo "=========================================="
        echo "1. Push your code to a Git repository (GitHub, GitLab, etc.)"
        echo "2. Go to https://dash.cloudflare.com/sign-up"
        echo "3. Navigate to Pages in the left sidebar"
        echo "4. Click 'Create a project'"
        echo "5. Connect your Git repository"
        echo "6. Configure build settings:"
        echo "   - Framework preset: None"
        echo "   - Build command: echo 'No build needed'"
        echo "   - Build output directory: ."
        echo "7. Click 'Save and Deploy'"
        echo ""
        echo "✅ Your _headers and _redirects files will be automatically applied!"
        ;;
    2)
        echo ""
        echo "⚙️  Setting up Cloudflare Workers deployment..."
        
        # Check if user is logged in to Wrangler
        if ! npx wrangler whoami &> /dev/null; then
            echo "🔐 Please login to Cloudflare:"
            npx wrangler login
            if [ $? -ne 0 ]; then
                echo "❌ Failed to login to Cloudflare"
                exit 1
            fi
        fi
        
        echo "🚀 Deploying to Cloudflare Workers..."
        npm run deploy:worker
        
        if [ $? -eq 0 ]; then
            echo "✅ Successfully deployed to Cloudflare Workers!"
            echo ""
            echo "⚠️  Important: The Worker script currently fetches assets from GitHub."
            echo "   Please update the repository URLs in src/index.js to point to your actual repository."
        else
            echo "❌ Failed to deploy to Cloudflare Workers"
            exit 1
        fi
        ;;
    3)
        echo ""
        echo "🌐 Starting local development server..."
        npm run dev
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again and choose 1, 2, or 3."
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment process completed!"