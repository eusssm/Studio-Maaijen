'use client';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { resolvePreviewPreset, getDaysRemaining } from '../lib/preview-presets';
import { sized, SiteOverlays, SiteNav, SiteFooter } from './studio-chrome';
import '../app/drukklaar.css';

export default function PreviewPageClient({
  initialSubmission = null,
  slug,
  daysRemaining: initialDays = 14,
  cases = [],
  packages = [],
  siteSetting,
}) {
  const searchParams = useSearchParams();
  const [device, setDevice] = useState('desktop'); // 'desktop' | 'mobile'
  const [submission, setSubmission] = useState(initialSubmission);
  const [isLoading, setIsLoading] = useState(!initialSubmission);

  // Client-side fallback via URL token (?p=) of sessionStorage
  useEffect(() => {
    if (submission) {
      setIsLoading(false);
      return;
    }

    let loaded = null;

    // 1. Probeer URL parameter p
    const pToken = searchParams.get('p');
    if (pToken) {
      try {
        const base64 = pToken.replace(/-/g, '+').replace(/_/g, '/');
        const binary = atob(base64);
        const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
        const decoded = new TextDecoder().decode(bytes);
        loaded = JSON.parse(decoded);
      } catch (err) {
        try {
          const raw = atob(pToken.replace(/-/g, '+').replace(/_/g, '/'));
          loaded = JSON.parse(raw);
        } catch (e2) {
          console.error('Failed to decode preview token from URL:', err);
        }
      }
    }

    // 2. Probeer sessionStorage
    if (!loaded && typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem(`sm_preview_${slug}`);
        if (stored) {
          loaded = JSON.parse(stored);
        }
      } catch (err) {}
    }

    if (loaded) {
      setSubmission(loaded);
    }
    setIsLoading(false);
  }, [submission, searchParams, slug]);

  const daysRemaining = submission?.expires_at ? getDaysRemaining(submission.expires_at) : initialDays;

  const company = submission?.company_name || 'Jouw Bedrijf';
  const branchName = submission?.branch || 'Installateur / Klusbedrijf';
  const city = submission?.city || 'de regio';
  const brandColor = submission?.brand_color || '#ff4d00';
  const primaryAction = submission?.primary_action || 'Offerte aanvragen';

  // Intelligente preset resolver (matcht op branche, trefwoorden & bedrijfsnaam)
  const preset = useMemo(() => {
    return resolvePreviewPreset({
      companyName: submission?.company_name,
      branch: submission?.branch,
      services: submission?.services,
      city: submission?.city,
    });
  }, [submission]);

  // Splits eventueel handmatig ingevoerde diensten of val terug op redactionele presets
  const parsedServices = useMemo(() => {
    if (submission?.services?.trim()) {
      const lines = submission.services
        .split(/[\n,;]+/)
        .map(s => s.trim())
        .filter(s => s.length > 2);

      if (lines.length >= 2) {
        return lines.slice(0, 3).map((item, idx) => ({
          num: `0${idx + 1}`,
          title: item,
          category: 'SPECIALISME',
          desc: `Vakkundig en zorgvuldig gerealiseerd voor particulieren en ondernemingen in ${city} en omstreken.`,
        }));
      }
    }
    return preset.defaultServices;
  }, [submission?.services, preset, city]);

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0c0a09', color: '#eee8dc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="h-mono" style={{ color: 'var(--spot)' }}>Preview laden...</p>
      </div>
    );
  }

  // Not found state
  if (!submission) {
    return (
      <div className="h-root h-subpage">
        <SiteOverlays />
        <SiteNav />
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ maxWidth: '520px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Preview niet gevonden</h1>
            <p style={{ color: 'rgba(238, 232, 220, 0.7)', lineHeight: 1.6, marginBottom: '28px' }}>
              We konden deze website-preview niet vinden. Mogelijk is de link niet compleet of is de preview verplaatst.
            </p>
            <Link href="/start" className="h-btn h-btn--spot" style={{ textDecoration: 'none', display: 'inline-flex' }}>
              <span>Genereer een nieuwe preview</span>
              <i aria-hidden="true">→</i>
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  // Expired state
  if (daysRemaining <= 0) {
    return (
      <div className="h-root h-subpage">
        <SiteOverlays />
        <SiteNav />
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ maxWidth: '520px', textAlign: 'center' }}>
            <div style={{ fontSize: '44px', marginBottom: '16px' }}>⏳</div>
            <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Deze preview is verlopen</h1>
            <p style={{ color: 'rgba(238, 232, 220, 0.7)', lineHeight: 1.6, marginBottom: '28px' }}>
              De 14-daagse preview-periode voor <strong>{company}</strong> is verstreken. Wil je het ontwerp alsnog bekijken of direct doorpakken naar jouw definitieve website? Neem contact op met Eugène!
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="h-btn h-btn--spot" style={{ textDecoration: 'none' }}>
                <span>Neem contact op met Eugène</span>
                <i aria-hidden="true">→</i>
              </Link>
              <Link href="/start" className="h-btn h-btn--ghost" style={{ textDecoration: 'none' }}>
                <span>Nieuwe preview maken</span>
              </Link>
            </div>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="h-root h-subpage" id="top">
      <SiteOverlays />
      <SiteNav />

      {/* ───────── BOVENBALK: STUDIO MAAIJEN PREVIEW FRAME HEADER ───────── */}
      <div
        style={{
          position: 'sticky',
          top: 'var(--nav-h, 68px)',
          zIndex: 90,
          background: 'rgba(12, 10, 9, 0.94)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(238, 232, 220, 0.14)',
          padding: '12px clamp(16px, 3vw, 32px)',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          {/* Titel & Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--spot)',
                boxShadow: '0 0 10px var(--spot)',
                display: 'inline-block',
              }}
            />
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--paper)' }}>
              Eerste schets voor <strong style={{ color: '#fff' }}>{company}</strong>
            </span>
            <span
              className="h-mono"
              style={{
                fontSize: '11px',
                padding: '3px 8px',
                borderRadius: '999px',
                background: 'rgba(255, 77, 0, 0.15)',
                color: 'var(--spot)',
                border: '1px solid rgba(255, 77, 0, 0.3)',
              }}
            >
              ⏳ Nog {daysRemaining} dagen beschikbaar
            </span>
          </div>

          {/* Schakelaar & CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Desktop / Mobiel toggle */}
            <div
              style={{
                display: 'inline-flex',
                background: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '999px',
                padding: '3px',
                border: '1px solid rgba(238, 232, 220, 0.15)',
              }}
            >
              <button
                type="button"
                onClick={() => setDevice('desktop')}
                style={{
                  background: device === 'desktop' ? 'var(--paper)' : 'transparent',
                  color: device === 'desktop' ? 'var(--ink)' : 'var(--dim)',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '5px 12px',
                  fontSize: '12px',
                  fontFamily: 'var(--ff-mon)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
              >
                🖥️ Desktop
              </button>
              <button
                type="button"
                onClick={() => setDevice('mobile')}
                style={{
                  background: device === 'mobile' ? 'var(--paper)' : 'transparent',
                  color: device === 'mobile' ? 'var(--ink)' : 'var(--dim)',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '5px 12px',
                  fontSize: '12px',
                  fontFamily: 'var(--ff-mon)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
              >
                📱 Mobiel
              </button>
            </div>

            {/* Hoofdknop "Ik wil deze website" */}
            <button
              type="button"
              onClick={() => scrollToSection('pakketten')}
              className="h-btn h-btn--spot"
              style={{ padding: '8px 18px', fontSize: '13px', cursor: 'pointer' }}
            >
              <span>Ik wil deze website</span>
              <i aria-hidden="true">↓</i>
            </button>
          </div>
        </div>
      </div>

      {/* ───────── HET PREVIEW KADER (AWWWARDS / GODLY LEVEL) ───────── */}
      <section className="mock-preview-viewport">
        <div
          className={`mock-device-frame ${device === 'mobile' ? 'mock-device-frame--mobile' : 'mock-device-frame--desktop'}`}
          style={{
            '--mock-brand': brandColor,
          }}
        >
          {/* Subtiel watermerk */}
          <div className="mock-watermark-pill">
            Concept · Studio Maaijen
          </div>

          {/* Top Bar: Browser Chrome (Desktop) of Dynamic Island (Mobiel) */}
          {device === 'desktop' ? (
            <div className="mock-browser-chrome">
              <div className="mock-browser-dots">
                <span className="mock-browser-dot" />
                <span className="mock-browser-dot" />
                <span className="mock-browser-dot" />
              </div>
              <div className="mock-browser-url">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>https://www.{slug || 'bedrijf'}.nl</span>
              </div>
              <div style={{ width: '48px' }} />
            </div>
          ) : (
            <div className="mock-phone-notch-bar">
              <div className="mock-phone-island">
                <span className="mock-phone-lens" />
                <span className="mock-phone-sensor" />
              </div>
            </div>
          )}

          {/* ═════════ DE GEGENEREERDE HOMEPAGE ═════════ */}
          <div className="mock-site-root">
            
            {/* Mock Website Navbar */}
            <header className="mock-site-nav">
              <div className="mock-brand-block">
                <span
                  className="mock-brand-dot"
                  style={{ background: brandColor, color: brandColor }}
                />
                <span className="mock-brand-name">{company}</span>
                <span className="mock-brand-est">EST. {city.toUpperCase()}</span>
              </div>

              <nav className="mock-nav-links">
                <span className="mock-nav-link">01 // Specialismen</span>
                <span className="mock-nav-link">02 // Over ons</span>
                <span className="mock-nav-link">03 // Locatie</span>
              </nav>

              <button
                type="button"
                className="mock-nav-cta-btn"
                style={{ background: brandColor }}
              >
                <span>{primaryAction}</span>
                <span aria-hidden="true">→</span>
              </button>
            </header>

            {/* Mock Website Hero: Asymmetric Editorial Split */}
            <section className="mock-hero-section">
              <div className="mock-hero-grid">
                
                {/* Hero Left: Monumental Typography */}
                <div className="mock-hero-left">
                  <div className="mock-discipline-tag">
                    <span style={{ color: brandColor }}>//</span>
                    <span>{preset.disciplineTag}</span>
                    <span style={{ opacity: 0.4 }}>·</span>
                    <span style={{ color: 'rgba(238, 232, 220, 0.7)' }}>{city}</span>
                  </div>

                  <h1 className="mock-hero-title">
                    {preset.heroTitleSans}{' '}
                    <em style={{ color: brandColor }}>{preset.heroTitleItalic}</em>
                    {preset.heroTitleAfter ? ` ${preset.heroTitleAfter}` : ''}
                  </h1>

                  <p className="mock-hero-sub">
                    {preset.heroSub}
                  </p>

                  <div className="mock-hero-ctas">
                    <span className="mock-primary-cta" style={{ background: brandColor }}>
                      <span>{primaryAction}</span>
                      <span aria-hidden="true">→</span>
                    </span>
                    <span className="mock-secondary-link">
                      Ontdek onze aanpak ↓
                    </span>
                  </div>
                </div>

                {/* Hero Right: Showcase Image Card */}
                <div className="mock-hero-showcase">
                  <img
                    src={preset.heroImage}
                    alt={company}
                    className="mock-showcase-img"
                    loading="eager"
                  />
                  <div className="mock-showcase-badge">
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: brandColor,
                        boxShadow: `0 0 8px ${brandColor}`,
                      }}
                    />
                    <span>{preset.heroBadge}</span>
                  </div>
                  <div className="mock-showcase-meta">
                    <span>LOCATIE: {city.toUpperCase()}</span>
                    <span>GEVERIFIEERD CONCEPT</span>
                  </div>
                </div>

              </div>
            </section>

            {/* Swiss Spec Ticker / Stat Strip */}
            <div className="mock-stats-ticker">
              <div className="mock-stats-grid">
                {preset.stats.map((s, idx) => (
                  <div key={idx} className="mock-stat-col">
                    <span className="mock-stat-num" style={{ color: brandColor }}>[{s.num}]</span>
                    <span className="mock-stat-label">{s.label}</span>
                    <span className="mock-stat-sub">{s.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services Section: Swiss Ledger Rows */}
            <section className="mock-services-section">
              <div className="mock-section-head">
                <span className="mock-section-index" style={{ color: brandColor }}>
                  ( 01 ) PORTFOLIO & DIENSTEN
                </span>
                <h2 className="mock-section-title">
                  Gespecialiseerd in <em style={{ color: brandColor }}>kwaliteit & maatwerk</em>
                </h2>
              </div>

              <div className="mock-services-ledger">
                {parsedServices.map((srv, idx) => (
                  <div key={idx} className="mock-ledger-row">
                    <span className="mock-ledger-num" style={{ color: brandColor }}>
                      [{srv.num || `0${idx + 1}`}]
                    </span>
                    <span className="mock-ledger-title">{srv.title}</span>
                    <span className="mock-ledger-cat">{srv.category || 'SPECIALISME'}</span>
                    <p className="mock-ledger-desc">{srv.desc}</p>
                    <span className="mock-ledger-arrow" aria-hidden="true">↗</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Editorial Manifesto / About Split */}
            <section className="mock-manifesto-section">
              <div className="mock-manifesto-grid">
                <blockquote className="mock-manifesto-quote" style={{ borderColor: brandColor }}>
                  “{preset.manifestoQuote}”
                </blockquote>

                <div className="mock-manifesto-right">
                  <span className="mock-section-index" style={{ color: brandColor }}>
                    // OVER {company.toUpperCase()}
                  </span>
                  <p className="mock-manifesto-narrative">
                    {preset.aboutText}
                  </p>

                  <div className="mock-manifesto-stats">
                    <div className="mock-manifesto-stat-block">
                      <span className="mock-manifesto-stat-val">100%</span>
                      <span className="mock-manifesto-stat-lbl">Toewijding</span>
                    </div>
                    <div className="mock-manifesto-stat-block">
                      <span className="mock-manifesto-stat-val">24u</span>
                      <span className="mock-manifesto-stat-lbl">Korte Lijnen</span>
                    </div>
                    <div className="mock-manifesto-stat-block">
                      <span className="mock-manifesto-stat-val">10+</span>
                      <span className="mock-manifesto-stat-lbl">Jaren Ervaring</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Closing CTA / Conversion */}
            <section className="mock-closing-cta">
              <span className="mock-section-index" style={{ color: brandColor, marginBottom: '14px' }}>
                ✦ KLAAR VOOR DE VOLGENDE STAP
              </span>
              <h2 className="mock-closing-title">
                Klaar om kennis te maken met <em style={{ color: brandColor }}>{company}</em>?
              </h2>
              <p className="mock-closing-sub">
                Ervaar onze persoonlijke service en vakkennis in {city} en omstreken.
              </p>
              <span className="mock-primary-cta" style={{ background: brandColor }}>
                <span>{primaryAction}</span>
                <span aria-hidden="true">→</span>
              </span>
            </section>

            {/* Mock Footer Strip */}
            <footer className="mock-footer-strip">
              <span>© 2026 {company} · Alle rechten voorbehouden</span>
              <span>ONTWERPCONCEPT GEREGISSEERD DOOR STUDIO MAAIJEN · RIDDERKERK</span>
            </footer>

          </div>
        </div>
      </section>

      {/* ───────── ONDER DE PREVIEW: STUDIO MAAIJEN CONVERSIE MODULE ───────── */}
      <section className="h-work-page h-dark" data-theme="dark" style={{ borderTop: '1px solid rgba(238, 232, 220, 0.12)' }}>
        <div className="h-wrap">

          {/* 1. PERSOONLIJK BERICHT VAN EUGÈNE */}
          <div
            style={{
              display: 'flex',
              gap: 'clamp(20px, 4vw, 40px)',
              alignItems: 'center',
              padding: 'clamp(32px, 5vw, 60px)',
              background: 'rgba(238, 232, 220, 0.03)',
              border: '1px solid rgba(238, 232, 220, 0.12)',
              borderRadius: '20px',
              marginBottom: 'clamp(60px, 8vh, 100px)',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--spot)', flexShrink: 0 }}>
              <img src="/images/eugene-portrait.jpg" alt="Eugène Maaijen" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ flex: 1, minWidth: '280px' }}>
              <span className="h-mono" style={{ fontSize: '12px', color: 'var(--spot)', display: 'block', marginBottom: '8px' }}>
                Persoonlijke toelichting van Eugène
              </span>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 600, color: '#fff', marginBottom: '12px' }}>
                Dit is pas het begin. Zo maken we het écht jouw website.
              </h2>
              <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'rgba(238, 232, 220, 0.85)' }}>
                Beste {submission?.name || 'ondernemer'}, deze preview is een eerste schets op basis van je antwoorden.
                In het echte ontwerptraject werk ik alles persoonlijk voor je uit: een unieke visuele identiteit, pakkende teksten die verkopen,
                professionele fotografie en slimme interactie. Geen standaard templates, maar een website die klanten overtuigt om contact met jou op te nemen.
              </p>
            </div>
          </div>

          {/* 2. WAT JE KRIJGT ALS JE DOORGAAT */}
          <div style={{ marginBottom: 'clamp(70px, 9vh, 120px)' }}>
            <div className="h-label" style={{ marginBottom: '24px' }}>
              <span className="h-mono">(01) Volledige ontzorging</span>
              <span className="h-mono">Wat zit er in een definitief traject?</span>
            </div>

            <h2 className="h-display" style={{ fontSize: 'clamp(32px, 5vw, 64px)', marginBottom: 'clamp(32px, 5vh, 50px)' }}>
              Alles geregeld van <em>schets tot online</em>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {[
                { title: 'Volledig maatwerk design', desc: 'Geen generiek template, maar een ontwerp dat past bij jouw bedrijf en uitstraling.' },
                { title: 'Alle gewenste pagina’s', desc: 'Home, over ons, diensten, projecten/portfolio en een conversiegericht contactformulier.' },
                { title: '100% mobielvriendelijk', desc: 'Optimaal leesbaar en soepel werkend op smartphone, tablet en desktop.' },
                { title: 'Vindbaar in Google (SEO)', desc: 'Technische SEO, snelle laadtijden en gestructureerde data voor maximale lokale vindbaarheid.' },
                { title: 'Domeinnaam & hosting geregeld', desc: 'Inclusief veilige SSL-verbinding, dagelijkse back-ups en snel onderhoud voor € 25/mnd.' },
                { title: 'Eén vast aanspreekpunt', desc: 'Direct contact met Eugène. Geen accountmanagers of trage tickets, gewoon korte lijnen.' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '28px',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(238, 232, 220, 0.1)',
                  }}
                >
                  <span className="h-mono" style={{ color: 'var(--spot)', fontSize: '13px', display: 'block', marginBottom: '10px' }}>
                    0{idx + 1}
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'rgba(238, 232, 220, 0.7)' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. PORTFOLIO CASES */}
          {cases.length > 0 && (
            <div style={{ marginBottom: 'clamp(70px, 9vh, 120px)' }}>
              <div className="h-label" style={{ marginBottom: '24px' }}>
                <span className="h-mono">(02) Portfolio</span>
                <span className="h-mono">Echt opgeleverd werk</span>
              </div>

              <h2 className="h-display" style={{ fontSize: 'clamp(32px, 5vw, 64px)', marginBottom: 'clamp(32px, 5vh, 50px)' }}>
                Zo ziet een <em>uitgewerkte</em> website eruit
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                {cases.map((c, i) => (
                  <Link
                    key={c.id || i}
                    href={`/work/${c.slug}`}
                    target="_blank"
                    style={{
                      display: 'block',
                      textDecoration: 'none',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      background: '#14110f',
                      border: '1px solid rgba(238, 232, 220, 0.12)',
                      transition: 'transform 0.3s ease, border-color 0.3s ease',
                    }}
                  >
                    <div style={{ height: '220px', width: '100%', overflow: 'hidden', background: '#221f1d' }}>
                      {c.coverImage?.url ? (
                        <img
                          src={sized(c.coverImage.url, 800)}
                          alt={c.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(238,232,220,0.3)' }}>
                          Case
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '20px' }}>
                      <span className="h-mono" style={{ fontSize: '11px', color: 'var(--spot)', textTransform: 'uppercase' }}>
                        {c.categories?.[0]?.name || c.projectType || 'Case'}
                      </span>
                      <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', marginTop: '6px' }}>
                        {c.client || c.title} ↗
                      </h3>
                      {c.introText && (
                        <p style={{ fontSize: '13px', color: 'rgba(238, 232, 220, 0.65)', marginTop: '6px', lineHeight: 1.4 }}>
                          {c.introText.slice(0, 95)}...
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 4. PAKKETTEN KEUZE */}
          <div id="pakketten" style={{ marginBottom: 'clamp(70px, 9vh, 120px)' }}>
            <div className="h-label" style={{ marginBottom: '24px' }}>
              <span className="h-mono">(03) Tarieven</span>
              <span className="h-mono">Heldere vaste prijzen</span>
            </div>

            <h2 className="h-display" style={{ fontSize: 'clamp(32px, 5vw, 64px)', marginBottom: 'clamp(32px, 5vh, 50px)' }}>
              Kies het pakket dat <em>bij jou past</em>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {packages.map(pkg => (
                <div
                  key={pkg.id}
                  style={{
                    padding: 'clamp(28px, 4vw, 36px)',
                    borderRadius: '20px',
                    background: pkg.isFeatured ? 'rgba(255, 77, 0, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                    border: pkg.isFeatured ? '2px solid var(--spot)' : '1px solid rgba(238, 232, 220, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    {pkg.isFeatured && (
                      <span className="h-mono" style={{ fontSize: '11px', color: 'var(--spot)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                        ★ Meest gekozen door MKB
                      </span>
                    )}
                    <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
                      {pkg.name}
                    </h3>
                    <p style={{ fontSize: '14px', color: 'rgba(238, 232, 220, 0.7)', lineHeight: 1.4, marginBottom: '20px' }}>
                      {pkg.tagline}
                    </p>
                    <div style={{ fontSize: '32px', fontWeight: 700, color: '#fff', marginBottom: '24px' }}>
                      {pkg.priceLabel}
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {pkg.features?.map((f, fi) => (
                        <li key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: 'rgba(238, 232, 220, 0.85)' }}>
                          <span style={{ color: 'var(--spot)' }}>✓</span>
                          <span>{f.feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/contact?pakket=${encodeURIComponent(pkg.name)}&bedrijf=${encodeURIComponent(company)}`}
                    className={pkg.isFeatured ? 'h-btn h-btn--spot' : 'h-btn h-btn--ghost'}
                    style={{ textAlign: 'center', justifyContent: 'center' }}
                  >
                    <span>Kies {pkg.name}</span>
                    <i aria-hidden="true">→</i>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* 5. GROTE AFSLUITENDE CTA */}
          <div
            style={{
              padding: 'clamp(40px, 6vw, 70px)',
              background: 'radial-gradient(circle at top center, rgba(255, 77, 0, 0.15) 0%, rgba(12, 10, 9, 0.95) 100%)',
              border: '1px solid rgba(255, 77, 0, 0.3)',
              borderRadius: '24px',
              textAlign: 'center',
            }}
          >
            <span className="h-mono" style={{ fontSize: '12px', color: 'var(--spot)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
              Vrijblijvend advies
            </span>
            <h2 className="h-display" style={{ fontSize: 'clamp(28px, 4.5vw, 54px)', marginBottom: '18px' }}>
              Zullen we jouw website <em>werkelijkheid maken?</em>
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(238, 232, 220, 0.85)', maxWidth: '52ch', margin: '0 auto 32px', lineHeight: 1.6 }}>
              In een kort gesprek van 15 minuten laat ik zien wat er mogelijk is voor {company}.
              Geen verkooppraatjes, maar direct concreet meedenken.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href={`/contact?bedrijf=${encodeURIComponent(company)}`}
                className="h-btn h-btn--spot"
              >
                <span>Plan kennismaking</span>
                <i aria-hidden="true">→</i>
              </Link>
              <a
                href="mailto:info@studio-maaijen.nl"
                className="h-btn h-btn--ghost"
              >
                <span>Mail direct met Eugène</span>
                <i aria-hidden="true">↗</i>
              </a>
            </div>
          </div>

        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
