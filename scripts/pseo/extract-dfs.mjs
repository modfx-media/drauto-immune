#!/usr/bin/env node
/**
 * Extracts (keyword, search_volume) pairs from raw DataForSEO MCP report
 * dumps (markdown + repeated JSON blocks) using a tolerant regex instead of
 * strict JSON.parse (the reports aren't valid standalone JSON documents).
 * Dedupes by keyword, keeping the max observed volume, tags with cluster.
 */
import fs from "node:fs";
import path from "node:path";

const BASE =
  "/Users/nargisfatima/Library/Application Support/Code/User/workspaceStorage/04e226869859fd3641f0b03b9b2b3b19/GitHub.copilot-chat/chat-session-resources/1119c45f-9c33-4f9a-9262-60a114f2311e/";

const SOURCES = [
  ["hashimotos", "toolu_01V5nWiqy5nhrVvE25vwGfqu__vscode-1790624611291"],
  ["ana-patterns", "toolu_01KownTwFdZvPCZV1i7wgHPN__vscode-1790624611292"],
  ["ferritin-anemia", "toolu_015HWUi4ARD2KeyWooXBwQj1__vscode-1790624611293"],
  ["methylated-vitamins", "toolu_011UnwRjAVkYzkZZwjbhnkoV__vscode-1790624611305"],
  ["thyroid-gluten", "toolu_014N3wSv3v3b4GFfzqF1qz9m__vscode-1790624611306"],
  ["pcos-mthfr", "toolu_011uJPv3efTi66UnKtbTsPqw__vscode-1790624611307"],
  ["autoimmune-skin", "toolu_01DbtG1cfMGLiwHNBRTB4v1M__vscode-1790624611308"],
  ["leaky-gut", "toolu_01VQg7hNCbbE3nxJvUAEd8z1__vscode-1790624611309"],
  ["pots", "toolu_017VMsFtAkXuUbV9JQ4Rzhnq__vscode-1790624611310"],
  ["antihistamine", "toolu_01BnkjrYVm7a8ZazXTChGdeP__vscode-1790624611311"],
  ["diet-dirty-dozen", "toolu_01VM2HFmVkxBuLF2EaogVJHa__vscode-1790624611312"],
  ["sjogrens", "toolu_011kTPVv8kGMvvqS4qjh6K7q__vscode-1790624611313"],
  ["rheumatoid-arthritis", "toolu_01XHw55MXPhKLnQ9fW6J9Rqx__vscode-1790624611314"],
  ["nac-supplement", "toolu_01G1jwzKCRgdSFMXMrMuFkE9__vscode-1790624611315"],
  ["lupus", "toolu_01JDH2jew7GKjpMR1AivABHb__vscode-1790624611316"],
];

const pattern = /"keyword":\s*"([^"]+)"[\s\S]{0,400}?"search_volume":\s*(\d+|null)/g;

const result = {};
for (const [cluster, dir] of SOURCES) {
  const file = path.join(BASE, dir, "content.txt");
  if (!fs.existsSync(file)) {
    console.error(`MISSING: ${cluster} (${dir})`);
    continue;
  }
  const text = fs.readFileSync(file, "utf8");
  const seen = new Map();
  let m;
  pattern.lastIndex = 0;
  while ((m = pattern.exec(text))) {
    const kw = m[1].toLowerCase().trim();
    const vol = m[2] === "null" ? 0 : Number(m[2]);
    if (!seen.has(kw) || seen.get(kw) < vol) seen.set(kw, vol);
  }
  result[cluster] = [...seen.entries()]
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([keyword, volume]) => ({ keyword, volume }));
}

const outFile = "/Users/nargisfatima/Documents/drauto-immune/data/pseo/_dfs-raw-extract.json";
fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
for (const [cluster, items] of Object.entries(result)) {
  console.log(`${cluster}: ${items.length} keywords with volume>0, top: ${items.slice(0, 5).map((i) => `${i.keyword}(${i.volume})`).join(", ")}`);
}
