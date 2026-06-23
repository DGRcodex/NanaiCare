import { getTranslations } from "next-intl/server";
import { treatmentCatalog } from "@/content/treatments";

export async function TreatmentsCatalog() {
  const t = await getTranslations("Treatments");

  return (
    <div className="space-y-14">
      {treatmentCatalog
        .filter((category) => category.id !== "subscriptions")
        .map((category) => (
        <section key={category.id} id={category.id} className="scroll-mt-28">
          <h2 className="font-heading text-2xl font-medium text-nanai-ink sm:text-3xl">
            {t(`categories.${category.id}`)}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {category.items.map((item) => (
              <li
                key={item.name}
                className="flex items-start justify-between gap-4 rounded-2xl border border-nanai-rose/30 bg-white/80 px-5 py-4 shadow-sm backdrop-blur"
              >
                <span className="text-sm font-semibold text-nanai-ink">{item.name}</span>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  {item.price ? (
                    <span className="text-sm font-bold text-nanai-ink">
                      €{item.price}
                    </span>
                  ) : null}
                  {item.duration ? (
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-nanai-sage">
                      {item.duration}
                    </span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
