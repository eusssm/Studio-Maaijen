'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CharSwap, SplitChars, SiteOverlays, SiteNav, SiteFooter } from './studio-chrome';
import '../app/drukklaar.css';
import '../app/mobius-scandi.css';

export default function PrivacyClient() {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <div className="h-root h-subpage" ref={rootRef} id="top">
      <SiteOverlays />
      <SiteNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section className="h-work-page h-dark" data-theme="paper" style={{ minHeight: '80vh' }}>
        <div className="h-wrap" style={{ maxWidth: '840px' }}>
          <div className="h-label" data-h="up" style={{ marginBottom: '32px' }}>
            <span className="h-mono">(Privacy) Studio Maaijen</span>
            <span className="h-mono">AVG / GDPR Compliant</span>
          </div>

          <h1 className="h-display" style={{ fontSize: 'clamp(36px, 5vw, 68px)', marginBottom: '24px' }}>
            <SplitChars text="Privacyverklaring" attr="data-m-sec-char" />
          </h1>

          <p className="h-work-intro" data-h="up" style={{ marginBottom: '48px' }}>
            Studio Maaijen hecht veel waarde aan de bescherming van jouw persoonsgegevens. In deze verklaring leggen we
            op een heldere en begrijpelijke manier uit welke gegevens we verzamelen, waarom we dit doen en hoe we hiermee omgaan.
          </p>

          <div className="h-privacy-content" style={{ display: 'flex', flexDirection: 'column', gap: '36px', lineHeight: 1.7 }}>
            <div data-h="up">
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: '#111111' }}>
                1. Wie zijn wij?
              </h2>
              <p style={{ color: '#484643' }}>
                <strong>Studio Maaijen</strong><br />
                Gevestigd in Ridderkerk, Nederland<br />
                KVK-nummer: 92113273<br />
                E-mailadres: <a href="mailto:info@studio-maaijen.nl" style={{ color: '#111111', textDecoration: 'underline' }}>info@studio-maaijen.nl</a><br />
                Website: <Link href="/" style={{ color: '#111111', textDecoration: 'underline' }}>www.studio-maaijen.nl</Link>
              </p>
            </div>

            <div data-h="up">
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: '#111111' }}>
                2. Welke gegevens verzamelen wij bij een preview-aanvraag?
              </h2>
              <p style={{ color: '#484643', marginBottom: '12px' }}>
                Wanneer je onze interactieve preview-generator doorloopt om een eerste website-opzet te bekijken, vragen wij:
              </p>
              <ul style={{ listStyle: 'disc', paddingLeft: '24px', color: '#57544F', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Bedrijfsnaam en branche</li>
                <li>Jouw voor- en achternaam</li>
                <li>E-mailadres (om de previewlink naartoe te sturen)</li>
                <li>Telefoonnummer (optioneel, voor vlot telefonisch contact)</li>
                <li>Plaats / regio van je onderneming</li>
                <li>Bestaande website (optioneel)</li>
                <li>Je voorkeuren qua sfeer, diensten, kleur en gewenste bezoekeractie</li>
              </ul>
            </div>

            <div data-h="up">
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: '#111111' }}>
                3. Waarom verzamelen wij deze gegevens?
              </h2>
              <p style={{ color: '#484643' }}>
                Wij gebruiken deze informatie uitsluitend om:
              </p>
              <ul style={{ listStyle: 'disc', paddingLeft: '24px', color: '#57544F', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                <li>Een gepersonaliseerde, relevante homepage-preview voor jouw onderneming samen te stellen.</li>
                <li>Je per e-mail de unieke, beveiligde link naar je preview te sturen.</li>
                <li>Vrijblijvend contact met je op te nemen om te bespreken of je het ontwerp wilt laten uitwerken tot een complete, werkende website.</li>
              </ul>
              <p style={{ color: '#484643', marginTop: '12px' }}>
                Wij verkopen jouw gegevens <strong>nooit</strong> aan derden en gebruiken ze niet voor ongewenste reclame of nieuwsbrieven zonder jouw uitdrukkelijke toestemming.
              </p>
            </div>

            <div data-h="up">
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: '#111111' }}>
                4. Hoe lang bewaren wij jouw gegevens?
              </h2>
              <p style={{ color: '#484643' }}>
                Je gegenereerde preview blijft <strong>14 dagen</strong> actief beschikbaar. Aanvragen die niet leiden tot een samenwerking of offerte worden uiterlijk na <strong>6 maanden</strong> definitief verwijderd uit ons beheersysteem.
              </p>
            </div>

            <div data-h="up">
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: '#111111' }}>
                5. Jouw rechten (inzage en verwijdering)
              </h2>
              <p style={{ color: '#484643' }}>
                Je hebt te allen tijde het recht om jouw persoonsgegevens in te zien, te corrigeren of direct te laten verwijderen. Stuur hiervoor een eenvoudig e-mailtje naar <a href="mailto:info@studio-maaijen.nl" style={{ color: '#111111', textDecoration: 'underline' }}>info@studio-maaijen.nl</a>. We voeren jouw verzoek binnen 48 uur uit.
              </p>
            </div>

            <div data-h="up">
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: '#111111' }}>
                6. Beveiliging &amp; Analytics
              </h2>
              <p style={{ color: '#484643' }}>
                Onze website en de previewpagina&apos;s draaien op een beveiligde SSL-verbinding (HTTPS). Gegenereerde previews worden niet geïndexeerd door zoekmachines (noindex) en zijn voorzien van een unieke code, zodat ze niet openbaar vindbaar zijn. Eventuele website-statistieken worden privacyvriendelijk en zonder trackingcookies bijgehouden.
              </p>
            </div>
          </div>

          <div data-h="up" style={{ marginTop: '64px', borderTop: '1px solid #E5E2DC', paddingTop: '32px' }}>
            <Link href="/" className="h-chip is-on" data-h-magnet style={{ textDecoration: 'none', display: 'inline-flex' }}>
              <CharSwap text="← Terug naar Studio Maaijen" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
