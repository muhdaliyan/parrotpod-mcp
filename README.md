# ParrotPod MCP Server

This is a **Model Context Protocol (MCP)** server that allows AI agents (like Claude Desktop) to fetch and understand the full documentation of ParrotPod.

## Features
- **Resources**: `docs://parrotpod/all` - Provides the entire documentation as a single markdown resource.
- **Tools**: `get_docs` - A tool that AI agents can call to fetch all documentation sections.

## How to use with Claude Desktop (Cloud/Deployed)

In your Claude Desktop configuration file:
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Mac: `~/Library/Application\ Support/Claude/claude_desktop_config.json`

Add this server to the `mcpServers` section (replace with your actual deployed URL):

```json
{
  "mcpServers": {
    "parrotpod-mcp": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/inspector", "https://YOUR-DEPLOYED-URL/sse"]
    }
  }
}
```

## How to use Locally

```json
{
  "mcpServers": {
    "parrotpod-mcp": {
      "command": "node",
      "args": ["d:/ShittyProjects/parrotpod/parrotpod-mcp/index.js"]
    }
  }
}
```

## Development
- Run `npm install` to install dependencies.
- Use `npm start` to run as an SSE (HTTP) server.
