'use client';
import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { SiteOverlays, SiteNav, SiteFooter } from './studio-chrome';
import '../app/drukklaar.css';

const BRANCH_OPTIONS = [
  { id: 'Installateur / Klusbedrijf', label: 'Installateur / Klusbedrijf', icon: '⚡', placeholder: 'Bijv. CV-onderhoud, badkamerrenovatie, warmtepompen, leidingwerk...' },
  { id: 'Kapsalon / Schoonheid', label: 'Kapsalon / Schoonheid', icon: '✂️', placeholder: 'Bijv. Knippen & stylen, balayage, bruidskapsels, hoofdhuidverzorging...' },
  { id: 'Zorg / Praktijk', label: 'Zorg / Praktijk', icon: '🩺', placeholder: 'Bijv. Fysiotherapie, revalidatie, manuele therapie, blessurepreventie...' },
  { id: 'Horeca', label: 'Horeca', icon: '🍽️', placeholder: 'Bijv. Seizoenslunch, à la carte diner, borrel & bites, private dining...' },
  { id: 'Winkel / Retail', label: 'Winkel / Retail', icon: '🛍️', placeholder: 'Bijv. Woonaccessoires, stijladvies, cadeauservice, lokale producten...' },
  { id: 'Anders', label: 'Anders / Dienstverlening', icon: '✏️', placeholder: 'Bijv. Maatwerk advies, onderhoud, installatie of zakelijke service...' },
];

const VIBE_OPTIONS = [
  {
    id: 'Strak & modern',
    title: 'Strak & modern',
    desc: 'Minimalistisch, heldere vlakken en krachtige typografie. Een eigentijdse uitstraling.',
    accent: '#ffffff',
  },
  {
    id: 'Warm & persoonlijk',
    title: 'Warm & persoonlijk',
    desc: 'Gastvrij, sfeervol en toegankelijk. Klanten voelen zich direct thuis.',
    accent: '#d6cdb9',
  },
  {
    id: 'Stoer & robuust',
    title: 'Stoer & robuust',
    desc: 'Krachtige contrasten en ambachtelijke no-nonsense stijl. Perfect voor vakkrachten.',
    accent: '#ff4d00',
  },
  {
    id: 'Luxe & chic',
    title: 'Luxe & chic',
    desc: 'Verfijnd, elegant en met oog voor het kleinste detail. Straalt exclusiviteit uit.',
    accent: '#c8963e',
  },
];

const COLOR_PRESETS = [
  { label: 'Studio Oranje', hex: '#ff4d00' },
  { label: 'Oceaanblauw', hex: '#0f4c81' },
  { label: 'Diepgroen', hex: '#245a43' },
  { label: 'Luxe Champagne', hex: '#c8963e' },
  { label: 'Grafiet & Wit', hex: '#111111' },
];

