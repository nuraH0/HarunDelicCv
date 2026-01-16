import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "./ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tvoj-domen.com"),
  title: {
    default: "Harun Delić | Full-Stack Developer",
    template: "%s | Harun Delić",
  },
  description: "Moj portfolio – projekti, iskustvo i kontakt.",
  openGraph: {
    title: "Harun Delić | Full-Stack Developer",
    description: "Moj portfolio – projekti, iskustvo i kontakt.",
    url: "https://tvoj-domen.com",
    siteName: "Harun Delić Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harun Delić | Full-Stack Developer",
    description: "Moj portfolio – projekti, iskustvo i kontakt.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bs" className="!scroll-smooth">
      <head>
        {/* IPHONE EDGE-TO-EDGE FULLSCREEN */}
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" 
        />
        {/* PWA Fullscreen iPhone */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Harun Portfolio" />
        {/* Android PWA */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#0f172a" />
        {/* Touch icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-dvh w-dvh bg-gradient-to-br from-slate-900 via-black to-slate-950/90 text-white`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
