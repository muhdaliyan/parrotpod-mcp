#!/usr/bin/env node
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

/**
 * PARROTPOD CLEAN MCP SEARCHER
 * Optimized for documentation retrieval and keyword searching.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_PATH = path.join(__dirname, "docs.txt");

const app = express();
app.use(express.json());

// Initialize MCP Server
const mcpServer = new Server({
  name: "parrotpod-docs-searcher",
  version: "2.0.0",
}, {
  capabilities: { resources: {}, tools: {} }
});

// Helper to parse sections from docs.txt dynamically
function getDocSections() {
  try {
    if (!fs.existsSync(DOCS_PATH)) return [];
    const rawContent = fs.readFileSync(DOCS_PATH, "utf-8");
    return rawContent.split("---").map(section => {
      const trimmed = section.trim();
      const titleLine = trimmed.split("\n").find(l => l.startsWith("## SECTION:"));
      const title = titleLine ? titleLine.replace("## SECTION:", "").trim() : "General Information";
      return { title, content: trimmed || "No content available." };
    }).filter(s => s.content.length > 5); // Filter out empty/trivial sections
  } catch (err) {
    console.error("Critical error reading docs.txt:", err);
    return [];
  }
}

// 1. TOOL HANDLERS
mcpServer.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    { 
      name: "search_docs", 
      description: "Search ParrotPod documentation for specific technical information, setup guides, or feature details.", 
      inputSchema: { 
        type: "object", 
        properties: { 
          query: { type: "string", description: "Search query or keyword (e.g., 'LiveKit', 'telephony', 'setup')" } 
        }, 
        required: ["query"] 
      } 
    },
    { 
      name: "get_full_documentation", 
      description: "Retrieve all ParrotPod documentation at once.", 
      inputSchema: { type: "object", properties: {} } 
    }
  ]
}));

mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
  const sections = getDocSections();
  const { name, arguments: args } = request.params;

  if (name === "search_docs") {
    const query = (args?.query || "").toLowerCase();
    const results = sections.filter(s => 
      s.title.toLowerCase().includes(query) || 
      s.content.toLowerCase().includes(query)
    );
    
    if (results.length === 0) return { content: [{ type: "text", text: `No documentation found for query: "${query}"` }] };

    const responseText = results.map(r => `## [${r.title}]\n${r.content}`).join("\n\n---\n\n");
    return { content: [{ type: "text", text: responseText }] };
  }

  if (name === "get_full_documentation") {
    const responseText = sections.map(s => s.content).join("\n\n---\n\n");
    return { content: [{ type: "text", text: responseText }] };
  }

  throw new Error(`Tool not found: ${name}`);
});

// 2. RESOURCE HANDLERS
mcpServer.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [{ 
    uri: "docs://parrotpod/all", 
    name: "ParrotPod Master Documentation (Markdown)", 
    mimeType: "text/markdown"
  }]
}));

mcpServer.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  if (request.params.uri === "docs://parrotpod/all") {
    const rawContent = fs.readFileSync(DOCS_PATH, "utf-8");
    return { contents: [{ uri: request.params.uri, text: rawContent, mimeType: "text/markdown" }] };
  }
  throw new Error("Resource not found");
});

// 3. TRANSPORT HANDLERS
// Check if we are running in a serverless/web environment (Vercel/Express)
if (process.env.VERCEL || process.env.PORT) {
  let transport = null;

  app.get("/sse", async (req, res) => {
    transport = new SSEServerTransport("/messages", res);
    await mcpServer.connect(transport);
  });

  app.post("/messages", async (req, res) => {
    if (transport) {
      await transport.handlePostMessage(req, res);
    } else {
      res.status(200).send("OK");
    }
  });

  // Default web info route
  app.get("/", (req, res) => {
    res.status(200).send("ParrotPod MCP Searcher is active. Connect via SSE at /sse");
  });
} else {
  // Otherwise, fallback to Stdio for local CLI/npx usage
  const transport = new StdioServerTransport();
  mcpServer.connect(transport).catch(error => {
    console.error("MCP Server Error:", error);
    process.exit(1);
  });
}

export default app;
