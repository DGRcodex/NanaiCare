"use client";

import { useState, useEffect, useTransition } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import type { BookableTreatment, TimeSlot } from "@/types/booking";
import { isOpenDay, generateRawSlots } from "@/lib/studioConfig";

interface Props {
  treatment: BookableTreatment;
  selectedDate: Date | null;
  selectedTime: string | null;
  onDateSelect: (d: Date) => void;
  onTimeSelect: (t: string) => void;
  labels: {
    pickDate: string;
    pickTime: string;
    slotsLoading: string;
    noSlots: string;
    closedDay: string;
  };
  locale: string;
}

export function StepDateTime({
  treatment,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  labels,
  locale,
}: Props) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [isPending, startTransition] = useTransition();

  // When a date is selected, compute available slots.
  // Phase 1: purely client-side (no Supabase yet).
  // Phase 2: replace with a server action call that checks GCal + DB.
  useEffect(() => {
    if (!selectedDate) return;
    startTransition(() => {
      const raw = generateRawSlots(treatment.durationMin);
      // All slots available (Phase 1 — no backend yet)
      setSlots(raw.map((time) => ({ time, available: true })));
    });
  }, [selectedDate, treatment.durationMin]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Disable past days and closed days
  const disabledDays = [
    { before: today },
    (d: Date) => !isOpenDay(d),
  ];

  // Friendly date label
  const dateLabelFmt = selectedDate
    ? new Intl.DateTimeFormat(locale === "es" ? "es-NL" : locale === "nl" ? "nl-NL" : "en-NL", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }).format(selectedDate)
    : null;

  return (
    <div className="space-y-8">
      {/* Calendar */}
      <div className="flex flex-col items-start gap-6 sm:flex-row">
        <div className="w-full overflow-hidden rounded-2xl border border-nanai-rose/25 bg-white/80 p-4 shadow-sm sm:w-auto">
          <DayPicker
            mode="single"
            selected={selectedDate ?? undefined}
            onSelect={(d) => d && onDateSelect(d)}
            disabled={disabledDays as Parameters<typeof DayPicker>[0]["disabled"]}
            classNames={{
              root: "nanai-daypicker",
              months: "flex flex-col gap-4",
              month_caption: "flex items-center justify-between px-1 pb-3",
              caption_label: "font-heading text-base font-semibold tracking-wide text-nanai-ink",
              nav: "flex items-center gap-1",
              button_previous:
                "inline-flex h-7 w-7 items-center justify-center rounded-full border border-nanai-rose/30 bg-white text-nanai-ink-soft transition hover:bg-nanai-blush/50",
              button_next:
                "inline-flex h-7 w-7 items-center justify-center rounded-full border border-nanai-rose/30 bg-white text-nanai-ink-soft transition hover:bg-nanai-blush/50",
              weekdays: "mb-1 flex",
              weekday: "w-9 text-center text-[10px] font-semibold uppercase tracking-wider text-nanai-ink-soft",
              weeks: "flex flex-col gap-0.5",
              week: "flex",
              day: "h-9 w-9",
              day_button: [
                "h-full w-full rounded-full text-sm font-medium transition-all",
                "text-nanai-ink hover:bg-nanai-blush/60",
              ].join(" "),
              selected: "[&>button]:bg-nanai-accent [&>button]:text-white [&>button]:shadow-nanai-soft",
              today: "[&>button]:ring-1 [&>button]:ring-nanai-sage/50",
              disabled: "[&>button]:opacity-30 [&>button]:cursor-not-allowed [&>button]:hover:bg-transparent",
              outside: "[&>button]:opacity-20",
            }}
          />
        </div>

        {/* Time slots */}
        <div className="flex-1">
          {!selectedDate && (
            <p className="text-sm text-nanai-ink-soft italic">{labels.pickDate}</p>
          )}

          {selectedDate && isPending && (
            <p className="text-sm text-nanai-sage">{labels.slotsLoading}</p>
          )}

          {selectedDate && !isPending && slots.length === 0 && (
            <p className="text-sm text-nanai-ink-soft">{labels.noSlots}</p>
          )}

          {selectedDate && !isPending && slots.length > 0 && (
            <div className="space-y-3">
              {dateLabelFmt && (
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-nanai-sage">
                  {dateLabelFmt}
                </p>
              )}
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {slots.map(({ time, available }) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={!available}
                      onClick={() => onTimeSelect(time)}
                      aria-pressed={isSelected}
                      className={[
                        "rounded-xl border py-2.5 text-sm font-semibold transition-all",
                        !available
                          ? "cursor-not-allowed border-nanai-rose/15 bg-nanai-rose/5 text-nanai-ink/25"
                          : isSelected
                          ? "border-nanai-accent bg-nanai-accent/10 text-nanai-accent ring-1 ring-nanai-accent/30"
                          : "border-nanai-rose/30 bg-white/80 text-nanai-ink/80 hover:border-nanai-sage/50 hover:bg-nanai-blush/40",
                      ].join(" ")}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
