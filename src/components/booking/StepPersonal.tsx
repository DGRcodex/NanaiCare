"use client";

interface Props {
  fullName: string;
  email: string;
  phone: string;
  healthNote: string;
  onChange: (field: string, value: string) => void;
  labels: {
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    healthNotePlaceholder: string;
    depositNote: string;
    cancelPolicy: string;
  };
}

export function StepPersonal({
  fullName,
  email,
  phone,
  healthNote,
  onChange,
  labels,
}: Props) {
  const inputBase = [
    "w-full rounded-xl border border-nanai-rose/30 bg-white/80 px-4 py-3 text-sm",
    "text-nanai-ink placeholder:text-nanai-ink/35",
    "outline-none transition",
    "focus:border-nanai-sage/60 focus:ring-2 focus:ring-nanai-sage/20",
  ].join(" ");

  return (
    <div className="space-y-4">
      {/* Full name */}
      <div>
        <input
          id="booking-name"
          type="text"
          autoComplete="name"
          value={fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          placeholder={labels.namePlaceholder}
          className={inputBase}
          required
        />
      </div>

      {/* Email */}
      <div>
        <input
          id="booking-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder={labels.emailPlaceholder}
          className={inputBase}
          required
        />
      </div>

      {/* Phone */}
      <div>
        <input
          id="booking-phone"
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder={labels.phonePlaceholder}
          className={inputBase}
        />
      </div>

      {/* Health note */}
      <div>
        <textarea
          id="booking-health-note"
          rows={3}
          value={healthNote}
          onChange={(e) => onChange("healthNote", e.target.value)}
          placeholder={labels.healthNotePlaceholder}
          className={[inputBase, "resize-none"].join(" ")}
        />
      </div>

      {/* Policy notices */}
      <div className="space-y-2 rounded-2xl border border-nanai-blush bg-nanai-blush/30 px-4 py-3.5">
        <p className="text-xs leading-relaxed text-nanai-ink/70">
          💳 {labels.depositNote}
        </p>
        <p className="text-xs leading-relaxed text-nanai-ink/70">
          📅 {labels.cancelPolicy}
        </p>
      </div>
    </div>
  );
}
