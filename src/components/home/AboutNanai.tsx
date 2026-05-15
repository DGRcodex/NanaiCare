import { getTranslations } from "next-intl/server";
import { Mark } from "@/components/brand/Mark";
import { ThemeColorLegend } from "@/components/shell/ThemeColorLegend";

export async function AboutNanai() {
  const t = await getTranslations("About");
  const logoOptions = t.raw("logoOptions") as string[];

  return (
    <section id="about" className="scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="relative flex justify-center lg:justify-start">
          <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-gradient-to-br from-nanai-blush via-white to-nanai-sage/30 p-1 shadow-nanai-soft ring-1 ring-nanai-rose/40 sm:h-64 sm:w-64">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white/90 text-center">
              <Mark className="h-20 w-20 text-nanai-ink sm:h-24 sm:w-24" />
              <p className="mt-3 font-heading text-sm tracking-[0.2em] text-nanai-ink">NANAI CARE</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-nanai-sage">{t("label")}</p>
          <h2 className="font-heading text-3xl font-medium tracking-tight text-nanai-ink sm:text-4xl">{t("title")}</h2>
          <p className="text-base leading-relaxed text-nanai-ink-soft">{t("meaning")}</p>
          <p className="text-sm leading-relaxed text-nanai-ink-soft">{t("vision")}</p>
          <a
            href="https://www.nanaicare.com"
            className="inline-block text-sm font-semibold text-nanai-ink underline-offset-4 hover:underline"
          >
            www.nanaicare.com
          </a>
          <div className="rounded-[1.25rem] border border-nanai-rose/30 bg-white/80 p-5 shadow-sm backdrop-blur">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-nanai-ink-soft">{t("logoTitle")}</h3>
            <p className="mt-2 text-sm text-nanai-ink-soft">{t("logoBrief")}</p>
            <ul className="mt-3 space-y-2 text-sm text-nanai-ink">
              {logoOptions.map((opt) => (
                <li key={opt} className="flex gap-2">
                  <span className="text-nanai-sage" aria-hidden>
                    ◦
                  </span>
                  {opt}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.25rem] border border-nanai-rose/30 bg-white/80 p-5 shadow-sm backdrop-blur">
            <p className="mb-3 text-sm text-nanai-ink-soft">{t("paletteTitle")}</p>
            <ThemeColorLegend />
          </div>
        </div>
      </div>
    </section>
  );
}
