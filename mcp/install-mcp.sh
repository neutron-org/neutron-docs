#!/bin/bash

# Neutron Docs MCP Server Installation Script

echo "🚀 Installing Neutron Docs MCP Server..."

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is required but not installed. Please install Node.js and npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Make server executable
echo "🔧 Making server executable..."
chmod +x mcp-server.js

# Test the server
echo "🧪 Testing server..."
timeout 2s node mcp-server.js 2>&1 | head -1

echo "✅ Neutron Docs MCP Server installed successfully!"
echo ""
echo "📋 Usage:"
echo "  Direct: node mcp-server.js"
echo "  With MCP client: Add to your MCP configuration"
echo ""
echo "📖 See mcp-server-README.md for detailed setup instructions"
echo ""
echo "🔍 Available tool: search"
echo "  - Search across comprehensive Neutron documentation"
echo "  - Supports section filtering (developers, operators, resources, etc.)"
echo "  - Intelligent relevance scoring"
echo ""
echo "Example configuration for Claude Desktop:"
echo '{'
echo '  "mcpServers": {'
echo '    "neutron-docs": {'
echo '      "command": "node",'
echo '      "args": ["'$(pwd)'/mcp-server.js"],'
echo '      "cwd": "'$(dirname $(pwd))'"'
echo '    }'
echo '  }'
echo '}' 