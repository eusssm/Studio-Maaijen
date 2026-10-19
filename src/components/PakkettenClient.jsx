'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const LINKEDIN_URL = 'https://www.linkedin.com/in/eug%C3%A8ne-maaijen-4b658345/';

const DEFAULT_PACKAGES = [
  {
    id: 'pkg-1',
    name: 'Landingspagina',
    tagline: 'Snel en professioneel online met één krachtige pagina.',
    priceLabel: '€ 1.250',
    duration: '1–2 weken',
    isFeatured: false,
    positionOrder: 1,
    features: [
      { feature: 'Maatwerk UX/UI ontwerp op basis van jouw merk' },
      { feature: 'Responsive ontwikkeling voor mobiel, tablet en desktop' },
      { feature: 'Inclusief CMS voor tekst- en beeldbeheer' },
      { feature: 'Basis SEO-optimalisatie en snelle laadtijden' },
      { feature: 'Contactformulier en oplevering op eigen domein' },
    ],
  },
  {
    id: 'pkg-2',
    name: 'Bedrijfswebsite',
    tagline: 'Complete website inclusief CMS voor ondernemers en MKB.',
    priceLabel: '€ 2.450',
    duration: '2–4 weken',
    isFeatured: true,
    positionOrder: 2,
    features: [
      { feature: "Tot 6 pagina's op maat ontworpen en gebouwd" },
      { feature: "Volledig beheerbaar via een CMS (pagina's & cases)" },
      { feature: 'Heldere structuur gericht op conversie en aanvragen' },
      { feature: 'Technische SEO, Open Graph & snelheidsoptimalisatie' },
      { feature: 'Sleutelklaar opgeleverd inclusief 1-op-1 CMS uitleg' },
    ],
  },
  {
    id: 'pkg-3',
    name: 'Merk & Website Totaal',
    tagline: 'Nieuwe huisstijl, maatwerk website en video in één traject.',
    priceLabel: 'Op offerte',
    duration: '4–6 weken',
    isFeatured: false,
    positionOrder: 3,
    features: [
      { feature: 'Logo, kleurpalet, typografie en compacte brand guide' },
      { feature: 'Uitgebreide maatwerk website inclusief CMS' },
      { feature: 'Korte merk- of header-video & subtiele motion' },
      { feature: 'Design system in Figma voor consistente uitingen' },
      { feature: 'Persoonlijke begeleiding van concept tot livegang' },
    ],
  },
];

const DEFAULT_MAINTENANCE_FEATURES = [
  'Hosting, SSL-certificaat en domeinbeheer inbegrepen',
  'Technische updates, beveiliging en periodieke back-ups',
  'Kleine tekst- of beeldwijzigingen snel doorgevoerd',
  'Doorlopende monitoring op snelheid en bereikbaarheid',
];

