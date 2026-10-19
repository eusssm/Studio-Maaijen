'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const INTEREST_OPTIONS = [
  'Huisstijl / logo',
  'Website',
  'Video / motion',
  'Offerte op maat',
];

export default function ContactClient({ homepage, siteSetting, initialPackage = '' }) {
  const containerRef = useRef();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [interests, setInterests] = useState(initialPackage ? ['Website'] : []);
  const [message, setMessage] = useState(
    initialPackage
      ? `Ik ontvang graag meer informatie over het pakket "${initialPackage}".\n\n`
      : ''
  );
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const contactEmail =
    siteSetting?.contactEmail || homepage?.ctaEmail || 'info@studio-maaijen.nl';
  const contactPhone = siteSetting?.contactPhone || '';
  const linkedinUrl = 'https://www.linkedin.com/in/eug%C3%A8ne-maaijen-4b658345/';

  useEffect(() => {
    import('./home-animations').then((mod) => {
      let ctx = gsap.context(() => {
        mod.initHomeAnimations(containerRef.current);
      }, containerRef);
      return () => ctx.revert();
    });
  }, []);

  const toggleInterest = (opt) => {
    setInterests((prev) =>
      prev.includes(opt) ? prev.filter((i) => i !== opt) : [...prev, opt]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          website,
          interests,
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({
          type: 'error',
          text: data.error || 'Er ging iets mis. Controleer de verplichte velden.',
        });
      } else {
        setStatus({
          type: 'success',
          text:
            data.message ||
            'Bedankt voor je bericht! Ik neem zo snel mogelijk contact met je op.',
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
        text: 'Netwerkfout bij het verzenden. Mail gerust direct naar info@studio-maaijen.nl.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={containerRef}>
      <div id="scroll-bar"></div>
      <div id="cursor"></div>
      <div id="cursor-ring"></div>

      <nav id="nav">
        <Link href="/" className="nav-logo">STUDIO MAAIJEN</Link>
        <ul className="nav-links">
          <li><Link href="/work">Werk</Link></li>
          <li><Link href="/pakketten">Pakketten</Link></li>
          <li><Link href="/#services">Disciplines</Link></li>
          <li><Link href="/#about">Over</Link></li>
          <li><Link href="/contact" style={{ color: 'var(--accent)' }}>Contact</Link></li>
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
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={`mailto:${contactEmail}`}>Email</a>
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
          <span className="s-tag">Contact</span>
        </div>

        <div className="s-header">
          <h1 className="s-title reveal">
            Laten we <em>iets moois</em>
            <br />
            maken.
          </h1>
          <p className="s-sub reveal">
            Heb je een vraag over een van de pakketten of wil je sparren over een nieuwe website, huisstijl of video? Vul het formulier in of mail direct.
          </p>
        </div>

        <div className="sm-contact-grid">
          <form className="sm-contact-form reveal" onSubmit={handleSubmit} noValidate>
            <div className="sm-form-row">
              <div className="sm-form-group">
                <label htmlFor="sm-name" className="sm-form-label">
                  Naam *
                </label>
                <input
                  id="sm-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="sm-form-input"
                  placeholder="Je volledige naam"
                />
              </div>

              <div className="sm-form-group">
                <label htmlFor="sm-email" className="sm-form-label">
                  E-mailadres *
                </label>
                <input
                  id="sm-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="sm-form-input"
                  placeholder="naam@bedrijf.nl"
                />
              </div>
            </div>

            <div className="sm-form-row">
              <div className="sm-form-group">
                <label htmlFor="sm-company" className="sm-form-label">
                  Bedrijfsnaam
                </label>
                <input
                  id="sm-company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="sm-form-input"
                  placeholder="Optioneel"
                />
              </div>

              <div className="sm-form-group">
                <label htmlFor="sm-website" className="sm-form-label">
                  Website
                </label>
                <input
                  id="sm-website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="sm-form-input"
                  placeholder="https://"
                />
              </div>
            </div>

            <div className="sm-form-group">
              <span className="sm-form-label">Ik ben geïnteresseerd in</span>
              <div className="sm-checkbox-grid">
                {INTEREST_OPTIONS.map((opt) => {
                  const checked = interests.includes(opt);
                  return (
                    <div
                      key={opt}
                      role="checkbox"
                      aria-checked={checked}
                      tabIndex={0}
                      onClick={() => toggleInterest(opt)}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault();
                          toggleInterest(opt);
                        }
                      }}
                      className={`sm-checkbox-pill ${checked ? 'is-checked' : ''}`}
                    >
                      <span className="sm-checkbox-dot">✓</span>
                      <span>{opt}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="sm-form-group">
              <label htmlFor="sm-message" className="sm-form-label">
                Vertel kort over je project *
              </label>
              <textarea
                id="sm-message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="sm-form-textarea"
                placeholder="Waar kan ik je mee helpen? Heb je al een tijdlijn of pakket in gedachten?"
              />
            </div>

            {status && (
              <div className={`sm-form-status ${status.type}`}>
                {status.text}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start' }}>
              <button
                type="submit"
                className="btn sm-btn-accent"
                disabled={submitting}
              >
                {submitting ? 'Bezig met versturen...' : 'Verstuur bericht →'}
              </button>
              <p className="sm-form-privacy">
                Je gegevens worden alleen gebruikt om te reageren op je bericht en nooit gedeeld met derden.
              </p>
            </div>
          </form>

          <aside className="sm-contact-sidebar reveal">
            <div className="sm-contact-card">
              <div className="sm-contact-item">
                <span className="sm-contact-lbl">Direct mailen</span>
                <a href={`mailto:${contactEmail}`} className="sm-contact-val">
                  {contactEmail}
                </a>
              </div>

              {contactPhone && (
                <div className="sm-contact-item">
                  <span className="sm-contact-lbl">Telefoon</span>
                  <a
                    href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                    className="sm-contact-val"
                  >
                    {contactPhone}
                  </a>
                </div>
              )}

              <div className="sm-contact-item">
                <span className="sm-contact-lbl">Socials</span>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm-contact-val"
                >
                  LinkedIn ↗
                </a>
              </div>

              <div className="sm-contact-item">
                <span className="sm-contact-lbl">Locatie</span>
                <div className="sm-contact-val" style={{ fontSize: '16px', color: 'var(--muted)' }}>
                  Ridderkerk / Regio Rotterdam
                  <br />
                  <span style={{ fontSize: '13px', color: 'var(--dim)' }}>
                    Beschikbaar voor remote & on-site
                  </span>
                </div>
              </div>

              <div className="sm-contact-item">
                <span className="sm-contact-lbl">KVK-nummer</span>
                <div style={{ fontSize: '15px', color: 'var(--dim)' }}>92113273</div>
              </div>
            </div>
          </aside>
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
            <a href={`mailto:${contactEmail}`} className="footer-email">
              {contactEmail}
            </a>
            <div className="footer-socials">
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
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
