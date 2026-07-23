const fs = require('fs');
const path = require('path');

const legacyJsPath = path.join(__dirname, '../legacy/work/case.js');
const outJsPath = path.join(__dirname, 'src/components/case-animations.js');

const jsContent = fs.readFileSync(legacyJsPath, 'utf8');

const js = `
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initCaseAnimations(container) {
  gsap.registerPlugin(ScrollTrigger);
  const qs = s => container.querySelector(s);
  const qsa = s => container.querySelectorAll(s);
  
  if (typeof window === 'undefined') return;

  ${jsContent}
}
`;

fs.writeFileSync(outJsPath, js);
console.log('Extracted Case JS to case-animations.js');
