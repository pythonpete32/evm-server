import { type Tool, ToolSchema } from "@modelcontextprotocol/sdk/types.js";
import type { z } from "zod";

export interface ToolConfig {
	tool: Tool;
	handler: (args: unknown) => Promise<string>;
}

const ToolInputSchema = ToolSchema.shape.inputSchema;
export type ToolInput = z.infer<typeof ToolInputSchema>;
