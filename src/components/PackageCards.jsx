'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CharSwap } from './studio-chrome';
import { WAAS_ADDON } from '../../lib/packages';

/* Interactieve WaaS-prijzenmodule: 2-koloms pakketkaarten, 2-fasen tijdlijn en live Slimme uitbreiding toggle. */
export function PackageGrid({ packages = [], variant = 'page', compact = false, company = '' }) {
  const [addonSelected, setAddonSelected] = useState(false);
  const addonDelta = addonSelected ? WAAS_ADDON.monthlyPrice : 0;

  return (
    <div className={`waas-module waas-module--${variant}${compact ? ' is-compact' : ''}`}>
      <div className={`waas-addon-bar ${addonSelected ? 'is-active' : ''}`}>
        <div className="waas-addon-info">
          <span className="waas-addon-kicker">{WAAS_ADDON.kicker}</span>
          <h3 className="waas-addon-title">{WAAS_ADDON.name}</h3>
          <p className="waas-addon-desc">{WAAS_ADDON.description}</p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={addonSelected}
          className={`waas-addon-switch ${addonSelected ? 'is-on' : ''}`}
          onClick={() => setAddonSelected(v => !v)}
        >
          <span className="waas-switch-track" aria-hidden="true">
            <span className="waas-switch-thumb" />
          </span>
          <span className="waas-switch-label">
            {addonSelected ? WAAS_ADDON.toggleOnLabel : WAAS_ADDON.toggleOffLabel}
          </span>
        </button>
      </div>

      <ol className="waas-grid">
        {packages.map(pkg => {
          const activeMonthly = (pkg.monthlyPrice ?? 80) + addonDelta;
          const activeAfterMonthly = (pkg.maintenancePrice ?? 30) + addonDelta;
          const shownFeatures = compact ? (pkg.features || []).slice(0, 5) : pkg.features || [];

          const queryParts = [`pakket=${encodeURIComponent(pkg.name)}`];
          if (addonSelected) queryParts.push(`addon=${encodeURIComponent(WAAS_ADDON.slug)}`);
          if (company) queryParts.push(`bedrijf=${encodeURIComponent(company)}`);
          const contactHref = `/contact?${queryParts.join('&')}`;

          return (
            <li
              key={pkg.id}
              className={`waas-card ${pkg.isFeatured ? 'is-featured' : ''} ${addonSelected ? 'is-addon-active' : ''}`}
            >
              <header className="waas-card-top">
                <span className="waas-eyebrow">
                  {pkg.num} · {pkg.sublabel}
                </span>
                {pkg.isFeatured ? <span className="waas-badge">Meest gekozen</span> : null}
              </header>

              <h3 className="waas-card-name">{pkg.name}</h3>
              <p className="waas-card-tagline">{pkg.tagline}</p>

              <div className="waas-price-block" aria-live="polite">
                <div className="waas-price-row">
                  <span className="waas-price-amount">€ {activeMonthly}</span>
                  <span className="waas-price-unit">/ mnd</span>
                </div>
                <div className="waas-price-meta-row">
                  <span className="waas-price-meta">
                    excl. btw{addonSelected ? ' · incl. slimme uitbreiding' : ''}
                  </span>
                  {pkg.duration ? (
                    <span className="waas-duration">Doorlooptijd · {pkg.duration}</span>
                  ) : null}
                </div>
              </div>

              <div className="waas-timeline" aria-label={`Prijsverloop ${pkg.name}`}>
                <div className="waas-timeline-step is-phase-1">
                  <div className="waas-timeline-head">
                    <span className="waas-timeline-period">Maand 1–{pkg.buildMonths}</span>
                    <span className="waas-timeline-rate">€ {activeMonthly} / mnd</span>
                  </div>
                  <p className="waas-timeline-desc">
                    Ontwerp, bouw en lancering · Vast traject van {pkg.buildMonths} maanden
                  </p>
                </div>

                <div className="waas-timeline-step is-phase-2">
                  <div className="waas-timeline-head">
                    <span className="waas-timeline-period">Vanaf maand {pkg.afterMonth}</span>
                    <span className="waas-timeline-rate">€ {activeAfterMonthly} / mnd</span>
                  </div>
                  <p className="waas-timeline-desc">
                    Hosting, beveiliging en doorlopend onderhoud
                  </p>
                </div>
              </div>

              {shownFeatures.length > 0 && (
                <ul className="waas-feats">
                  {shownFeatures.map((feature, idx) => (
                    <li key={idx}>
                      <span aria-hidden="true">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              <footer className="waas-card-foot">
                <Link
                  href={contactHref}
                  className={`m-btn ${pkg.isFeatured ? 'waas-cta--light' : 'm-btn--outline'} waas-cta`}
                  data-h-magnet
                >
                  <CharSwap text={`Start met ${pkg.name}`} />
                  <i aria-hidden="true">→</i>
                </Link>
                <p className="waas-card-note" aria-live="polite">
                  Geen startfactuur · Na {pkg.buildMonths} maanden € {activeAfterMonthly} / mnd
                </p>
              </footer>
            </li>
          );
        })}
      </ol>

      <aside className="waas-custom-note">
        <p>
          Voor een nieuw logo, complete huisstijl of bedrijfsvideo naast je website maken we een los
          projectvoorstel.
        </p>
        <Link href="/contact?onderwerp=maatwerk" className="waas-custom-link">
          <CharSwap text="Vraag een maatwerkvoorstel aan" />
          <span aria-hidden="true">→</span>
        </Link>
      </aside>
    </div>
  );
}
