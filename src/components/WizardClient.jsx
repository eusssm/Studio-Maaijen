'use client';
import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SiteOverlays, SiteNav, SiteFooter } from './studio-chrome';
import '../app/drukklaar.css';
import '../app/mobius-scandi.css';

const pad = n => String(n).padStart(2, '0');

const BRANCH_OPTIONS = [
  {
    id: 'Installateur / Klusbedrijf',
    label: 'Installateur & Klusbedrijf',
    num: '01',
    desc: 'CV-installatie, sanitair, warmtepompen, renovaties & elektra',
    chips: ['CV-onderhoud & storingen', 'Warmtepompen', 'Badkamerrenovatie', 'Loodgieterswerk', 'Elektra & zonnepanelen'],
    placeholder: 'Bijv. CV-onderhoud, badkamerrenovatie, warmtepompen, leidingwerk...',
  },
  {
    id: 'Kapsalon / Schoonheid',
    label: 'Kapsalon & Schoonheid',
    num: '02',
    desc: 'Hairstyling, kleuringen, huidverzorging, visagie & behandelingen',
    chips: ['Knippen & stylen', 'Balayage & highlights', 'Bruidskapsels', 'Gezichtsbehandelingen', 'Huidverbetering'],
    placeholder: 'Bijv. Knippen & stylen, balayage, bruidskapsels, gezichtsverzorging...',
  },
  {
    id: 'Zorg / Praktijk',
    label: 'Zorg & Praktijk',
    num: '03',
    desc: 'Fysiotherapie, tandheelkunde, coaching, psychologie & revalidatie',
    chips: ['Fysiotherapie', 'Manuele therapie', 'Revalidatie', 'Preventief advies', 'Persoonlijke intake'],
    placeholder: 'Bijv. Fysiotherapie, revalidatie, manuele therapie, blessurepreventie...',
  },
  {
    id: 'Horeca',
    label: 'Horeca & Hospitality',
    num: '04',
    desc: 'Restaurants, cafés, lunchrooms, catering & evenementenlocaties',
    chips: ['Seizoenslunch', 'À la carte diner', 'Borrel & bites', 'Private dining & feesten', 'Catering op maat'],
    placeholder: 'Bijv. Seizoenslunch, à la carte diner, borrel & bites, private dining...',
  },
  {
    id: 'Winkel / Retail',
    label: 'Winkel & Boetiek',
    num: '05',
    desc: 'Speciaalzaken, woonwinkels, modeboetieks & ambachtelijke streekproducten',
    chips: ['Woonaccessoires', 'Stijladvies op maat', 'Cadeauservice', 'Lokale producten', 'Afhalen & bezorgen'],
    placeholder: 'Bijv. Woonaccessoires, stijladvies, cadeauservice, lokale producten...',
  },
  {
    id: 'Anders',
    label: 'Dienstverlening & Maatwerk',
    num: '06',
    desc: 'Zakelijke dienstverleners, adviesbureaus, zzp’ers & creatieve makers',
    chips: ['Strategisch advies', 'Projectbegeleiding', 'Onderhoud & service', 'Maatwerkoplossingen'],
    placeholder: 'Bijv. Meubelmakerij, Schoonmaakbedrijf, Boekhouding of Adviesbureau...',
  },
];

const VIBE_OPTIONS = [
  {
    id: 'Strak & modern',
    title: 'Strak & modern',
    num: '01',
    desc: 'Zwitserse eenvoud, heldere vlakken, micro-typografie en maximale rust.',
    accent: '#ffffff',
  },
  {
    id: 'Stoer & robuust',
    title: 'Stoer & robuust',
    num: '02',
    desc: 'Ambachtelijke kracht, donkere contrasten en levendig Studio Oranje.',
    accent: '#ff4d00',
  },
  {
    id: 'Luxe & exclusief',
    title: 'Luxe & exclusief',
    num: '03',
    desc: 'Serif-accenten, champagne-tonen en verfijning voor het hoogste segment.',
    accent: '#c8963e',
  },
  {
    id: 'Warm & persoonlijk',
    title: 'Warm & persoonlijk',
    num: '04',
    desc: 'Gastvrij, tactiele zandtinten en benaderbaar voor lokale klanten.',
    accent: '#d6cdb9',
  },
];

