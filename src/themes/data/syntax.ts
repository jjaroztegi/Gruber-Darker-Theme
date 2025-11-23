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
    namespace: { foreground: "#ece9da" },
    macro: { foreground: colors.constantGreen },
  };
}
