import type { GetPromptRequest } from "@modelcontextprotocol/sdk/types.js";
import { notes } from "../resources/index.js";

export const listPrompts = async () => {
	return {
		prompts: [
			{
				name: "summarize_notes",
				description: "Summarize all notes",
			},
		],
	};
};

export const getPrompts = async (request: GetPromptRequest) => {
	if (request.params.name !== "summarize_notes") {
		throw new Error("Unknown prompt");
	}

	const embeddedNotes = Object.entries(notes).map(([id, note]) => ({
		type: "resource" as const,
		resource: {
			uri: `note:///${id}`,
			mimeType: "text/plain",
			text: note.content,
		},
	}));

	return {
		messages: [
			{
				role: "user",
				content: {
					type: "text",
					text: "Please summarize the following notes:",
				},
			},
			...embeddedNotes.map((note) => ({
				role: "user" as const,
				content: note,
			})),
			{
				role: "user",
				content: {
					type: "text",
					text: "Provide a concise summary of all the notes above.",
				},
			},
		],
	};
};
