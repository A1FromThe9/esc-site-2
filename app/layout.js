import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import AgeGate from "@/components/AgeGate";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Aurélie · Discreet Companionship in Germany",
    template: "%s · Aurélie",
  },
  description:
    "Aurélie is a discreet directory of verified companions in Germany. Clear pricing, secure enquiries. For adults 18 and over only.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body>
        <AgeGate />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
