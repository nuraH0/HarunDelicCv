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
  metadataBase: new URL("https://www.harundelic.org"),
  title: {
    default: "Harun Delić | Full-Stack Developer",
    template: "%s | Harun Delić",
  },
  description: "Harun Delić - Full-Stack Developer.",
  keywords: ["Harun Delić", "full-stack developer", "portfolio"],
  openGraph: {
    title: "Harun Delić | Full-Stack Developer",
    description: "Harun Delić - Full-Stack Developer.",
    url: "https://www.harundelic.org",
    siteName: "Harun Delić Portfolio",
    images: [
      {
        url: "/og-image.jpg",  // Dodaj 1200x630px screenshot u /public/
        width: 1200,
        height: 630,
        alt: "Harun Delić Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harun Delić | Full-Stack Developer",
    description: "Harun Delić - Full-Stack Developer.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bs">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-y-auto min-h-screen`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
