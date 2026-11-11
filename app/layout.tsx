import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { CSSProperties } from "react";
import { siteConfig } from "@/config/site";
import { theme, themeCssVariables } from "@/config/theme";
import { formatText } from "@/lib/content";
import "./globals.css";

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const ethiopic = localFont({
  src: "./fonts/noto-sans-ethiopic.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-ethiopic",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: `${siteConfig.name} | Manufacturing, Construction, Training and Consultancy`,
    template: `%s`,
  },
  description: formatText(siteConfig.description),
  applicationName: siteConfig.name,
  keywords: [
    "furniture manufacturing",
    "doors and windows",
    "parquet flooring",
    "building construction",
    "house renovation",
    "machinery manufacturing",
    "poultry feed",
    "cattle feed",
    "egg production",
    "soap manufacturing",
    "bakery",
    "textile and garment training",
    "electrical and electronic maintenance",
    "technical training",
    "consultancy",
    "Ethiopia",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Manufacturing, Construction, Training and Consultancy`,
    description: formatText(siteConfig.description),
    images: [
      {
        url: siteConfig.ogImage.src,
        width: siteConfig.ogImage.width,
        height: siteConfig.ogImage.height,
        alt: formatText(siteConfig.ogImage.alt),
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: theme.primary,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.domain,
  logo: `${siteConfig.domain}${siteConfig.logo}`,
  description: formatText(siteConfig.description),
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "General Wingate Polytechnic College",
    addressLocality: "Addis Ababa",
    addressCountry: "ET",
  },
  hasMap: siteConfig.mapLink,
  sameAs: siteConfig.socials
    .map((social) => social.href)
    .filter((href) => href.length > 0),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={themeCssVariables as CSSProperties}
    >
      <body className={`${inter.variable} ${ethiopic.variable} font-sans`}>
        <script
          // Keeps the document language correct for the /am route while still
          // allowing a fully static export (no middleware / server headers).
          dangerouslySetInnerHTML={{
            __html:
              '(function(){var p=window.location.pathname;var a=p==="/am"||p.indexOf("/am/")===0;document.documentElement.lang=a?"am":"en";})();',
          }}
        />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
