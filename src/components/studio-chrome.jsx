'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

/* ─────────────────────────────────────────────────────────────
   Gedeelde "chrome" van studio-maaijen.nl — Möbius × Scandinavisch.
   Ultra-clean typografische navigatie, rustig mobiel menu en
   monumentale editorial footer.
   ───────────────────────────────────────────────────────────── */

export const EMAIL = 'info@studio-maaijen.nl';
export const LINKEDIN = 'https://www.linkedin.com/in/eug%C3%A8ne-maaijen-4b658345/';

export const NAV_ITEMS = [
  { id: 'werk', label: 'Werk', href: '/work' },
  { id: 'studio', label: 'Studio', href: '/#about' },
  { id: 'diensten', label: 'Diensten', href: '/#services' },
  { id: 'pakketten', label: 'Pakketten', href: '/pakketten' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

export const HERO_NAV_ITEMS = [
  { id: 'werk', label: 'WERK', href: '/work' },
  { id: 'studio', label: 'STUDIO', href: '/#about' },
  { id: 'diensten', label: 'DIENSTEN', href: '/#services' },
  { id: 'contact', label: 'CONTACT', href: '/contact' },
];

/* DatoCMS-beelden (imgix) op maat opvragen */
export function sized(url, w) {
  if (!url) return url;
  if (!/datocms-assets\.com/.test(url)) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}w=${w}&auto=format&q=82`;
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

/* Möbius Double-Layer Per-Character Hover Wave (Menu Item Container) */
export function CharSwap({ text = '', className = '' }) {
  const chars = Array.from(String(text));
  return (
    <span className={`m-charswap ${className}`} aria-label={text}>
      {chars.map((ch, i) => (
        <span
          key={i}
          className="m-char-col"
          style={{ '--char-i': i }}
          aria-hidden="true"
        >
          <span className="m-char-top">{ch === ' ' ? '\u00A0' : ch}</span>
          <span className="m-char-bot">{ch === ' ' ? '\u00A0' : ch}</span>
        </span>
      ))}
    </span>
  );
}

/* Möbius Per-Character Scroll Reveal Wrapper (Headlines & Wordmarks) */
export function SplitChars({ text = '', className = '', attr = 'data-m-char' }) {
  const chars = Array.from(String(text));
  return (
    <span className={`m-split-chars ${className}`} aria-label={text}>
      {chars.map((ch, i) => {
        const props = { [attr]: '' };
        return (
          <span key={i} className="m-split-char-mask" aria-hidden="true">
            <span className="m-split-char" style={{ '--char-i': i }} {...props}>
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          </span>
        );
      })}
    </span>
  );
}

/* Live Ridderkerk klok voor de Möbius Hero & Footer */
export function LiveClock({ className = '' }) {
  const [timeStr, setTimeStr] = useState('10:30 AM');

  useEffect(() => {
    const update = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Europe/Amsterdam',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(now);
        setTimeStr(formatted);
      } catch {
        // fallback
      }
    };
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`m-clock ${className}`}>
      <span className="m-clock-city">RIDDERKERK, NL</span>{' '}
      <strong className="m-clock-time">{timeStr}</strong>
    </span>
  );
}

/* Voortgangsbalk + subtiele cursor */
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

export function SiteNav({ menuOpen: externalOpen, setMenuOpen: externalSetOpen }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const menuOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setMenuOpen = externalSetOpen || setInternalOpen;

  return (
    <>
      <header className="h-nav no-print" data-h-nav>
        <Link href="/" className="h-nav-logo" aria-label="Studio Maaijen, naar de homepage">
          Studio Maaijen<sup>®</sup>
        </Link>

        <nav className="h-nav-links" aria-label="Hoofdnavigatie">
          {HERO_NAV_ITEMS.map(item => (
            <Link key={item.id} href={item.href}>
              <CharSwap text={item.label} />
            </Link>
          ))}
        </nav>

        <div className="h-nav-right">
          <Link href="/pakketten" className="h-nav-sublink">
            <CharSwap text="PAKKETTEN" />
          </Link>
          <Link href="/start?bron=navbar" className="h-nav-preview-cta" data-h-magnet>
            <span>Gratis preview</span> <span aria-hidden="true">→</span>
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
          <Link
            href="/start?bron=mobile-menu"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
            className="h-menu-preview-btn"
          >
            Gratis website-preview →
          </Link>
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
  const tag = tagline || 'Een ontwerpstudio die merken en digitale ervaringen vormgeeft met rust, helderheid en tijdloos vakmanschap.';
  const loc = location || 'Ridderkerk / Rotterdam\nBeschikbaar voor ondernemers & teams';
  return (
    <footer className="h-footer no-print" data-theme="paper">
      <div className="h-wrap">
        <div className="h-footer-grid">
          <div>
            <span className="h-mono">Studio Maaijen®</span>
            <p className="h-footer-lead">{tag}</p>
            <p className="h-footer-dim">{loc.split('\n').map((l, i) => <span key={i} className="h-block">{l}</span>)}</p>
          </div>
          <div>
            <span className="h-mono">Index</span>
            {NAV_ITEMS.map(item => (
              <Link key={item.id} href={item.href}>
                <CharSwap text={item.label} />
              </Link>
            ))}
            <Link href="/start?bron=footer">
              <CharSwap text="Gratis website-preview" />
            </Link>
          </div>
          <div>
            <span className="h-mono">Direct contact</span>
            <a href={`mailto:${EMAIL}`}>
              <CharSwap text={EMAIL} />
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              <CharSwap text="LinkedIn ↗" />
            </a>
            <span className="h-footer-dim h-block">KVK: 92113273</span>
            <LiveClock className="h-footer-clock" />
          </div>
        </div>

        <div className="h-footer-mark" aria-hidden="true" data-m-footer-mark>
          <div className="m-footer-blinds" data-m-blinds>
            <span /><span /><span /><span /><span /><span />
          </div>
          <span className="m-footer-wordmark-row">
            <SplitChars text="Studio Maaijen" attr="data-m-footer-char" />
            <sup className="m-footer-reg" data-m-footer-char>®</sup>
          </span>
        </div>

        <div className="h-footer-bottom">
          <span className="h-mono">{copyright || `© 2013–${String(year).slice(-2)} Studio Maaijen — Alle rechten voorbehouden`}</span>
          <div className="h-footer-bottom-links">
            <Link href="/privacy" className="h-mono">
              <CharSwap text="Privacy" />
            </Link>
            <a href="#top" className="h-mono h-totop">
              <CharSwap text="Naar boven ↑" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
