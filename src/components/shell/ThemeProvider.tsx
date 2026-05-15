"use client";

import { useEffect } from "react";
import {
  DEFAULT_THEME_ID,
  getThemeById,
  NANAI_THEMES,
  THEME_STORAGE_KEY,
  type NanaiThemeId,
} from "@/lib/themes";

function applyTheme(id: NanaiThemeId) {
  const theme = getThemeById(id);
  const root = document.documentElement;

  root.dataset.theme = theme.id;

  const { colors, fonts } = theme;
  root.style.setProperty("--nanai-canvas", colors.canvas);
  root.style.setProperty("--nanai-blush", colors.blush);
  root.style.setProperty("--nanai-rose", colors.rose);
  root.style.setProperty("--nanai-sage", colors.sage);
  root.style.setProperty("--nanai-ink", colors.ink);
  root.style.setProperty("--nanai-accent", colors.accent);
  root.style.setProperty("--font-theme-heading", `var(${fonts.headingVar}), system-ui, sans-serif`);
  root.style.setProperty("--font-theme-body", `var(${fonts.bodyVar}), system-ui, sans-serif`);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as NanaiThemeId | null;
    const valid = NANAI_THEMES.some((t) => t.id === stored);
    applyTheme(valid && stored ? stored : DEFAULT_THEME_ID);
  }, []);

  return <>{children}</>;
}

export function setTheme(id: NanaiThemeId) {
  localStorage.setItem(THEME_STORAGE_KEY, id);
  applyTheme(id);
  window.dispatchEvent(new CustomEvent("nanaicare-theme-change", { detail: id }));
}
