import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = path.join(__dirname, "docs");

const server = new Server(
  {
    name: "parrotpod-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

/**
 * Helper to get all documentation files and their content.
 */
async function getAllDocs() {
  try {
    const files = await fs.readdir(DOCS_DIR);
    const docs = [];
    for (const file of files) {
      if (file.endsWith(".tsx")) {
        const content = await fs.readFile(path.join(DOCS_DIR, file), "utf-8");
        docs.push({
          title: file.replace(".tsx", ""),
          content: content,
        });
      }
    }
    return docs;
  } catch (err) {
    console.error("Error reading docs directory:", err);
    return [];
  }
}

/**
 * Handler for listing available resources.
 */
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "docs://parrotpod/all",
        name: "ParrotPod Full Documentation",
        description: "Contains all setup, deployment, and usage guides for ParrotPod",
        mimeType: "text/markdown",
      },
    ],
  };
});

/**
 * Handler for reading resources.
 */
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  if (request.params.uri === "docs://parrotpod/all") {
    const docs = await getAllDocs();
    const fullMarkdown = docs
      .map((d) => `# SECTION: ${d.title}\n\n${d.content}\n\n---`)
      .join("\n\n");

    return {
      contents: [
        {
          uri: request.params.uri,
          mimeType: "text/markdown",
          text: fullMarkdown,
        },
      ],
    };
  }
  throw new Error("Resource not found");
});

/**
 * Handler for listing available tools.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_docs",
        description: "Fetch all ParrotPod documentation content for AI context",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

/**
 * Handler for calling tools.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_docs") {
    const docs = await getAllDocs();
    const text = docs
      .map((d) => `### SECTION: ${d.title}\n${d.content}`)
      .join("\n\n---\n\n");

    return {
      content: [
        {
          type: "text",
          text: text,
        },
      ],
    };
  }
  throw new Error("Tool not found");
});

const app = express();

let transport;

app.get("/sse", async (req, res) => {
  transport = new SSEServerTransport("/messages", res);
  await server.connect(transport);
  console.error("SSE Connection established");
});

app.post("/messages", async (req, res) => {
  if (transport) {
    await transport.handlePostMessage(req, res);
  } else {
    res.status(404).send("No active SSE session");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.error(`ParrotPod Docs MCP Server (SSE) running on port ${PORT}`);
  console.error(`- Connect to: http://localhost:${PORT}/sse`);
});
