import type { ReadResourceRequest, ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";

/**
 * Type alias for a note object.
 */
type Note = { title: string; content: string };
/**
 * Simple in-memory storage for notes.
 * In a real implementation, this would likely be backed by a database.
 */
export const notes: { [id: string]: Note } = {
	"1": { title: "First Note", content: "This is note 1" },
	"2": { title: "Second Note", content: "This is note 2" },
};

export const listResources = async () => {
	return {
		resources: Object.entries(notes).map(([id, note]) => ({
			uri: `note:///${id}`,
			mimeType: "text/plain",
			name: note.title,
			description: `A text note: ${note.title}`,
		})),
	};
};

export const readResource = async (request: ReadResourceRequest): Promise<ReadResourceResult> => {
	const url = new URL(request.params.uri);
	const id = url.pathname.replace(/^\//, "");
	const note = notes[id];

	if (!note) {
		throw new Error(`Note ${id} not found`);
	}

	return {
		contents: [
			{
				uri: request.params.uri,
				mimeType: "text/plain",
				text: note.content,
			},
		],
	};
};
