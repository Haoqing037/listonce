/**
 * Copy compiled JS from out/ to extension root and ensure icons exist.
 * Run after: tsc (output to out/)
 */
import { copyFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const out = join(root, "out");

if (!existsSync(out)) {
  console.warn("No out/ folder. Run tsc first.");
  process.exit(1);
}

for (const name of ["background.js", "content.js"]) {
  const src = join(out, name);
  if (existsSync(src)) {
    copyFileSync(src, join(root, name));
    console.log("Copied", name);
  }
}

const iconsDir = join(root, "icons");
if (!existsSync(iconsDir)) {
  mkdirSync(iconsDir, { recursive: true });
  console.log("Created icons/ – add icon16.png and icon48.png for the extension.");
}
