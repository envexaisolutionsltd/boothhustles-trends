import type { Metadata } from "next";
import { SiteFooter } from "@/components/lts/SiteFooter";
import { SiteHeader } from "@/components/lts/SiteHeader";
import { company, contact, services, siteUrl } from "@/lib/lts/content";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | Heavy Haulage & Abnormal Loads`,
    template: `%s | ${company.name}`,
  },
  description: company.strapline,
  applicationName: company.name,
  keywords: [
    "heavy haulage",
    "abnormal loads",
    "specialist transport",
    "low loader hire",
    "modular trailer",
    "plant machinery transport",
    "Derbyshire haulage",
    "European heavy haulage",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: company.name,
    title: `${company.name} | Heavy Haulage & Abnormal Loads`,
    description: company.strapline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} | Heavy Haulage & Abnormal Loads`,
    description: company.strapline,
  },
  robots: { index: true, follow: true },
};

/**
 * Organisation-level structured data. Emitted once, in the layout, so every
 * page of the site carries it for search and maps results.
 */
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: company.legalName,
    alternateName: company.name,
    url: siteUrl,
    description: company.strapline,
    foundingDate: String(company.founded),
    telephone: contact.phone,
    email: contact.primaryEmail,
    address: {
      "@type": "PostalAddress",
      addressLocality: contact.address.locality,
      addressRegion: contact.address.region,
      addressCountry: "GB",
    },
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Place", name: "Europe" },
    ],
    knowsAbout: services.map((service) => service.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Heavy haulage services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      // Content is a literal object we control, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lts-site flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-hivis focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-graphite-950"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <StructuredData />
    </div>
  );
}
