const fs = require('fs');
const path = require('path');

const legacyHtmlPath = path.join(__dirname, '../legacy/index.html');
const cssOutPath = path.join(__dirname, 'src/app/globals.css');

const content = fs.readFileSync(legacyHtmlPath, 'utf8');

const styleStart = content.indexOf('<style>');
const styleEnd = content.indexOf('</style>');
if (styleStart !== -1 && styleEnd !== -1) {
  const css = content.slice(styleStart + 7, styleEnd);
  fs.writeFileSync(cssOutPath, css);
  console.log('Extracted CSS to globals.css');
}
