import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const roastText =
  "My agent hires three subagents and writes a plan file just to tell me, at length, it hasn't started yet.";

function validateRoast(text) {
  const characterCount = [...text].length;
  const hasLineBreak = /[\r\n]/.test(text);
  const isBlank = text.trim().length === 0;

  if (characterCount < 1 || characterCount > 200 || hasLineBreak || isBlank) {
    throw new Error(`roast failed validation: ${characterCount} characters`);
  }
}

validateRoast(roastText);

function writeEntryAtomically(outputDirectory, text) {
  mkdirSync(outputDirectory, { recursive: true });
  const temporaryPath = join(outputDirectory, ".entry.txt.tmp");
  const finalPath = join(outputDirectory, "entry.txt");
  writeFileSync(temporaryPath, text, "utf8");
  renameSync(temporaryPath, finalPath);
}

writeEntryAtomically(process.env.MAKEFUN_OUTPUT_DIR || "/output", roastText);
