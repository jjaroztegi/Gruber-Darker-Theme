export interface Colors {
  background: string
  foreground: string
  uiBackground: string
  selection: string
  cursor: string
  yellow: string
  stringGreen: string
  constantGreen: string
  lilac: string
  red: string
  orange: string
  gray: string
  darkGray: string
  nickel: string
  white: string
  blue: string
  bracketForeground: string

  // Extended colors for fine-grained control
  lightForeground: string
  namespaceForeground: string

  // Special colors
  transparent: string
  findMatchBg: string
  findMatchFg: string
  findHighlightBg: string
  findHighlightFg: string
  hoverHighlight: string
  wordHighlightStrong: string
}

export interface TokenColor {
  name?: string
  scope: string | string[]
  settings: {
    foreground?: string
    fontStyle?: string
    background?: string
  }
}

export interface ThemeConfiguration {
  bold?: boolean
  italic?: boolean
  editorTheme?: string
}

/**
 * Priority levels for token color resolution
 * Higher priority = later in array = wins in VS Code
 */
export enum TokenPriority {
  BASE = 0,           // Fundamental types (variables, functions)
  LANGUAGE = 100,     // Language-specific overrides
  CONTEXTUAL = 200,   // Context-specific (embedded, meta)
  OVERRIDE = 300      // Explicit overrides (comments, errors)
}