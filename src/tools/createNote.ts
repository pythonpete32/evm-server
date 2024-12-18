import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { notes } from "../resources/index.js";
import type { ToolConfig, ToolInput } from "../types/tool.js";

const schema = z.object({
	title: z.string().describe("Title of the note"),
	content: z.string().describe("Text content of the note"),
});

async function handler(params: unknown): Promise<string> {
	const { data, error } = schema.safeParse(params);
	if (error) throw error;

	const { title, content } = data;

	const id = String(Object.keys(notes).length + 1);
	notes[id] = { title, content };

	return `Created note ${id}: ${title}`;
}

export const createNote: ToolConfig = {
	tool: {
		name: "create_note",
		description: "Create a new note",
		inputSchema: zodToJsonSchema(schema) as ToolInput,
	},
	handler,
};
