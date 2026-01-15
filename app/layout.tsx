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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased **overflow-y-auto min-h-screen**`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
