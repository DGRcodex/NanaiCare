import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { BookingForm } from "@/components/booking/BookingForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Booking");

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      locale,
      type: "website",
    },
  };
}

export default async function BookPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Booking");

  // Collect all label strings server-side and pass to the Client Component.
  // This keeps translation logic on the server while the interactive form is a client component.
  const labels = {
    step1Title: t("step1Title"),
    step2Title: t("step2Title"),
    step3Title: t("step3Title"),
    nextButton: t("nextButton"),
    backButton: t("backButton"),
    confirmButton: t("confirmButton"),
    successTitle: t("successTitle"),
    successBody: t("successBody"),
    backHome: t("backHome"),
    slotsLoading: t("slotsLoading"),
    noSlots: t("noSlots"),
    pickDate: t("pickDate"),
    closedDay: t("closedDay"),
    depositNote: t("depositNote"),
    cancelPolicy: t("cancelPolicy"),
    namePlaceholder: t("namePlaceholder"),
    emailPlaceholder: t("emailPlaceholder"),
    phonePlaceholder: t("phonePlaceholder"),
    healthNotePlaceholder: t("healthNotePlaceholder"),
    categoryBody: t("categoryBody"),
    categoryFacial: t("categoryFacial"),
    categoryPackages: t("categoryPackages"),
    minutesSuffix: t("minutesSuffix"),
    submitting: t("submitting"),
    errorGeneric: t("errorGeneric"),
  };

  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-14 sm:px-6 lg:px-8">
      {/* Decorative blurs matching site aesthetic */}
      <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-nanai-blush/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-20 h-72 w-72 rounded-full bg-nanai-sage/15 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        {/* Page header */}
        <div className="mb-10 text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-nanai-rose/40 bg-white/80 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-nanai-ink/70 shadow-sm backdrop-blur">
            NanaiCare Amsterdam
          </p>
          <h1 className="font-heading text-3xl font-medium leading-tight tracking-tight text-nanai-ink sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-nanai-ink-soft">
            {t("subtitle")}
          </p>
        </div>

        {/* The interactive 3-step form (Client Component) */}
        <div className="rounded-3xl border border-nanai-rose/25 bg-white/75 p-6 shadow-nanai-soft backdrop-blur-sm sm:p-8 lg:p-10">
          <BookingForm labels={labels} locale={locale} />
        </div>
      </div>
    </section>
  );
}