const ACTION_OPTIONS = [
  { id: 'Offerte aanvragen', label: 'Offerte aanvragen', icon: '📋', sub: 'Bezoekers vragen een vrijblijvende prijsopgave' },
  { id: 'Direct bellen', label: 'Direct bellen', icon: '📞', sub: 'Bezoekers bellen direct voor advies of spoed' },
  { id: 'Afspraak maken', label: 'Afspraak maken', icon: '📅', sub: 'Bezoekers plannen eenvoudig online een tijdslot' },
  { id: 'Langskomen op locatie', label: 'Langskomen', icon: '📍', sub: 'Bezoekers bezoeken jouw zaak of showroom' },
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
        setErrorMsg('Vul alsjeblieft de naam van je bedrijf in.');
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
    }
  }

  function handleBack() {
    setErrorMsg('');
    if (step > 1) {
      setStep(s => s - 1);
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

      <main className="h-work-page h-dark" data-theme="dark" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        <div className="h-wrap" style={{ maxWidth: '840px', width: '100%', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column' }}>

          {/* Voortgangsbalk & stappenteller */}
          <div style={{ marginBottom: 'clamp(24px, 4vh, 48px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="h-mono" style={{ color: 'var(--spot)', fontSize: '13px' }}>
                Stap {step} van {totalSteps}
              </span>
              <span className="h-mono" style={{ color: 'var(--dim)', fontSize: '12px' }}>
                Gratis & vrijblijvend
              </span>
            </div>
            <div style={{ width: '100%', height: '3px', background: 'rgba(238, 232, 220, 0.12)', borderRadius: '999px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${(step / totalSteps) * 100}%`,
                  height: '100%',
                  background: 'var(--spot)',
                  transition: 'width 0.4s var(--ease)',
                }}
              />
            </div>
          </div>

          {/* Chat Container */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            
            {/* Eugène Avatar & Spraakballon */}
            <div style={{ display: 'flex', gap: 'clamp(14px, 2.5vw, 24px)', alignItems: 'flex-start', marginBottom: 'clamp(24px, 4vh, 40px)' }}>
              <div style={{ flexShrink: 0, position: 'relative' }}>
                <div style={{ width: 'clamp(48px, 6vw, 64px)', height: 'clamp(48px, 6vw, 64px)', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--spot)' }}>
                  <img
                    src="/images/eugene-portrait.jpg"
                    alt="Eugène Maaijen"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <span
                  title="Online"
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '2px',
                    width: '12px',
                    height: '12px',
                    background: '#10b981',
                    borderRadius: '50%',
                    border: '2px solid #0c0a09',
                  }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <span className="h-mono" style={{ fontSize: '12px', color: 'var(--dim)', display: 'block', marginBottom: '6px' }}>
                  Eugène Maaijen · Studio Maaijen
                </span>

                {/* Vraaginhoud per stap */}
                {step === 1 && (
                  <h1 style={{ fontSize: 'clamp(24px, 4vw, 42px)', lineHeight: 1.15, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--paper)', margin: 0 }}>
                    Hoi! Ik ben Eugène. Wat is de naam van jouw bedrijf?
                  </h1>
                )}
                {step === 2 && (
                  <h1 style={{ fontSize: 'clamp(24px, 4vw, 42px)', lineHeight: 1.15, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--paper)', margin: 0 }}>
                    Leuk, {companyName}! In welke branche ben je actief?
                  </h1>
                )}
                {step === 3 && (
                  <h1 style={{ fontSize: 'clamp(24px, 4vw, 42px)', lineHeight: 1.15, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--paper)', margin: 0 }}>
                    Wat zijn je belangrijkste diensten of specialismes?
                  </h1>
                )}
                {step === 4 && (
                  <h1 style={{ fontSize: 'clamp(24px, 4vw, 42px)', lineHeight: 1.15, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--paper)', margin: 0 }}>
                    Welke sfeer past het beste bij jouw bedrijf?
                  </h1>
                )}
                {step === 5 && (
                  <h1 style={{ fontSize: 'clamp(24px, 4vw, 42px)', lineHeight: 1.15, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--paper)', margin: 0 }}>
                    Heb je al een vaste huiskleur of voorkeur?
                  </h1>
                )}
                {step === 6 && (
                  <h1 style={{ fontSize: 'clamp(24px, 4vw, 42px)', lineHeight: 1.15, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--paper)', margin: 0 }}>
                    Wat moet een bezoeker vooral doen op je site?
                  </h1>
                )}
                {step === 7 && (
                  <h1 style={{ fontSize: 'clamp(24px, 4vw, 42px)', lineHeight: 1.15, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--paper)', margin: 0 }}>
                    Bijna klaar! Waar mag ik je preview naartoe sturen?
                  </h1>
                )}
              </div>
            </div>

            {/* Invoervelden per stap */}
            <div style={{ background: 'rgba(238, 232, 220, 0.03)', border: '1px solid rgba(238, 232, 220, 0.1)', borderRadius: '18px', padding: 'clamp(20px, 3.5vw, 40px)' }}>

              {/* STAP 1: Bedrijfsnaam */}
              {step === 1 && (
                <div>
                  <label htmlFor="companyName" className="h-mono" style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '12px' }}>
                    Bedrijfsnaam
                  </label>
                  <input
                    id="companyName"
                    ref={inputRef}
                    type="text"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Bijv. Bakker Installatietechniek of Salon Puur"
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(238, 232, 220, 0.2)',
                      borderRadius: '12px',
                      color: 'var(--paper)',
                      fontSize: 'clamp(18px, 2.2vw, 24px)',
                      outline: 'none',
                    }}
                  />
                  <p className="h-mono" style={{ fontSize: '11px', color: 'var(--dim)', marginTop: '10px' }}>
                    Druk op Enter ↵ of klik op Volgende om verder te gaan.
                  </p>
                </div>
              )}

              {/* STAP 2: Branche */}
              {step === 2 && (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                    {BRANCH_OPTIONS.map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setBranch(opt.id);
                          if (opt.id !== 'Anders') {
                            setStep(3);
                          }
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '16px 18px',
                          borderRadius: '12px',
                          background: branch === opt.id ? 'var(--spot)' : 'rgba(255, 255, 255, 0.04)',
                          color: branch === opt.id ? 'var(--ink)' : 'var(--paper)',
                          border: branch === opt.id ? '1px solid var(--spot)' : '1px solid rgba(238, 232, 220, 0.15)',
                          fontSize: '15px',
                          fontWeight: 500,
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <span style={{ fontSize: '20px' }}>{opt.icon}</span>
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>

                  {branch === 'Anders' && (
                    <div style={{ marginTop: '16px' }}>
                      <label className="h-mono" style={{ display: 'block', fontSize: '11px', color: 'var(--dim)', marginBottom: '8px' }}>
                        Beschrijf jouw type onderneming:
                      </label>
                      <input
                        type="text"
                        value={customBranch}
                        onChange={e => setCustomBranch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Bijv. Meubelmakerij, Schoonmaakbedrijf of Adviesbureau"
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(238, 232, 220, 0.2)',
                          borderRadius: '10px',
                          color: 'var(--paper)',
                          fontSize: '16px',
                          outline: 'none',
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* STAP 3: Diensten */}
              {step === 3 && (
                <div>
                  <label htmlFor="services" className="h-mono" style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '10px' }}>
                    Belangrijkste diensten of producten (optioneel maar handig)
                  </label>
                  <textarea
                    id="services"
                    ref={inputRef}
                    rows={4}
                    value={services}
                    onChange={e => setServices(e.target.value)}
                    placeholder={currentBranchObj.placeholder}
                    style={{
                      width: '100%',
                      padding: '16px 18px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(238, 232, 220, 0.2)',
                      borderRadius: '12px',
                      color: 'var(--paper)',
                      fontSize: '16px',
                      lineHeight: 1.5,
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                  <p className="h-mono" style={{ fontSize: '11px', color: 'var(--dim)', marginTop: '8px' }}>
                    Tip: Typ gerust een paar steekwoorden onder elkaar. Geen zorgen als je het nog niet precies weet, ik vul het netjes aan!
                  </p>
                </div>
              )}

              {/* STAP 4: Sfeer */}
              {step === 4 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
                  {VIBE_OPTIONS.map(v => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => {
                        setVibe(v.id);
                        setStep(5);
                      }}
                      style={{
                        padding: '20px',
                        borderRadius: '14px',
                        background: vibe === v.id ? 'rgba(255, 77, 0, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                        border: vibe === v.id ? '1.5px solid var(--spot)' : '1px solid rgba(238, 232, 220, 0.15)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span style={{ display: 'block', fontSize: '17px', fontWeight: 600, color: vibe === v.id ? 'var(--spot)' : 'var(--paper)', marginBottom: '6px' }}>
                        {v.title}
                      </span>
                      <span style={{ display: 'block', fontSize: '13px', lineHeight: 1.4, color: 'rgba(238, 232, 220, 0.7)' }}>
                        {v.desc}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* STAP 5: Kleur */}
              {step === 5 && (
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setColorChoice('auto');
                      setBrandColor('#ff4d00');
                      setStep(6);
                    }}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      background: colorChoice === 'auto' ? 'var(--spot)' : 'rgba(255, 255, 255, 0.05)',
                      color: colorChoice === 'auto' ? 'var(--ink)' : 'var(--paper)',
                      border: '1px solid rgba(238, 232, 220, 0.2)',
                      fontSize: '16px',
                      fontWeight: 600,
                      marginBottom: '20px',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    ✦ Geen idee, kies jij maar wat het beste past!
                  </button>

                  <div className="h-mono" style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '12px' }}>
                    Of kies een kleurpalet:
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                    {COLOR_PRESETS.map(c => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => {
                          setColorChoice('preset');
                          setBrandColor(c.hex);
                          setStep(6);
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 16px',
                          borderRadius: '999px',
                          background: brandColor === c.hex && colorChoice === 'preset' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
                          border: brandColor === c.hex && colorChoice === 'preset' ? '1.5px solid var(--spot)' : '1px solid rgba(238, 232, 220, 0.15)',
                          color: 'var(--paper)',
                          cursor: 'pointer',
                        }}
                      >
                        <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: c.hex, border: '1px solid rgba(255,255,255,0.3)' }} />
                        <span style={{ fontSize: '13px' }}>{c.label}</span>
                      </button>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <input
                      type="color"
                      value={brandColor}
                      onChange={e => {
                        setColorChoice('custom');
                        setBrandColor(e.target.value);
                      }}
                      style={{
                        width: '44px',
                        height: '44px',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: 'transparent',
                      }}
                    />
                    <span className="h-mono" style={{ fontSize: '13px', color: 'var(--paper)' }}>
                      Eigen kleurcode kiezen ({brandColor})
                    </span>
                  </div>
                </div>
              )}

              {/* STAP 6: Hoofdactie */}
              {step === 6 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '12px' }}>
                  {ACTION_OPTIONS.map(act => (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => {
                        setPrimaryAction(act.id);
                        setStep(7);
                      }}
                      style={{
                        padding: '18px',
                        borderRadius: '12px',
                        background: primaryAction === act.id ? 'rgba(255, 77, 0, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                        border: primaryAction === act.id ? '1.5px solid var(--spot)' : '1px solid rgba(238, 232, 220, 0.15)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ fontSize: '22px', marginBottom: '8px' }}>{act.icon}</div>
                      <div style={{ fontSize: '16px', fontWeight: 600, color: primaryAction === act.id ? 'var(--spot)' : 'var(--paper)', marginBottom: '4px' }}>
                        {act.label}
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(238, 232, 220, 0.65)', lineHeight: 1.3 }}>
                        {act.sub}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* STAP 7: Contactgegevens */}
              {step === 7 && (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label className="h-mono" style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '6px' }}>
                        Jouw naam *
                      </label>
                      <input
                        ref={inputRef}
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Bijv. Jan Bakker"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(238, 232, 220, 0.2)',
                          borderRadius: '8px',
                          color: 'var(--paper)',
                          fontSize: '15px',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label className="h-mono" style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '6px' }}>
                        E-mailadres *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="naam@bedrijf.nl"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(238, 232, 220, 0.2)',
                          borderRadius: '8px',
                          color: 'var(--paper)',
                          fontSize: '15px',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label className="h-mono" style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '6px' }}>
                        Telefoonnummer (optioneel)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="06 - 1234 5678"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(238, 232, 220, 0.2)',
                          borderRadius: '8px',
                          color: 'var(--paper)',
                          fontSize: '15px',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label className="h-mono" style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '6px' }}>
                        Plaats / Regio
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="Bijv. Ridderkerk of Rotterdam"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(238, 232, 220, 0.2)',
                          borderRadius: '8px',
                          color: 'var(--paper)',
                          fontSize: '15px',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label className="h-mono" style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '6px' }}>
                      Bestaande website (optioneel)
                    </label>
                    <input
                      type="text"
                      value={currentWebsite}
                      onChange={e => setCurrentWebsite(e.target.value)}
                      placeholder="www.jouw-huidige-site.nl"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(238, 232, 220, 0.2)',
                        borderRadius: '8px',
                        color: 'var(--paper)',
                        fontSize: '15px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Privacy Checkbox */}
                  <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <input
                      id="privacy"
                      type="checkbox"
                      checked={privacyAgreed}
                      onChange={e => setPrivacyAgreed(e.target.checked)}
                      style={{ marginTop: '3px', width: '16px', height: '16px', accentColor: 'var(--spot)', cursor: 'pointer' }}
                    />
                    <label htmlFor="privacy" style={{ fontSize: '13px', lineHeight: 1.4, color: 'rgba(238, 232, 220, 0.8)', cursor: 'pointer' }}>
                      Ik ga akkoord met de verwerking van mijn gegevens volgens de{' '}
                      <Link href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--spot)', textDecoration: 'underline' }}>
                        privacyverklaring
                      </Link>
                      . Geen spam, alleen een persoonlijke toelichting en link naar mijn preview.
                    </label>
                  </div>
                </form>
              )}

              {/* Foutmelding */}
              {errorMsg && (
                <div style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '8px', background: 'rgba(255, 77, 0, 0.15)', border: '1px solid var(--spot)', color: 'var(--spot)', fontSize: '14px' }}>
                  ⚠️ {errorMsg}
                </div>
              )}

              {/* Knoppenbalk onderaan */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(238, 232, 220, 0.1)' }}>
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isSubmitting}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--dim)',
                      fontFamily: 'var(--ff-mon)',
                      fontSize: '12px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      padding: '8px 12px',
                    }}
                  >
                    ← Vorige vraag
                  </button>
                ) : <div />}

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="h-btn h-btn--spot"
                    style={{ cursor: 'pointer' }}
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
                    style={{ cursor: isSubmitting ? 'wait' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}
                  >
                    <span>{isSubmitting ? 'Preview samenstellen...' : 'Bekijk mijn preview ✦'}</span>
                    <i aria-hidden="true">→</i>
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
