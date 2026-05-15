import { getTranslations } from "next-intl/server";

export async function RoadmapPhase2() {
  const t = await getTranslations("Roadmap");
  const items = t.raw("items") as { title: string; body: string }[];

  return (
    <section id="roadmap" className="scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-dashed border-nanai-sage/45 bg-gradient-to-br from-nanai-frost/90 via-white to-nanai-blush/40 p-8 shadow-sm sm:p-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-nanai-sage">{t("label")}</p>
        <h2 className="mt-3 font-heading text-2xl font-medium text-nanai-ink sm:text-3xl">{t("title")}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-nanai-ink-soft">{t("subtitle")}</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.title} className="rounded-2xl bg-white/80 p-5 ring-1 ring-nanai-rose/25">
              <h3 className="text-sm font-semibold text-nanai-ink">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-nanai-ink-soft">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
