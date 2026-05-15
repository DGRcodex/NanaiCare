import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { treatmentCatalog } from "@/content/treatments";

export async function TreatmentsPreview() {
  const t = await getTranslations("Treatments");

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

        <div className="grid gap-6 lg:grid-cols-2">
          {treatmentCatalog.map((category) => (
            <article
              key={category.id}
              id={category.id}
              className="rounded-[1.5rem] border border-nanai-rose/30 bg-white/85 p-6 shadow-sm backdrop-blur"
            >
              <h3 className="font-heading text-xl text-nanai-ink">{t(`categories.${category.id}`)}</h3>
              <ul className="mt-4 space-y-2">
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-start justify-between gap-3 border-b border-nanai-rose/15 pb-2 text-sm last:border-0 last:pb-0"
                  >
                    <span className="font-medium text-nanai-ink">{item.name}</span>
                    {item.duration ? (
                      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.12em] text-nanai-sage">
                        {item.duration}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
