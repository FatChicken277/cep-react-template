// scripts/build-extension.js
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, resolve, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distPath = resolve(__dirname, "../dist");
const buildPath = resolve(__dirname, "../extension/panico-vfx");

const csInterfacePath = resolve(__dirname, "../public/CSInterface.js");
const manifestPath = resolve(__dirname, "../public/manifest.xml");

// 🔁 Limpiar y crear
fs.removeSync(buildPath);
fs.ensureDirSync(buildPath);

// 📁 Copiar el build UI
fs.copySync(distPath, buildPath, {
  filter: (src) => {
    return !["manifest.xml", "CSInterface.js"].some((name) =>
      src.endsWith(name)
    );
  },
});

// 📁 CSInterface
fs.ensureDirSync(join(buildPath, "js"));
fs.copyFileSync(csInterfacePath, join(buildPath, "js", "CSInterface.js"));

// 🔧 Reescribir ruta de CSInterface.js en index.html
const indexHtmlPath = join(buildPath, "index.html");
let html = fs.readFileSync(indexHtmlPath, "utf-8");

html = html.replace(
  /<script\s+src=["']CSInterface\.js["']><\/script>/,
  `<script src="js/CSInterface.js"></script>`
);

fs.writeFileSync(indexHtmlPath, html);

// 📁 manifest.xml
fs.ensureDirSync(join(buildPath, "CSXS"));
fs.copyFileSync(manifestPath, join(buildPath, "CSXS", "manifest.xml"));

// 📁 ExtendScript
fs.ensureDirSync(join(buildPath, "jsx"));
fs.copySync(resolve(__dirname, "../extendscript"), join(buildPath, "jsx"));

console.log("✅ CEP extension ready at /extension/panico-vfx");
