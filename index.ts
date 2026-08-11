/**
 * Custom Provider: LongCat-2.0
 *
 * Registers LongCat-2.0 (Meituan's 1.6T-parameter MoE agentic coding model,
 * native 1M context) via the LongCat API Platform's OpenAI-compatible endpoint.
 *
 * See https://longcat.chat/platform/docs/
 *
 * Usage:
 *   LONGCAT_API_KEY=... pi -e ./packages/coding-agent/examples/extensions/custom-provider-longcat
 *
 * Then use /model to select longcat/LongCat-2.0.
 */
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.registerProvider("longcat", {
    name: "LongCat",
    baseUrl: "https://api.longcat.chat/openai/v1",
    apiKey: "$LONGCAT_API_KEY",
    api: "openai-completions",

    models: [
      {
        id: "LongCat-2.0",
        name: "LongCat 2.0",
        reasoning: true,
        input: ["text"],
        cost: { input: 0.3, output: 1.2, cacheRead: 0.006, cacheWrite: 0.006 },
        contextWindow: 1048576,
        maxTokens: 131072,
        // LongCat enables thinking via `thinking: { type: "enabled" }`, the
        // DeepSeek format. No effort levels are exposed, so map every usable
        // level to the same value and never send reasoning_effort.
        thinkingLevelMap: {
          off: null,
          minimal: "enabled",
          low: "enabled",
          medium: "enabled",
          high: "enabled",
          xhigh: null,
          max: null,
        },
        compat: {
          thinkingFormat: "deepseek",
        },
      },
    ],
  });
}