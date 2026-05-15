import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { TreatmentsCatalog } from "@/components/treatments/TreatmentsCatalog";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Treatments" });
  return { title: t("meta.title"), description: t("meta.description") };
}

export default async function TreatmentsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Treatments");

  const tabs = ["body", "facial", "packages", "subscriptions"] as const;

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-nanai-sage">{t("label")}</p>
      <h1 className="mt-3 font-heading text-3xl font-medium tracking-tight text-nanai-ink sm:text-4xl">{t("title")}</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-nanai-ink-soft sm:text-base">{t("lead")}</p>

      <nav
        className="mt-8 flex flex-wrap gap-2"
        aria-label={t("navLabel")}
      >
        {tabs.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="rounded-full border border-nanai-rose/40 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-nanai-ink/75 transition hover:border-nanai-sage/50 hover:text-nanai-ink"
          >
            {t(`categories.${id}`)}
          </a>
        ))}
      </nav>

      <div className="mt-12">
        <TreatmentsCatalog />
      </div>

      <p className="mt-14 text-center text-xs text-nanai-ink-soft">
        <Link href="/" className="font-semibold text-nanai-ink underline-offset-4 hover:underline">
          ← {t("backHome")}
        </Link>
      </p>
    </article>
  );
}
