import { Colors } from "../../interface";

/**
 * UI color definitions for VS Code interface elements
 */
export default (colors: Colors) => ({
  // Activity Bar
  "activityBar.background": colors.uiBackground,
  "activityBar.foreground": colors.white,
  "activityBar.inactiveForeground": colors.darkGray,
  "activityBarBadge.background": colors.yellow,
  "activityBarBadge.foreground": "#000000",

  // Buttons
  "button.background": colors.yellow,
  "button.foreground": "#000000",

  // Editor - Main editing area
  "editor.background": colors.background,
  "editor.foreground": colors.foreground,
  "editorCursor.foreground": colors.cursor,

  // Editor - Find/Replace
  "editor.findMatchBackground": colors.findMatchBg,
  "editor.findMatchForeground": colors.findMatchFg,
  "editor.findMatchHighlightBackground": colors.findHighlightBg,
  "editor.findMatchHighlightForeground": colors.findHighlightFg,
  "editor.hoverHighlightBackground": colors.hoverHighlight,

  // Editor - Selections
  "editor.selectionBackground": colors.selection,
  "editor.selectionHighlightBackground": colors.selection,

  // Editor - Word Highlights
  "editor.wordHighlightBackground": colors.transparent,
  "editor.wordHighlightStrongBackground": colors.wordHighlightStrong,

  // Editor - Errors/Warnings/Info
  "editorError.background": colors.transparent,
  "editorError.foreground": colors.red,
  "editorWarning.background": colors.transparent,
  "editorWarning.foreground": colors.orange,
  "editorInfo.background": colors.transparent,

  // Editor - Gutter & Lines
  "editorGutter.background": colors.background,
  "editorLineNumber.foreground": colors.gray,
  "editorLineNumber.activeForeground": colors.yellow,
  "editorLink.activeForeground": colors.blue,

  // Editor - Groups & Widgets
  "editorGroupHeader.tabsBackground": colors.background,
  "editorWidget.background": colors.uiBackground,

  // Editor - Bracket Highlighting
  "editorBracketHighlight.foreground1": colors.bracketForeground,
  "editorBracketHighlight.foreground2": colors.bracketForeground,
  "editorBracketHighlight.foreground3": colors.bracketForeground,
  "editorBracketHighlight.foreground4": colors.bracketForeground,
  "editorBracketHighlight.foreground5": colors.bracketForeground,
  "editorBracketHighlight.foreground6": colors.bracketForeground,
  "editorBracketHighlight.unexpectedBracket.foreground": colors.red,

  // Editor - Bracket Matching
  "editorBracketMatch.background": colors.darkGray,
  "editorBracketMatch.border": colors.transparent,

  // Editor - Bracket Pair Guides (Active)
  "editorBracketPairGuide.activeBackground1": colors.uiBackground,
  "editorBracketPairGuide.activeBackground2": colors.uiBackground,
  "editorBracketPairGuide.activeBackground3": colors.uiBackground,
  "editorBracketPairGuide.activeBackground4": colors.uiBackground,
  "editorBracketPairGuide.activeBackground5": colors.uiBackground,
  "editorBracketPairGuide.activeBackground6": colors.uiBackground,

  // Editor - Bracket Pair Guides (Inactive)
  "editorBracketPairGuide.background1": colors.darkGray,
  "editorBracketPairGuide.background2": colors.darkGray,
  "editorBracketPairGuide.background3": colors.darkGray,
  "editorBracketPairGuide.background4": colors.darkGray,
  "editorBracketPairGuide.background5": colors.darkGray,
  "editorBracketPairGuide.background6": colors.darkGray,

  // Sidebar
  "sideBar.background": colors.background,

  // Status Bar
  "statusBar.background": colors.uiBackground,
  "statusBar.noFolderBackground": colors.uiBackground,
  "statusBar.noFolderForeground": colors.white,

  // Title Bar
  "titleBar.activeBackground": colors.uiBackground,
  "titleBar.border": colors.uiBackground,

  // Text Links
  "textLink.activeForeground": colors.blue,
  "textLink.foreground": colors.lilac,
});
