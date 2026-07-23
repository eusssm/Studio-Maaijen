'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function WorkOverviewClient({ projects, homepage }) {
  const containerRef = useRef();
  const [activeFilter, setActiveFilter] = useState('Alles');

  const filters = ['Alles', 'UX/UI Design', 'Brand Identity', 'Video Editing'];

  const filteredProjects = projects.filter(proj => {
    if (activeFilter === 'Alles') return true;
    const cats = proj.categories?.map(c => c.name) || [];
    return cats.includes(activeFilter);
  });

  useEffect(() => {
    // Re-trigger GSAP animations when filtered projects change
    import('./home-animations').then((mod) => {
      let ctx = gsap.context(() => {
        mod.initHomeAnimations(containerRef.current);
      }, containerRef);
      return () => ctx.revert();
    });
  }, [filteredProjects]);

  return (
    <div ref={containerRef}>
      <div id="scroll-bar"></div>
      <div id="cursor"></div>
      <div id="cursor-ring"></div>

      <nav id="nav">
        <Link href="/" className="nav-logo">STUDIO MAAIJEN</Link>
        <ul className="nav-links">
          <li><Link href="/work">Werk</Link></li>
          <li><Link href="/#services">Disciplines</Link></li>
          <li><Link href="/#about">Over</Link></li>
          <li><Link href="/#cta">Contact</Link></li>
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
            <Link href="/#services" onClick={() => {}}><span>Disciplines</span><span className="arrow">→</span></Link>
            <Link href="/#about" onClick={() => {}}><span>Over Mij</span><span className="arrow">→</span></Link>
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

      <div id="work-section" style={{ paddingTop: '160px', minHeight: '100vh' }}>
        <div className="work-header" style={{ padding: '0 0 60px' }}>
          <div className="s-label reveal">
            <div className="s-dot"></div>
            <span className="s-tag">Portfolio</span>
          </div>
          <div className="s-header" style={{ marginBottom: '0', display: 'block' }}>
            <h2 className="s-title reveal" style={{ marginBottom: '32px' }}>Al mijn<br /><em>projecten</em></h2>
            
            {/* Filters */}
            <div className="filters reveal" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '20px' }}>
              {filters.map(filter => (
                <button 
                  key={filter} 
                  onClick={() => setActiveFilter(filter)}
                  className={`btn ${activeFilter === filter ? 'btn-primary' : 'btn-outline'}`}
                  style={{ padding: '10px 20px', fontSize: '11px', cursor: 'pointer' }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="work-grid">
          {filteredProjects.length > 0 ? filteredProjects.map((proj, index) => (
            <Link key={proj.slug + index} href={`/work/${proj.slug}`} className="work-card reveal">
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
            <div className="reveal" style={{ gridColumn: '1 / -1', padding: '60px 0', textAlign: 'center', color: 'var(--muted)' }}>
              Geen projecten gevonden voor dit filter.
            </div>
          )}
        </div>
      </div>

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
              <Link href="/#services">Disciplines</Link>
              <Link href="/#about">Over Mij</Link>
              <Link href="/#cta">Contact</Link>
            </div>
          </div>
          <div>
            <div className="footer-contact-h">Neem contact op</div>
            <a href="mailto:eusssm@gmail.com" className="footer-email">eusssm@gmail.com</a>
            <div className="footer-socials">
              <a href={homepage?.ctaLinkedin || "https://linkedin.com"} target="_blank" rel="noopener noreferrer"><span>LinkedIn</span><span>↗</span></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{homepage?.footerCopyright || "© 2026 Eugène Maaijen — Alle rechten voorbehouden"}</span>
          <a href="#" className="back-top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>↑</a>
        </div>
      </footer>
    </div>
  );
}
