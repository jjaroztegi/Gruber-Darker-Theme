import { Colors, TokenColor, ThemeConfiguration } from "../../interface";

/**
 * Language-specific token overrides.
 */

export function getLanguageOverrides(colors: Colors, config: ThemeConfiguration): TokenColor[] {
  return [
    ...getZigOverrides(colors),
    ...getCSSOverrides(colors),
    ...getPythonOverrides(colors),
    ...getJavaOverrides(colors),
    ...getCCppOverrides(colors),
    ...getJSONOverrides(colors),
    ...getYAMLOverrides(colors),
    ...getHTMLXMLOverrides(colors),
    ...getPHPOverrides(colors),
    ...getGitOverrides(colors),
    ...getGoOverrides(colors),
    ...getRustOverrides(colors),
    ...getSpecialValueTokens(colors),
  ];
}

function getZigOverrides(colors: Colors): TokenColor[] {
  return [
    {
      name: "Zig Constants",
      scope: ["keyword.constant.bool.zig", "keyword.constant.default.zig"],
      settings: { foreground: colors.constantGreen },
    },
    {
      name: "Zig Types",
      scope: ["keyword.type.zig", "keyword.type.integer.zig", "keyword.type.c.zig"],
      settings: { foreground: colors.nickel },
    },
  ];
}

function getCSSOverrides(colors: Colors): TokenColor[] {
  return [
    {
      name: "CSS tags",
      scope: "entity.name.tag.css",
      settings: { foreground: colors.yellow },
    },
    {
      name: "CSS classes, IDs, and pseudo-selectors",
      scope: [
        "entity.other.attribute-name.class.css",
        "entity.other.attribute-name.class.mixin.css",
        "entity.other.attribute-name.id.css",
        "entity.other.attribute-name.parent-selector.css",
        "entity.other.attribute-name.pseudo-class.css",
        "entity.other.attribute-name.pseudo-element.css",
        "source.css.less entity.other.attribute-name.id",
        "entity.other.attribute-name.scss",
      ],
      settings: { foreground: colors.yellow },
    },
    {
      name: "CSS properties",
      scope: [
        "support.type.vendored.property-name",
        "support.type.property-name",
        "variable.css",
        "variable.scss",
        "variable.other.less",
        "source.coffee.embedded",
      ],
      settings: { foreground: colors.foreground },
    },
  ];
}

function getPythonOverrides(colors: Colors): TokenColor[] {
  return [
    {
      name: "Python dictionary keys",
      scope: "meta.structure.dictionary.key.python",
      settings: { foreground: colors.foreground },
    },
    {
      name: "Python Logical Operators",
      scope: "keyword.operator.logical.python",
      settings: { foreground: colors.yellow },
    },
    {
      name: "Python Magic/Decorators",
      scope: ["support.variable.magic.python", "support.function.magic.python", "meta.function.decorator.python"],
      settings: { foreground: colors.nickel },
    },
  ];
}

function getJavaOverrides(colors: Colors): TokenColor[] {
  return [
    {
      name: "Java import and package identifiers",
      scope: ["storage.modifier.import.java", "variable.language.wildcard.java", "storage.modifier.package.java"],
      settings: { foreground: colors.lightForeground },
    },
    {
      name: "Java types and annotations",
      scope: [
        "storage.type.annotation.java",
        "punctuation.definition.annotation.java",
        "storage.type.java",
        "storage.type.generic.java",
        "storage.type.object.array.java",
      ],
      settings: { foreground: colors.nickel },
    },
  ];
}

function getCCppOverrides(colors: Colors): TokenColor[] {
  return [
    {
      name: "C/C++ Preprocessor",
      scope: ["entity.name.function.preprocessor.c", "entity.name.function.preprocessor.cpp"],
      settings: { foreground: colors.lightForeground },
    },
    {
      name: "C/C++ Arrays and Primitives",
      scope: ["storage.modifier.array.bracket.square.c", "storage.modifier.array.bracket.square.cpp"],
      settings: { foreground: colors.lightForeground },
    },
    {
      name: "C/C++ Primitives",
      scope: ["storage.type.built-in.primitive.cpp", "storage.type.built-in.primitive.c"],
      settings: { foreground: colors.nickel },
    },
  ];
}

function getJSONOverrides(colors: Colors): TokenColor[] {
  return [
    {
      name: "JSON Property Names",
      scope: "support.type.property-name.json",
      settings: { foreground: colors.lightForeground },
    },
  ];
}

function getYAMLOverrides(colors: Colors): TokenColor[] {
  return [
    {
      name: "YAML Tag Names",
      scope: "entity.name.tag.yaml",
      settings: { foreground: colors.lightForeground },
    },
  ];
}

function getHTMLXMLOverrides(colors: Colors): TokenColor[] {
  return [
    {
      name: "HTML Doctype",
      scope: "meta.tag.metadata.doctype.html",
      settings: { foreground: colors.nickel },
    },
    {
      name: "Specific Tag Names (HTML/XML/TOML)",
      scope: ["meta.tag.xml", "entity.name.tag.html", "meta.tag.table.toml"],
      settings: { foreground: colors.yellow },
    },
  ];
}

function getPHPOverrides(colors: Colors): TokenColor[] {
  return [
    {
      name: "PHP embedded sections",
      scope: ["punctuation.section.embedded.begin.php", "punctuation.section.embedded.end.php"],
      settings: { foreground: colors.yellow },
    },
  ];
}

function getGitOverrides(colors: Colors): TokenColor[] {
  return [
    {
      name: "Git rebase functions",
      scope: "support.function.git-rebase",
      settings: { foreground: colors.foreground },
    },
    {
      name: "Git SHA",
      scope: "constant.sha.git-rebase",
      settings: { foreground: colors.constantGreen },
    },
  ];
}

function getGoOverrides(colors: Colors): TokenColor[] {
  return [
    {
      name: "Go types",
      scope: [
        "storage.type.string.go",
        "storage.type.int.go",
        "storage.type.error.go",
        "storage.type.byte.go",
        "storage.type.numeric.go",
        "storage.type.boolean.go",
        "storage.type.rune.go",
        "storage.type.uintptr.go",
      ],
      settings: { foreground: colors.nickel },
    },
  ];
}

function getRustOverrides(colors: Colors): TokenColor[] {
  return [
    {
      name: "Rust Result/Option",
      scope: ["entity.name.type.result", "entity.name.type.option"],
      settings: { foreground: colors.yellow },
    },
    {
      name: "Rust Metavariable specifier",
      scope: "variable.other.metavariable.specifier",
      settings: { foreground: colors.yellow },
    },
  ];
}

function getSpecialValueTokens(colors: Colors): TokenColor[] {
  return [
    {
      name: "Special values (CSS/Rust/Hex)",
      scope: [
        "support.constant.property-value.css",
        "support.constant.color.w3c-standard-color-name.css",
        "entity.name.type.lifetime", // Rust
        "keyword.other.unit.hexadecimal",
      ],
      settings: { foreground: colors.lilac },
    },
    {
      name: "Storage Modifier Array (General but used in Java context)",
      scope: "storage.modifier.array",
      settings: { foreground: colors.lightForeground },
    },
    {
      name: "Julia Types",
      scope: "support.type.julia",
      settings: { foreground: colors.nickel },
    },
    {
      name: "Language variables (this, self)",
      scope: "variable.language",
      settings: { foreground: colors.yellow },
    },
  ];
}
