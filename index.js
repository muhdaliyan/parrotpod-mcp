import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
  InitializeRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_PATH = path.join(__dirname, "docs.txt");

const app = express();

/**
 * UNIVERSAL MCP SERVER FOR VERCEL
 * This version supports standard SSE, so friends don't need a local bridge file!
 */

const mcpServer = new Server({
  name: "parrotpod-docs-universal",
  version: "1.2.0",
}, {
  capabilities: { resources: {}, tools: {} }
});

// Helper to get doc sections (Live Sync from itself)
async function getDocSections() {
  try {
    const rawContent = fs.readFileSync(DOCS_PATH, "utf-8");
    return rawContent.split("---").map(section => {
      const lines = section.trim().split("\n");
      const titleLine = lines.find(l => l.startsWith("## SECTION:"));
      const title = titleLine ? titleLine.replace("## SECTION:", "").trim() : "General Info";
      return { title, content: section.trim() };
    });
  } catch (err) {
    return [{ title: "Error", content: "Documentation currently unavailable." }];
  }
}

// 1. Tool Logic
mcpServer.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    { name: "get_docs", description: "Fetch all ParrotPod documentation", inputSchema: { type: "object", properties: {} } },
    { name: "search_docs", description: "Search the docs", inputSchema: { type: "object", properties: { query: { type: "string" } }, required: ["query"] } },
  ]
}));

mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
  const sections = await getDocSections();
  if (request.params.name === "get_docs") {
    const text = sections.map(s => s.content).join("\n\n---\n\n");
    return { content: [{ type: "text", text }] };
  }
  if (request.params.name === "search_docs") {
    const query = (request.params.arguments?.query || "").toLowerCase();
    const results = sections.filter(s => s.content.toLowerCase().includes(query));
    const text = results.length > 0 ? results.map(r => r.content).join("\n\n---\n\n") : "No results.";
    return { content: [{ type: "text", text }] };
  }
  throw new Error("Tool not found");
});

// 2. Resource Logic
mcpServer.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [{ uri: "docs://parrotpod/all", name: "ParrotPod Master Docs", mimeType: "text/markdown" }]
}));

mcpServer.setRequestHandler(ReadResourceRequestSchema, async () => {
    const rawContent = fs.readFileSync(DOCS_PATH, "utf-8");
    return { contents: [{ uri: "docs://parrotpod/all", text: rawContent }] };
});

// --- VERCEL TRANSPORT LOGIC ---
let transport = null;

app.get("/sse", async (req, res) => {
  transport = new SSEServerTransport("/messages", res);
  await mcpServer.connect(transport);
});

app.post("/messages", async (req, res) => {
  if (transport) {
    await transport.handlePostMessage(req, res);
  } else {
    // If transport was lost (Serverless restart), we try to re-init session.
    // Standard clients like the inspector handle this gracefully.
    res.status(200).send("OK");
  }
});

// Public doc view
app.get("/docs", (req, res) => {
  const rawContent = fs.readFileSync(DOCS_PATH, "utf-8");
  res.setHeader("Content-Type", "text/plain");
  res.send(rawContent);
});

// Route for friends to "download" the bridge script instantly
app.get("/bridge", (req, res) => {
  try {
    const bridgePath = path.join(__dirname, "connect.js");
    const bridgeCode = fs.readFileSync(bridgePath, "utf-8");
    res.setHeader("Content-Type", "text/plain");
    res.send(bridgeCode);
  } catch (err) {
    res.status(500).send("Error fetching bridge script.");
  }
});

app.get("/", (req, res) => { res.send("ParrotPod Universal MCP is Running. Use /docs to view and /bridge to get the script."); });

export default app;
