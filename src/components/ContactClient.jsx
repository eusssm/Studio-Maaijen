'use client';
import { useEffect, useRef, useState } from 'react';
import { EMAIL, LINKEDIN, CharSwap, SplitChars, SiteOverlays, SiteNav, SiteFooter } from './studio-chrome';
import '../app/drukklaar.css';
import '../app/mobius-scandi.css';

const ADDON_INTEREST_LABEL = 'Slimme uitbreiding (+ € 40/mnd)';
const INTEREST_OPTIONS = [
  'Huisstijl / logo',
  'Website',
  ADDON_INTEREST_LABEL,
  'Video / motion',
  'Offerte op maat',
];

function getInitialInterests(initialPackage, initialAddon, initialSubject) {
  const selected = [];
  const hasAddon = initialAddon === 'slimme-uitbreiding';

  if (initialSubject === 'maatwerk') {
    selected.push('Huisstijl / logo', 'Offerte op maat');
  } else if (initialPackage) {
    selected.push('Website');
  }

  if (hasAddon && !selected.includes(ADDON_INTEREST_LABEL)) {
    selected.push(ADDON_INTEREST_LABEL);
  }
  return selected;
}

function getInitialMessage(initialPackage, initialAddon, initialSubject) {
  const hasAddon = initialAddon === 'slimme-uitbreiding';

  if (initialSubject === 'maatwerk') {
    return 'Ik wil graag een maatwerkvoorstel aanvragen voor een logo, huisstijl of bedrijfsvideo naast een website.\n\n';
  }
  if (initialPackage) {
    return hasAddon
      ? `Ik wil graag starten met het WaaS-pakket "${initialPackage}" (inclusief Slimme uitbreiding + € 40/mnd excl. btw).\n\n`
      : `Ik wil graag starten met het WaaS-pakket "${initialPackage}".\n\n`;
  }
  if (hasAddon) {
    return 'Ik heb interesse in de Slimme uitbreiding (+ € 40/mnd excl. btw) voor mijn website.\n\n';
  }
  return '';
}

