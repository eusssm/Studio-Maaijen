'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { PackageGrid } from './PackageCards';
import { EMAIL, LINKEDIN, CharSwap, SplitChars, SiteOverlays, SiteNav, SiteFooter } from './studio-chrome';
import {
  normalizePackages,
  resolveMaintenancePrice,
  resolveMaintenanceFeatures,
} from '../../lib/packages';
import '../app/drukklaar.css';
import '../app/mobius-scandi.css';

export default function PakkettenClient({ packages = [], siteSetting, homepage }) {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const items = normalizePackages(packages);
  const maintenancePrice = resolveMaintenancePrice(siteSetting?.maintenancePrice);
  const maintenanceFeatures = resolveMaintenanceFeatures(siteSetting?.maintenanceFeatures);

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

      <section className="h-pkt-page h-dark" data-theme="paper">
        <div className="h-wrap">
          <div className="h-label">
            <span className="waas-eyebrow">01 · Pakketten &amp; tarieven</span>
            <span className="waas-meta">Alle bedragen excl. btw</span>
          </div>
          <h1 className="h-display">
            <SplitChars text="Geen duizenden euro's vooraf" attr="data-m-sec-char" />
          </h1>
          <p className="h-work-intro">
            Een nieuwe bedrijfswebsite vraagt normaal een flinke investering ineens. Bij Studio Maaijen spreid je
            ontwerp en bouw over een overzichtelijk maandbedrag van € 80, zodat je werkkapitaal vrijhoudt voor je
            onderneming. Zodra die periode voorbij is, zakt het tarief automatisch naar € 30 per maand. Alle bedragen
            zijn excl. btw.
          </p>

          <PackageGrid packages={items} variant="page" />

          <div className="h-pkt-preview-strip">
            <div className="h-pkt-strip-left">
              <span className="waas-strip-kicker">Gratis website-preview · Binnen 2 minuten</span>
              <h2 className="h-pkt-strip-title">
                Eerst zien hoe jouw website wordt, voordat je iets beslist.
              </h2>
            </div>
            <div className="h-pkt-strip-right">
              <p className="h-pkt-strip-desc">
                Beantwoord 7 korte vragen over je bedrijf, stijl en diensten. Je ziet direct op je scherm een werkende
                opzet voor jouw onderneming — gratis en zonder belafspraak.
              </p>
              <div className="waas-strip-actions">
                <Link href="/start?bron=pakketten" className="m-btn m-btn--primary" data-h-magnet>
                  <CharSwap text="Maak gratis preview" />
                  <i aria-hidden="true">→</i>
                </Link>
                <span className="waas-strip-note">14 dagen online te bekijken · Zonder verplichtingen</span>
              </div>
            </div>
          </div>

          <div className="h-maint">
            <div className="h-maint-top">
              <div>
                <span className="waas-eyebrow">02 · Hosting &amp; onderhoud</span>
                <h2 className="h-maint-title">Veilig online, technisch bijgehouden</h2>
                <p className="h-maint-sub">
                  Na het opbouwtraject van 12 maanden (landingspagina) of 18 maanden (gewone website) zakt je maandbedrag
                  automatisch naar € 30 excl. btw voor hosting, beveiliging en doorlopend onderhoud.
                </p>
              </div>
              <div className="h-maint-price">{maintenancePrice}</div>
            </div>
            <ul className="h-maint-feats">
              {maintenanceFeatures.map((f, i) => (
                <li key={i}>
                  <span aria-hidden="true">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="h-cs-contact h-contact h-dark" data-theme="paper">
        <div className="h-wrap">
          <p className="waas-eyebrow">
            03 · Kennismaken
          </p>
          <h2 className="h-contact-title">
            <SplitChars text="Bespreek jouw website." attr="data-m-sec-char" />
          </h2>
          <div className="h-contact-actions">
            <Link href="/contact" className="m-btn m-btn--primary" data-h-magnet>
              <CharSwap text="Start je project" />
              <i aria-hidden="true">→</i>
            </Link>
            <a href={`mailto:${EMAIL}`} className="m-btn m-btn--outline" data-h-magnet>
              <CharSwap text={EMAIL} />
              <i aria-hidden="true">↗</i>
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="m-btn m-btn--outline" data-h-magnet>
              <CharSwap text="LinkedIn" />
              <i aria-hidden="true">↗</i>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter tagline={homepage?.footerTagline} location={homepage?.footerLocation} copyright={homepage?.footerCopyright} />
    </div>
  );
}
