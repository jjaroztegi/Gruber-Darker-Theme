import { promises as fs } from "fs";
import { join } from "path";
import { Resvg } from "@resvg/resvg-js";
import { bundledLanguages, createHighlighter, type BundledLanguage } from "shiki";

type ExampleAsset = {
  source: string;
  output: string;
  language: string;
  title?: string;
  showcase?: string;
};

type ThemeJson = {
  name: string;
  colors: Record<string, string>;
};

type ThemedToken = {
  content: string;
  color?: string;
  fontStyle?: number;
};

const root = join(__dirname, "..");
const themePath = join(root, "themes", "Tsoding Gruber Darker-color-theme.json");
const examplesDir = join(root, "examples");
const imgDir = join(root, "img");

const languageCatalog = bundledLanguages as Record<string, unknown>;
const themeUi = {
  bg: "#181818",
  panel: "#202020",
  chrome: "#282828",
  border: "#52494e",
  accent: "#ffdd33",
  text: "#f4f4ff",
  muted: "#7a7076",
  subtle: "#b6b6b6",
};

const exampleAssets: ExampleAsset[] = [
  { source: "bash_example.sh", output: "bash.png", language: "bash", title: "bash_example.sh" },
  { source: "c_example.c", output: "c.png", language: "c", title: "c_example.c", showcase: "showcase_c.png" },
  { source: "cmakelists.txt", output: "cmakelists.png", language: "cmake", title: "CMakeLists.txt" },
  { source: "cpp_example.cpp", output: "cpp.png", language: "cpp", title: "cpp_example.cpp" },
  { source: "csharp_example.cs", output: "csharp.png", language: "csharp", title: "csharp_example.cs" },
  { source: "go_example.go", output: "go.png", language: "go", title: "go_example.go" },
  { source: "html_example.html", output: "html.png", language: "html", title: "html_example.html" },
  { source: "java_example.java", output: "java.png", language: "java", title: "java_example.java" },
  { source: "javascript_example.js", output: "js.png", language: "javascript", title: "javascript_example.js", showcase: "showcase_js.png" },
  { source: "json_example.json", output: "json.png", language: "json", title: "json_example.json" },
  { source: "kotlin_example.kt", output: "kotlin.png", language: "kotlin", title: "kotlin_example.kt" },
  { source: "Makefile", output: "makefile.png", language: "make", title: "Makefile" },
  { source: "markdown_example.md", output: "md.png", language: "markdown", title: "markdown_example.md" },
  { source: "php_example.php", output: "php.png", language: "php", title: "php_example.php" },
  { source: "python_example.py", output: "python.png", language: "python", title: "python_example.py" },
  { source: "ruby_example.rb", output: "ruby.png", language: "ruby", title: "ruby_example.rb" },
  { source: "rust_example.rs", output: "rust.png", language: "rust", title: "rust_example.rs" },
  { source: "sql_example.sql", output: "sql.png", language: "sql", title: "sql_example.sql" },
  { source: "swift_example.swift", output: "swift.png", language: "swift", title: "swift_example.swift" },
  { source: "typescript_example.ts", output: "ts.png", language: "typescript", title: "typescript_example.ts" },
  { source: "vhdl_example.vhd", output: "vhdl.png", language: "vhdl", title: "vhdl_example.vhd" },
  { source: "yaml_example.yaml", output: "yaml.png", language: "yaml", title: "yaml_example.yaml" },
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function preserveSpaces(value: string): string {
  return escapeXml(value.replace(/\t/g, "    ")).replace(/ /g, "&#160;");
}

function fileLabel(fileName: string): string {
  return fileName;
}

function languageBadge(language: string): string {
  return language === "javascript" ? "js" : language === "typescript" ? "ts" : language;
}

function hasLanguage(language: string): language is BundledLanguage {
  return Object.prototype.hasOwnProperty.call(languageCatalog, language);
}

function fontWeightFromStyle(fontStyle = 0): string {
  return fontStyle & 2 ? "700" : "500";
}

function fontStyleFromStyle(fontStyle = 0): string {
  return fontStyle & 1 ? "italic" : "normal";
}

function createLineGroups(
  lineTokens: ThemedToken[][],
  options: {
    x: number;
    y: number;
    fontSize: number;
    lineHeight: number;
    charWidth: number;
    showLineNumbers?: boolean;
    lineNumberColor?: string;
    textColor: string;
  },
): string {
  const {
    x,
    y,
    fontSize,
    lineHeight,
    charWidth,
    showLineNumbers = true,
    lineNumberColor = themeUi.muted,
    textColor,
  } = options;

  const lineNumberDigits = String(lineTokens.length).length;
  const lineNumberWidth = showLineNumbers ? lineNumberDigits * charWidth + 24 : 0;

  return lineTokens
    .map((tokens, index) => {
      const lineY = y + index * lineHeight;
      const lineNumber = showLineNumbers
        ? `<text x="${x}" y="${lineY}" font-size="${fontSize}" fill="${lineNumberColor}" font-family="Cascadia Code, Consolas, monospace" font-weight="500" xml:space="preserve">${String(index + 1).padStart(lineNumberDigits, " ")}</text>`
        : "";

      let cursor = x + lineNumberWidth;
      const spans = tokens
        .filter((token) => token.content.length > 0)
        .map((token) => {
          const span = `<text x="${cursor}" y="${lineY}" font-size="${fontSize}" fill="${token.color ?? textColor}" font-family="Cascadia Code, Consolas, monospace" font-style="${fontStyleFromStyle(token.fontStyle)}" font-weight="${fontWeightFromStyle(token.fontStyle)}" xml:space="preserve">${preserveSpaces(token.content)}</text>`;
          cursor += token.content.replace(/\t/g, "    ").length * charWidth;
          return span;
        })
        .join("");

      return `${lineNumber}${spans}`;
    })
    .join("");
}

function renderPng(svg: string, outputPath: string, width: number, scale = 2): Promise<void> {
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: Math.round(width * scale),
    },
  });
  return fs.writeFile(outputPath, resvg.render().asPng());
}

