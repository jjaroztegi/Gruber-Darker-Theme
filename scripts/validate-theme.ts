import { readFileSync } from "fs";
import { join } from "path";

type TokenColor = {
  name?: string;
  scope?: string | string[];
  settings?: {
    foreground?: string;
    background?: string;
    fontStyle?: string;
  };
};

type SemanticTokenStyle = string | {
  foreground?: string;
  background?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
};

type ThemeJson = {
  $schema?: string;
  name?: string;
  type?: string;
  semanticHighlighting?: boolean;
  semanticTokenColors?: Record<string, SemanticTokenStyle>;
  tokenColors?: TokenColor[];
  colors?: Record<string, string>;
};

type ExtensionManifest = {
  name?: string;
  displayName?: string;
  publisher?: string;
  activationEvents?: unknown;
  contributes?: {
    themes?: Array<{
      label?: string;
      uiTheme?: string;
      path?: string;
    }>;
  };
};

const root = join(__dirname, "..");
const packagePath = join(root, "package.json");
const themeRelativePath = "./themes/Tsoding Gruber Darker-color-theme.json";
const themePath = join(root, "themes", "Tsoding Gruber Darker-color-theme.json");
const hexColorPattern = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

function fail(message: string): never {
  throw new Error(message);
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    fail(message);
  }
}

function assertHexColor(value: string, label: string): void {
  assert(hexColorPattern.test(value), `${label} must be a VS Code hex color, got ${value}`);
}

function normalizeHex(value: string): { r: number; g: number; b: number } {
  assertHexColor(value, "color");
  const raw = value.slice(1);
  const expanded = raw.length === 3 || raw.length === 4
    ? raw.split("").map((part) => part + part).join("")
    : raw;
  return {
    r: Number.parseInt(expanded.slice(0, 2), 16),
    g: Number.parseInt(expanded.slice(2, 4), 16),
    b: Number.parseInt(expanded.slice(4, 6), 16),
  };
}

function channelToLinear(value: number): number {
  const sRgb = value / 255;
  return sRgb <= 0.03928 ? sRgb / 12.92 : ((sRgb + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(value: string): number {
  const { r, g, b } = normalizeHex(value);
  return 0.2126 * channelToLinear(r) + 0.7152 * channelToLinear(g) + 0.0722 * channelToLinear(b);
}

function contrastRatio(foreground: string, background: string): number {
  const fg = relativeLuminance(foreground);
  const bg = relativeLuminance(background);
  return (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
}

function assertContrast(theme: ThemeJson, foregroundKey: string, backgroundKey: string, minimum = 4.5): void {
  const colors = theme.colors ?? {};
  const foreground = colors[foregroundKey];
  const background = colors[backgroundKey];
  assert(foreground, `Missing ${foregroundKey}`);
  assert(background, `Missing ${backgroundKey}`);
  const ratio = contrastRatio(foreground, background);
  assert(
    ratio >= minimum,
    `${foregroundKey} on ${backgroundKey} contrast ${ratio.toFixed(2)} is below ${minimum}`,
  );
}

function validateManifest(manifest: ExtensionManifest, theme: ThemeJson): void {
  assert(manifest.name === "gruber-darker-theme", "package.json name changed unexpectedly");
  assert(manifest.publisher, "package.json must declare a publisher for VS Code Marketplace publishing");
  assert(!manifest.activationEvents, "Theme-only extensions should not declare activationEvents");

  const themes = manifest.contributes?.themes ?? [];
  assert(themes.length === 1, "package.json should contribute exactly one theme");

  const contribution = themes[0];
  assert(contribution.label === theme.name, "contributes.themes[0].label must match theme.name");
  assert(contribution.uiTheme === "vs-dark", "Theme contribution must use uiTheme vs-dark");
  assert(contribution.path === themeRelativePath, `Theme contribution path must be ${themeRelativePath}`);
  assert(contribution.path.endsWith("-color-theme.json"), "Theme file should use the -color-theme.json suffix");
}

function validateTheme(theme: ThemeJson): void {
  assert(theme.$schema === "vscode://schemas/color-theme", "Theme should reference vscode://schemas/color-theme");
  assert(theme.name === "Tsoding Gruber Darker", "Unexpected theme name");
  assert(theme.type === "dark", "Theme type must be dark");
  assert(theme.semanticHighlighting === true, "semanticHighlighting should be enabled");
  assert(theme.colors && Object.keys(theme.colors).length > 0, "Theme must define workbench colors");
  assert(Array.isArray(theme.tokenColors) && theme.tokenColors.length > 0, "Theme must define tokenColors");
  assert(theme.semanticTokenColors && Object.keys(theme.semanticTokenColors).length > 0, "Theme must define semanticTokenColors");

  for (const [key, value] of Object.entries(theme.colors)) {
    assertHexColor(value, `colors.${key}`);
  }

  theme.tokenColors.forEach((rule, index) => {
    assert(rule.scope, `tokenColors[${index}] is missing scope`);
    assert(rule.settings, `tokenColors[${index}] is missing settings`);
    if (rule.settings?.foreground) assertHexColor(rule.settings.foreground, `tokenColors[${index}].foreground`);
    if (rule.settings?.background) assertHexColor(rule.settings.background, `tokenColors[${index}].background`);
  });

  for (const [selector, style] of Object.entries(theme.semanticTokenColors ?? {})) {
    if (typeof style === "string") {
      assertHexColor(style, `semanticTokenColors.${selector}`);
      continue;
    }
    if (style.foreground) assertHexColor(style.foreground, `semanticTokenColors.${selector}.foreground`);
    if (style.background) assertHexColor(style.background, `semanticTokenColors.${selector}.background`);
  }

  assertContrast(theme, "editor.foreground", "editor.background");
  assertContrast(theme, "activityBar.foreground", "activityBar.background");
  assertContrast(theme, "statusBar.noFolderForeground", "statusBar.noFolderBackground");
  assertContrast(theme, "editorLineNumber.activeForeground", "editor.background", 3);
}

function main(): void {
  const manifest = readJson<ExtensionManifest>(packagePath);
  const theme = readJson<ThemeJson>(themePath);

  validateManifest(manifest, theme);
  validateTheme(theme);

  console.log("Theme validation passed.");
}

main();
