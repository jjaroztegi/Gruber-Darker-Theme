import { ThemeConfiguration } from "../interface";
import { palette } from "./data/palette";
import ui from "./data/ui";
import { getSemantic } from "./data/syntax";
import { getAllTokenColors } from "./data/tokens";
import { getLanguageOverrides } from "./data/language-overrides";

/**
 * Theme class that generates the complete VS Code theme
 */
export class Theme {
  $schema = "vscode://schemas/color-theme";
  name = "Tsoding Gruber Darker";
  type = "dark";
  semanticHighlighting = true;
  semanticTokenColors;
  tokenColors;
  colors;

  constructor(configuration: ThemeConfiguration) {
    // 1. Initialize Semantic Token Colors (LSP-based)
    this.semanticTokenColors = getSemantic(palette);

    // 2. Initialize Token Colors
    // Base tokens first, then language overrides
    this.tokenColors = [
      ...getAllTokenColors(palette, configuration),
      ...getLanguageOverrides(palette, configuration)
    ]

    // 3. Initialize UI Colors
    this.colors = ui(palette);
  }

  static init(config: ThemeConfiguration) {
    return new Theme(config);
  }
}
