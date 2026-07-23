const fs = require('fs');
const path = require('path');

const legacyHtmlPath = path.join(__dirname, '../legacy/index.html');
const outJsPath = path.join(__dirname, 'src/components/home-animations.js');

const content = fs.readFileSync(legacyHtmlPath, 'utf8');

const scriptStart = content.lastIndexOf('<script>');
const scriptEnd = content.lastIndexOf('</script>');

if (scriptStart !== -1 && scriptEnd !== -1) {
  let js = content.slice(scriptStart + 8, scriptEnd);
  // Export as a function
  js = `
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHomeAnimations(container) {
  const qs = s => container.querySelector(s);
  const qsa = s => container.querySelectorAll(s);
  
  // Fake window loading since we are already mounted in React
  // Remove window.addEventListener('load') and just run initAnimations
  
  ${js.replace(/window\.addEventListener\('load', initAnimations\);/, 'initAnimations();')}
}
  `;
  fs.writeFileSync(outJsPath, js);
  console.log('Extracted JS to home-animations.js');
}
