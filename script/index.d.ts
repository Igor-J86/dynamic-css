import type { Plugin } from "vite";

export interface DynamicCSSUtilitiesOptions {
  /** Root folder to scan for JSX/TSX files.
   * Default: "app"
   */ 
  rootFolder?: string;

  /**
   * Directory to put assets.
   * Default: "app/css/"
   */
  assetsPath?: string;

  /**
   * Output file name.
   * Default: "dynamic.css"
   */
  fileName?: string;
}

export default function DynamicCSSUtilities(options?: DynamicCSSUtilitiesOptions): Plugin;