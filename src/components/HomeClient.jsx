
'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function HomeClient({ homepage, projects, testimonials = [] }) {
  const containerRef = useRef();

  
  useEffect(() => {
    import('./home-animations').then((mod) => {
      let ctx = gsap.context(() => {
        mod.initHomeAnimations(containerRef.current);
      }, containerRef);
      return () => ctx.revert();
    });
  }, []);


  return (
    <div ref={containerRef}>
      


<div id="scroll-bar"></div>


<div id="cursor"></div>
<div id="cursor-ring"></div>


<div id="loader">
  <div id="loader-name">Eugène Maaijen</div>
  <div id="loader-bar"><div id="loader-fill"></div></div>
  <div id="loader-count">0%</div>
</div>


<nav id="nav">
  <a href="#hero" className="nav-logo">STUDIO MAAIJEN</a>
  <ul className="nav-links">
    <li><Link href="/work">Werk</Link></li>
    <li><a href="#services">Disciplines</a></li>
    <li><a href="#about">Over</a></li>
    <li><a href="#cta">Contact</a></li>
  </ul>
  <div className="nav-actions">
    <Link href="/cv" className="nav-cta-btn">Bekijk mijn CV</Link>
    <button className="nav-menu-btn" id="menu-open-btn">Menu</button>
  </div>
</nav>


<div id="menu-overlay">
  <div className="menu-col-left">
    <button className="menu-close" id="menu-close-btn">Sluiten ✕</button>
    <nav className="menu-nav">
      <Link href="/work" onClick={() => {}}><span>Werk</span><span className="arrow">→</span></Link>
      <a href="#services" onClick={() => {}}><span>Disciplines</span><span className="arrow">→</span></a>
      <a href="#about" onClick={() => {}}><span>Over Mij</span><span className="arrow">→</span></a>
      <Link href="/cv" onClick={() => {}}><span>CV</span><span className="arrow">→</span></Link>
      <a href="#cta" onClick={() => {}}><span>Contact</span><span className="arrow">→</span></a>
    </nav>
    <div className="menu-footer">
      <a href="https://instagram.com" target="_blank">Instagram</a>
      <a href="https://linkedin.com" target="_blank">LinkedIn</a>
      <a href="mailto:eusssm@gmail.com">Email</a>
    </div>
  </div>
  <div 
    className="menu-col-right"
    style={homepage?.aboutPortrait?.url ? {
      backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.7) 100%), url(${homepage.aboutPortrait.url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    } : undefined}
  >
    <div className="menu-col-right-inner"></div>
  </div>
</div>


<section id="hero">
  <div className="hero-bg"></div>
  <div className="hero-grid"></div>
  <div className="hero-orb hero-orb-1"></div>
  <div className="hero-orb hero-orb-2"></div>
  <div className="hero-side-label">UX · Brand · Video · NL</div>

  <div className="hero-content">
    <div className="hero-eyebrow">
      <div className="hero-eyebrow-dot"></div>
      <span className="hero-eyebrow-text" id="hero-eyebrow-txt">{homepage?.heroEyebrow || "Portfolio 2026 — Amsterdam, NL"}</span>
    </div>

    <h1 className="hero-headline" id="hero-headline">
      {homepage?.heroHeadline ? (
        <div dangerouslySetInnerHTML={{ __html: homepage.heroHeadline }} />
      ) : (
        <>
          <div><span className="word-wrap"><span className="word-inner">Design&nbsp;dat</span></span></div>
          <div><span className="word-wrap"><span className="word-inner"><em>raakt&nbsp;vandaag</em></span></span></div>
          <div><span className="word-wrap"><span className="word-inner">&amp;&nbsp;<em>inspireert</em></span></span></div>
          <div><span className="word-wrap"><span className="word-inner">morgen.</span></span></div>
        </>
      )}
    </h1>

    <div className="hero-bottom">
      <div className="hero-cta" id="hero-cta">
        <Link href="/work" className="btn btn-primary">Bekijk mijn werk ↓</Link>
        <a href="#cta" className="btn btn-outline">Contact</a>
      </div>
      <div className="hero-disciplines" id="hero-disc">
        <span>UX/UI Design</span>
        <span>Video Editing</span>
        <span>Brand Identity</span>
      </div>
    </div>
  </div>

  <div className="scroll-hint" id="scroll-hint">Scroll</div>
</section>


<div className="marquee-section">
  <div className="marquee-track" id="marquee-track">
    <div className="marquee-item">
      <span className="marquee-txt">Eugène Maaijen</span><span className="marquee-dot"></span>
      <span className="marquee-txt">Blubricks</span><span className="marquee-dot"></span>
      <span className="marquee-txt">Spotta</span><span className="marquee-dot"></span>
      <span className="marquee-txt">De Kindertelefoon</span><span className="marquee-dot"></span>
      <span className="marquee-txt">UX/UI Design</span><span className="marquee-dot"></span>
      <span className="marquee-txt">Brand Identity</span><span className="marquee-dot"></span>
      <span className="marquee-txt">Video Editing</span><span className="marquee-dot"></span>
    </div>
    <div className="marquee-item">
      <span className="marquee-txt">Eugène Maaijen</span><span className="marquee-dot"></span>
      <span className="marquee-txt">Blubricks</span><span className="marquee-dot"></span>
      <span className="marquee-txt">Spotta</span><span className="marquee-dot"></span>
      <span className="marquee-txt">De Kindertelefoon</span><span className="marquee-dot"></span>
      <span className="marquee-txt">UX/UI Design</span><span className="marquee-dot"></span>
      <span className="marquee-txt">Brand Identity</span><span className="marquee-dot"></span>
      <span className="marquee-txt">Video Editing</span><span className="marquee-dot"></span>
    </div>
  </div>
</div>


<div id="work-section">
  <div className="work-header">
    <div className="s-label reveal">
      <div className="s-dot"></div>
      <span className="s-tag">Geselecteerd Werk</span>
    </div>
    <div className="s-header" style={{"marginBottom":"0"}}>
      <h2 className="s-title reveal">Projecten die<br /><em>resultaat leveren</em></h2>
      <div>
        <p className="s-sub reveal" style={{"marginBottom":"20px"}}>Van brand identity tot digitale producten — elk project vertelt een verhaal dat blijft hangen.</p>
        <Link href="/work" className="btn btn-outline reveal">Alle projecten →</Link>
      </div>
    </div>
  </div>

  <div className="work-grid">
    {projects.length > 0 ? projects.map(proj => (
      <Link key={proj.slug} href={`/work/${proj.slug}`} className="work-card reveal">
        <div className="work-img-wrap">
          <div className="work-img" style={{ backgroundImage: proj.coverImage ? `url(${proj.coverImage.url})` : 'none', backgroundColor: '#222' }}>
            <span style={{ fontFamily: "var(--ff-d)", fontSize: "clamp(40px,6vw,80px)", fontWeight: "600", color: "rgba(240,237,230,.1)" }}>
              {proj.title.substring(0, 2).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="work-meta">
          <span className="work-client">{proj.client} — {proj.categories?.map(c => c.name).join(', ') || proj.projectType}</span>
          <span className="work-name">{proj.title}</span>
        </div>
      </Link>
    )) : (
      <>
        <Link href="/work/blubricks" className="work-card reveal">
          <div className="work-img-wrap"><div className="work-img bg-blubricks"><span style={{"fontFamily":"var(--ff-d)","fontSize":"clamp(40px,6vw,80px)","fontWeight":"600","color":"rgba(240,237,230,.1)"}}>BB</span></div></div>
          <div className="work-meta">
            <span className="work-client">Brand Identity & Web</span>
            <span className="work-name">Blubricks (Voorbeeld)</span>
          </div>
        </Link>
      </>
    )}
    
    <div className="work-card reveal" style={{"justifyContent":"center","alignItems":"center","display":"flex"}}>
      <h3 style={{"fontFamily":"var(--ff-d)","fontSize":"clamp(32px,4vw,48px)","fontWeight":"500","marginBottom":"20px"}}>Klaar om samen iets<br /><em style={{"fontStyle":"normal","color":"var(--accent)"}}>bijzonders te maken?</em></h3>
      <a href="#cta" className="btn btn-primary" style={{"alignSelf":"center"}}>Neem contact op →</a>
    </div>
  </div>
</div>


<div id="stats" className="section--light">
  <div className="stats-grid">
    <div className="stat-item">
      <div className="stat-num"><span className="counter" data-to={homepage?.stat1Value || "20"}>0</span></div>
      <div className="stat-label">{homepage?.stat1Label || "Jaar werkervaring"}</div>
      <div className="stat-sub">{homepage?.stat1Sub || "UX/UI & Brand"}</div>
    </div>
    <div className="stat-item">
      <div className="stat-num"><span className="counter" data-to={homepage?.stat2Value || "50"}>0</span><sup>+</sup></div>
      <div className="stat-label">{homepage?.stat2Label || "Projecten afgeleverd"}</div>
      <div className="stat-sub">{homepage?.stat2Sub || "Diverse opdrachtgevers"}</div>
    </div>
    <div className="stat-item">
      <div className="stat-num"><span className="counter" data-to={homepage?.stat3Value || "30"}>0</span><sup>+</sup></div>
      <div className="stat-label">{homepage?.stat3Label || "Huisstijlen gecreëerd"}</div>
      <div className="stat-sub">{homepage?.stat3Sub || "Concept tot delivery"}</div>
    </div>
    <div className="stat-item">
      <div className="stat-num"><span className="counter" data-to={homepage?.stat4Value || "100"}>0</span><sup>%</sup></div>
      <div className="stat-label">{homepage?.stat4Label || "Passie voor craft"}</div>
      <div className="stat-sub">{homepage?.stat4Sub || "Elke pixel telt"}</div>
    </div>
  </div>
</div>


<section id="services" className="section--light">
  <div className="s-label reveal"><div className="s-dot"></div><span className="s-tag">Disciplines</span></div>
  <div className="s-header">
    <h2 className="s-title reveal">
      {homepage?.servicesTitle ? (
        <span dangerouslySetInnerHTML={{ __html: homepage.servicesTitle }} />
      ) : (
        <>Wat ik doe &<br /><em>hoe ik het doe</em></>
      )}
    </h2>
    <p className="s-sub reveal">{homepage?.servicesSubtitle || "20 jaar ervaring op het snijvlak van strategie, esthetiek en techniek."}</p>
  </div>

  <div className="services-list reveal">
    <div className="service-row">
      <div className="service-index">"01" {homepage?.service1Title || "UX/UI Design"} —</div>
      <div className="service-desc">
        {homepage?.service1Desc || "Van wireframe tot high-fidelity prototype — ik ontwerp digitale ervaringen die intuïtief aanvoelen en gebruikers meenemen van A naar B."}
      </div>
      <div className="service-tags">
        {(homepage?.service1Tags ? homepage.service1Tags.split(',').map(t => t.trim()) : ["User Research", "Wireframing", "Prototyping", "Design Systems"]).map((tag, idx) => (
          <span key={idx} className="service-tag">{tag}</span>
        ))}
      </div>
    </div>
    
    <div className="service-row">
      <div className="service-index">"02" {homepage?.service2Title || "Brand Identity"} —</div>
      <div className="service-desc">
        {homepage?.service2Desc || "Merken die niet alleen mooi zijn — maar ook iets zeggen. Ik bouw identiteiten die emotioneel resoneren én visueel consistent zijn."}
      </div>
      <div className="service-tags">
        {(homepage?.service2Tags ? homepage.service2Tags.split(',').map(t => t.trim()) : ["Logo Design", "Typografie", "Kleurpaletten", "Brand Guidelines"]).map((tag, idx) => (
          <span key={idx} className="service-tag">{tag}</span>
        ))}
      </div>
    </div>
    
    <div className="service-row">
      <div className="service-index">"03" {homepage?.service3Title || "Video Editing"} —</div>
      <div className="service-desc">
        {homepage?.service3Desc || "Van rauwe opnames naar een gepolijste productie — met oog voor ritme, sfeer en impact. Bewegend beeld dat het verhaal versterkt."}
      </div>
      <div className="service-tags">
        {(homepage?.service3Tags ? homepage.service3Tags.split(',').map(t => t.trim()) : ["Post-productie", "Motion Graphics", "Color Grading", "Sound Design"]).map((tag, idx) => (
          <span key={idx} className="service-tag">{tag}</span>
        ))}
      </div>
    </div>
  </div>
  
  <div style={{"display":"flex","gap":"14px","marginTop":"36px","justifyContent":"center"}} className="reveal">
    <Link href="/work" className="btn btn-primary">Bekijk werk →</Link>
    <a href="#cta" className="btn btn-outline">Samenwerken</a>
  </div>
</section>


<section id="about">
  <div className="s-label reveal"><div className="s-dot"></div><span className="s-tag">Over Mij</span></div>
  <div className="about-grid">
    <div className="about-photo reveal-left">
      <div className="about-portrait">
        <div 
          className="about-portrait-inner" 
          style={homepage?.aboutPortrait?.url ? { 
            backgroundImage: `linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 60%), url(${homepage.aboutPortrait.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          } : undefined}
        >
          Eugène<br />Maaijen
        </div>
      </div>
      <div className="about-social">
        <a href="https://instagram.com" target="_blank">IG</a>
        <a href="https://linkedin.com" target="_blank">LI</a>
        <a href="https://behance.net" target="_blank">BE</a>
        <a href="mailto:eusssm@gmail.com">Mail</a>
      </div>
    </div>
    <div className="about-right">
      <p className="about-intro reveal">
        {homepage?.aboutIntro ? (
          <span dangerouslySetInnerHTML={{ __html: homepage.aboutIntro }} />
        ) : (
          <>
            Ik ben <em>Eugène Maaijen</em> — UX/UI designer, video editor en brand creator. Met meer dan 20 jaar ervaring help ik merken om <em>digitale ervaringen te creëren</em> die raken, overtuigen en blijven hangen.
          </>
        )}
      </p>
      <div>
        <div className="about-block reveal">
          <div className="about-block-lbl">{homepage?.aboutBlock1Label || "Achtergrond"}</div>
          {homepage?.aboutBlock1Text && /<[a-z][\s\S]*>/i.test(homepage.aboutBlock1Text) ? (
            <div className="about-block-txt" dangerouslySetInnerHTML={{ __html: homepage.aboutBlock1Text }} />
          ) : (
            <div className="about-block-txt">{homepage?.aboutBlock1Text || "Ik ontwerp websites, huisstijlen en video's voor zowel grote organisaties als ambitieuze startups. Elk project begin ik met één vraag: wat moet de gebruiker voelen?"}</div>
          )}
        </div>
        <div className="about-block reveal">
          <div className="about-block-lbl">{homepage?.aboutBlock2Label || "Werkwijze"}</div>
          {homepage?.aboutBlock2Text && /<[a-z][\s\S]*>/i.test(homepage.aboutBlock2Text) ? (
            <div className="about-block-txt" dangerouslySetInnerHTML={{ __html: homepage.aboutBlock2Text }} />
          ) : (
            <div className="about-block-txt">{homepage?.aboutBlock2Text || "Geen stijve praatjes of standaard templates. Korte lijnen, relaxed sparren en strakke uitwerkingen — van het eerste idee tot het eindresultaat live staat."}</div>
          )}
        </div>
        <div className="about-block reveal">
          <div className="about-block-lbl">{homepage?.aboutBlock3Label || "Tools"}</div>
          {homepage?.aboutBlock3Text && /<[a-z][\s\S]*>/i.test(homepage.aboutBlock3Text) ? (
            <div className="about-block-txt" dangerouslySetInnerHTML={{ __html: homepage.aboutBlock3Text }} />
          ) : (
            <div className="about-block-txt">{homepage?.aboutBlock3Text || "Figma, Adobe Creative Suite, Webflow, After Effects, Premiere Pro, DaVinci Resolve & diverse AI tools."}</div>
          )}
        </div>
      </div>
      <div className="clients-lbl reveal">Gewerkt voor</div>
      <div className="clients-list reveal">
        {(homepage?.aboutClients ? homepage.aboutClients.split(',').map(c => c.trim()) : ["Blubricks", "Spotta", "De Kindertelefoon", "& meer"]).map((client, idx) => (
          <span key={idx} className="client-badge">{client}</span>
        ))}
      </div>
    </div>
  </div>
</section>


<section id="process" className="section--light">
  <div className="s-label reveal"><div className="s-dot"></div><span className="s-tag">Werkwijze</span></div>
  <h2 className="s-title reveal">
    {homepage?.processTitle ? (
      <span dangerouslySetInnerHTML={{ __html: homepage.processTitle }} />
    ) : (
      <>Van brief naar<br /><em>briljant resultaat</em></>
    )}
  </h2>
  <div className="process-steps">
    <div className="process-step">
      <div className="ps-num">[01] Ontdekken</div>
      <div className="ps-name">{homepage?.processStep1Name || "Luisteren & Begrijpen"}</div>
      <div className="ps-desc">{homepage?.processStep1Desc || "Ik duik in jouw merk, doelgroep en doelstellingen. Geen aannames — alleen een scherp begrip van wat jij nodig hebt en waarom."}</div>
    </div>
    <div className="process-step">
      <div className="ps-num">[02] Ontwerpen</div>
      <div className="ps-name">{homepage?.processStep2Name || "Creëren & Verfijnen"}</div>
      <div className="ps-desc">{homepage?.processStep2Desc || "Van concept tot pixel-perfecte uitwerking. Ik werk iteratief, met jou als sparringpartner gedurende het hele creatieve proces."}</div>
    </div>
    <div className="process-step">
      <div className="ps-num">[03] Opleveren</div>
      <div className="ps-name">{homepage?.processStep3Name || "Lanceren & Groeien"}</div>
      <div className="ps-desc">{homepage?.processStep3Desc || "Alles klaar voor implementatie — met heldere documentatie zodat je volledig zelfstandig verder kunt of met je team."}</div>
    </div>
  </div>
</section>


{/* Testimonials (Klanten aan het woord) tijdelijk geparkeerd 
<section id="testimonials">
  <div className="testimonials-header">
    <div className="s-label reveal"><div className="s-dot"></div><span className="s-tag">Klanten aan het woord</span></div>
    <h2 className="s-title reveal">Ervaringen die<br /><em>voor zich spreken</em></h2>
  </div>
  <div className="testi-scroll">
    <div className="testi-track">
      {testimonials.length > 0 ? (
        <>
          {testimonials.map((t, idx) => (
            <div key={`t1-${idx}`} className="testi-card">
              <p className="testi-quote">{t.quote}</p>
              <div className="testi-author">
                <div className="testi-avatar">{t.authorAvatarLetter || t.authorName.charAt(0)}</div>
                <div>
                  <div className="testi-name">{t.authorName}</div>
                  <div className="testi-role">{t.authorRole}</div>
                </div>
              </div>
            </div>
          ))}
          {testimonials.map((t, idx) => (
            <div key={`t2-${idx}`} className="testi-card">
              <p className="testi-quote">{t.quote}</p>
              <div className="testi-author">
                <div className="testi-avatar">{t.authorAvatarLetter || t.authorName.charAt(0)}</div>
                <div>
                  <div className="testi-name">{t.authorName}</div>
                  <div className="testi-role">{t.authorRole}</div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="testi-card"><p className="testi-quote">"Eugène heeft onze brand identity volledig getransformeerd. Het eindresultaat overtrof al onze verwachtingen — véél beter dan we hadden durven hopen."</p><div className="testi-author"><div className="testi-avatar">M</div><div><div className="testi-name">Martijn de Vries</div><div className="testi-role">CEO, Blubricks</div></div></div></div>
          <div className="testi-card"><p className="testi-quote">"De nieuwe UX van Spotta heeft onze conversie significant verhoogd. Eugène begrijpt echt hoe mensen denken en hoe je ze door een product loodst."</p><div className="testi-author"><div className="testi-avatar">S</div><div><div className="testi-name">Sophie Janssen</div><div className="testi-role">Product Lead, Spotta</div></div></div></div>
          <div className="testi-card"><p className="testi-quote">"Professioneel, creatief en toegankelijk. De samenwerking voelde als een echte partnership — geen uitvoerder, maar een mededenker met visie."</p><div className="testi-author"><div className="testi-avatar">A</div><div><div className="testi-name">Anna Pietersen</div><div className="testi-role">Communicatie, De Kindertelefoon</div></div></div></div>
          <div className="testi-card"><p className="testi-quote">"De videoproductie was van een ongelofelijk hoog niveau. Eugène weet precies hoe hij een verhaal visueel moet vertellen — met ritme, sfeer en impact."</p><div className="testi-author"><div className="testi-avatar">R</div><div><div className="testi-name">Roel Bakker</div><div className="testi-role">Marketing Director</div></div></div></div>
        </>
      )}
    </div>
  </div>
</section>
*/}


<section id="cta">
  <div className="cta-backdrop" id="cta-backdrop">{homepage?.ctaBackdrop || "Samen"}</div>
  <div className="cta-content">
    <p className="cta-eyebrow reveal">{homepage?.ctaEyebrow || "Klaar om samen te werken?"}</p>
    <h2 className="cta-title reveal">
      {homepage?.ctaTitle ? (
        <span dangerouslySetInnerHTML={{ __html: homepage.ctaTitle }} />
      ) : (
        <>Laten we <em>iets moois</em><br />maken.</>
      )}
    </h2>
    <div className="cta-btns reveal">
      <a href={`mailto:${homepage?.ctaEmail || "eusssm@gmail.com"}`} className="btn btn-primary">Mail mij direct →</a>
      <a href={homepage?.ctaLinkedin || "https://linkedin.com"} target="_blank" className="btn btn-outline">LinkedIn ↗</a>
    </div>
  </div>
</section>


<footer>
  <div className="footer-grid">
    <div>
      <div className="footer-logo-txt">Eugène Maaijen</div>
      <div className="footer-tagline" dangerouslySetInnerHTML={{ __html: homepage?.footerTagline?.replace(/\n/g, '<br/>') || `"Design dat raakt vandaag<br />&amp; inspireert morgen."` }} />
      <div className="footer-loc" dangerouslySetInnerHTML={{ __html: homepage?.footerLocation?.replace(/\n/g, '<br/>') || `📍 Amsterdam, Nederland<br />Beschikbaar voor remote &amp; on-site` }} />
    </div>
    <div>
      <div className="footer-nav-h">Navigatie</div>
      <div className="footer-nav-links">
        <Link href="/work">Werk</Link>
        <a href="#services">Disciplines</a>
        <a href="#about">Over Mij</a>
        <a href="#cta">Contact</a>
      </div>
    </div>
    <div>
      <div className="footer-contact-h">Neem contact op</div>
      <a href={`mailto:${homepage?.ctaEmail || "eusssm@gmail.com"}`} className="footer-email">{homepage?.ctaEmail || "eusssm@gmail.com"}</a>
      <div className="footer-socials">
        <a href={homepage?.ctaLinkedin || "https://linkedin.com"} target="_blank"><span>LinkedIn</span><span>↗</span></a>
      </div>
    </div>
  </div>
  <div className="footer-bottom">
    <span>{homepage?.footerCopyright || "© 2026 Eugène Maaijen — Alle rechten voorbehouden"}</span>
    <a href="#hero" className="back-top">↑</a>
  </div>
</footer>

    </div>
  );
}
