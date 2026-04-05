import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

/**
 * BRIDGING CLAUDE (STDIO) TO VERCEL (SSE)
 */

const VERCEL_URL = "https://parrotpod-docs-mcp.vercel.app/sse";

async function bridge() {
  console.error("Initiating bridge to Vercel...");
  
  // 1. Setup Stdio for Claude
  const stdioTransport = new StdioServerTransport();
  
  // 2. Setup SSE for Vercel
  const sseTransport = new SSEClientTransport(new URL(VERCEL_URL));
  
  // 3. Create a client that talks to Vercel
  const client = new Client({ name: "bridge-client", version: "1.0.0" }, { capabilities: {} });
  await client.connect(sseTransport);

  // 4. Create a server that Claude talks to 
  const server = new Server({ name: "parrotpod-mcp-bridge", version: "1.0.0" }, {
    capabilities: {
      resources: {},
      tools: {}
    }
  });

  // Relay Tool List
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return await client.listTools();
  });

  // Relay Tool Call
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    return await client.callTool(request.params.name, request.params.arguments);
  });

  // Relay Resource List
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return await client.listResources();
  });

  // Relay Resource Read
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    return await client.readResource(request.params.uri);
  });

  // Finalize connection with Claude
  await server.connect(stdioTransport);
  console.error("Successfully bridged Claude to Vercel!");
}

bridge().catch((err) => {
  console.error("Bridge Error (Verify your Vercel URL):", err);
  process.exit(1);
});
