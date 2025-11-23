import { Colors, TokenColor, ThemeConfiguration } from "../../interface";

/**
 * Tokens are matched in order, with later entries overriding earlier ones.
 */

/**
 * Embedded and Meta contexts (highest base priority)
 */
function getEmbeddedTokens(colors: Colors): TokenColor[] {
  return [
    {
      name: "Embedded code and markdown images",
      scope: ["meta.embedded", "source.groovy.embedded", "string meta.image.inline.markdown"],
      settings: { foreground: colors.foreground },
    },
  ];
}

/**
 * Basic text formatting
 */
function getTextFormattingTokens(colors: Colors, config: ThemeConfiguration): TokenColor[] {
  const italic = config.italic ? "italic" : "";
  const bold = config.bold ? "bold" : "";
  return [
    {
      name: "Emphasis (italic)",
      scope: "emphasis",
      settings: { fontStyle: italic },
    },
    {
      name: "Strong (bold)",
      scope: "strong",
      settings: { fontStyle: bold },
    },
    {
      name: "Header",
      scope: "header",
      settings: { foreground: colors.yellow },
    },
  ];
}

/**
 * Comments
 */
function getCommentTokens(colors: Colors): TokenColor[] {
  return [
    {
      name: "Comments",
      scope: "comment",
      settings: { foreground: colors.orange },
    },
  ];
}

/**
 * Constants and literals
 */
function getConstantTokens(colors: Colors): TokenColor[] {
  return [
    {
      name: "Language constants",
      scope: "constant.language",
      settings: { foreground: "#95A99F" },
    },
    {
      name: "Constants and numbers",
      scope: [
        "constant",
        "constant.numeric",
        "variable.other.constant",
        "keyword.operator.plus.exponent",
        "keyword.operator.minus.exponent",
      ],
      settings: { foreground: colors.constantGreen },
    },
    {
      name: "Regular expressions",
      scope: "constant.regexp",
      settings: { foreground: colors.stringGreen },
    },
  ];
}

/**
 * HTML/XML Tags (General tag logic)
 */
function getTagTokens(colors: Colors): TokenColor[] {
  return [
    {
      name: "HTML/XML tags",
      scope: "entity.name.tag",
      settings: { foreground: colors.yellow },
    },
  ];
}

/**
 * Attributes
 */
function getAttributeTokens(colors: Colors): TokenColor[] {
  return [
    {
      name: "HTML/XML attributes",
      scope: "entity.other.attribute-name",
      settings: { foreground: colors.foreground },
    },
  ];
}

/**
 * Invalid/Error states
 */
function getInvalidTokens(colors: Colors): TokenColor[] {
  return [
    {
      name: "Invalid code",
      scope: "invalid",
      settings: { foreground: colors.red },
    },
  ];
}

/**
 * Markup (Markdown, etc.)
 */
function getMarkupTokens(colors: Colors, config: ThemeConfiguration): TokenColor[] {
  const italic = config.italic ? "italic" : "";
  const bold = config.bold ? "bold" : "";
  return [
    {
      name: "Markup underline",
      scope: "markup.underline",
      settings: {
        fontStyle: "underline",
        foreground: colors.lilac,
      },
    },
    {
      name: "Markup bold",
      scope: "markup.bold",
      settings: {
        fontStyle: bold,
        foreground: colors.lilac,
      },
    },
    {
      name: "Markup heading",
      scope: "markup.heading",
      settings: {
        fontStyle: bold,
        foreground: colors.yellow,
      },
    },
    {
      name: "Markup italic",
      scope: "markup.italic",
      settings: {
        fontStyle: italic,
        foreground: colors.lilac,
      },
    },
    {
      name: "Markup strikethrough",
      scope: "markup.strikethrough",
      settings: {
        fontStyle: "strikethrough",
        foreground: colors.lilac,
      },
    },
    {
      name: "Markup inserted",
      scope: "markup.inserted",
      settings: { foreground: colors.stringGreen },
    },
    {
      name: "Markup deleted",
      scope: "markup.deleted",
      settings: { foreground: colors.red },
    },
    {
      name: "Markup changed",
      scope: "markup.changed",
      settings: { foreground: colors.yellow },
    },
    {
      name: "Markdown quote begin",
      scope: "punctuation.definition.quote.begin.markdown",
      settings: { foreground: colors.orange },
    },
    {
      name: "Markdown list begin",
      scope: "punctuation.definition.list.begin.markdown",
      settings: { foreground: colors.yellow },
    },
    {
      name: "Markdown inline raw",
      scope: "markup.inline.raw",
      settings: { foreground: colors.stringGreen },
    },
  ];
}

/**
 * Punctuation
 */
function getPunctuationTokens(colors: Colors): TokenColor[] {
  return [
    {
      name: "Brackets of XML/HTML tags",
      scope: "punctuation.definition.tag",
      settings: { foreground: colors.nickel },
    },
  ];
}

/**
 * Preprocessor directives
 */
function getPreprocessorTokens(colors: Colors): TokenColor[] {
  return [
    {
      name: "Preprocessor directives",
      scope: ["meta.preprocessor", "entity.name.function.preprocessor"],
      settings: { foreground: colors.yellow },
    },
    {
      name: "Preprocessor strings",
      scope: "meta.preprocessor.string",
      settings: { foreground: colors.stringGreen },
    },
    {
      name: "Preprocessor numbers",
      scope: "meta.preprocessor.numeric",
      settings: { foreground: colors.constantGreen },
    },
  ];
}

