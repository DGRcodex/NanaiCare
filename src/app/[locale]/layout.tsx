import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { HtmlLang } from "@/components/shell/HtmlLang";
import { ThemeProvider } from "@/components/shell/ThemeProvider";
import { ThemeSwitcher } from "@/components/shell/ThemeSwitcher";
import { routing } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale,
      type: "website",
      siteName: "NanaiCare",
    },
  };
}

// ThemeSwitcher is only visible in development or Vercel preview environments
const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" || process.env.NODE_ENV === "development";

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: "NanaiCare",
    image: "https://www.nanaicare.com/icon.png",
    "@id": "https://www.nanaicare.com",
    url: "https://www.nanaicare.com",
    telephone: "",
    address: {
      "@type": "PostalAddress",
      streetAddress: "",
      addressLocality: "Amsterdam",
      postalCode: "",
      addressCountry: "NL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.3676,
      longitude: 4.9041,
    },
    priceRange: "$$",
    description:
      "Beauty salon and facial wellness in Amsterdam. Curated skincare and treatments.",
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <HtmlLang locale={locale} />
      <ThemeProvider>
        <div id="nanai-content" className="mesh-bg nc-grain relative flex min-h-dvh flex-col">
          <SiteHeader locale={locale} />
          <main className="relative flex-1 pb-32">{children}</main>
          <SiteFooter />
        </div>
        {isPreview && <ThemeSwitcher />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
