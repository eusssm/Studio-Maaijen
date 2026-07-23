const fs = require('fs');
const path = require('path');

const outPath = path.join(__dirname, 'src/components/HomeClient.jsx');
let content = fs.readFileSync(outPath, 'utf8');

const effectCode = `
  useEffect(() => {
    import('./home-animations').then((mod) => {
      let ctx = gsap.context(() => {
        mod.initHomeAnimations(containerRef.current);
      }, containerRef);
      return () => ctx.revert();
    });
  }, []);
`;

content = content.replace(/useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);/, effectCode);
fs.writeFileSync(outPath, content);
console.log('Updated HomeClient.jsx with animation import');
