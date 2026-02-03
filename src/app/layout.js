import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-atkinson",
});

export const metadata = {
  title: "ArtAbil: Accesibilidad en el Arte",
  description: "Analiza la accesibilidad en obras maestras con simulaciones de visión y métricas WCAG",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${atkinsonHyperlegible.variable} antialiased font-sans`}
      >
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
