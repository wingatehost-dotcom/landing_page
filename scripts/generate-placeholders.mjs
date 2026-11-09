/**
 * Generates the local SVG placeholders used for divisions that do not yet have
 * photography. Colours are read from src/config/theme.ts so placeholders always
 * match the site theme. Run with: node scripts/generate-placeholders.mjs
 */
import fs from "node:fs";
import path from "node:path";

const themeSource = fs.readFileSync("src/config/theme.ts", "utf8");
const readColor = (name) => {
  const match = themeSource.match(new RegExp(`\\b${name}:\\s*"(#[0-9A-Fa-f]{6})"`));
  if (!match) throw new Error(`Missing colour: ${name}`);
  return match[1];
};

const colors = {
  primary: readColor("primary"),
  secondary: readColor("secondary"),
  third: readColor("third"),
  fourth: readColor("fourth"),
};

const icons = {
  hammer:
    '<path d="M15 12l-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9"/><path d="M17.64 15L22 10.64"/><path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"/>',
  layers:
    '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  building:
    '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
  wrench:
    '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  egg: '<path d="M12 2C8.5 7 6 10.5 6 14a6 6 0 0 0 12 0c0-3.5-2.5-7-6-12Z"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  shirt:
    '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',
};

const slots = [
  ["furniture-hero", "Carpentry & Furniture", "hammer", "hero"],
  ["furniture-1", "Home & Office Furniture", "hammer", "card"],
  ["furniture-2", "Doors, Windows & Hybrid Designs", "hammer", "card"],
  ["parquet-hero", "Wooden Parquet Flooring", "layers", "hero"],
  ["parquet-1", "Crafted Flooring", "layers", "card"],
  ["parquet-2", "Made to Order", "layers", "card"],
  ["construction-hero", "Construction & Renovation", "building", "hero"],
  ["construction-1", "Building Construction", "building", "card"],
  ["construction-2", "Renovation Work", "building", "card"],
  ["machinery-hero", "Machinery Manufacturing", "wrench", "hero"],
  ["machinery-1", "Local Fabrication", "wrench", "card"],
  ["machinery-2", "Equipment & Technical Support", "wrench", "card"],
  ["electrical-hero", "Electrical & Electronic Technology", "zap", "hero"],
  ["electrical-1", "Installation & Technology Work", "zap", "card"],
  ["electrical-2", "Maintenance & Repair", "zap", "card"],
  ["poultry-1", "Poultry & Egg Production", "egg", "card"],
  ["feed-1", "Poultry & Cattle Feed", "leaf", "card"],
  ["textile-hero", "Textile & Garment", "shirt", "hero"],
  ["textile-1", "Garment Production", "shirt", "card"],
  ["textile-2", "Textile & Institutional Orders", "shirt", "card"],
];

const sizes = {
  hero: { width: 1920, height: 1080 },
  card: { width: 1200, height: 900 },
};

const outputDir = path.join("public", "images", "divisions");
fs.mkdirSync(outputDir, { recursive: true });

const escapeXml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

for (const [name, label, icon, kind] of slots) {
  const { width, height } = sizes[kind];
  const isWide = width / height > 1.5;
  const iconScale = isWide ? 6.5 : 7.5;
  const iconSize = 24 * iconScale;
  const iconX = width / 2 - iconSize / 2;
  const iconY = height * 0.24;
  const titleY = height * 0.66;
  const subtitleY = titleY + (isWide ? 58 : 52);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(label)} placeholder illustration">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${colors.primary}"/>
      <stop offset="58%" stop-color="${colors.primary}"/>
      <stop offset="100%" stop-color="${colors.secondary}"/>
    </linearGradient>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0H0V64" fill="none" stroke="${colors.fourth}" stroke-opacity="0.07" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>
  <circle cx="${width * 0.86}" cy="${height * 0.16}" r="${height * 0.26}" fill="${colors.third}" fill-opacity="0.12"/>
  <circle cx="${width * 0.74}" cy="${height * 0.9}" r="${height * 0.32}" fill="${colors.secondary}" fill-opacity="0.35"/>
  <g transform="translate(${iconX} ${iconY}) scale(${iconScale})" fill="none" stroke="${colors.third}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    ${icons[icon]}
  </g>
  <rect x="${width / 2 - 48}" y="${height * 0.55}" width="96" height="6" rx="3" fill="${colors.third}"/>
  <text x="${width / 2}" y="${titleY}" text-anchor="middle" fill="${colors.fourth}" font-family="Inter, 'Segoe UI', Arial, sans-serif" font-size="${isWide ? 46 : 42}" font-weight="700" letter-spacing="5">PHOTO COMING SOON</text>
  <text x="${width / 2}" y="${subtitleY}" text-anchor="middle" fill="${colors.fourth}" fill-opacity="0.68" font-family="Inter, 'Segoe UI', Arial, sans-serif" font-size="${isWide ? 26 : 24}" font-weight="500">Photography to be supplied</text>
</svg>
`;

  fs.writeFileSync(path.join(outputDir, `${name}.svg`), svg, "utf8");
}

console.log(`Generated ${slots.length} placeholder images in ${outputDir}`);
