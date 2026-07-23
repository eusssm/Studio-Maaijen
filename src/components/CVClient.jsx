'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

/* ── Hardcoded fallback data (used when DatoCMS is not set up yet) ── */
const FALLBACK = {
  subtitle: "Ervaren UX/UI designer, video editor en brand creator met meer dan 20 jaar ervaring. Gepassioneerd door het creëren van digitale ervaringen die raken, overtuigen en blijven hangen.",
  location: "Nederland",
  availability: "Nu beschikbaar",
  level: "Senior Designer",
  focus: "UX/UI & Creatie",
  experience: [
    {
      role: "UX/UI designer / Senior UX/UI Lead of business impact",
      company: "Webavance",
      period: "Aug 2018 — HEDEN",
      description: "UX/UI ontwerpen, begeleiding en advisering"
    },
    {
      role: "Freelance Designer",
      company: "Studio Maaijen",
      period: "Jan 2013 — HEDEN",
      description: "Mijn passie is het ontwerpen van indrukwekkende designs. Als freelance ontwerper van drukwerk en websites ontwerp, bewerk, realiseer en versterk ik het succes van bedrijven, logo's, flyers en designs van klanten. Gemakkelijk of complexe designs opmaken voor beurswanden tot social media posts. Van website en/of drukwerk tot aan animated HTML5 banners. Ervaring met html & css, en interactieve pdf's tot Adobe InDesign.\n• Ontwerp, visuele opbouw en pdf optimalisatie"
    },
    {
      role: "UX/UI - Allround ontwerper",
      company: "Delta3",
      period: "Apr 2017 — Aug 2018",
      description: "Ontwikkelen van de perfecte branding en identiteiten die nu en in de toekomst relevant blijven.\n• Leren werken met HTML5 banners\n• InDesign\n• Huisstijlen ontwerpen en logo's\n• PDF ontwerpen\n• Photoshop\n• Illustrator\n• Webdesign\n• Concepting\n• Animatie\n• Interactieve PDF\n• E-mail templates\n• Huisstijl ontwerpen en logo's"
    },
    {
      role: "Allround ontwerper",
      company: "Optima Forma bv",
      period: "Dec 2016 — Apr 2017",
      description: "Ontwikkelen en vormgeven van branding en identiteiten voor o.a. de Ministerie, Scania en het Week van het geld. Creëren van flyers, brochures, interactieve pdf's tot websites."
    },
    {
      role: "Grafisch ontwerper",
      company: "Npn communicatie",
      period: "2015 — 2016",
      description: "Ontwikkelen en vormgeven van infographic, huisstijlen en online media."
    },
    {
      role: "Webdesigner / Dtp-er",
      company: "Shoot Communications",
      period: "Aug 2014 — Okt 2015",
      description: "Redesignen van websites, webdesign, DTP werkzaamheden, ontwerpen van social media concepten en flyers. Creëren van huisstijlen, opzetten en verzenden van nieuwsbrieven."
    },
    {
      role: "Allround Grafisch ontwerper (Stagiair)",
      company: "Sportcreations / Casualcreations",
      period: "Sep 2013 — Jul 2014",
      description: "Mijn werkzaamheden bestonden uit het volgende:\n• Ontwerpen en onderhouden van websites\n• Ontwikkelen van social media concepten\n• E-flyers en nieuwsbrieven\n• Ontwerpen van posters en overig print producties\n• Ontwerpen van designs voor kleding/t-shirts/merchandises"
    },
    {
      role: "Grafisch ontwerper (Stagiair)",
      company: "Medevac",
      period: "Mei 2013 — Okt 2013",
      description: "Mijn werkzaamheden bestonden uit het volgende:\n• Ontwikkelen van social media concepten\n• E-flyers en nieuwsbrieven\n• Verrichten van marktonderzoeken"
    },
    {
      role: "Freelance grafisch ontwerper",
      company: "hetCV",
      period: "2013",
      description: "Mijn werkzaamheden bestonden uit het volgende:\n• Grafisch opmaken van Curriculum Vitaes\n• Het vernieuwen en vormgeven van Mailings"
    },
    {
      role: "Allround Dtp-er",
      company: "Stanvaste",
      period: "Sep 2009 — Mei 2010",
      description: "Mijn werkzaamheden bestonden uit het volgende:\n• Logo's / flyers ontwerpen\n• Web templates ontwerpen\n• Foto's bewerken en optimaliseren\n• Nieuwe huisstijlen creëren\n• Helpen bij het opzetten van een festival"
    },
    {
      role: "Allround Dtp-er (Stagiair)",
      company: "KuiperCompagnons",
      period: "Sep 2008 — Jun 2009",
      description: "Mijn werkzaamheden bestonden uit het volgende:\n• Intranet up-to-date houden\n• Logo's/flyers en web templates ontwerpen\n• Gegevens & plaatjes digitaliseren\n• Fotograferen tijdens cursussen\n• Leren werken met InDesign, Illustrator en Photoshop (Creative Suite)\nVaardigheden geleerd:\n• Met Photoshop & Flash leren animeren en een eigen game maken\n• Dtp werkzaamheden verrichten\n• Digitaliseren van data, foto's, kaarten etc."
    },
    {
      role: "ICT-er / Junior Dtp-er (Stagiair)",
      company: "Watchingme",
      period: "Sep 2006 — Jun 2007",
      description: "Mijn werkzaamheden bestonden uit het volgende:\n• Leren werken met Microsoft Visual Basic & Adobe Photoshop Elements\n• Het omrekenprogramma t.b.v. bedrijven"
    }
  ],
  education: [
    { degree: "Certificaat Figma", school: "Cursus", year: "2023" },
    { degree: "Propedeuse, Communication and Multimedia Design (CMD)", school: "Hogeschool Rotterdam", year: "2011 — 2015" },
    { degree: "Allround Dtp-er / Webdesigner, Desktop Publishing Allround", school: "Grafisch Lyceum Rotterdam", year: "2007 — 2010" }
  ],
  technicalSkills: ["UX/UI Design", "Wireframing", "Prototyping", "Figma", "Adobe XD", "Photoshop", "Illustrator", "After Effects", "Premiere Pro", "HTML/CSS", "Design Systems", "Brand Identity", "Video Editing", "InDesign", "HTML5 Banners"],
  softSkills: [
    { name: "Creativiteit", percent: 98 },
    { name: "Oog voor detail", percent: 95 },
    { name: "Communicatief", percent: 90 },
    { name: "Zelfstandig", percent: 95 },
    { name: "Conceptueel denken", percent: 92 },
    { name: "Samenwerken", percent: 88 }
  ]
};

