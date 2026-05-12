"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

const labels: Record<AppLocale, string> = {
  en: "EN",
  es: "ES",
  nl: "NL",
};

export function LocaleSwitcher({ active }: { active: AppLocale }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full border border-nanai-rose/35 bg-white/70 p-0.5 text-[11px] font-semibold tracking-[0.2em] text-nanai-ink/80 shadow-sm backdrop-blur-md"
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((locale) => {
        const isActive = locale === active;
        return (
          <button
            key={locale}
            type="button"
            disabled={isActive || isPending}
            onClick={() => {
              startTransition(() => {
                router.replace(pathname, { locale });
              });
            }}
            className={[
              "rounded-full px-2 py-1 transition",
              isActive
                ? "bg-nanai-ink text-white shadow-sm"
                : "text-nanai-ink/55 hover:bg-nanai-blush/60 hover:text-nanai-ink",
            ].join(" ")}
          >
            {labels[locale]}
          </button>
        );
      })}
    </div>
  );
}
