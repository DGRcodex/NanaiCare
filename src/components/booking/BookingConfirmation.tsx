"use client";

interface Props {
  email: string;
  treatmentName: string;
  date: string;
  time: string;
  labels: {
    successTitle: string;
    successBody: string;
    backHome: string;
  };
}

export function BookingConfirmation({
  email,
  treatmentName,
  date,
  time,
  labels,
}: Props) {
  return (
    <div className="flex flex-col items-center py-12 text-center">
      {/* Animated checkmark */}
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-nanai-sage/20" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-nanai-sage/15 ring-2 ring-nanai-sage/30">
          <svg
            className="h-8 w-8 text-nanai-sage"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h2 className="font-heading text-2xl font-semibold tracking-tight text-nanai-ink">
        {labels.successTitle}
      </h2>

      <p className="mt-3 max-w-sm text-sm leading-relaxed text-nanai-ink-soft">
        {labels.successBody.replace("[email]", email)}
      </p>

      {/* Booking summary pill */}
      <div className="mt-6 rounded-2xl border border-nanai-rose/25 bg-white/80 px-6 py-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-nanai-sage mb-2">
          Tu reserva
        </p>
        <p className="text-base font-semibold text-nanai-ink">{treatmentName}</p>
        <p className="mt-0.5 text-sm text-nanai-ink-soft">
          {date} · {time}
        </p>
      </div>

      <a
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-nanai-rose/35 bg-white/80 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-nanai-ink/80 shadow-sm transition hover:border-nanai-sage/50"
      >
        ← {labels.backHome}
      </a>
    </div>
  );
}
