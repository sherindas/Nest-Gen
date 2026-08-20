import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NextGen — Engineering, Electrical, Plumbing & Smart Solutions",
  description:
    "NextGen provides certified electrical wiring, plumbing, pump motors, CCTV security, and smart automation for residential and commercial spaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white min-h-screen flex flex-col`}
      >
        <LanguageProvider>
          <StickyHeader />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingContact />
        </LanguageProvider>
      </body>
    </html>
  );
}