export default function PakkettenClient({ packages = [], siteSetting, homepage }) {
  const containerRef = useRef();

  const items = packages.length > 0 ? packages : DEFAULT_PACKAGES;
  const maintenancePrice = siteSetting?.maintenancePrice || '€ 25 / maand';
  const maintenanceFeatures =
    siteSetting?.maintenanceFeatures?.length > 0
      ? siteSetting.maintenanceFeatures.map((f) => f.feature).filter(Boolean)
      : DEFAULT_MAINTENANCE_FEATURES;

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

      <nav id="nav">
        <Link href="/" className="nav-logo">STUDIO MAAIJEN</Link>
        <ul className="nav-links">
          <li><Link href="/work">Werk</Link></li>
          <li><Link href="/pakketten" style={{ color: 'var(--accent)' }}>Pakketten</Link></li>
          <li><Link href="/#services">Disciplines</Link></li>
          <li><Link href="/#about">Over</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <div className="nav-actions">
          <Link href="/contact" className="nav-cta-btn">Start een project</Link>
          <button className="nav-menu-btn" id="menu-open-btn">Menu</button>
        </div>
      </nav>

      <div id="menu-overlay">
        <div className="menu-col-left">
          <button className="menu-close" id="menu-close-btn">Sluiten ✕</button>
          <nav className="menu-nav">
            <Link href="/work"><span>Werk</span><span className="arrow">→</span></Link>
            <Link href="/pakketten"><span>Pakketten</span><span className="arrow">→</span></Link>
            <Link href="/#services"><span>Disciplines</span><span className="arrow">→</span></Link>
            <Link href="/#about"><span>Over Mij</span><span className="arrow">→</span></Link>
            <Link href="/contact"><span>Contact</span><span className="arrow">→</span></Link>
          </nav>
          <div className="menu-footer">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:info@studio-maaijen.nl">Email</a>
          </div>
        </div>
        <div
          className="menu-col-right"
          style={
            homepage?.aboutPortrait?.url
              ? {
                  backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.7) 100%), url(${homepage.aboutPortrait.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }
              : undefined
          }
        >
          <div className="menu-col-right-inner"></div>
        </div>
      </div>

      <section className="sm-page-section">
        <div className="s-label reveal">
          <div className="s-dot"></div>
          <span className="s-tag">Pakketten & Tarieven</span>
        </div>

        <div className="s-header">
          <h1 className="s-title reveal">
            Heldere pakketten,<br />
            <em>sleutelklaar</em>
          </h1>
          <p className="s-sub reveal">
            Websites inclusief CMS, huisstijlen en video voor ondernemers en MKB. Van ontwerp tot online — zonder verrassingen achteraf.
          </p>
        </div>

        {/* 3 Pakketkaarten */}
        <div className="sm-packages-grid">
          {items.map((pkg, idx) => {
            const num = String(pkg.positionOrder || idx + 1).padStart(2, '0');
            const featList = (pkg.features || []).map((f) => {
              const raw = typeof f === 'string' ? f : f.feature || '';
              return raw.replace(/DatoCMS/gi, 'CMS');
            });

            return (
              <div
                key={pkg.id || idx}
                className={`sm-pkg-card reveal ${pkg.isFeatured ? 'is-featured' : ''}`}
              >
                <div className="sm-pkg-badges">
                  <span className="sm-pkg-num">[PAKKET {num}]</span>
                  {pkg.isFeatured && (
                    <span className="sm-pkg-featured-badge">Meest gekozen</span>
                  )}
                </div>

                <h2 className="sm-pkg-name">{pkg.name}</h2>
                <p className="sm-pkg-tagline">{pkg.tagline}</p>

                <div className="sm-pkg-price-row">
                  <div className="sm-pkg-price">{pkg.priceLabel}</div>
                  {pkg.duration && (
                    <div className="sm-pkg-duration">Doorlooptijd: {pkg.duration}</div>
                  )}
                </div>

                <ul className="sm-pkg-features">
                  {featList.map((feat, fIdx) => (
                    <li key={fIdx} className="sm-pkg-feature">
                      <span className="sm-pkg-check">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/contact?pakket=${encodeURIComponent(pkg.name)}`}
                  className={`btn sm-pkg-btn ${
                    pkg.isFeatured ? 'sm-btn-accent' : 'btn-outline'
                  }`}
                >
                  Meer info →
                </Link>
              </div>
            );
          })}
        </div>

        {/* Onderhoudspakket */}
        <div className="sm-maintenance-card reveal">
          <div className="sm-maintenance-top">
            <div className="sm-maintenance-left">
              <div className="sm-maintenance-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <h3 className="sm-maintenance-title">Zorgeloos onderhoud & hosting</h3>
                <p className="sm-maintenance-sub">
                  Optioneel maandpakket zodat jouw website altijd snel, veilig en up-to-date blijft.
                </p>
              </div>
            </div>

            <div className="sm-maintenance-price">{maintenancePrice}</div>
          </div>

          <ul className="sm-maintenance-features">
            {maintenanceFeatures.map((feat, i) => (
              <li key={i} className="sm-pkg-feature">
                <span className="sm-pkg-check">✓</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="cta">
        <div className="cta-backdrop" id="cta-backdrop">
          {homepage?.ctaBackdrop || 'Samen'}
        </div>
        <div className="cta-content">
          <p className="cta-eyebrow reveal">
            {homepage?.ctaEyebrow || 'Klaar voor een website die werkt?'}
          </p>
          <h2 className="cta-title reveal">
            Laten we <em>iets moois</em>
            <br />
            maken.
          </h2>
          <div className="cta-btns reveal">
            <Link href="/contact" className="btn btn-primary">
              Start je project →
            </Link>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-grid">
          <div>
            <div className="footer-logo-txt">Eugène Maaijen</div>
            <div
              className="footer-tagline"
              dangerouslySetInnerHTML={{
                __html:
                  homepage?.footerTagline?.replace(/\n/g, '<br/>') ||
                  `"Design dat raakt vandaag<br />&amp; inspireert morgen."`,
              }}
            />
            <div
              className="footer-loc"
              dangerouslySetInnerHTML={{
                __html:
                  homepage?.footerLocation?.replace(/\n/g, '<br/>') ||
                  `📍 Amsterdam, Nederland<br />Beschikbaar voor remote &amp; on-site`,
              }}
            />
          </div>
          <div>
            <div className="footer-nav-h">Navigatie</div>
            <div className="footer-nav-links">
              <Link href="/work">Werk</Link>
              <Link href="/pakketten">Pakketten</Link>
              <Link href="/#services">Disciplines</Link>
              <Link href="/#about">Over Mij</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <div>
            <div className="footer-contact-h">Neem contact op</div>
            <a
              href={`mailto:${homepage?.ctaEmail || 'info@studio-maaijen.nl'}`}
              className="footer-email"
            >
              {homepage?.ctaEmail || 'info@studio-maaijen.nl'}
            </a>
            <div className="footer-socials">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>LinkedIn</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            {homepage?.footerCopyright ||
              '© 2026 Eugène Maaijen — Alle rechten voorbehouden'}{' '}
            | KVK-nummer: 92113273
          </span>
          <a
            href="#"
            className="back-top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
