import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const SRC =
  process.argv[2] ??
  "C:/Users/faris/.cursor/projects/d-Faris-Work-Area-Sken-Wedding-1/assets/c__Users_faris_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_ChatGPT_Image_Jul_23__2026__10_48_32_PM-6519baa6-3fee-4097-9112-fdc36b6da01b.png";

const outDir = path.join(root, "public", "images");

const meta = await sharp(SRC).metadata();
console.log("source:", meta.width, "x", meta.height);

const w = meta.width;
const h = meta.height;
const half = Math.floor(h / 2);

async function cut(top, height, name) {
  const extracted = await sharp(SRC)
    .extract({ left: 0, top, width: w, height })
    .toBuffer();
  await sharp(extracted)
    .trim({ background: "#000000", threshold: 25 })
    .png()
    .toFile(path.join(outDir, name));
  const m = await sharp(path.join(outDir, name)).metadata();
  console.log(name, "->", m.width, "x", m.height);
}

// golden-dome church = lower half; silver = upper half
await cut(half, h - half, "church-source-gold.png");
await cut(0, half, "church-source-silver.png");

console.log("done");
