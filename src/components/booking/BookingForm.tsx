"use client";

import { useState, useTransition } from "react";
import type { BookingFormData, BookableTreatment, BookingStep } from "@/types/booking";
import { StepTreatment } from "./StepTreatment";
import { StepDateTime } from "./StepDateTime";
import { StepPersonal } from "./StepPersonal";
import { BookingConfirmation } from "./BookingConfirmation";
import { CalEmbed } from "./CalEmbed";

interface BookingLabels {
  step1Title: string;
  step2Title: string;
  step3Title: string;
  nextButton: string;
  backButton: string;
  confirmButton: string;
  successTitle: string;
  successBody: string;
  backHome: string;
  slotsLoading: string;
  noSlots: string;
  pickDate: string;
  closedDay: string;
  depositNote: string;
  cancelPolicy: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  healthNotePlaceholder: string;
  categoryBody: string;
  categoryFacial: string;
  categoryPackages: string;
  minutesSuffix: string;
  submitting: string;
  errorGeneric: string;
}

interface Props {
  labels: BookingLabels;
  locale: string;
}

const EMPTY_FORM: BookingFormData = {
  treatment: null,
  date: null,
  timeSlot: null,
  fullName: "",
  email: "",
  phone: "",
  healthNote: "",
  locale: "en",
};

function StepDot({ n, current }: { n: number; current: BookingStep }) {
  const done = typeof current === "number" && n < current;
  const active = current === n;
  return (
    <div
      aria-current={active ? "step" : undefined}
      className={[
        "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all",
        done
          ? "bg-nanai-sage text-white"
          : active
          ? "bg-nanai-accent text-white shadow-nanai-soft"
          : "bg-nanai-blush/60 text-nanai-ink/40",
      ].join(" ")}
    >
      {done ? (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        n
      )}
    </div>
  );
}

function StepConnector({ done }: { done: boolean }) {
  return (
    <div
      className={[
        "h-px flex-1 transition-colors duration-500",
        done ? "bg-nanai-sage/50" : "bg-nanai-rose/25",
      ].join(" ")}
    />
  );
}

export function BookingForm({ labels, locale }: Props) {
  const [step, setStep] = useState<BookingStep>(1);
  const [form, setForm] = useState<BookingFormData>({ ...EMPTY_FORM, locale });
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Derived: is "Next" button allowed for each step?
  const canAdvance =
    step === 1
      ? !!form.treatment
      : step === 2
      ? !!form.date && !!form.timeSlot
      : step === 3
      ? !!form.fullName.trim() && !!form.email.trim()
      : false;

  function handleFieldChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit() {
    setServerError(null);
    startTransition(async () => {
      try {
        // Phase 1: optimistic success (no backend yet)
        // Phase 2: replace with actual server action import:
        //   const { createAppointment } = await import("@/actions/createAppointment");
        //   const result = await createAppointment({ ... });
        //   if (!result.success) { setServerError(result.error); return; }

        // Simulate a short network delay so UX feels real
        await new Promise((r) => setTimeout(r, 1200));
        setStep("success");
      } catch {
        setServerError(labels.errorGeneric);
      }
    });
  }

  // Format the selected date for display
  const formattedDate = form.date
    ? new Intl.DateTimeFormat(
        locale === "es" ? "es-NL" : locale === "nl" ? "nl-NL" : "en-NL",
        { weekday: "long", day: "numeric", month: "long" }
      ).format(form.date)
    : "";

  if (step === "success") {
    return (
      <BookingConfirmation
        email={form.email}
        treatmentName={form.treatment?.name ?? ""}
        date={formattedDate}
        time={form.timeSlot ?? ""}
        labels={{
          successTitle: labels.successTitle,
          successBody: labels.successBody,
          backHome: labels.backHome,
        }}
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Step indicator */}
      <div className="mb-8 flex items-center gap-2">
        <StepDot n={1} current={step} />
        <StepConnector done={typeof step === "number" && step > 1} />
        <StepDot n={2} current={step} />
        <StepConnector done={typeof step === "number" && step > 2} />
        <StepDot n={3} current={step} />
      </div>

      {/* Step title */}
      <div className="mb-6">
        <h2 className="font-heading text-xl font-semibold tracking-tight text-nanai-ink">
          {step === 1
            ? labels.step1Title
            : step === 2
            ? labels.step2Title
            : labels.step3Title}
        </h2>

        {/* Selected summary beneath title */}
        {step >= 2 && form.treatment && (
          <p className="mt-1 text-xs text-nanai-ink-soft">
            {form.treatment.name} · {form.treatment.durationLabel}
            {step === 3 && form.timeSlot && (
              <> · {formattedDate} · {form.timeSlot}</>
            )}
          </p>
        )}
      </div>

      {/* Step content */}
      <div className="min-h-[260px]">
        {step === 1 && (
          <StepTreatment
            selected={form.treatment}
            onSelect={(t: BookableTreatment) => setForm((prev) => ({ ...prev, treatment: t }))}
            labels={{
              body: labels.categoryBody,
              facial: labels.categoryFacial,
              packages: labels.categoryPackages,
              minutesSuffix: labels.minutesSuffix,
            }}
          />
        )}

        {step === 2 && form.treatment && (
          <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CalEmbed 
              calLink={`nanai-care-tuxi4k/${form.treatment.durationMin}min`} 
              theme="light" 
              config={{
                notes: `Tratamiento deseado: ${form.treatment.name} (${form.treatment.durationLabel}).`
              }}
            />
          </div>
        )}
      </div>

      {/* Navigation for Step 1 only (Cal.com handles its own navigation for the rest) */}
      {step === 1 && (
        <div className="mt-8 flex items-center justify-end">
          <button
            type="button"
            disabled={!canAdvance}
            onClick={() => setStep(2)}
            className="inline-flex items-center justify-center rounded-full bg-nanai-accent px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-nanai-soft transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {labels.nextButton} →
          </button>
        </div>
      )}

      {/* Back button for Step 2 */}
      {step === 2 && (
        <div className="mt-8 flex items-center justify-start">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="inline-flex items-center gap-2 rounded-full border border-nanai-rose/35 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-nanai-ink/70 transition hover:border-nanai-sage/50 hover:text-nanai-ink"
          >
            ← {labels.backButton}
          </button>
        </div>
      )}
    </div>
  );
}
