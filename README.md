# ParrotPod MCP Documentation Server 🦜🔗

High-performance MCP server that provides 100% of the ParrotPod documentation to AI agents (like Claude Desktop and Cursor).

## 🚀 Public Installation (Use anywhere)
Others can connect to your documentation instantly by adding this to their `claude_desktop_config.json`:

```json
"mcpServers": {
  "parrotpod-mcp": {
    "command": "npx",
    "args": ["-y", "github:your-username/parrotpod-mcp"]
  }
}
```

## 🛠️ Local Development (Your Setup)
For your local development, keep using the direct node path:
```json
"mcpServers": {
  "parrotpod-mcp": {
    "command": "node",
    "args": ["d:/ShittyProjects/parrotpod/parrotpod-mcp/connect.js"]
  }
}
```

## 📖 Available Tools
- `get_docs`: Fetches the entire ParrotPod knowledge base.
- `search_docs`: Performs a keyword search across all documentation sections (Setup, Telephony, Keys, etc.).

## ☁️ Deployment
This server is optimized for **Vercel**. 
1. Run `vercel --prod` to deploy.
2. The server is stateless, ensuring 100% stability on serverless architecture.
