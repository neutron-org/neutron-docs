# Neutron Docs MCP Server

A Model Context Protocol (MCP) server that provides intelligent search capabilities across the Neutron blockchain documentation.

## Overview

This MCP server enables AI assistants to search through Neutron's comprehensive documentation, including:
- Developer guides and tutorials
- Module references and APIs
- Operator documentation
- Network resources and contracts
- Concepts and DeFi information

## Features

- **Intelligent Search**: Advanced text matching with relevance scoring
- **Section-Specific Search**: Filter results by documentation sections
- **Context-Aware Results**: Provides relevant content snippets with line numbers
- **Title and Content Matching**: Searches both document titles and content
- **Configurable Results**: Control the number of results returned

## Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Make the Server Executable**:
   ```bash
   chmod +x mcp-server.js
   ```

## Usage

### Direct Usage

Run the server directly:
```bash
node mcp-server.js
```

### With MCP Client

Add to your MCP client configuration:
```json
{
  "mcpServers": {
    "neutron-docs": {
      "command": "node",
      "args": ["mcp-server.js"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### Example Usage with Claude Desktop

Add to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "neutron-docs": {
      "command": "node",
      "args": ["/path/to/neutron-docs/mcp-server.js"],
      "cwd": "/path/to/neutron-docs"
    }
  }
}
```

## Available Tools

### search

Search across the Neutron Documentation to fetch relevant context.

**Parameters:**
- `query` (required): The search query string
- `section` (optional): Limit search to specific sections
  - Options: `developers`, `operators`, `resources`, `concepts`, `defi`, `all`
  - Default: `all`
- `max_results` (optional): Maximum number of results to return
  - Default: 10

**Example:**
```json
{
  "name": "search",
  "arguments": {
    "query": "interchain transactions",
    "section": "developers",
    "max_results": 5
  }
}
```

## Search Capabilities

### Section Coverage

- **Developers**: Guides, tutorials, modules, APIs
- **Operators**: Node operations, validation, relayers
- **Resources**: Network info, contracts, upgrades
- **Concepts**: Core blockchain concepts
- **DeFi**: DeFi protocols and applications
- **Quickstart**: Getting started guides
- **Snippets**: Code examples and templates

### Relevance Scoring

The server uses an intelligent scoring system that considers:
- Title matches (highest priority)
- Number of matching search terms
- Frequency of matches in content
- Exact phrase matches
- Section preferences (developers section gets slight boost)

### Content Extraction

Results include:
- Document title and file path
- Section classification
- Relevance score
- Matching line numbers
- Content preview with context

## Example Queries

- `"How to register interchain account"`
- `"IBC callbacks sudo handlers"`
- `"Neutron fee structure"`
- `"Running a validator node"`
- `"CosmWasm smart contracts"`

## Development

### Project Structure

```
neutron-docs/
├── mcp-server.js           # Main MCP server implementation
├── mcp-server-config.json  # Server configuration
├── package.json            # Dependencies and scripts
├── developers/             # Developer documentation
├── operators/              # Operator guides
├── resources/              # Network resources
├── concepts/               # Core concepts
└── defi/                   # DeFi documentation
```

### Running in Development

```bash
npm run mcp-server
```

### Debugging

The server outputs debug information to stderr, which won't interfere with the MCP protocol communication on stdout.

## Troubleshooting

### Common Issues

1. **Module not found errors**: Ensure all dependencies are installed with `npm install`
2. **Permission denied**: Make sure the server script is executable: `chmod +x mcp-server.js`
3. **No results**: Try broader search terms or different sections
4. **Configuration issues**: Verify the path to the server script in your MCP client config

### Logs

The server logs errors to stderr for debugging without interfering with MCP communication.

## License

MIT License - see the main project LICENSE file for details. 