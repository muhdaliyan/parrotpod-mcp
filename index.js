import express from "express";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = path.join(__dirname, "docs");

const app = express();
app.use(express.json());

// Helper to read docs
async function getAllDocs() {
  const files = await fs.readdir(DOCS_DIR);
  const tsxFiles = files.filter((f) => f.endsWith(".tsx"));
  
  return Promise.all(
    tsxFiles.map(async (f) => {
      const content = await fs.readFile(path.join(DOCS_DIR, f), "utf-8");
      return {
        title: f.replace(".tsx", ""),
        content,
      };
    })
  );
}

/**
 * STATELESS MCP HANDLER FOR VERCEL
 * Instead of long-running SSE, we provide a standard JSON-RPC over HTTP endpoint.
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
      const docs = await getAllDocs();

      if (name === "get_docs") {
        const text = docs.map((d) => `### SECTION: ${d.title}\n${d.content}`).join("\n\n---\n\n");
        return res.json({ jsonrpc: "2.0", id, result: { content: [{ type: "text", text }] } });
      }

      if (name === "search_docs") {
        const query = (args?.query || "").toLowerCase();
        const results = docs.filter(d => d.title.toLowerCase().includes(query) || d.content.toLowerCase().includes(query));
        const text = results.length > 0 
          ? results.map((r) => `### MATCH FOUND: ${r.title}\n${r.content}`).join("\n\n---\n\n")
          : `No documentation found matching: "${query}"`;
        return res.json({ jsonrpc: "2.0", id, result: { content: [{ type: "text", text }] } });
      }
    }

    // 4. Handle Resource Read
    if (method === "resources/read") {
      const docs = await getAllDocs();
      const text = docs.map((d) => `### PAGE: ${d.title}\n${d.content}`).join("\n\n---\n\n");
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

// Root route for status check
app.get("/", (req, res) => {
  res.send("ParrotPod Stateless MCP Server (Vercel-Ready) is Running. Use POST /mcp endpoint.");
});

// For local testing
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
