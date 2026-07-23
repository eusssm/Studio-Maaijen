const fs = require('fs');
const path = require('path');

const legacyHtmlPath = path.join(__dirname, '../legacy/index.html');
const outPath = path.join(__dirname, 'src/components/HomeClient.jsx');

const content = fs.readFileSync(legacyHtmlPath, 'utf8');

// Extract body inner HTML
const bodyStart = content.indexOf('<body');
const bodyStartClose = content.indexOf('>', bodyStart);
const bodyEnd = content.indexOf('</body>');

let html = content.slice(bodyStartClose + 1, bodyEnd);

// Basic HTML to JSX conversions
html = html.replace(/class=/g, 'className=');
html = html.replace(/<!--[\s\S]*?-->/g, ''); // Remove comments
html = html.replace(/<img(.*?)>/g, (match) => {
  if (match.endsWith('/>')) return match;
  return match.replace(/>$/, ' />');
});
html = html.replace(/<br>/g, '<br />');
html = html.replace(/<hr>/g, '<hr />');
html = html.replace(/style="([^"]*)"/g, (match, styleString) => {
  const rules = styleString.split(';').filter(s => s.trim());
  const styleObj = {};
  rules.forEach(rule => {
    let [key, val] = rule.split(':');
    if (!key || !val) return;
    key = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
    styleObj[key] = val.trim();
  });
  return `style={${JSON.stringify(styleObj)}}`;
});

// Remove script tags at the bottom
html = html.replace(/<script[\s\S]*?<\/script>/g, '');

const componentCode = `
'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomeClient({ homepage, projects }) {
  const containerRef = useRef();

  useEffect(() => {
    // Re-initialize GSAP animations here later
  }, []);

  return (
    <div ref={containerRef}>
      ${html}
    </div>
  );
}
`;

fs.mkdirSync(path.join(__dirname, 'src/components'), { recursive: true });
fs.writeFileSync(outPath, componentCode);
console.log('Created HomeClient.jsx');
