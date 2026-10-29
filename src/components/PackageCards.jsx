'use client';
import Link from 'next/link';

/* Pakketten als rijen met prijs, doorlooptijd en vinkjes. Het uitgelichte pakket is oranje. */
export function PackageGrid({ packages, compact = false }) {
  return (
    <ol className={`h-pkgs ${compact ? 'h-pkgs--compact' : ''}`} data-h-group>
      {packages.map(pkg => {
        const shownFeatures = compact ? (pkg.features || []).slice(0, 4) : pkg.features || [];
        return (
          <li
            key={pkg.id}
            className={`h-pkg ${pkg.isFeatured ? 'is-featured' : ''}`}
            data-h="up"
          >
            <div className="h-pkg-top">
              <span className="h-mono">[Pakket {pkg.num}]</span>
              {pkg.isFeatured ? <span className="h-mono h-pkg-badge">Meest gekozen</span> : null}
            </div>
            <h3 className="h-pkg-name">{pkg.name}</h3>
            <p className="h-pkg-tagline">{pkg.tagline}</p>
            <div className="h-pkg-price">{pkg.priceLabel}</div>
            {pkg.duration ? <div className="h-mono h-pkg-dur">Doorlooptijd · {pkg.duration}</div> : null}
            {shownFeatures.length > 0 && (
              <ul className="h-pkg-feats">
                {shownFeatures.map((f, i) => (
                  <li key={i}>
                    <span aria-hidden="true">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            )}
            <div className="h-pkg-actions">
              <Link
                href={`/contact?pakket=${encodeURIComponent(pkg.name)}`}
                className={`h-btn ${pkg.isFeatured ? 'h-btn--ink' : 'h-btn--ghost'} h-pkg-btn`}
                data-h-magnet
              >
                <span>Kies dit pakket</span>
                <i aria-hidden="true">→</i>
              </Link>
              {compact && (
                <Link href="/pakketten" className="h-mono h-pkg-spec-link">
                  Alle specificaties →
                </Link>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
