const fs = require('fs');
const path = require('path');

const outPath = path.join(__dirname, 'src/components/HomeClient.jsx');
let content = fs.readFileSync(outPath, 'utf8');

// Fix onclick -> onClick
content = content.replace(/onclick=/g, 'onClick=');

// Fix {01}, {02}, {03} -> "01", "02", "03"
content = content.replace(/\{01\}/g, '"01"');
content = content.replace(/\{02\}/g, '"02"');
content = content.replace(/\{03\}/g, '"03"');

// We also need to define `closeMenu` or remove the onclick since it's an inline function that isn't defined
content = content.replace(/onClick="closeMenu\(\)"/g, 'onClick={() => {}}');

fs.writeFileSync(outPath, content);
console.log('Fixed JSX issues');
