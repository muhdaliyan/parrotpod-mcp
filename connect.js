import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
  InitializeRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

/**
 * STATELESS VERCEL BRIDGE
 * This script runs locally on your laptop. 
 * It forwards Claude's requests to Vercel via standard HTTP POST.
 */

const VERCEL_URL = "https://parrotpod-docs-mcp.vercel.app/mcp";

const server = new Server({
  name: "parrotpod-mcp-bridge",
  version: "1.0.0",
}, {
  capabilities: {
    resources: {},
    tools: {},
  }
});

// Using native cloud-ready fetch (Node 18+)
async function callVercel(method, params, id) {
  try {
    const response = await fetch(VERCEL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", method, params, id }),
    });
    
    if (!response.ok) {
        throw new Error(`Vercel responded with ${response.status}`);
    }
    
    const data = await response.json();
    return data.result;
  } catch (err) {
    throw err;
  }
}

// 1. Handshake
server.setRequestHandler(InitializeRequestSchema, async (request) => {
  return await callVercel("initialize", request.params, request.id);
});

// 2. Tools
server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  return await callVercel("tools/list", request.params, request.id);
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  return await callVercel("tools/call", request.params, request.id);
});

// 3. Resources
server.setRequestHandler(ListResourcesRequestSchema, async (request) => {
  return await callVercel("resources/list", request.params, request.id);
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  return await callVercel("resources/read", request.params, request.id);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  process.exit(1);
});