export default function CVClient({ cvPage }) {
  const containerRef = useRef();

  useEffect(() => {
    import('./home-animations').then((mod) => {
      let ctx = gsap.context(() => {
        mod.initHomeAnimations(containerRef.current);
      }, containerRef);
      return () => ctx.revert();
    });
  }, []);

  // Merge CMS data with fallbacks
  const subtitle     = cvPage?.subtitle      || FALLBACK.subtitle;
  const location     = cvPage?.location      || FALLBACK.location;
  const availability = cvPage?.availability  || FALLBACK.availability;
  const level        = cvPage?.level         || FALLBACK.level;
  const focus        = cvPage?.focus         || FALLBACK.focus;
  const portraitUrl  = cvPage?.portrait?.url  || '/images/eugene-portrait.png';
  const experience   = cvPage?.experience?.length   ? cvPage.experience   : FALLBACK.experience;
  const education    = cvPage?.education?.length     ? cvPage.education    : FALLBACK.education;
  const techSkills   = cvPage?.technicalSkills?.length ? cvPage.technicalSkills : FALLBACK.technicalSkills;
  const softSkills   = cvPage?.softSkills?.length     ? cvPage.softSkills     : FALLBACK.softSkills;

  // Helper to parse description text with bullet points (*, -, •, +), Markdown bold (**text**), or HTML
  const renderDescription = (text) => {
    if (!text) return null;

    // Handle HTML if string contains HTML tags
    const hasHtmlTags = typeof text === 'string' && /<[a-z][\s\S]*>/i.test(text);
    if (hasHtmlTags) {
      return <div className="cv-desc-content" dangerouslySetInnerHTML={{ __html: text }} />;
    }

    const parseMarkdown = (str) => {
      if (!str) return '';
      return str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/__(.*?)__/g, '<strong>$1</strong>');
    };

    const lines = text.split('\n');
    let inList = false;
    const elements = [];
    let listItems = [];

    const flushList = (key) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={key} className="cv-desc-list">
            {listItems.map((item, i) => {
              const colonIndex = item.indexOf(': ');
              if (colonIndex > 0 && colonIndex < 45 && !item.includes('<strong>')) {
                const title = item.substring(0, colonIndex + 1);
                const rest = item.substring(colonIndex + 1);
                const formatted = `<strong>${title}</strong>${rest}`;
                return (
                  <li key={i} dangerouslySetInnerHTML={{ __html: parseMarkdown(formatted) }} />
                );
              }
              return (
                <li key={i} dangerouslySetInnerHTML={{ __html: parseMarkdown(item) }} />
              );
            })}
          </ul>
        );
        listItems = [];
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      const isBullet = trimmed.startsWith('*') || trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('+');

      if (isBullet) {
        if (!inList) {
          inList = true;
          listItems = [];
        }
        const cleanItem = trimmed.replace(/^[\*\•\-\+]\s*/, '').trim();
        if (cleanItem) {
          listItems.push(cleanItem);
        }
      } else {
        if (inList) {
          flushList(`list-${idx}`);
          inList = false;
        }
        if (trimmed) {
          elements.push(
            <p key={idx} className="cv-desc-para" dangerouslySetInnerHTML={{ __html: parseMarkdown(trimmed) }} />
          );
        }
      }
    });

    if (inList) {
      flushList('list-final');
    }

    return <div className="cv-desc-content">{elements}</div>;
  };

  return (
    <div ref={containerRef}>
      <div id="scroll-bar" className="no-print"></div>
      <div id="cursor" className="no-print"></div>
      <div id="cursor-ring" className="no-print"></div>

      <div id="loader" className="no-print">
        <div id="loader-name">Eugène Maaijen — CV</div>
        <div id="loader-bar"><div id="loader-fill"></div></div>
        <div id="loader-count">0%</div>
      </div>

      <nav id="nav" className="no-print">
        <Link href="/" className="nav-logo">STUDIO MAAIJEN</Link>
        <ul className="nav-links">
          <li><Link href="/work">Werk</Link></li>
          <li><Link href="/#services">Disciplines</Link></li>
          <li><Link href="/#cta">Contact</Link></li>
        </ul>
        <div className="nav-actions">
          <Link href="/cv" className="nav-cta-btn">Bekijk mijn CV</Link>
          <button className="nav-menu-btn" id="menu-open-btn">Menu</button>
        </div>
      </nav>

      <div id="menu-overlay" className="no-print">
        <div className="menu-col-left">
          <button className="menu-close" id="menu-close-btn">Sluiten ✕</button>
          <nav className="menu-nav">
            <Link href="/work" onClick={() => {}}><span>Werk</span><span className="arrow">→</span></Link>
            <Link href="/#services" onClick={() => {}}><span>Disciplines</span><span className="arrow">→</span></Link>
            <Link href="/cv" onClick={() => {}}><span>CV</span><span className="arrow">→</span></Link>
            <Link href="/#cta" onClick={() => {}}><span>Contact</span><span className="arrow">→</span></Link>
          </nav>
          <div className="menu-footer">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:eusssm@gmail.com">Email</a>
          </div>
        </div>
        <div className="menu-col-right">
          <div className="menu-col-right-inner"></div>
        </div>
      </div>

      {/* Print-only Header */}
      <div className="cv-print-header">
        <div className="cv-print-header-left">
          <h1>Eugène Maaijen</h1>
          <p className="cv-print-title">UX/UI Designer & Creative</p>
        </div>
        <div className="cv-print-header-right">
          <p><strong>Email:</strong> eusssm@gmail.com</p>
          <p><strong>Website:</strong> www.studiomaaijen.nl</p>
          <p><strong>LinkedIn:</strong> linkedin.com/in/eugene-maaijen</p>
          <p><strong>Locatie:</strong> Nederland</p>
        </div>
      </div>

      <main className="cv-container">
        {/* Main Content: Header & Experience */}
        <div className="cv-main">
          <header className="cv-header reveal">
            <div className="cv-header-top">
              <div className="cv-portrait no-print">
                <img src={portraitUrl} alt="Eugène Maaijen" />
              </div>
              <div className="cv-header-title-container">
                <h1 className="cv-header-title">Curriculum<br/>Vitae</h1>
                <button onClick={() => window.print()} className="cv-print-btn no-print" title="Print of bewaar als PDF">
                  <svg className="print-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect x="6" y="14" width="12" height="8" />
                  </svg>
                  <span>PDF / Print</span>
                </button>
              </div>
            </div>
            {typeof subtitle === 'string' && /<[a-z][\s\S]*>/i.test(subtitle) ? (
              <div className="cv-header-subtitle" dangerouslySetInnerHTML={{ __html: subtitle }} />
            ) : (
              <p className="cv-header-subtitle">{subtitle}</p>
            )}

            <div className="cv-quick-info">
              <div>
                <span className="qi-label">Locatie</span>
                <span className="qi-value">{location}</span>
              </div>
              <div>
                <span className="qi-label">Beschikbaarheid</span>
                <span className="qi-value highlight">{availability}</span>
              </div>
              <div>
                <span className="qi-label">Niveau</span>
                <span className="qi-value">{level}</span>
              </div>
              <div>
                <span className="qi-label">Focus</span>
                <span className="qi-value">{focus}</span>
              </div>
            </div>
          </header>

          <section className="cv-experience">
            <h2 className="cv-section-title reveal">Werkervaring</h2>
            <div className="cv-timeline">
              {experience.map((exp, i) => (
                <div key={i} className="cv-timeline-item reveal">
                  <div className={`cv-timeline-dot ${i === 0 ? '' : 'secondary'}`}></div>
                  <h3 className="cv-role">{exp.role}</h3>
                  <div className="cv-company">{exp.company}</div>
                  <span className="cv-period">{exp.period}</span>
                  <div className="cv-desc">{renderDescription(exp.description)}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar: Skills, Education & Contact */}
        <aside className="cv-sidebar">
          <div className="cv-sidebar-section reveal">
            <h3 className="cv-sidebar-title">Technische Vaardigheden</h3>
            <div className="cv-tags">
              {techSkills.map(tag => (
                <span key={tag} className="cv-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="cv-sidebar-section reveal">
            <h3 className="cv-sidebar-title">Algemene Skills</h3>
            <div className="cv-skills-list">
              {softSkills.map(skill => (
                <div key={skill.name} className="cv-skill">
                  <div className="cv-skill-header">
                    <span>{skill.name}</span>
                    <span style={{ color: "var(--dim)" }}>{skill.percent}%</span>
                  </div>
                  <div className="cv-skill-bar">
                    <div className="cv-skill-fill" style={{ width: `${skill.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cv-sidebar-section reveal page-break-before-print">
            <h3 className="cv-sidebar-title">Opleidingen</h3>
            {education.map((edu, i) => (
              <div key={i} className="cv-edu-card">
                <span className="cv-edu-year">{edu.year}</span>
                <h4 className="cv-edu-degree">{edu.degree}</h4>
                <div className="cv-edu-school">{edu.school}</div>
              </div>
            ))}
          </div>

          <div className="cv-sidebar-section reveal no-print">
            <div className="cv-cta-box">
              <h3>Samenwerken?</h3>
              <p>Stuur me een bericht via de contactpagina voor projectaanvragen of om direct in contact te komen.</p>
              <Link href="/#cta" className="cv-cta-link">
                Naar Contact <span>→</span>
              </Link>
            </div>
          </div>
        </aside>
      </main>

      <footer className="no-print" style={{ padding: "80px 24px 40px", borderTop: "1px solid var(--border)", textAlign: "center", color: "var(--dim)", fontSize: "12px", fontFamily: "monospace", letterSpacing: "0.05em" }}>
        © {new Date().getFullYear()} Eugène Maaijen — UX/UI Designer & Creative
      </footer>
    </div>
  );
}
