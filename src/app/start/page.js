import { Suspense } from 'react';
import WizardClient from '../../components/WizardClient';

export const metadata = {
  title: 'Bekijk jouw website binnen 2 minuten | Studio Maaijen',
  description: 'Beantwoord 7 korte vragen en ontvang direct een gratis, professionele preview van jouw nieuwe website.',
  robots: { index: true, follow: true },
};

export default function StartPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0c0a09' }} />}>
      <WizardClient />
    </Suspense>
  );
}
