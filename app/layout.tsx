import type { Metadata } from 'next';  // ✅ Dodaj ili provjeri ovo


export const metadata: Metadata = {
  metadataBase: new URL("https://www.harundelic.com"),  // ✅ Zamijeni ovdje
  title: {
    default: "Harun Delić | Full-Stack Developer",
    template: "%s | Harun Delić",
  },
  description: "Harun Delić - Full-Stack Developer iz Sarajeva. Next.js, React, portfolio projekti i kontakt.",  // ✅ Bolji za SEO
  keywords: ["Harun Delić", "full-stack developer", "Next.js", "Sarajevo", "portfolio"],  // ✅ Dodaj
  openGraph: {
    title: "Harun Delić | Full-Stack Developer",
    description: "Harun Delić - Full-Stack Developer iz Sarajeva. Next.js portfolio.",
    url: "https://www.harundelic.com",  // ✅ Zamijeni
    siteName: "Harun Delić Portfolio",
    images: [
      {
        url: "/og-image.jpg",  // ✅ Dodaj hero screenshot 1200x630px u public/
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
    description: "Harun Delić - Full-Stack Developer iz Sarajeva.",
    images: "/og-image.jpg",  // ✅ Isto kao OG
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code-if-you-have",  // Opcionalno
  },
};
