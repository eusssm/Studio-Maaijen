'use client';
import Link from 'next/link';

/* ─────────────────────────────────────────────────────────────
   Gedeelde "chrome" van studio-maaijen.nl: navigatie, mobiel menu,
   footer en kleine grafische elementen. Zelfde taal als de CV-site
   (Drukklaar), maar gericht op opdrachtgevers: pakketten en contact.
   ───────────────────────────────────────────────────────────── */

export const EMAIL = 'info@studio-maaijen.nl';
export const LINKEDIN = 'https://www.linkedin.com/in/eug%C3%A8ne-maaijen-4b658345/';

export const NAV_ITEMS = [
  { id: 'werk', label: 'Werk', href: '/work' },
  { id: 'pakketten', label: 'Pakketten', href: '/pakketten' },
  { id: 'disciplines', label: 'Disciplines', href: '/#services' },
  { id: 'over', label: 'Over', href: '/#about' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

/* DatoCMS-beelden (imgix) op maat opvragen */
export function sized(url, w) {
  if (!url) return url;
  if (!/datocms-assets\.com/.test(url)) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}w=${w}&auto=format&q=78`;
}

export function CropMarks({ className = '' }) {
  return (
    <span className={`h-crop ${className}`} aria-hidden="true">
      <i /><i /><i /><i />
    </span>
  );
}

export function Reg({ className = '' }) {
  return (
    <svg className={`h-reg ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M12 1v22M1 12h22" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/* Voortgangsbalk + cursor (cursor wordt alleen actief bij een fijne pointer) */
export function SiteOverlays() {
  return (
    <>
      <div className="h-progress no-print" aria-hidden="true">
        <span data-h-progress />
      </div>
      <div className="h-cursor no-print" aria-hidden="true">
        <span data-h-cursor-label />
      </div>
    </>
  );
}

export function SiteNav({ menuOpen, setMenuOpen, availability = 'Nu beschikbaar' }) {
  return (
    <>
      <header className="h-nav no-print" data-h-nav>
        <Link href="/" className="h-nav-logo" aria-label="Studio Maaijen, naar de homepage">
          <span className="h-nav-mark" aria-hidden="true">
            <Reg />
          </span>
          Studio Maaijen
        </Link>
        <nav className="h-nav-links" aria-label="Hoofdnavigatie">
          {NAV_ITEMS.map((item, i) => (
            <Link key={item.id} href={item.href}>
              <small>0{i + 1}</small>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="h-nav-right">
          <span className="h-nav-status">
            <i aria-hidden="true" /> {availability}
          </span>
          <Link href="/contact" className="h-nav-cv">
            Start een project <span aria-hidden="true">→</span>
          </Link>
          <button
            type="button"
            className="h-nav-burger"
            aria-expanded={menuOpen}
            aria-controls="h-menu"
            onClick={() => setMenuOpen(v => !v)}
          >
            <span>{menuOpen ? 'Sluit' : 'Menu'}</span>
          </button>
        </div>
      </header>

      <div id="h-menu" className={`h-menu no-print ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobiel menu">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              <small>0{i + 1}</small>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="h-menu-foot">
          <a href={`mailto:${EMAIL}`} tabIndex={menuOpen ? 0 : -1}>
            {EMAIL}
          </a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" tabIndex={menuOpen ? 0 : -1}>
            LinkedIn ↗
          </a>
        </div>
      </div>
    </>
  );
}

export function SiteFooter({ tagline, location, copyright }) {
  const year = new Date().getFullYear();
  const tag = tagline || 'Design dat raakt vandaag\n& inspireert morgen.';
  const loc = location || 'Amsterdam, Nederland\nBeschikbaar voor remote & on-site';
  return (
    <footer className="h-footer h-dark no-print" data-theme="dark">
      <div className="h-wrap">
        <div className="h-footer-grid">
          <div>
            <span className="h-mono">Studio Maaijen</span>
            <p>{tag.split('\n').map((l, i) => <span key={i} className="h-block">{l}</span>)}</p>
            <p className="h-footer-dim">{loc.split('\n').map((l, i) => <span key={i} className="h-block">{l}</span>)}</p>
          </div>
          <div>
            <span className="h-mono">Navigatie</span>
            {NAV_ITEMS.map(item => (
              <Link key={item.id} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <span className="h-mono">Neem contact op</span>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            <span className="h-footer-dim h-block">KVK-nummer: 92113273</span>
          </div>
        </div>

        <div className="h-footer-mark" aria-hidden="true">
          <span>Studio</span>
          <span>Maaijen</span>
        </div>

        <div className="h-footer-bottom">
          <span className="h-mono">{copyright || `© ${year} Eugène Maaijen — Alle rechten voorbehouden`}</span>
          <a href="#top" className="h-mono h-totop">
            Naar boven ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
