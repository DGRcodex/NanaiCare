import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const BASE_EUR = 500;
const VAT_EUR = 105;
const DOMAIN_EUR = 30;
const TOTAL_EUR = BASE_EUR + VAT_EUR + DOMAIN_EUR;
const HALF_EUR = TOTAL_EUR / 2;
const PAID_EUR = 130;
const DUE_FIRST_HALF_EUR = HALF_EUR - PAID_EUR;

type Props = {
  params: Promise<{ locale: string }>;
};

function money(locale: string, value: number) {
  return new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(value);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Charter" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    robots: { index: false, follow: false },
  };
}

export default async function CharterPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Charter");

  const briefBullets = t.raw("briefBullets") as string[];
  const scopeIn = t.raw("scopeIn") as string[];
  const scopeOut = t.raw("scopeOut") as string[];

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-nanai-sage">{t("eyebrow")}</p>
      <h1 className="mt-3 font-heading text-3xl font-medium tracking-tight text-nanai-ink sm:text-4xl">{t("title")}</h1>
      <p className="mt-4 text-sm leading-relaxed text-nanai-ink-soft sm:text-base">{t("lead")}</p>

      <div className="mt-10 space-y-4 rounded-[1.5rem] border border-nanai-rose/30 bg-white/80 p-6 shadow-sm backdrop-blur">
        <h2 className="font-heading text-lg text-nanai-ink">{t("overviewTitle")}</h2>
        <p className="text-sm leading-relaxed text-nanai-ink-soft">{t("overviewP1")}</p>
        <p className="text-sm leading-relaxed text-nanai-ink-soft">{t("overviewP2")}</p>
      </div>

      <h2 className="mt-10 font-heading text-xl text-nanai-ink">{t("partiesTitle")}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <section className="rounded-[1.25rem] border border-nanai-rose/25 bg-white/75 p-5 shadow-sm backdrop-blur">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-nanai-sage">{t("partyClientLabel")}</p>
          <p className="mt-2 font-heading text-base text-nanai-ink">{t("partyClientName")}</p>
          <p className="mt-2 text-xs leading-relaxed text-nanai-ink-soft">{t("partyClientBody")}</p>
        </section>
        <section className="rounded-[1.25rem] border border-nanai-rose/25 bg-white/75 p-5 shadow-sm backdrop-blur">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-nanai-sage">{t("partyAgencyLabel")}</p>
          <p className="mt-2 font-heading text-base text-nanai-ink">{t("partyAgencyName")}</p>
          <p className="mt-2 text-xs leading-relaxed text-nanai-ink-soft">{t("partyAgencyBody")}</p>
        </section>
        <section className="rounded-[1.25rem] border border-nanai-rose/25 bg-nanai-ink p-5 text-white shadow-nanai-soft sm:col-span-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">{t("partyDevLabel")}</p>
          <p className="mt-2 font-heading text-base">{t("partyDevName")}</p>
          <p className="mt-2 text-xs leading-relaxed text-white/75">{t("partyDevBody")}</p>
        </section>
      </div>

      <div className="mt-10 space-y-4">
        <h2 className="font-heading text-xl text-nanai-ink">{t("briefTitle")}</h2>
        <p className="text-sm leading-relaxed text-nanai-ink-soft">{t("briefIntro")}</p>
        <ul className="list-inside list-disc space-y-2 text-sm text-nanai-ink-soft">
          {briefBullets.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="rounded-xl border border-dashed border-nanai-sage/40 bg-nanai-blush/30 px-4 py-3 text-xs leading-relaxed text-nanai-ink/85">
          {t("briefPlaceholder")}
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <h2 className="font-heading text-xl text-nanai-ink">{t("scopeTitle")}</h2>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-nanai-sage">{t("scopeInTitle")}</h3>
          <ul className="space-y-2 text-sm text-nanai-ink-soft">
            {scopeIn.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nanai-sage" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <h3 className="pt-4 text-xs font-semibold uppercase tracking-[0.2em] text-nanai-rose">{t("scopeOutTitle")}</h3>
          <ul className="space-y-2 text-sm text-nanai-ink-soft">
            {scopeOut.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nanai-rose/70" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 rounded-[1.5rem] border border-nanai-rose/30 bg-white/80 p-6 shadow-sm backdrop-blur">
          <h2 className="font-heading text-lg text-nanai-ink">{t("changeTitle")}</h2>
          <p className="text-sm leading-relaxed text-nanai-ink-soft">{t("changeBody")}</p>
          <figure className="mt-4 rounded-2xl bg-nanai-frost/90 p-4 ring-1 ring-nanai-rose/25">
            <figcaption className="text-[10px] font-semibold uppercase tracking-[0.2em] text-nanai-ink-soft">
              {t("diagramCaption")}
            </figcaption>
            <div className="mt-4 space-y-3 text-xs text-nanai-ink/90" role="img" aria-label={t("diagramAlt")}>
              <div className="rounded-xl bg-nanai-ink px-3 py-2 font-semibold uppercase tracking-[0.14em] text-white">
                Phase 1
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-lg bg-white px-2 py-1 ring-1 ring-nanai-rose/30">Next.js + i18n</span>
                <span className="rounded-lg bg-white px-2 py-1 ring-1 ring-nanai-rose/30">Brand UI</span>
                <span className="rounded-lg bg-white px-2 py-1 ring-1 ring-nanai-rose/30">Deploy</span>
              </div>
              <div className="h-px w-full bg-nanai-rose/30" />
              <div className="rounded-xl border border-dashed border-nanai-sage/45 px-3 py-2 text-nanai-ink-soft">
                <span className="font-semibold text-nanai-ink">Phase 2+</span>
                <span className="mx-2 text-nanai-rose">·</span>
                <span>e-commerce · bookings · extra legal</span>
              </div>
            </div>
          </figure>
        </div>
      </div>

      <div className="mt-12 overflow-hidden rounded-[1.5rem] border border-nanai-rose/30 bg-white/85 shadow-nanai-soft backdrop-blur">
        <div className="border-b border-nanai-rose/25 bg-nanai-blush/40 px-6 py-4">
          <h2 className="font-heading text-lg text-nanai-ink">{t("budgetTitle")}</h2>
          <p className="mt-1 text-xs text-nanai-ink-soft">{t("budgetNote")}</p>
        </div>
        <table className="w-full text-left text-sm">
          <tbody className="divide-y divide-nanai-rose/20">
            <tr>
              <th className="px-6 py-3 font-medium text-nanai-ink">{t("rowBase")}</th>
              <td className="px-6 py-3 text-right font-semibold text-nanai-ink">{money(locale, BASE_EUR)}</td>
            </tr>
            <tr>
              <th className="px-6 py-3 font-medium text-nanai-ink">{t("rowVat")}</th>
              <td className="px-6 py-3 text-right font-semibold text-nanai-ink">{money(locale, VAT_EUR)}</td>
            </tr>
            <tr>
              <th className="px-6 py-3 font-medium text-nanai-ink">{t("rowDomain")}</th>
              <td className="px-6 py-3 text-right font-semibold text-nanai-ink">{money(locale, DOMAIN_EUR)}</td>
            </tr>
            <tr className="bg-nanai-ink text-white">
              <th className="px-6 py-4 font-heading text-sm tracking-wide">{t("rowTotal")}</th>
              <td className="px-6 py-4 text-right font-heading text-base">{money(locale, TOTAL_EUR)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-10 space-y-4 rounded-[1.5rem] border border-nanai-rose/30 bg-nanai-ink p-6 text-white shadow-nanai-soft sm:p-8">
        <h2 className="font-heading text-xl">{t("paymentTitle")}</h2>
        <p className="text-sm leading-relaxed text-white/75">{t("paymentIntro")}</p>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">{t("milestoneFirst")}</dt>
            <dd className="mt-1 font-heading text-lg">{money(locale, HALF_EUR)}</dd>
          </div>
          <div className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">{t("milestoneSecond")}</dt>
            <dd className="mt-1 font-heading text-lg">{money(locale, HALF_EUR)}</dd>
          </div>
          <div className="rounded-xl bg-nanai-blush/90 px-4 py-3 text-nanai-ink ring-1 ring-white/20">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-nanai-ink/60">{t("paidToDate")}</dt>
            <dd className="mt-1 font-heading text-lg">{money(locale, PAID_EUR)}</dd>
          </div>
          <div className="rounded-xl bg-white px-4 py-3 text-nanai-ink ring-1 ring-white/30">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-nanai-ink/60">{t("dueFirstHalf")}</dt>
            <dd className="mt-1 font-heading text-lg">{money(locale, DUE_FIRST_HALF_EUR)}</dd>
          </div>
        </dl>
        <p className="text-xs leading-relaxed text-white/65">{t("dueSecondHalf")}</p>
        <p className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-xs font-medium leading-relaxed text-white/90">
          {t("weekGoal")}
        </p>
      </div>

      <p className="mt-10 text-center text-xs text-nanai-ink-soft">
        <Link href="/" className="font-semibold text-nanai-ink underline-offset-4 hover:underline">
          ← Home
        </Link>
      </p>
    </article>
  );
}
