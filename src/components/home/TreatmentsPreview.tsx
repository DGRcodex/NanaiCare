import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { treatmentCatalog } from "@/content/treatments";
import Image from "next/image";
import { TreatmentCard } from "../treatments/TreatmentCard";

export async function TreatmentsPreview() {
  const t = await getTranslations("Treatments");
  const locale = await getLocale();

  return (
    <section id="treatments" className="scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div className="max-w-2xl space-y-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-nanai-sage">{t("label")}</p>
            <h2 className="font-heading text-3xl font-medium tracking-tight text-nanai-ink sm:text-4xl">{t("title")}</h2>
            <p className="text-base leading-relaxed text-nanai-ink-soft">{t("lead")}</p>
          </div>
          <Link
            href="/treatments"
            className="inline-flex w-fit shrink-0 items-center justify-center rounded-full bg-nanai-accent px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-nanai-soft transition hover:opacity-90"
          >
            {t("viewAll")}
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {treatmentCatalog
            .filter((category) => category.id !== "subscriptions")
            .map((category) => (
            <article
              key={category.id}
              id={category.id}
              className="group flex flex-col overflow-hidden rounded-[2rem] border border-white/40 bg-white/60 shadow-nanai-soft ring-1 ring-nanai-rose/15 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-nanai-rose/30"
            >
              {category.image && (
                <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-56">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-nanai-ink/40 to-transparent" />
                  <Image 
                    src={category.image} 
                    alt=""
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <h3 className="absolute bottom-5 left-6 z-20 font-heading text-2xl font-medium tracking-wide text-white drop-shadow-md sm:text-3xl">
                    {t(`categories.${category.id}`)}
                  </h3>
                </div>
              )}
              
              <div className="flex-1 p-6 sm:p-8">
                {!category.image && (
                  <h3 className="mb-6 font-heading text-2xl text-nanai-ink">{t(`categories.${category.id}`)}</h3>
                )}
                <ul className="space-y-0">
                  {category.items.map((item) => (
                    <TreatmentCard key={item.name} item={item} locale={locale} variant="preview" />
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-nanai-rose/10 to-nanai-blush/20 p-8 text-center ring-1 ring-nanai-rose/30">
          <h3 className="font-heading text-2xl text-nanai-ink">{t("categories.subscriptions")}</h3>
          <p className="mt-2 text-sm text-nanai-ink-soft max-w-md mx-auto">
            Nanaí Ritual Memberships (3 or 6 Months)
          </p>
          <Link
            href="/subscriptions"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-nanai-sage px-8 text-[13px] font-semibold tracking-wide text-white transition hover:bg-nanai-sage/90"
          >
            Explore Memberships
          </Link>
        </div>
      </div>
    </section>
  );
}
