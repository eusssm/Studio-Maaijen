import PrivacyClient from '../../components/PrivacyClient';

export const metadata = {
  title: 'Privacyverklaring | Studio Maaijen',
  description: 'Heldere privacyverklaring van Studio Maaijen over de verwerking van persoonsgegevens bij offerte- en preview-aanvragen.',
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
