import express from "express";
import { DOCS } from "./docs-bundle.js";

const app = express();
app.use(express.json());

/**
 * STATELESS MCP HANDLER FOR VERCEL
 * All documentation is bundled into DOCS (from docs-bundle.js)
 */
app.post("/mcp", async (req, res) => {
  const { method, params, id } = req.body;

  try {
    // 1. Handle Tool List
    if (method === "tools/list") {
      return res.json({
        jsonrpc: "2.0",
        id,
        result: {
          tools: [
            {
              name: "get_docs",
              description: "Fetch all ParrotPod documentation content",
              inputSchema: { type: "object", properties: {} },
            },
            {
              name: "search_docs",
              description: "Search for specific terms within the documentation",
              inputSchema: {
                type: "object",
                properties: {
                  query: { type: "string", description: "The term or phrase to search for" }
                },
                required: ["query"]
              },
            },
          ],
        }
      });
    }

    // 2. Handle Resource List
    if (method === "resources/list") {
      return res.json({
        jsonrpc: "2.0",
        id,
        result: {
          resources: [
            {
              uri: "docs://parrotpod/all",
              name: "ParrotPod Full Documentation",
              description: "Contains all setup, deployment, and usage guides",
              mimeType: "text/markdown"
            }
          ]
        }
      });
    }

    // 3. Handle Tool Execution
    if (method === "tools/call") {
      const { name, arguments: args } = params;

      if (name === "get_docs") {
        const text = DOCS.map((d) => `### SECTION: ${d.title}\n${d.content}`).join("\n\n---\n\n");
        return res.json({ jsonrpc: "2.0", id, result: { content: [{ type: "text", text }] } });
      }

      if (name === "search_docs") {
        const query = (args?.query || "").toLowerCase();
        const results = DOCS.filter(d => d.title.toLowerCase().includes(query) || d.content.toLowerCase().includes(query));
        const text = results.length > 0 
          ? results.map((r) => `### MATCH FOUND: ${r.title}\n${r.content}`).join("\n\n---\n\n")
          : `No documentation found matching: "${query}"`;
        return res.json({ jsonrpc: "2.0", id, result: { content: [{ type: "text", text }] } });
      }
    }

    // 4. Handle Resource Read
    if (method === "resources/read") {
      const text = DOCS.map((d) => `### PAGE: ${d.title}\n${d.content}`).join("\n\n---\n\n");
      return res.json({ jsonrpc: "2.0", id, result: { contents: [{ uri: params.uri, text }] } });
    }

    // 5. Handshake (initialize)
    if (method === "initialize") {
      return res.json({
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2025-11-25",
          capabilities: { resources: {}, tools: {} },
          serverInfo: { name: "parrotpod-docs", version: "1.0.0" }
        }
      });
    }

    // Final Fallback
    return res.status(404).json({ jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ jsonrpc: "2.0", id, error: { code: -32603, message: "Internal server error" } });
  }
});

app.get("/", (req, res) => {
  res.send("ParrotPod Stateless MCP Server (Vercel-Ready) is Running. Use POST /mcp endpoint.");
});

export default app;