const COLOR_PRESETS = [
  { label: 'Studio Oranje', hex: '#ff4d00' },
  { label: 'Oceaanblauw', hex: '#0f4c81' },
  { label: 'Diepgroen', hex: '#245a43' },
  { label: 'Champagne Goud', hex: '#c8963e' },
  { label: 'Zwart & Ecru', hex: '#141413' },
];

const ACTION_OPTIONS = [
  { id: 'Offerte aanvragen', num: '01', label: 'Offerte aanvragen', sub: 'Bezoekers vragen direct een vrijblijvende prijsindicatie' },
  { id: 'Direct bellen', num: '02', label: 'Direct bellen', sub: 'Bezoekers bellen direct voor spoed, advies of een vraag' },
  { id: 'Afspraak maken', num: '03', label: 'Online afspraak maken', sub: 'Bezoekers plannen zelfstandig een tijdslot in de agenda' },
  { id: 'Langskomen op locatie', num: '04', label: 'Langskomen op locatie', sub: 'Bezoekers bezoeken jouw werkplaats, winkel of salon' },
];

const STEP_TITLES = [
  'Bedrijfsnaam',
  'Branche',
  'Specialismes',
  'Sfeer & Vibe',
  'Huiskleur',
  'Doel voor bezoeker',
  'Contact & Oplevering',
];

