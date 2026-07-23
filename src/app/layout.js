import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--ff-d",
  subsets: ["latin"],
});

export const metadata = {
  title: "Eugène Maaijen — UX/UI Designer & Creative",
  description: "Eugène Maaijen — UX/UI Designer, Video Editor en Brand Creator gebaseerd in Nederland.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl" className={instrumentSans.variable}>
      <body>{children}</body>
    </html>
  );
}
