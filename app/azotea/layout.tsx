import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import SiteHeader from "@/components/azotea/SiteHeader";
import SiteFooter from "@/components/azotea/SiteFooter";
import MobileCtaBar from "@/components/azotea/MobileCtaBar";
import { addressOneLine, business, faqs, siteUrl } from "@/lib/azotea";
import "./azotea.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-az-display",
  axes: ["SOFT", "WONK"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-az-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} | ${business.cuisine} Rooftop Restaurant & Bar in ${business.city}`,
    template: `%s | ${business.name} ${business.city}`,
  },
  description:
    `${business.name} is a ${business.cuisine} rooftop restaurant and cocktail bar on the ` +
    `${business.floor} of Sovereign Square, ${business.city}. Two terraces, skyline views, ` +
    `agave-led cocktails and open-fire cooking. ${business.hoursSummary}.`,
  applicationName: business.name,
  keywords: [
    "rooftop bar Leeds",
    "rooftop restaurant Leeds",
    "Latin American restaurant Leeds",
    "cocktail bar Leeds city centre",
    "Sovereign Square Leeds",
    "private hire Leeds",
    "group bookings Leeds",
  ],
  alternates: { canonical: "/azotea" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: business.name,
    title: `${business.name} | Rooftop Restaurant & Bar, ${business.city}`,
    description:
      `Twelve floors above Sovereign Square: ${business.cuisine} plates, agave-led cocktails ` +
      `and two terraces over the ${business.city} skyline.`,
    url: `${siteUrl}/azotea`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} | Rooftop Restaurant & Bar, ${business.city}`,
    description: `${business.cuisine} rooftop dining and cocktails on the ${business.floor} of Sovereign Square, ${business.city}.`,
  },
  robots: { index: true, follow: true },
  category: "restaurant",
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: business.name,
  description: `${business.cuisine} rooftop restaurant and cocktail bar on the ${business.floor} of Sovereign Square, ${business.city}.`,
  servesCuisine: ["Latin American", "South American", "Mexican", "Brazilian"],
  url: `${siteUrl}/azotea`,
  telephone: business.phone,
  email: business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${business.address.line1}, ${business.address.line2}`,
    addressLocality: business.address.city,
    postalCode: business.address.postcode,
    addressCountry: "GB",
  },
  areaServed: business.city,
  openingHours: "Mo-Su 12:00",
  acceptsReservations: true,
  publicAccess: true,
  isAccessibleForFree: false,
  hasMenu: `${siteUrl}/azotea/menus`,
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Outdoor terrace", value: true },
    { "@type": "LocationFeatureSpecification", name: "Wheelchair accessible", value: true },
    { "@type": "LocationFeatureSpecification", name: "Live music", value: true },
  ],
  containedInPlace: {
    "@type": "Hotel",
    name: business.hotel,
    address: addressOneLine,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function AzoteaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`az-root ${display.variable} ${sans.variable} min-h-screen flex flex-col`}>
      <script
        type="application/ld+json"
        // Static, developer-authored JSON-LD — no user input is interpolated.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <a
        href="#az-main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[80] focus:m-4 focus:rounded-full focus:bg-[var(--az-bone)] focus:px-5 focus:py-3 focus:text-[#1a0d06]"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="az-main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <MobileCtaBar />
    </div>
  );
}
