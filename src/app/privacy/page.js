import Link from 'next/link';
import { SiteOverlays, SiteNav, SiteFooter } from '../../components/studio-chrome';
import '../drukklaar.css';

export const metadata = {
  title: 'Privacyverklaring | Studio Maaijen',
  description: 'Heldere privacyverklaring van Studio Maaijen over de verwerking van persoonsgegevens bij offerte- en preview-aanvragen.',
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="h-root h-subpage" id="top">
      <SiteOverlays />
      <SiteNav />

      <section className="h-work-page h-dark" data-theme="dark" style={{ minHeight: '80vh' }}>
        <div className="h-wrap" style={{ maxWidth: '840px' }}>
          <div className="h-label" style={{ marginBottom: '32px' }}>
            <span className="h-mono">(Privacy) Studio Maaijen</span>
            <span className="h-mono">AVG / GDPR Compliant</span>
          </div>

          <h1 className="h-display" style={{ fontSize: 'clamp(36px, 5vw, 68px)', marginBottom: '24px' }}>
            Privacy<em>verklaring</em>
          </h1>

          <p className="h-work-intro" style={{ marginBottom: '48px', color: 'rgba(238, 232, 220, 0.8)' }}>
            Studio Maaijen hecht veel waarde aan de bescherming van jouw persoonsgegevens. In deze verklaring leggen we
            op een heldere en begrijpelijke manier uit welke gegevens we verzamelen, waarom we dit doen en hoe we hiermee omgaan.
          </p>

          <div className="h-privacy-content" style={{ display: 'flex', flexDirection: 'column', gap: '36px', lineHeight: 1.7 }}>
            <div>
              <h2 style={{ fontSize: '20px', fontFamily: 'var(--ff-mon)', letterSpacing: '0.05em', color: 'var(--spot)', marginBottom: '10px' }}>
                1. Wie zijn wij?
              </h2>
              <p style={{ color: 'rgba(238, 232, 220, 0.85)' }}>
                <strong>Studio Maaijen</strong><br />
                Gevestigd in Ridderkerk, Nederland<br />
                KVK-nummer: 92113273<br />
                E-mailadres: <a href="mailto:info@studio-maaijen.nl" style={{ color: 'var(--spot)', textDecoration: 'underline' }}>info@studio-maaijen.nl</a><br />
                Website: <Link href="/" style={{ color: 'var(--paper)', textDecoration: 'underline' }}>www.studio-maaijen.nl</Link>
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '20px', fontFamily: 'var(--ff-mon)', letterSpacing: '0.05em', color: 'var(--spot)', marginBottom: '10px' }}>
                2. Welke gegevens verzamelen wij bij een preview-aanvraag?
              </h2>
              <p style={{ color: 'rgba(238, 232, 220, 0.85)', marginBottom: '12px' }}>
                Wanneer je onze interactieve preview-generator doorloopt om een eerste website-opzet te bekijken, vragen wij:
              </p>
              <ul style={{ listStyle: 'disc', paddingLeft: '24px', color: 'rgba(238, 232, 220, 0.75)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Bedrijfsnaam en branche</li>
                <li>Jouw voor- en achternaam</li>
                <li>E-mailadres (om de previewlink naartoe te sturen)</li>
                <li>Telefoonnummer (optioneel, voor vlot telefonisch contact)</li>
                <li>Plaats / regio van je onderneming</li>
                <li>Bestaande website (optioneel)</li>
                <li>Je voorkeuren qua sfeer, diensten, kleur en gewenste bezoekeractie</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: '20px', fontFamily: 'var(--ff-mon)', letterSpacing: '0.05em', color: 'var(--spot)', marginBottom: '10px' }}>
                3. Waarom verzamelen wij deze gegevens?
              </h2>
              <p style={{ color: 'rgba(238, 232, 220, 0.85)' }}>
                Wij gebruiken deze informatie uitsluitend om:
              </p>
              <ul style={{ listStyle: 'disc', paddingLeft: '24px', color: 'rgba(238, 232, 220, 0.75)', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                <li>Een gepersonaliseerde, relevante homepage-preview voor jouw onderneming samen te stellen.</li>
                <li>Je per e-mail de unieke, beveiligde link naar je preview te sturen.</li>
                <li>Vrijblijvend contact met je op te nemen om te bespreken of je het ontwerp wilt laten uitwerken tot een complete, werkende website.</li>
              </ul>
              <p style={{ color: 'rgba(238, 232, 220, 0.85)', marginTop: '12px' }}>
                Wij verkopen jouw gegevens <strong>nooit</strong> aan derden en gebruiken ze niet voor ongewenste reclame of nieuwsbrieven zonder jouw uitdrukkelijke toestemming.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '20px', fontFamily: 'var(--ff-mon)', letterSpacing: '0.05em', color: 'var(--spot)', marginBottom: '10px' }}>
                4. Hoe lang bewaren wij jouw gegevens?
              </h2>
              <p style={{ color: 'rgba(238, 232, 220, 0.85)' }}>
                Je gegenereerde preview blijft <strong>14 dagen</strong> actief beschikbaar. Aanvragen die niet leiden tot een samenwerking of offerte worden uiterlijk na <strong>6 maanden</strong> definitief verwijderd uit ons beheersysteem.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '20px', fontFamily: 'var(--ff-mon)', letterSpacing: '0.05em', color: 'var(--spot)', marginBottom: '10px' }}>
                5. Jouw rechten (inzage en verwijdering)
              </h2>
              <p style={{ color: 'rgba(238, 232, 220, 0.85)' }}>
                Je hebt te allen tijde het recht om jouw persoonsgegevens in te zien, te corrigeren of direct te laten verwijderen. Stuur hiervoor een eenvoudig e-mailtje naar <a href="mailto:info@studio-maaijen.nl" style={{ color: 'var(--spot)', textDecoration: 'underline' }}>info@studio-maaijen.nl</a>. We voeren jouw verzoek binnen 48 uur uit.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '20px', fontFamily: 'var(--ff-mon)', letterSpacing: '0.05em', color: 'var(--spot)', marginBottom: '10px' }}>
                6. Beveiliging & Analytics
              </h2>
              <p style={{ color: 'rgba(238, 232, 220, 0.85)' }}>
                Onze website en de previewpagina's draaien op een beveiligde SSL-verbinding (HTTPS). Gegenereerde previews worden niet geïndexeerd door zoekmachines (noindex) en zijn voorzien van een unieke code, zodat ze niet openbaar vindbaar zijn. Eventuele website-statistieken worden privacyvriendelijk en zonder trackingcookies bijgehouden.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '64px', borderTop: '1px solid rgba(238, 232, 220, 0.15)', paddingTop: '32px' }}>
            <Link href="/" className="h-chip is-on" style={{ textDecoration: 'none', display: 'inline-flex' }}>
              ← Terug naar Studio Maaijen
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
