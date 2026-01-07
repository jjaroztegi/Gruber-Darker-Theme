import { Colors } from "../../interface";

/**
 * Semantic token colors for language-aware highlighting
 * These are used by LSP servers for more intelligent highlighting
 */
export function getSemantic(colors: Colors) {
  return {
    newOperator: colors.yellow,
    stringLiteral: colors.stringGreen,
    customLiteral: colors.constantGreen,
    numberLiteral: colors.constantGreen,
    parameter: { foreground: colors.foreground },
    type: { foreground: colors.nickel },
    namespace: { foreground: colors.namespaceForeground },
    macro: { foreground: colors.constantGreen },
    function: { foreground: colors.foreground },
    method: { foreground: colors.foreground },
    property: { foreground: colors.foreground },
    variable: { foreground: colors.foreground },
    "variable.readonly": { foreground: colors.constantGreen },
    "variable.defaultLibrary": { foreground: colors.nickel },
    class: { foreground: colors.nickel },
    interface: { foreground: colors.nickel },
    enum: { foreground: colors.nickel },
    enumMember: { foreground: colors.constantGreen },
    struct: { foreground: colors.nickel },
    keyword: { foreground: colors.yellow },
    modifier: { foreground: colors.yellow },
    decorator: { foreground: colors.nickel },
    regexp: { foreground: colors.stringGreen },
    operator: { foreground: colors.foreground },
  };
}
