import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Poppins } from "next/font/google";
import { wedding } from "@/lib/config";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(wedding.site.url),
  title: wedding.site.title,
  description: wedding.site.description,
  keywords: [
    "Christian wedding",
    "wedding invitation",
    wedding.couple.together,
    wedding.church.name,
    "holy matrimony",
    "covenant",
  ],
  authors: [{ name: wedding.couple.together }],
  openGraph: {
    type: "website",
    url: wedding.site.url,
    title: wedding.site.title,
    description: wedding.site.description,
    siteName: wedding.site.title,
    images: [
      {
        url: wedding.site.ogImage,
        width: 1200,
        height: 630,
        alt: `${wedding.couple.together} — ${wedding.church.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: wedding.site.title,
    description: wedding.site.description,
    images: [wedding.site.ogImage],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: wedding.site.url },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F4",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `${wedding.couple.together} — Holy Matrimony`,
  startDate: wedding.date.iso,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  description: wedding.site.description,
  image: [wedding.site.ogImage],
  location: {
    "@type": "Place",
    name: wedding.church.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: wedding.church.address,
    },
  },
  organizer: {
    "@type": "Person",
    name: wedding.couple.together,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${greatVibes.variable} ${poppins.variable}`}
    >
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#invitation"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to invitation
        </a>
        {children}
      </body>
    </html>
  );
}
