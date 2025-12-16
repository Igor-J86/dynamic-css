import fs from "fs";
import path from "path";

// Map short prefixes → CSS property names
export const PROP_MAP = {
  w: "width",
  h: "height",
  maxw: "max-width",
  minw: "min-width",
  maxh: "max-height",
  minh: "min-height",
  text: "font-size",
  ma: "margin",
  pa: "padding",
  mt: "margin-top",
  mb: "margin-bottom",
  ml: "margin-left",
  mr: "margin-right",
  pt: "padding-top",
  pb: "padding-bottom",
  pl: "padding-left",
  pr: "padding-right",
  gap: "gap",
  bg: "background-color",
  color: "color",
  fd: "flex-direction",
  fb: "flex-basis",
  fg: "flex-grow",
  fs: "flex-shrink",
  fw: "flex-wrap",
  ac: "align-content",
  ai: "align-items",
  jc: "justify-content",
  ji: "justify-items",
  p: "position",
  t: "top",
  b: "bottom",
  l: "left",
  r: "right",
  z: "z-index",
  d: "display",
  br: "border-radius",
  brtl: "border-top-left-radius",
  brtr: "border-top-right-radius",
  brbl: "border-bottom-left-radius",
  brbr: "border-bottom-right-radius",
  bc: "border-color",
  bw: "border-width",
  bs: "border-style",
  ws: "white-space",
  lh: "line-height",
};

function generateCSS(source:string) {
  const dynamicClasses = extractDynamicUtilities(source);

  let css = "";
  css = "/* Auto-generated css */\n";

  for (const match of dynamicClasses) {
    const [, prop, value, unit] = match as [string, string, string, string];

    if (!PROP_MAP[prop as keyof typeof PROP_MAP]) continue;

    const cssProp = PROP_MAP[prop as keyof typeof PROP_MAP];
    const cssValue = `${value}${unit}`;
    const className = escapeClassName(`${prop}[${value}]${unit}`);

    if (css.includes(`.${className} `)) continue;
    if (cssValue.startsWith("--")) {
      css += `.${className} { ${cssProp}: var(${cssValue}); }\n`;
      continue;
    }
    css += `.${className} { ${cssProp}: ${cssValue}; }\n`;
  }

  return css;
}

function escapeClassName(className: string) {
  return className.replace(/[\[\].%(),\/#\s]/g, (match) => `\\${match}`);
}

// Regex for extracting class and className attributes
const CLASS_ATTR_REGEX = /\bclass(Name)?\s*=\s*["'`](.*?)["'`]/gsi;

function extractClassNames(source: string) {
  const result = [];
  let match;

  while ((match = CLASS_ATTR_REGEX.exec(source))) {
    const raw = match[2]; // content inside quotes

    // Split on whitespace, but not within square brackets
    const classes = raw.match(/[^\s\[]+(?:\[[^\]]*\])?/g) || [];

    result.push(...classes.filter(Boolean));
  }

  return result;
}

// Regex for custom syntax: e.g. maxw[24]rem, w[420]px, h[70]vh etc.
const DYNAMIC_CLASS_REGEX = /^([a-z-]+)\[([^\]]+)\]([a-z%]*)$/i;

function extractDynamicUtilities(source: string) {
  const classes = extractClassNames(source);

  return classes
    .map(cls => cls.match(DYNAMIC_CLASS_REGEX))
    .filter(Boolean);
}

// Recursively collect file contents under /app folder
function collectSourceFiles(dir: string): string {
  let content = "";
  const files = fs.readdirSync(dir);

  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      content += collectSourceFiles(full);
    } else if (/\.(jsx?|tsx?|vue|svelte|astro)$/.test(f)) {
      content += fs.readFileSync(full, "utf8");
    }
  }
  
  return content;
}

export default function DynamicCSSUtilities(userConfig: { assetsPath?: string; fileName?: string; rootFolder?: string } = {}) {
  const OUTPUT_FILE = path.resolve(process.cwd(), userConfig.assetsPath || "app/css/", userConfig.fileName || "dynamic.css");
  const WATCH_DIR = path.resolve(process.cwd(),  userConfig.rootFolder || "app");

  console.log("[dynamic-css] watching:", WATCH_DIR);

  function regenerate() {
    const source = collectSourceFiles(WATCH_DIR);
    const css = generateCSS(source);
    fs.writeFileSync(OUTPUT_FILE, css);
    console.log("[dynamic-css] regenerated");
  }

  return {
    name: "vite-plugin-dynamic-css",

    // Runs once at server startup
    buildStart() {
      regenerate();
    },
    configureServer(server: any) {
      server.watcher.add(WATCH_DIR);

      server.watcher.on("change", (file: string) => {
        if (!/\.(jsx?|tsx?)$/.test(file)) return;
        regenerate();

        // Force Vite full reload so new CSS applies immediately
        server.ws.send({
          type: "full-reload"
        });
      });
    }
  };
}
