import { redirect } from 'next/navigation';

/* Het portfolio/CV-verhaal staat op de eigen CV-site.
   Deze route verwijst door zodat oude links blijven werken. */

export const metadata = {
  title: 'Portfolio & CV | Eugène Maaijen',
  description: 'Portfolio en Curriculum Vitae van Eugène Maaijen, UX/UI Designer.',
};

export default function PortfolioPage() {
  redirect('https://www.eugenemaaijen-cv.nl');
}
