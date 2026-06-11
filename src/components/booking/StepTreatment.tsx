"use client";

import type { BookableTreatment } from "@/types/booking";
import { BOOKABLE_TREATMENTS } from "@/content/bookableTreatments";

interface Props {
  selected: BookableTreatment | null;
  onSelect: (t: BookableTreatment) => void;
  onConfirm: () => void;
  labels: {
    body: string;
    facial: string;
    packages: string;
    minutesSuffix: string;
  };
}

const CATEGORY_ORDER = ["body", "facial", "packages"] as const;

const CATEGORY_ICONS: Record<string, string> = {
  body: "🌿",
  facial: "✨",
  packages: "🎁",
};

export function StepTreatment({ selected, onSelect, onConfirm, labels }: Props) {
  const byCategory = CATEGORY_ORDER.map((cat) => ({
    cat,
    items: BOOKABLE_TREATMENTS.filter((t) => t.category === cat),
  }));

  return (
    <div className="space-y-8">
      {byCategory.map(({ cat, items }) => (
        <div key={cat}>
          {/* Category heading */}
          <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-nanai-sage">
            <span>{CATEGORY_ICONS[cat]}</span>
            {labels[cat as keyof typeof labels] ?? cat}
          </p>

          <div className="grid gap-2 sm:grid-cols-2">
            {items.map((t) => {
              const isSelected = selected?.name === t.name;
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => { onSelect(t); onConfirm(); }}
                  aria-pressed={isSelected}
                  className={[
                    "group flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left",
                    "transition-all duration-200",
                    isSelected
                      ? "border-nanai-accent bg-nanai-accent/8 ring-1 ring-nanai-accent/30"
                      : "border-nanai-rose/30 bg-white/60 hover:border-nanai-sage/50 hover:bg-nanai-blush/30",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "text-sm font-medium leading-snug",
                      isSelected ? "text-nanai-ink" : "text-nanai-ink/80",
                    ].join(" ")}
                  >
                    {t.name}
                  </span>
                  <span
                    className={[
                      "ml-4 shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em]",
                      isSelected
                        ? "bg-nanai-accent/15 text-nanai-accent"
                        : "bg-nanai-blush/70 text-nanai-ink-soft",
                    ].join(" ")}
                  >
                    {t.durationLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