/**
 * Diff headers
 */
function getDiffTokens(colors: Colors): TokenColor[] {
  return [
    {
      name: "Diff header",
      scope: "meta.diff.header",
      settings: { foreground: colors.yellow },
    },
  ];
}

/**
 * Storage modifiers and keywords
 */
function getStorageTokens(colors: Colors): TokenColor[] {
  return [
    {
      name: "Storage",
      scope: "storage",
      settings: { foreground: colors.yellow },
    },
    {
      name: "Storage type",
      scope: "storage.type",
      settings: { foreground: colors.yellow },
    },
    {
      name: "Storage modifiers",
      scope: ["storage.modifier", "keyword.operator.noexcept"],
      settings: { foreground: colors.yellow },
    },
  ];
}

/**
 * Strings
 */
function getStringTokens(colors: Colors): TokenColor[] {
  return [
    {
      name: "Strings",
      scope: ["string", "meta.embedded.assembly"],
      settings: { foreground: colors.stringGreen },
    },
    {
      name: "String tags",
      scope: "string.tag",
      settings: { foreground: colors.stringGreen },
    },
    {
      name: "String values",
      scope: "string.value",
      settings: { foreground: colors.stringGreen },
    },
    {
      name: "Regular expression strings",
      scope: "string.regexp",
      settings: { foreground: colors.stringGreen },
    },
  ];
}

/**
 * String interpolation
 */
function getStringInterpolationTokens(colors: Colors): TokenColor[] {
  return [
    {
      name: "String interpolation",
      scope: [
        "punctuation.definition.template-expression.begin",
        "punctuation.definition.template-expression.end",
        "punctuation.section.embedded",
      ],
      settings: { foreground: colors.yellow },
    },
    {
      name: "Reset JavaScript string interpolation expression",
      scope: ["meta.template.expression"],
      settings: { foreground: colors.foreground },
    },
  ];
}

/**
 * Keywords
 */
function getKeywordTokens(colors: Colors): TokenColor[] {
  return [
    {
      name: "Keywords",
      scope: "keyword",
      settings: { foreground: colors.yellow },
    },
    {
      name: "Control keywords",
      scope: "keyword.control",
      settings: { foreground: colors.yellow },
    },
    {
      name: "Operator keywords",
      scope: "keyword.operator",
      settings: { foreground: colors.yellow },
    },
    {
      name: "Special operator keywords",
      scope: [
        "keyword.operator.new",
        "keyword.operator.expression",
        "keyword.operator.cast",
        "keyword.operator.sizeof",
        "keyword.operator.alignof",
        "keyword.operator.typeid",
        "keyword.operator.alignas",
        "keyword.operator.instanceof",
        "keyword.operator.wordlike",
      ],
      settings: { foreground: colors.yellow },
    },
    {
      name: "Unit keywords",
      scope: "keyword.other.unit",
      settings: { foreground: colors.constantGreen },
    },
  ];
}

/**
 * Variables
 */
function getVariableTokens(colors: Colors): TokenColor[] {
  return [
    {
      name: "Variables",
      scope: ["variable", "variable.other.readwrite", "variable.other.enummember", "variable.other.metavariable.name"],
      settings: { foreground: colors.foreground },
    },
  ];
}

/**
 * Types
 */
function getTypeTokens(colors: Colors): TokenColor[] {
  return [
    {
      name: "Types and annotations",
      scope: [
        "entity.name.type",
        "entity.other.inherited-class",
        "entity.name.type.primitive",
        "entity.name.type.numeric",
        "storage.type.primitive",
      ],
      settings: { foreground: colors.nickel },
    },
  ];
}

/**
 * Token inspection colors
 */
function getInspectionTokens(colors: Colors): TokenColor[] {
  return [
    {
      name: "Info token",
      scope: "token.info-token",
      settings: { foreground: "#6796E6" },
    },
    {
      name: "Warning token",
      scope: "token.warn-token",
      settings: { foreground: "#CD9731" },
    },
    {
      name: "Debug token",
      scope: "token.debug-token",
      settings: { foreground: "#B267E6" },
    },
  ];
}

/**
 * Main export
 */
export function getAllTokenColors(colors: Colors, config: ThemeConfiguration): TokenColor[] {
  return [
    ...getEmbeddedTokens(colors),
    ...getTextFormattingTokens(colors, config),
    ...getCommentTokens(colors),
    ...getConstantTokens(colors),
    ...getTagTokens(colors),
    ...getAttributeTokens(colors),
    ...getInvalidTokens(colors),
    ...getMarkupTokens(colors, config),
    ...getPunctuationTokens(colors),
    ...getPreprocessorTokens(colors),
    ...getDiffTokens(colors),
    ...getStorageTokens(colors),
    ...getStringTokens(colors),
    ...getStringInterpolationTokens(colors),
    ...getKeywordTokens(colors),
    ...getVariableTokens(colors),
    ...getTypeTokens(colors),
    ...getInspectionTokens(colors),
  ];
}
