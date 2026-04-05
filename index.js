import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_PATH = path.join(__dirname, "docs.txt");

const app = express();
app.use(express.json());

/**
 * LIVE-SYNC MCP HANDLER
 * Instead of reading from disk, we fetch the LATEST docs from your public URL.
 * This ensures Claude always has the most up-to-date info from your website.
 */
async function getLiveDocSections() {
  const DOCS_URL = "https://parrotpod-docs-mcp.vercel.app/docs";
  
  try {
    const response = await fetch(DOCS_URL);
    if (!response.ok) throw new Error("Failed to fetch live docs");
    
    const rawContent = await response.text();
    
    // Split the text into sections using "---" or "## SECTION:"
    const sections = rawContent.split("---").map(section => {
      const lines = section.trim().split("\n");
      const titleLine = lines.find(l => l.startsWith("## SECTION:"));
      const title = titleLine ? titleLine.replace("## SECTION:", "").trim() : "General Info";
      return { title, content: section.trim() };
    });
    
    return sections;
  } catch (err) {
    console.error("Live Sync Error:", err.message);
    
    // FALLBACK: If the internet is down, try to read the local copy
    try {
      const rawContent = fs.readFileSync(DOCS_PATH, "utf-8");
      return rawContent.split("---").map(section => ({ title: "Local Cache", content: section.trim() }));
    } catch (localErr) {
      return [{ title: "Error", content: "Documentation currently unavailable." }];
    }
  }
}

app.post("/mcp", async (req, res) => {
  const { method, params, id } = req.body;
  const sections = await getLiveDocSections();

  try {
    if (method === "tools/list") {
      return res.json({
        jsonrpc: "2.0", id,
        result: {
          tools: [
            { name: "get_docs", description: "Fetch the latest ParrotPod documentation (Live Sync)", inputSchema: { type: "object", properties: {} } },
            { 
              name: "search_docs", 
              description: "Search the latest docs for specific terms", 
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
          resources: [{ uri: "docs://parrotpod/live", name: "ParrotPod Live Docs", description: "Documentation synced from the cloud" }]
        }
      });
    }

    if (method === "initialize") {
      return res.json({
        jsonrpc: "2.0", id,
        result: { protocolVersion: "2025-11-25", capabilities: { resources: {}, tools: {} }, serverInfo: { name: "parrotpod-docs-live", version: "1.1.0" } }
      });
    }

    return res.status(404).json({ jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } });
  } catch (err) {
    res.status(500).json({ jsonrpc: "2.0", id, error: { code: -32603, message: "Internal server error" } });
  }
});

// We keep the /docs route so the server can "feed" itself or be checked by you
app.get("/docs", (req, res) => {
  try {
    const rawContent = fs.readFileSync(DOCS_PATH, "utf-8");
    res.setHeader("Content-Type", "text/plain");
    res.send(rawContent);
  } catch (err) {
    res.status(500).send("Error reading documentation file.");
  }
});

app.get("/", (req, res) => { res.send("ParrotPod Live-Sync MCP is Running."); });

export default app;