async function loadTokens(highlighter: Awaited<ReturnType<typeof createHighlighter>>, code: string, language: string, themeName: string, fallbackColor: string): Promise<ThemedToken[][]> {
  if (!hasLanguage(language)) {
    return code.split(/\r?\n/).map((line) => [{ content: line, color: fallbackColor, fontStyle: 0 }]);
  }

  return highlighter.codeToTokens(code, {
    lang: language,
    theme: themeName,
  }).tokens as ThemedToken[][];
}

function getCardMetrics(tokens: ThemedToken[][]) {
  const maxColumns = Math.max(
    ...tokens.map((line) => line.reduce((sum, token) => sum + token.content.replace(/\t/g, "    ").length, 0)),
    32,
  );

  let fontSize = 20;
  let charWidth = fontSize * 0.6;
  const maxWidth = 980;
  const contentPadding = 34;
  const lineNumberWidth = Math.max(String(tokens.length).length, 2) * charWidth + 32;
  let width = Math.ceil(contentPadding * 2 + lineNumberWidth + maxColumns * charWidth);

  while (width > maxWidth && fontSize > 14) {
    fontSize -= 1;
    charWidth = fontSize * 0.6;
    width = Math.ceil(contentPadding * 2 + Math.max(String(tokens.length).length, 2) * charWidth + 32 + maxColumns * charWidth);
  }

  const lineHeight = Math.round(fontSize * 1.65);
  const headerHeight = 58;
  const height = headerHeight + tokens.length * lineHeight + 48;

  return {
    fontSize,
    charWidth,
    lineHeight,
    width,
    height,
    headerHeight,
    contentPadding,
  };
}

async function renderCodeCard(
  highlighter: Awaited<ReturnType<typeof createHighlighter>>,
  theme: ThemeJson,
  asset: ExampleAsset,
  outputFileName: string,
  options?: { lineLimit?: number; widthScale?: number },
): Promise<void> {
  const sourcePath = join(examplesDir, asset.source);
  const code = await fs.readFile(sourcePath, "utf8");
  const allTokens = await loadTokens(highlighter, code, asset.language, theme.name, themeUi.text);
  const tokens = options?.lineLimit ? allTokens.slice(0, options.lineLimit) : allTokens;
  const metrics = getCardMetrics(tokens);
  const width = Math.round(metrics.width * (options?.widthScale ?? 1));
  const height = metrics.height;
  const label = asset.title ?? asset.source;

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect x="18" y="20" width="${width - 36}" height="${height - 28}" rx="24" fill="#000000" opacity="0.16" />
    <rect x="10" y="10" width="${width - 20}" height="${height - 20}" rx="24" fill="${theme.colors["editor.background"] ?? themeUi.bg}" stroke="${theme.colors["editorGroup.border"] ?? themeUi.border}" />
    <rect x="10" y="10" width="${width - 20}" height="${metrics.headerHeight}" rx="24" fill="${theme.colors["activityBar.background"] ?? themeUi.chrome}" />
    <rect x="10" y="${metrics.headerHeight}" width="${width - 20}" height="${height - metrics.headerHeight - 10}" rx="0" fill="${theme.colors["editor.background"] ?? themeUi.bg}" />
    <circle cx="42" cy="39" r="7" fill="#ff5f57" />
    <circle cx="64" cy="39" r="7" fill="#febc2e" />
    <circle cx="86" cy="39" r="7" fill="#28c840" />
    <text x="${width - 36}" y="44" font-size="15" fill="${theme.colors["activityBar.inactiveForeground"] ?? themeUi.muted}" text-anchor="end" font-family="Segoe UI, Arial, sans-serif">${escapeXml(languageBadge(asset.language))}</text>
    <text x="118" y="44" font-size="16" fill="${theme.colors["activityBar.foreground"] ?? themeUi.text}" font-family="Segoe UI, Arial, sans-serif">${escapeXml(fileLabel(label))}</text>
    ${createLineGroups(tokens, {
      x: metrics.contentPadding,
      y: metrics.headerHeight + 12,
      fontSize: metrics.fontSize,
      lineHeight: metrics.lineHeight,
      charWidth: metrics.charWidth,
      textColor: theme.colors["editor.foreground"] ?? themeUi.text,
      lineNumberColor: theme.colors["editorLineNumber.foreground"] ?? themeUi.muted,
    })}
  </svg>`;

  await renderPng(svg, join(imgDir, outputFileName), width);
}

async function main() {
  const theme = JSON.parse(await fs.readFile(themePath, "utf8")) as ThemeJson;
  const shikiTheme = JSON.parse(await fs.readFile(themePath, "utf8"));
  const supportedLanguages = [...new Set(exampleAssets.map((asset) => asset.language).filter(hasLanguage))];
  const highlighter = await createHighlighter({
    themes: [shikiTheme],
    langs: supportedLanguages,
  });

  for (const asset of exampleAssets) {
    await renderCodeCard(highlighter, theme, asset, asset.output);
    if (asset.showcase) {
      await renderCodeCard(highlighter, theme, asset, asset.showcase, {
        lineLimit: 28,
        widthScale: 1.02,
      });
    }
  }

  console.log(`Generated ${exampleAssets.length + exampleAssets.filter((asset) => asset.showcase).length} preview assets.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
