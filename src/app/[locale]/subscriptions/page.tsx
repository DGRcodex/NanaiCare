import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Treatments" });
  return { title: `Subscriptions | ${t("meta.title")}`, description: t("meta.description") };
}

export default async function SubscriptionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Treatments");

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-nanai-sage">
        {t("categories.subscriptions")}
      </p>
      <h1 className="mt-3 font-heading text-3xl font-medium tracking-tight text-nanai-ink sm:text-4xl">
        Nanaí Ritual Memberships
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-nanai-ink-soft sm:text-base">
        A profound commitment to your well-being.
      </p>

      <div className="mt-12 space-y-14">
        <section className="scroll-mt-28">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            <li className="flex flex-col gap-4 rounded-2xl border border-nanai-rose/30 bg-white/80 px-8 py-8 shadow-sm backdrop-blur">
              <span className="text-xl font-heading text-nanai-ink">3 Months Membership</span>
              <span className="text-lg font-bold text-nanai-ink">€350</span>
              <p className="text-sm text-nanai-ink-soft">
                Commit to a 3-month ritual of self-care. Dedicated time for your skin and body.
              </p>
              <div className="mt-auto pt-6">
                <Link
                  href="/book"
                  className="inline-flex w-full items-center justify-center rounded-full bg-nanai-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-nanai-ink/90"
                >
                  Book now
                </Link>
              </div>
            </li>
            <li className="flex flex-col gap-4 rounded-2xl border border-nanai-rose/30 bg-white/80 px-8 py-8 shadow-sm backdrop-blur">
              <span className="text-xl font-heading text-nanai-ink">6 Months Membership</span>
              <span className="text-lg font-bold text-nanai-ink">€650</span>
              <p className="text-sm text-nanai-ink-soft">
                Our most profound journey. Six months of consistent, deeply nurturing facial and body rituals.
              </p>
              <div className="mt-auto pt-6">
                <Link
                  href="/book"
                  className="inline-flex w-full items-center justify-center rounded-full bg-nanai-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-nanai-ink/90"
                >
                  Book now
                </Link>
              </div>
            </li>
          </ul>
        </section>
      </div>

      <p className="mt-14 text-center text-xs text-nanai-ink-soft">
        <Link href="/" className="font-semibold text-nanai-ink underline-offset-4 hover:underline">
          ← {t("backHome")}
        </Link>
      </p>
    </article>
  );
}
