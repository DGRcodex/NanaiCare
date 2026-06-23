import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Mark } from "@/components/brand/Mark";
import QRCode from "react-qr-code";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-14 lg:px-8">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-nanai-blush/55 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-nanai-sage/25 blur-3xl" />

      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)] lg:items-center">
        <div className="relative z-10 space-y-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-nanai-rose/40 bg-white/80 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-nanai-ink/70 shadow-sm backdrop-blur">
            {t("eyebrow")}
          </p>

          <div className="space-y-5">
            <img 
              src="/PNG%20Transparente/nanai-logo-h-amsterdam.png" 
              alt="Nanai Care Amsterdam Logo" 
              className="h-48 w-auto sm:h-60 object-contain"
            />
            <h1 className="font-heading text-4xl font-medium leading-[1.05] tracking-tight text-nanai-ink sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-nanai-ink-soft sm:text-lg">{t("lead")}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/treatments"
              className="inline-flex items-center justify-center rounded-full bg-nanai-accent px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-nanai-soft transition hover:opacity-90"
            >
              {t("primaryCta")}
            </Link>
            <a
              href="#stories"
              className="inline-flex items-center justify-center rounded-full border border-nanai-rose/45 bg-white/70 px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-nanai-ink/80 backdrop-blur transition hover:border-nanai-sage/55 hover:text-nanai-ink"
            >
              {t("secondaryCta")}
            </a>
          </div>

          <p className="text-xs font-medium text-nanai-ink-soft">{t("badge")}</p>
        </div>

        <div className="relative mx-auto flex w-full max-w-md items-center justify-center lg:mx-0 lg:max-w-none">
          <div className="animate-float-soft relative aspect-square w-full max-w-sm rounded-[2.2rem] bg-gradient-to-br from-white via-nanai-blush/55 to-nanai-rose/35 p-[1px] shadow-nanai-soft ring-1 ring-white/70">
            <div className="relative flex h-full w-full flex-col justify-between rounded-[2.15rem] bg-gradient-to-b from-white/95 to-nanai-frost/90 p-8 sm:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-nanai-ink-soft">{t("cardEyebrow")}</p>
                  <p className="mt-2 font-heading text-2xl tracking-[0.12em] text-nanai-ink">NANAI</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-nanai-sage">
                    ID Digital
                  </p>
                  <p className="text-[8px] text-nanai-ink-soft mt-1">Escanea para guardar</p>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-center py-4">
                <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-nanai-rose/35 transition hover:scale-105">
                  <QRCode
                    value={`BEGIN:VCARD\nVERSION:3.0\nN:Castro;Nicol;;;\nFN:Nicol Castro Cosmetologa\nORG:Nanai Care Amsterdam\nEMAIL:contact@nanaicare.com\nTEL:+31639519491\nADR:;;Amsterdam;;;;Netherlands\nURL:https://nanaicare.com\nEND:VCARD`}
                    size={164}
                    bgColor="#ffffff"
                    fgColor="#3D2E32"
                    level="L"
                  />
                </div>
              </div>

              <div className="mt-10 space-y-4">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-nanai-rose/55 to-transparent" />
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-nanai-ink-soft">{t("weekLabel")}</p>
                    <p className="mt-1 text-sm font-semibold text-nanai-ink">{t("weekTitle")}</p>
                  </div>
                  <p className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-nanai-sage ring-1 ring-nanai-sage/35">
                    {t("mantra")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
