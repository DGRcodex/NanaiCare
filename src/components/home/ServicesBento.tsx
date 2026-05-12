import { getTranslations } from "next-intl/server";

type ServiceItem = {
  tag: string;
  title: string;
  description: string;
};

export async function ServicesBento() {
  const t = await getTranslations("Services");
  const items = t.raw("items") as ServiceItem[];
  const signatureChips = t.raw("signatureChips") as string[];

  return (
    <section id="services" className="scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="max-w-2xl space-y-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-nanai-sage">{t("label")}</p>
          <h2 className="font-heading text-3xl font-medium tracking-tight text-nanai-ink sm:text-4xl">{t("title")}</h2>
          <p className="text-base leading-relaxed text-nanai-ink-soft">{t("subtitle")}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-6 md:grid-rows-2 md:gap-5">
          <article className="group relative overflow-hidden rounded-[1.75rem] bg-white/85 p-7 shadow-nanai-soft ring-1 ring-nanai-rose/30 backdrop-blur md:col-span-4 md:row-span-2">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nanai-blush/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div className="space-y-4">
                <span className="inline-flex rounded-full bg-nanai-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                  {items[0]?.tag}
                </span>
                <h3 className="font-heading text-2xl font-medium text-nanai-ink sm:text-3xl">{items[0]?.title}</h3>
                <p className="max-w-xl text-sm leading-relaxed text-nanai-ink-soft sm:text-base">{items[0]?.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-nanai-ink-soft">
                {signatureChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-nanai-rose/35 bg-nanai-frost/80 px-3 py-1"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-[1.5rem] bg-nanai-ink p-6 text-white shadow-nanai-soft md:col-span-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/60">{items[1]?.tag}</p>
            <h3 className="mt-3 font-heading text-xl font-medium">{items[1]?.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75">{items[1]?.description}</p>
          </article>

          <article className="rounded-[1.5rem] border border-nanai-rose/35 bg-white/80 p-6 shadow-sm backdrop-blur md:col-span-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-nanai-sage">{items[2]?.tag}</p>
            <h3 className="mt-3 font-heading text-xl font-medium text-nanai-ink">{items[2]?.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-nanai-ink-soft">{items[2]?.description}</p>
          </article>

          <article className="rounded-[1.5rem] bg-gradient-to-br from-nanai-sage/25 via-white to-nanai-blush/50 p-6 shadow-sm ring-1 ring-nanai-sage/30 md:col-span-6 lg:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-nanai-ink-soft">{items[3]?.tag}</p>
            <h3 className="mt-3 font-heading text-xl font-medium text-nanai-ink">{items[3]?.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-nanai-ink-soft">{items[3]?.description}</p>
          </article>

          <div className="flex flex-col justify-between gap-4 rounded-[1.5rem] border border-dashed border-nanai-rose/45 bg-white/60 p-6 backdrop-blur md:col-span-6 lg:col-span-3">
            <div>
              <p className="font-heading text-lg tracking-[0.12em] text-nanai-ink">{t("panel.title")}</p>
              <p className="mt-2 text-sm text-nanai-ink-soft">{t("panel.body")}</p>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-nanai-ink px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              <span>{t("panel.where")}</span>
              <span className="text-white/60">·</span>
              <span>{t("panel.when")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
