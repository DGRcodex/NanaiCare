"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  COLOR_ROLE_KEYS,
  DEFAULT_THEME_ID,
  getThemeById,
  NANAI_THEMES,
  THEME_STORAGE_KEY,
  type NanaiThemeId,
} from "@/lib/themes";

export function ThemeColorLegend() {
  const t = useTranslations("Themes");
  const [themeId, setThemeId] = useState<NanaiThemeId>(DEFAULT_THEME_ID);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as NanaiThemeId | null;
    if (stored && NANAI_THEMES.some((th) => th.id === stored)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeId(stored);
    }

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<NanaiThemeId>).detail;
      if (detail) setThemeId(detail);
    };
    window.addEventListener("nanaicare-theme-change", onChange);
    return () => window.removeEventListener("nanaicare-theme-change", onChange);
  }, []);

  const theme = getThemeById(themeId);

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-nanai-ink-soft">
        {t("sixColorsTitle")} · {t(theme.labelKey)}
      </h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {COLOR_ROLE_KEYS.map((role) => (
          <div
            key={role}
            className="flex items-center gap-2 rounded-xl border border-nanai-rose/25 bg-white/70 px-2 py-1.5"
          >
            <span
              className="h-8 w-8 shrink-0 rounded-lg ring-1 ring-black/10"
              style={{ backgroundColor: theme.colors[role] }}
              aria-hidden
            />
            <span className="min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-wide text-nanai-ink">
                {t(`roles.${role}`)}
              </span>
              <span className="block font-mono text-[10px] text-nanai-ink-soft">{theme.colors[role]}</span>
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs text-nanai-ink-soft">{t("sixColorsHint")}</p>
    </div>
  );
}
