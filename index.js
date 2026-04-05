import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_PATH = path.join(__dirname, "docs.txt");

const app = express();
app.use(express.json());

/**
 * TEXT-BASED MCP HANDLER
 * Instead of complex bundles, we just read docs.txt.
 * We split the file by sections for searchability.
 */
function getDocSections() {
  try {
    const rawContent = fs.readFileSync(DOCS_PATH, "utf-8");
    const sections = rawContent.split("---").map(section => {
      const lines = section.trim().split("\n");
      const titleLine = lines.find(l => l.startsWith("## SECTION:"));
      const title = titleLine ? titleLine.replace("## SECTION:", "").trim() : "Uncategorized";
      return { title, content: section.trim() };
    });
    return sections;
  } catch (err) {
    console.error("Error reading docs.txt:", err);
    return [];
  }
}

app.post("/mcp", (req, res) => {
  const { method, params, id } = req.body;
  const sections = getDocSections();

  try {
    if (method === "tools/list") {
      return res.json({
        jsonrpc: "2.0", id,
        result: {
          tools: [
            { name: "get_docs", description: "Fetch all ParrotPod documentation content", inputSchema: { type: "object", properties: {} } },
            { 
              name: "search_docs", 
              description: "Search for specific terms within the documentation", 
              inputSchema: { 
                type: "object", 
                properties: { query: { type: "string", description: "Term to search for" } },
                required: ["query"]
              } 
            },
          ],
        }
      });
    }

    if (method === "tools/call") {
      const { name, arguments: args } = params;

      if (name === "get_docs") {
        const text = sections.map(s => s.content).join("\n\n---\n\n");
        return res.json({ jsonrpc: "2.0", id, result: { content: [{ type: "text", text }] } });
      }

      if (name === "search_docs") {
        const query = (args?.query || "").toLowerCase();
        const results = sections.filter(s => s.content.toLowerCase().includes(query));
        const text = results.length > 0 
          ? results.map(r => r.content).join("\n\n---\n\n")
          : `No documentation found matching: "${query}"`;
        return res.json({ jsonrpc: "2.0", id, result: { content: [{ type: "text", text }] } });
      }
    }

    if (method === "resources/list") {
      return res.json({
        jsonrpc: "2.0", id,
        result: {
          resources: [{ uri: "docs://parrotpod/all", name: "ParrotPod Docs", description: "Master Documentation File" }]
        }
      });
    }

    if (method === "resources/read") {
      const text = fs.readFileSync(DOCS_PATH, "utf-8");
      return res.json({ jsonrpc: "2.0", id, result: { contents: [{ uri: params.uri, text }] } });
    }

    if (method === "initialize") {
      return res.json({
        jsonrpc: "2.0", id,
        result: { protocolVersion: "2025-11-25", capabilities: { resources: {}, tools: {} }, serverInfo: { name: "parrotpod-docs", version: "1.0.0" } }
      });
    }

    return res.status(404).json({ jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } });
  } catch (err) {
    res.status(500).json({ jsonrpc: "2.0", id, error: { code: -32603, message: "Internal server error" } });
  }
});

app.get("/docs", (req, res) => {
  try {
    const rawContent = fs.readFileSync(DOCS_PATH, "utf-8");
    res.setHeader("Content-Type", "text/plain");
    res.send(rawContent);
  } catch (err) {
    res.status(500).send("Error reading documentation file.");
  }
});

app.get("/", (req, res) => { res.send("ParrotPod MCP (Text-Based) is Running. Visit /docs to view the documentation."); });

export default app;
