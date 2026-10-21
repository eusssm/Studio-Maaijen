'use client';
import { useEffect, useRef, useState } from 'react';
import { EMAIL, LINKEDIN, SiteOverlays, SiteNav, SiteFooter } from './studio-chrome';
import '../app/drukklaar.css';

const INTEREST_OPTIONS = ['Huisstijl / logo', 'Website', 'Video / motion', 'Offerte op maat'];

export default function ContactClient({ homepage, siteSetting, initialPackage = '' }) {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [interests, setInterests] = useState(initialPackage ? ['Website'] : []);
  const [message, setMessage] = useState(
    initialPackage ? `Ik ontvang graag meer informatie over het pakket "${initialPackage}".\n\n` : ''
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

      <section className="h-form-page h-dark" data-theme="dark">
        <div className="h-wrap h-form-grid">
          <div className="h-form-intro">
            <div className="h-label" data-h="up">
              <span className="h-mono">(01) Contact</span>
              <span className="h-mono">Reactie binnen 2 werkdagen</span>
            </div>
            <h1 className="h-display" data-h-lines>
              Laten we <em>kennis&shy;maken.</em>
            </h1>
            <p className="h-work-intro" data-h="up">
              Vertel kort waar je mee bezig bent. Ik denk met je mee over het doel, de aanpak en een passend
              voorstel, zonder verplichtingen.
            </p>
            <dl className="h-form-facts" data-h="up">
              <div>
                <dt className="h-mono">E-mail</dt>
                <dd>
                  <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                </dd>
              </div>
              {siteSetting?.contactPhone ? (
                <div>
                  <dt className="h-mono">Telefoon</dt>
                  <dd>
                    <a href={`tel:${siteSetting.contactPhone.replace(/\s/g, '')}`}>{siteSetting.contactPhone}</a>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="h-mono">LinkedIn</dt>
                <dd>
                  <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                    Eugène Maaijen ↗
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <form className="h-form" onSubmit={handleSubmit} noValidate data-h="up">
            <div className="h-field">
              <label htmlFor="sm-name" className="h-mono">
                Naam <b aria-hidden="true">*</b>
              </label>
              <input id="sm-name" type="text" autoComplete="name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="h-field">
              <label htmlFor="sm-email" className="h-mono">
                E-mailadres <b aria-hidden="true">*</b>
              </label>
              <input id="sm-email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="h-field-row">
              <div className="h-field">
                <label htmlFor="sm-company" className="h-mono">Bedrijfsnaam</label>
                <input id="sm-company" type="text" autoComplete="organization" value={company} onChange={e => setCompany(e.target.value)} />
              </div>
              <div className="h-field">
                <label htmlFor="sm-website" className="h-mono">Website</label>
                <input id="sm-website" type="url" autoComplete="url" value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://" />
              </div>
            </div>

            <fieldset className="h-field-set">
              <legend className="h-mono">Ik ben geïnteresseerd in</legend>
              <div className="h-chips">
                {INTEREST_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={interests.includes(opt)}
                    className={`h-chip ${interests.includes(opt) ? 'is-on' : ''}`}
                    onClick={() => toggleInterest(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="h-field">
              <label htmlFor="sm-message" className="h-mono">
                Bericht <b aria-hidden="true">*</b>
              </label>
              <textarea id="sm-message" rows={5} value={message} onChange={e => setMessage(e.target.value)} required />
            </div>

            <div className="h-form-foot">
              <button type="submit" className="h-btn h-btn--spot" disabled={submitting} data-h-magnet>
                <span>{submitting ? 'Versturen…' : 'Verstuur aanvraag'}</span>
                <i aria-hidden="true">→</i>
              </button>
              <p className="h-mono h-form-note">Je gegevens gebruik ik alleen om je aanvraag te beantwoorden.</p>
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
