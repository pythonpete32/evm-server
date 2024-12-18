#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
	CallToolRequestSchema,
	GetPromptRequestSchema,
	ListPromptsRequestSchema,
	ListResourcesRequestSchema,
	ListToolsRequestSchema,
	ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { getPrompts, listPrompts } from "./prompts/index.js";
import { listResources, readResource } from "./resources/index.js";
import { callTool, listTools } from "./tools/index.js";

const server = new Server(
	{ name: "evm-server", version: "0.1.0" },
	{ capabilities: { resources: {}, tools: {}, prompts: {} } },
);

// Resource handlers
server.setRequestHandler(ListResourcesRequestSchema, listResources);
server.setRequestHandler(ReadResourceRequestSchema, readResource);

// Tool handlers
server.setRequestHandler(ListToolsRequestSchema, listTools);
server.setRequestHandler(CallToolRequestSchema, callTool);

// Prompt handlers
server.setRequestHandler(ListPromptsRequestSchema, listPrompts);
server.setRequestHandler(GetPromptRequestSchema, getPrompts);

async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
}

main().catch((error) => {
	console.error("Server error:", error);
	process.exit(1);
});
