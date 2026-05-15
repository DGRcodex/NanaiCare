import { getTranslations } from "next-intl/server";

export async function Policies() {
  const t = await getTranslations("Policies");
  const items = t.raw("items") as { title: string; body: string }[];

  return (
    <section id="policies" className="scroll-mt-28 border-y border-nanai-rose/25 bg-white/55 px-4 py-20 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="max-w-2xl space-y-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-nanai-sage">{t("label")}</p>
          <h2 className="font-heading text-3xl font-medium tracking-tight text-nanai-ink sm:text-4xl">{t("title")}</h2>
          <p className="text-sm leading-relaxed text-nanai-ink-soft">{t("subtitle")}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.5rem] border border-nanai-rose/30 bg-white/85 p-6 shadow-sm backdrop-blur"
            >
              <h3 className="font-heading text-lg text-nanai-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-nanai-ink-soft">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
