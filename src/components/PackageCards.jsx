'use client';
import Link from 'next/link';

/* Pakketten als rijen met prijs, doorlooptijd en vinkjes. Het uitgelichte pakket is oranje. */
export function PackageGrid({ packages, compact = false }) {
  return (
    <ol className={`h-pkgs ${compact ? 'h-pkgs--compact' : ''}`} data-h-group>
      {packages.map(pkg => (
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
          {!compact && (
            <ul className="h-pkg-feats">
              {pkg.features.map((f, i) => (
                <li key={i}>
                  <span aria-hidden="true">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          )}
          <Link
            href={`/contact?pakket=${encodeURIComponent(pkg.name)}`}
            className={`h-btn ${pkg.isFeatured ? 'h-btn--ink' : 'h-btn--ghost'} h-pkg-btn`}
            data-h-magnet
          >
            <span>Meer info</span>
            <i aria-hidden="true">→</i>
          </Link>
        </li>
      ))}
    </ol>
  );
}
