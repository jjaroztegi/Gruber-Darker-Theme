import { join } from "path";
import { promises as fs } from "fs";
import { generateTheme } from "../src/themes/generator";

export function writeFile(path: string, data: unknown): Promise<void> {
  return fs.writeFile(path, JSON.stringify(data, null, 2));
}

async function main() {
  // 1. Generate the theme object
  const themeObject = await generateTheme.default();

  // 2. Write to the themes folder
  await writeFile(join(__dirname, "..", "themes", "Tsoding Gruber Darker-color-theme.json"), themeObject);

  console.log("Theme generated successfully:", themeObject.name);
}

main();
