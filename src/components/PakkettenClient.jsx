'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { PackageGrid } from './PackageCards';
import { EMAIL, LINKEDIN, SiteOverlays, SiteNav, SiteFooter } from './studio-chrome';
import { normalizePackages, DEFAULT_MAINTENANCE_FEATURES } from '../../lib/packages';
import '../app/drukklaar.css';

export default function PakkettenClient({ packages = [], siteSetting, homepage }) {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const items = normalizePackages(packages);
  const maintenancePrice = siteSetting?.maintenancePrice || '€ 25 / maand';
  const maintenanceFeatures =
    siteSetting?.maintenanceFeatures?.length > 0
      ? siteSetting.maintenanceFeatures.map(f => f.feature).filter(Boolean)
      : DEFAULT_MAINTENANCE_FEATURES;

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

      <section className="h-pkt-page h-dark" data-theme="dark">
        <div className="h-wrap">
          <div className="h-label" data-h="up">
            <span className="h-mono">(01) Pakketten & tarieven</span>
            <span className="h-mono">Vaste prijzen, geen verrassingen</span>
          </div>
          <h1 className="h-display" data-h-lines>
            Heldere pakketten, <em>sleutelklaar</em>
          </h1>
          <p className="h-work-intro" data-h="up">
            Websites inclusief CMS, huisstijlen en video voor ondernemers en MKB. Van ontwerp tot online, zonder
            verrassingen achteraf.
          </p>

          <PackageGrid packages={items} />

          <div className="h-maint" data-h="up">
            <div className="h-maint-top">
              <div>
                <span className="h-mono">Optioneel · Onderhoud & hosting</span>
                <h2 className="h-maint-title">Zorgeloos online blijven</h2>
                <p className="h-maint-sub">
                  Een maandpakket zodat je website altijd snel, veilig en up-to-date blijft.
                </p>
              </div>
              <div className="h-maint-price">{maintenancePrice}</div>
            </div>
            <ul className="h-maint-feats">
              {maintenanceFeatures.map((f, i) => (
                <li key={i}>
                  <span aria-hidden="true">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="h-cs-contact h-contact h-dark" data-theme="dark">
        <div className="h-wrap">
          <p className="h-contact-eyebrow" data-h="up">
            {homepage?.ctaEyebrow || 'Klaar voor een website die werkt?'}
          </p>
          <h2 className="h-contact-title" data-h-lines>
            Laten we <em>iets moois</em> maken.
          </h2>
          <div className="h-contact-actions" data-h="up">
            <Link href="/contact" className="h-btn h-btn--spot" data-h-magnet>
              <span>Start je project</span>
              <i aria-hidden="true">→</i>
            </Link>
            <a href={`mailto:${EMAIL}`} className="h-btn h-btn--ghost" data-h-magnet>
              <span>{EMAIL}</span>
              <i aria-hidden="true">↗</i>
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="h-btn h-btn--ghost" data-h-magnet>
              <span>LinkedIn</span>
              <i aria-hidden="true">↗</i>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter tagline={homepage?.footerTagline} location={homepage?.footerLocation} copyright={homepage?.footerCopyright} />
    </div>
  );
}
