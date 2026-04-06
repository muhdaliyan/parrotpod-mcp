# ParrotPod MCP Documentation Server — Master Knowledge 🦜🔗

High-performance MCP server that providing structured setup, config, and integration guidance for the ParrotPod platform.

---

## 🚀 Overview
The ParrotPod MCP server exposes a suite of tools that allow AI assistants and agents to guide users through every aspect of ParrotPod — from local setup and cloud deployment to voice agent creation, telephony configuration, and third-party integrations.

No backend API calls are made. Each tool is a knowledge accessor that returns structured, actionable documentation.

---

## 🛠️ Tool Capabilities

### Documentation Retrieval
- **get_overview**: Platform mission, capabilities, and technology stack.
- **get_setup_guide**: Step-by-step local installation and environment setup.
- **get_api_keys_guide**: Instructions for obtaining API keys (LiveKit, Deepgram, OpenAI, Gemini).
- **get_env_reference**: Full environment variable reference with descriptions.
- **get_agent_guide**: Creating, configuring, and managing AI voice agents.
- **get_deployment_guide**: Cloud deployment on Render (Docker-based).
- **get_telephony_guide**: Phone number setup, dispatch rules, and call routing.
- **get_whatsapp_guide**: WhatsApp device linking and workflow configuration.
- **get_telegram_guide**: Telegram bot creation and notification setup.
- **get_tools_integrations**: Deepgram, LiveKit, OpenAI, and Gemini integration details.
- **get_troubleshooting**: Common issues and fixes for all ParrotPod modules.

---

## 📖 Usage
This server is designed to be used with MCP clients like Claude Desktop or Cursor. It serves as a real-time technical companion for developers building on the ParrotPod platform.

### Quick Search
Use the `search_docs` tool to find specific technical information across all modules instantly.

---

## 🧪 Deployment
This server is stateless and optimized for serverless environments (**Vercel**). 

1. Deploy using `vercel --prod`.
2. Ensure the `docs.txt` file is present in the root directory.

---

*ParrotPod MCP — v1.0.0 | High-Fidelity Documentation Accessor*
