import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FavoritesProvider } from "@/components/favorites/FavoritesProvider";
import { CatalogProvider } from "@/components/catalog/CatalogProvider";
import { CompareProvider } from "@/components/compare/CompareProvider";
import { CompareBar } from "@/components/compare/CompareBar";
import { NotificationsProvider } from "@/components/notifications/NotificationsProvider";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { DataCleanupOnMount } from "@/components/system/DataCleanupOnMount";
import { BackToTop } from "@/components/ui/BackToTop";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EstatePro — Find Your Place. Build Your Future.",
    template: "%s | EstatePro",
  },
  description:
    "EstatePro is a frontend real estate demo for discovering homes for sale and rent across Lahore, Karachi, and Islamabad. Browse listings, compare properties, and manage demo submissions locally.",
  applicationName: "EstatePro",
  keywords: [
    "EstatePro",
    "real estate",
    "Pakistan",
    "Lahore",
    "Karachi",
    "Islamabad",
    "property listings",
  ],
  authors: [{ name: "EstatePro" }],
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "EstatePro",
    title: "EstatePro — Find Your Place. Build Your Future.",
    description:
      "Discover demonstration homes for sale and rent across Lahore, Karachi, and Islamabad.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EstatePro — Find Your Place. Build Your Future.",
    description:
      "Discover demonstration homes for sale and rent across Lahore, Karachi, and Islamabad.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <FavoritesProvider>
          <CatalogProvider>
            <CompareProvider>
              <NotificationsProvider>
                <ToastProvider>
                  <DataCleanupOnMount />
                  <Suspense
                    fallback={
                      <div className="h-16 border-b border-border bg-white md:h-[4.5rem]" />
                    }
                  >
                    <Header />
                  </Suspense>
                  <main id="main-content" className="flex-1 pb-24">
                    {children}
                  </main>
                  <Footer />
                  <Suspense fallback={null}>
                    <CompareBar />
                  </Suspense>
                  <BackToTop />
                </ToastProvider>
              </NotificationsProvider>
            </CompareProvider>
          </CatalogProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