export default function ContactClient({
  homepage,
  siteSetting,
  initialPackage = '',
  initialAddon = '',
  initialSubject = '',
  initialCompany = '',
}) {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState(initialCompany);
  const [website, setWebsite] = useState('');
  const [interests, setInterests] = useState(() =>
    getInitialInterests(initialPackage, initialAddon, initialSubject)
  );
  const [message, setMessage] = useState(() =>
    getInitialMessage(initialPackage, initialAddon, initialSubject)
  );
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const contactEmail = siteSetting?.contactEmail || homepage?.ctaEmail || EMAIL;

  useEffect(() => {
    let cleanup = null;
    let cancelled = false;
    import('./home-animations').then(mod => {
      if (cancelled || !rootRef.current) return;
      cleanup = mod.initHomeMotion(rootRef.current);
    });
    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const toggleInterest = opt =>
    setInterests(prev => (prev.includes(opt) ? prev.filter(i => i !== opt) : [...prev, opt]));

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, website, interests, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: 'error', text: data.error || 'Er ging iets mis. Controleer de verplichte velden.' });
      } else {
        if (!data.mailed) {
          fetch('https://formsubmit.co/ajax/info@studio-maaijen.nl', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              _subject: `Nieuwe aanvraag via Studio Maaijen — ${name.trim()}${company ? ` (${company.trim()})` : ''}`,
              _replyto: email.trim(),
              _template: 'table',
              _captcha: 'false',
              Naam: name.trim(),
              Email: email.trim(),
              Bedrijfsnaam: company.trim() || '-',
              Website: website.trim() || '-',
              Interesse: interests.length ? interests.join(', ') : 'Niet opgegeven',
              Bericht: message.trim(),
            }),
          }).catch(() => {});
        }
        setStatus({
          type: 'success',
          text: data.message || 'Bedankt voor je bericht! Ik neem zo snel mogelijk contact met je op.',
        });
        setName('');
        setEmail('');
        setCompany('');
        setWebsite('');
        setInterests([]);
        setMessage('');
      }
    } catch {
      setStatus({
        type: 'error',
        text: `Netwerkfout bij het verzenden. Mail gerust direct naar ${EMAIL}.`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-root h-subpage" ref={rootRef} id="top">
      <SiteOverlays />
      <SiteNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section className="h-form-page h-dark" data-theme="paper">
        <div className="h-wrap h-form-grid">
          <div className="h-form-intro">
            <div className="h-label" data-h="up">
              <span className="waas-eyebrow">01 · Contact</span>
              <span className="waas-meta">Reactie binnen 2 werkdagen</span>
            </div>
            <h1 className="h-display">
              <SplitChars text="Laten we kennismaken." attr="data-m-sec-char" />
            </h1>
            <p className="h-work-intro" data-h="up">
              Vertel kort waar je mee bezig bent. Ik denk met je mee over het doel, de aanpak en een passend
              voorstel, zonder verplichtingen.
            </p>
            <dl className="h-form-facts" data-h="up">
              <div>
                <dt className="waas-eyebrow">E-mail</dt>
                <dd>
                  <a href={`mailto:${contactEmail}`}>
                    <CharSwap text={contactEmail} />
                  </a>
                </dd>
              </div>
              {siteSetting?.contactPhone ? (
                <div>
                  <dt className="waas-eyebrow">Telefoon</dt>
                  <dd>
                    <a href={`tel:${siteSetting.contactPhone.replace(/\s/g, '')}`}>
                      <CharSwap text={siteSetting.contactPhone} />
                    </a>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="waas-eyebrow">LinkedIn</dt>
                <dd>
                  <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                    <CharSwap text="Eugène Maaijen ↗" />
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <form className="h-form" onSubmit={handleSubmit} noValidate data-h="up">
            <div className="h-field">
              <label htmlFor="sm-name" className="waas-eyebrow">
                Naam <b aria-hidden="true">*</b>
              </label>
              <input id="sm-name" type="text" autoComplete="name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="h-field">
              <label htmlFor="sm-email" className="waas-eyebrow">
                E-mailadres <b aria-hidden="true">*</b>
              </label>
              <input id="sm-email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="h-field-row">
              <div className="h-field">
                <label htmlFor="sm-company" className="waas-eyebrow">Bedrijfsnaam</label>
                <input id="sm-company" type="text" autoComplete="organization" value={company} onChange={e => setCompany(e.target.value)} />
              </div>
              <div className="h-field">
                <label htmlFor="sm-website" className="waas-eyebrow">Website</label>
                <input id="sm-website" type="url" autoComplete="url" value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://" />
              </div>
            </div>

            <fieldset className="h-field-set">
              <legend className="waas-eyebrow">Ik ben geïnteresseerd in</legend>
              <div className="h-chips">
                {INTEREST_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={interests.includes(opt)}
                    className={`h-chip ${interests.includes(opt) ? 'is-on' : ''}`}
                    onClick={() => toggleInterest(opt)}
                    data-h-magnet
                  >
                    <CharSwap text={opt} />
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="h-field">
              <label htmlFor="sm-message" className="waas-eyebrow">
                Bericht <b aria-hidden="true">*</b>
              </label>
              <textarea id="sm-message" rows={5} value={message} onChange={e => setMessage(e.target.value)} required />
            </div>

            <div className="h-form-foot">
              <button type="submit" className="m-btn m-btn--primary" disabled={submitting} data-h-magnet>
                <CharSwap text={submitting ? 'Versturen…' : 'Verstuur aanvraag'} />
                <i aria-hidden="true">→</i>
              </button>
              <p className="waas-meta h-form-note">Je gegevens gebruik ik alleen om je aanvraag te beantwoorden.</p>
            </div>

            {status ? (
              <p role="status" className={`h-form-status is-${status.type}`}>
                {status.text}
              </p>
            ) : null}
          </form>
        </div>
      </section>

      <SiteFooter tagline={homepage?.footerTagline} location={homepage?.footerLocation} copyright={homepage?.footerCopyright} />
    </div>
  );
}
