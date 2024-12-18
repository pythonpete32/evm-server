import { createNote } from "./createNote.js";

import type { CallToolRequest } from "@modelcontextprotocol/sdk/types.js";

export const allTools = [createNote];

export const listTools = async () => ({
	tools: allTools.map((t) => t.tool),
});

export const callTool = async (request: CallToolRequest) => {
	const toolConfig = allTools.find((t) => t.tool.name === request.params.name);
	if (!toolConfig) throw new Error(`Unknown tool: ${request.params.name}`);

	// Now call the handler with the correctly typed arguments
	const result = await toolConfig.handler(request.params.arguments);

	// Return in the MCP format
	return {
		content: [
			{
				type: "text",
				text: typeof result === "string" ? result : JSON.stringify(result),
			},
		],
	};
};