export default function WizardClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bron = searchParams.get('bron') || searchParams.get('source') || 'direct';

  const [step, setStep] = useState(1);
  const totalSteps = 7;

  // Form State
  const [companyName, setCompanyName] = useState('');
  const [branch, setBranch] = useState('Installateur / Klusbedrijf');
  const [customBranch, setCustomBranch] = useState('');
  const [services, setServices] = useState('');
  const [vibe, setVibe] = useState('Strak & modern');
  const [colorChoice, setColorChoice] = useState('auto'); // 'auto' | 'preset' | 'custom'
  const [brandColor, setBrandColor] = useState('#ff4d00');
  const [primaryAction, setPrimaryAction] = useState('Offerte aanvragen');

  // Contact State (Step 7)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [currentWebsite, setCurrentWebsite] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const inputRef = useRef(null);

  // Auto-focus input on step change
  useEffect(() => {
    setErrorMsg('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  const currentBranchObj = BRANCH_OPTIONS.find(b => b.id === branch) || BRANCH_OPTIONS[0];

  function handleNext() {
    setErrorMsg('');
    if (step === 1) {
      if (!companyName.trim()) {
        setErrorMsg('Vul alsjeblieft de naam van jouw bedrijf in.');
        return;
      }
    }
    if (step === 2) {
      if (branch === 'Anders' && !customBranch.trim()) {
        setErrorMsg('Beschrijf kort wat voor soort bedrijf je hebt.');
        return;
      }
    }
    if (step < totalSteps) {
      setStep(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleBack() {
    setErrorMsg('');
    if (step > 1) {
      setStep(s => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleAddChip(chip) {
    if (!services.trim()) {
      setServices(chip);
    } else if (!services.includes(chip)) {
      setServices(prev => `${prev.trim()}, ${chip}`);
    }
  }

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Vul alsjeblieft jouw naam in.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Vul alsjeblieft een geldig e-mailadres in.');
      return;
    }
    if (!privacyAgreed) {
      setErrorMsg('Vink alsjeblieft het akkoord met de privacyverklaring aan.');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedBranchName = branch === 'Anders' && customBranch ? customBranch.trim() : branch;
      const finalColor = colorChoice === 'auto' ? '#ff4d00' : brandColor;

      const payload = {
        companyName: companyName.trim(),
        branch: selectedBranchName,
        services: services.trim(),
        vibe,
        brandColor: finalColor,
        primaryAction,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city: city.trim() || 'Ridderkerk',
        currentWebsite: currentWebsite.trim(),
        source: bron,
        privacyAgreed: true,
      };

      const res = await fetch('/api/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Er is iets misgegaan.');
      }

      if (!data.mailed) {
        fetch('https://formsubmit.co/ajax/info@studio-maaijen.nl', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            _subject: `⚡ Nieuwe website-preview aangevraagd: ${payload.companyName} (${payload.branch})`,
            _replyto: payload.email,
            _template: 'table',
            _captcha: 'false',
            Bedrijfsnaam: payload.companyName,
            Branche: payload.branch,
            Plaats: payload.city,
            Naam: payload.name,
            Email: payload.email,
            Telefoon: payload.phone || '-',
            Diensten: payload.services || 'Standaard',
            Sfeer: payload.vibe,
            Kleur: payload.brandColor,
            Hoofdactie: payload.primaryAction,
            BestaandeWebsite: payload.currentWebsite || '-',
            PreviewLink: data.previewUrl || `https://www.studio-maaijen.nl/preview/${data.slug}`,
          }),
        }).catch(() => {});
      }

      // Sla lokaal op als snelle fallback
      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem(`sm_preview_${data.slug}`, JSON.stringify(payload));
        } catch (e) {}
      }

      // Doorsturen naar de zojuist gegenereerde preview
      const targetUrl = `/preview/${data.slug}${data.dataToken ? `?p=${data.dataToken}` : ''}`;
      router.push(targetUrl);
    } catch (err) {
      console.error('Wizard submit error:', err);
      setErrorMsg(err.message || 'Er ging iets mis bij het genereren. Probeer het opnieuw.');
      setIsSubmitting(false);
    }
  }

  // Handle enter key in single inputs
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNext();
    }
  }

  return (
    <div className="h-root h-subpage" id="top">
      <SiteOverlays />
      <SiteNav />

      <main className="wizard-main h-dark" data-theme="dark">
        <div className="wizard-wrap">

          {/* Strakke Zwitserse voortgangsbalk */}
          <div className="wizard-progress-bar">
            <span className="wizard-progress-step h-mono">
              ({pad(step)} / {pad(totalSteps)}) · {STEP_TITLES[step - 1]}
            </span>
            <span className="wizard-progress-track h-mono">
              Gratis preview generator · Studio Maaijen
            </span>
          </div>

          {/* Senior Creative Director micro-badge */}
          <div className="wizard-director-bar">
            <img
              src="/images/eugene-portrait.jpg"
              alt="Eugène Maaijen"
              className="wizard-director-avatar"
            />
            <div className="wizard-director-meta">
              <span className="wizard-director-name">Eugène Maaijen · Lead Designer</span>
              <span className="wizard-director-note">Persoonlijk voorstel op maat</span>
            </div>
          </div>

          {/* Monumentale vraag per stap */}
          {step === 1 && (
            <h1 className="wizard-question-title">
              Hoi! Wat is de naam van jouw <em>bedrijf?</em>
            </h1>
          )}
          {step === 2 && (
            <h1 className="wizard-question-title">
              Leuk, {companyName}! In welke branche ben je <em>actief?</em>
            </h1>
          )}
          {step === 3 && (
            <h1 className="wizard-question-title">
              Wat zijn jouw belangrijkste <em>specialismes?</em>
            </h1>
          )}
          {step === 4 && (
            <h1 className="wizard-question-title">
              Welke sfeer past bij jouw <em>uitstraling?</em>
            </h1>
          )}
          {step === 5 && (
            <h1 className="wizard-question-title">
              Welke huiskleur mag jouw merk <em>ademen?</em>
            </h1>
          )}
          {step === 6 && (
            <h1 className="wizard-question-title">
              Wat moet een bezoeker primair <em>doen?</em>
            </h1>
          )}
          {step === 7 && (
            <h1 className="wizard-question-title">
              Waar mag ik jouw interactieve preview <em>naartoe sturen?</em>
            </h1>
          )}

          {/* ───────── STAP 1: BEDRIJFSNAAM (PUUR REDACTIONEEL) ───────── */}
          {step === 1 && (
            <div className="wizard-hero-field">
              <input
                id="companyName"
                ref={inputRef}
                type="text"
                autoComplete="organization"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Typ jouw bedrijfsnaam…"
                className="wizard-hero-input"
              />
              <div className="wizard-input-hint h-mono">
                <span>Druk op <strong>ENTER ↵</strong> of klik op Volgende stap</span>
              </div>
            </div>
          )}

          {/* ───────── STAP 2: BRANCHE (SWISS TILES GRID) ───────── */}
          {step === 2 && (
            <div>
              <div className="wizard-tiles-grid">
                {BRANCH_OPTIONS.map(opt => {
                  const isActive = branch === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setBranch(opt.id);
                        if (opt.id !== 'Anders') {
                          setStep(3);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className={`wizard-tile ${isActive ? 'is-active' : ''}`}
                    >
                      <div className="wizard-tile-header">
                        <span className="wizard-tile-index">[{opt.num}]</span>
                        {isActive && <span className="h-mono" style={{ color: 'var(--spot)', fontSize: '11px' }}>Gekozen</span>}
                      </div>
                      <div>
                        <div className="wizard-tile-name">{opt.label}</div>
                        <div className="wizard-tile-desc">{opt.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {branch === 'Anders' && (
                <div style={{ marginTop: '24px' }}>
                  <label htmlFor="customBranch" className="h-mono" style={{ display: 'block', fontSize: '11.5px', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '8px', letterSpacing: '0.1em' }}>
                    Beschrijf jouw onderneming of dienstverlening:
                  </label>
                  <input
                    id="customBranch"
                    type="text"
                    value={customBranch}
                    onChange={e => setCustomBranch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Bijv. Meubelmakerij, Adviesbureau of Schoonmaakbedrijf"
                    className="wizard-hero-input"
                    style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}
                  />
                </div>
              )}
            </div>
          )}

          {/* ───────── STAP 3: DIENSTEN & SUGGESTIES ───────── */}
          {step === 3 && (
            <div>
              <textarea
                id="services"
                ref={inputRef}
                rows={3}
                value={services}
                onChange={e => setServices(e.target.value)}
                placeholder={currentBranchObj.placeholder}
                className="wizard-textarea"
              />

              <div className="wizard-suggestions">
                <span className="wizard-suggestions-label h-mono">
                  Klik op een suggestie om direct toe te voegen:
                </span>
                <div className="wizard-quick-chips">
                  {currentBranchObj.chips.map(chip => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleAddChip(chip)}
                      className="wizard-quick-chip"
                    >
                      + {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ───────── STAP 4: SFEER & VIBE (EDITORIAL MOODS) ───────── */}
          {step === 4 && (
            <div className="wizard-moods-grid">
              {VIBE_OPTIONS.map(v => {
                const isActive = vibe === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      setVibe(v.id);
                      setStep(5);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`wizard-mood-card ${isActive ? 'is-active' : ''}`}
                  >
                    <div className="wizard-mood-tag">
                      <span className="wizard-mood-accent-bar" style={{ background: v.accent }} />
                      <span>[{v.num}] Sfeerprofiel</span>
                    </div>
                    <div className="wizard-mood-title">{v.title}</div>
                    <div className="wizard-mood-desc">{v.desc}</div>
                  </button>
                );
              })}
            </div>
          )}

          {/* ───────── STAP 5: HUISKLEUR (PALET & SWATCHES) ───────── */}
          {step === 5 && (
            <div>
              <button
                type="button"
                onClick={() => {
                  setColorChoice('auto');
                  setBrandColor('#ff4d00');
                  setStep(6);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`wizard-color-auto-btn ${colorChoice === 'auto' ? 'is-active' : ''}`}
              >
                <span>✦ Laat Eugène de beste huiskleur kiezen voor jouw branche</span>
                <span className="h-mono">Aanbevolen →</span>
              </button>

              <div className="h-mono" style={{ fontSize: '11.5px', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '14px', letterSpacing: '0.12em' }}>
                Of kies een kenmerkend kleurpalet:
              </div>

              <div className="wizard-swatches-grid">
                {COLOR_PRESETS.map(c => {
                  const isChosen = brandColor === c.hex && colorChoice === 'preset';
                  return (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => {
                        setColorChoice('preset');
                        setBrandColor(c.hex);
                        setStep(6);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`wizard-swatch-item ${isChosen ? 'is-active' : ''}`}
                    >
                      <span className="wizard-swatch-dot" style={{ background: c.hex }} />
                      <div className="wizard-swatch-info">
                        <span className="wizard-swatch-name">{c.label}</span>
                        <span className="wizard-swatch-hex">{c.hex}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '12px', borderTop: '1px solid var(--line-d)' }}>
                <input
                  type="color"
                  value={brandColor}
                  onChange={e => {
                    setColorChoice('custom');
                    setBrandColor(e.target.value);
                  }}
                  style={{
                    width: '36px',
                    height: '36px',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    background: 'transparent',
                  }}
                />
                <span className="h-mono" style={{ fontSize: '12px', color: 'var(--paper)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Eigen hexcode kiezen: <strong style={{ color: 'var(--spot)' }}>{brandColor}</strong>
                </span>
              </div>
            </div>
          )}

          {/* ───────── STAP 6: PRIMAIR DOEL ───────── */}
          {step === 6 && (
            <div className="wizard-actions-list">
              {ACTION_OPTIONS.map(act => {
                const isActive = primaryAction === act.id;
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => {
                      setPrimaryAction(act.id);
                      setStep(7);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`wizard-action-row ${isActive ? 'is-active' : ''}`}
                  >
                    <div className="wizard-action-main">
                      <span className="wizard-action-num">[{act.num}]</span>
                      <span className="wizard-action-title">{act.label}</span>
                    </div>
                    <div className="wizard-action-desc">{act.sub}</div>
                  </button>
                );
              })}
            </div>
          )}

          {/* ───────── STAP 7: CONTACT & OPLEVERING (CONTACT-STYLE) ───────── */}
          {step === 7 && (
            <div className="wizard-contact-split">
              <div className="wizard-contact-summary">
                <div className="wizard-summary-title">Preview Specificaties</div>
                <dl className="wizard-summary-list">
                  <div className="wizard-summary-item">
                    <dt>Bedrijf</dt>
                    <dd>{companyName || '—'}</dd>
                  </div>
                  <div className="wizard-summary-item">
                    <dt>Branche</dt>
                    <dd>{branch === 'Anders' && customBranch ? customBranch : branch}</dd>
                  </div>
                  <div className="wizard-summary-item">
                    <dt>Sfeer</dt>
                    <dd>{vibe}</dd>
                  </div>
                  <div className="wizard-summary-item">
                    <dt>Doel</dt>
                    <dd>{primaryAction}</dd>
                  </div>
                </dl>

                <div className="wizard-summary-perks">
                  <span>Direct interactief op jouw scherm</span>
                  <span>14 dagen online met beveiligde link</span>
                  <span>100% gratis & zonder verdere verplichtingen</span>
                </div>
              </div>

              <form className="wizard-contact-form" onSubmit={handleSubmit} noValidate>
                <div className="wizard-form-row">
                  <div className="wizard-form-field">
                    <label htmlFor="w-name">Jouw naam <b aria-hidden="true">*</b></label>
                    <input
                      id="w-name"
                      ref={inputRef}
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Bijv. Eugène Maaijen"
                    />
                  </div>
                  <div className="wizard-form-field">
                    <label htmlFor="w-email">E-mailadres (voor preview link) <b aria-hidden="true">*</b></label>
                    <input
                      id="w-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="jouw@bedrijf.nl"
                    />
                  </div>
                </div>

                <div className="wizard-form-row">
                  <div className="wizard-form-field">
                    <label htmlFor="w-phone">Telefoonnummer (optioneel)</label>
                    <input
                      id="w-phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="06 - 1234 5678"
                    />
                  </div>
                  <div className="wizard-form-field">
                    <label htmlFor="w-city">Plaats / Regio</label>
                    <input
                      id="w-city"
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="Bijv. Ridderkerk of Rotterdam"
                    />
                  </div>
                </div>

                <div className="wizard-form-field">
                  <label htmlFor="w-web">Huidige website (optioneel)</label>
                  <input
                    id="w-web"
                    type="url"
                    value={currentWebsite}
                    onChange={e => setCurrentWebsite(e.target.value)}
                    placeholder="https://"
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '10px' }}>
                  <input
                    id="privacy"
                    type="checkbox"
                    checked={privacyAgreed}
                    onChange={e => setPrivacyAgreed(e.target.checked)}
                    style={{ marginTop: '3px', accentColor: 'var(--spot)', cursor: 'pointer' }}
                  />
                  <label htmlFor="privacy" style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--dim)', cursor: 'pointer' }}>
                    Ik ga akkoord met de verwerking van mijn gegevens volgens de{' '}
                    <Link href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--paper)', textDecoration: 'underline' }}>
                      privacyverklaring
                    </Link>
                    . Geen spam, alleen een persoonlijke link naar mijn interactieve preview.
                  </label>
                </div>
              </form>
            </div>
          )}

          {/* Foutmelding banner */}
          {errorMsg && (
            <div className="wizard-error-banner" role="alert">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Gekoppelde navigatiebalk onderaan */}
          <div className="wizard-nav-bar">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="wizard-back-btn"
              >
                ← Vorige vraag
              </button>
            ) : <div />}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="h-btn h-btn--spot"
                data-h-magnet
              >
                <span>Volgende stap</span>
                <i aria-hidden="true">→</i>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="h-btn h-btn--spot"
                data-h-magnet
                style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'wait' : 'pointer' }}
              >
                <span>{isSubmitting ? 'Preview samenstellen…' : 'Bekijk mijn preview'}</span>
                <i aria-hidden="true">→</i>
              </button>
            )}
          </div>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
