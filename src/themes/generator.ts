import { Theme } from "./Theme";
import * as fs from "fs";
import * as path from "path";

const defaultSettings = JSON.parse(fs.readFileSync(path.join(__dirname, "../defaultconfig.json"), "utf8"));

export const generateTheme = {
  // Use default settings from defaultconfig.json
  async default() {
    return Theme.init(defaultSettings);
  },

  // Allow passing custom settings if needed in the future
  async withConfig(config: any) {
    return Theme.init({ ...defaultSettings, ...config });
  },
};
