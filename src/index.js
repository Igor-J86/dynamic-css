import fs from "fs";
import path from "path";

// Map short prefixes → CSS property names
const PROP_MAP = {
  w: "width",
  h: "height",
  maxw: "max-width",
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
  flex: "flex",
};

function generateCSS(source) {
  const dynamicClasses = extractDynamicUtilities(source);

  let css = "";
  css = "/* Auto-generated css */\n";

  for (const match of dynamicClasses) {
    const [, prop, value, unit] = match;

    if (!PROP_MAP[prop]) continue;

    const cssProp = PROP_MAP[prop];
    const cssValue = `${value}${unit}`;
    const className = escapeClassName(`${prop}[${value}]${unit}`);

    if (css.includes(`.${className} `)) continue;
    css += `.${className} { ${cssProp}: ${cssValue}; }\n`;
  }

  return css;
}

function escapeClassName(className) {
  return className.replace(/[\[\].%(),\/]/g, (match) => `\\${match}`);
}

// Regex for extracting class and className attributes
const CLASS_ATTR_REGEX = /\bclass(Name)?\s*=\s*["'`](.*?)["'`]/gsi;

function extractClassNames(source) {
  const result = [];
  let match;

  while ((match = CLASS_ATTR_REGEX.exec(source))) {
    const raw = match[2]; // content inside quotes

    const classes = raw
      .split(/\s+/)
      .filter(Boolean);

    result.push(...classes);
  }

  return result;
}

// Regex for custom syntax: e.g. maxw[24]rem, w[420]px, h[70]vh etc.
const DYNAMIC_CLASS_REGEX = /^([a-z]+)\[([^\]]+)\]([a-z%]*)$/i;

function extractDynamicUtilities(source) {
  const classes = extractClassNames(source);

  return classes
    .map(cls => cls.match(DYNAMIC_CLASS_REGEX))
    .filter(Boolean);
}

// Recursively collect file contents under /app folder
function collectSourceFiles(dir) {
  let content = "";
  const files = fs.readdirSync(dir);

  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      content += collectSourceFiles(full);
    } else if (/\.(jsx?|tsx?)$/.test(f)) {
      content += fs.readFileSync(full, "utf8");
    }
  }
  
  return content;
}

export default function DynamicCSSUtilities(userConfig = {}) {
  const OUTPUT_FILE = path.resolve(process.cwd(), userConfig.assetsPath || "app/css/", userConfig.fileName || "dynamic.css");
  const WATCH_DIR = path.resolve(process.cwd(),  userConfig.rootFolder || "app");

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
    configureServer(server) {
      server.watcher.add(WATCH_DIR);

      server.watcher.on("change", (file) => {
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
