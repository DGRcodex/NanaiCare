// Booking system types for NanaiCare
// Used across form components, server actions, and lib helpers.

export type BookingStep = 1 | 2 | 3 | "success";

export interface BookableTreatment {
  name: string;
  category: "body" | "facial" | "packages";
  durationMin: number; // canonical minutes (used for slot calculation)
  durationLabel: string; // display string e.g. "60 min"
  calLink?: string; // specific Cal.com event link for this treatment
}

export interface TimeSlot {
  time: string; // "HH:mm" in Europe/Amsterdam
  available: boolean;
}

export interface BookingFormData {
  treatment: BookableTreatment | null;
  date: Date | null; // selected calendar date
  timeSlot: string | null; // "HH:mm"
  fullName: string;
  email: string;
  phone: string;
  healthNote: string;
  locale: string;
}

export interface CreateAppointmentInput {
  treatmentName: string;
  durationMin: number;
  scheduledAt: string; // ISO 8601, Europe/Amsterdam
  fullName: string;
  email: string;
  phone: string;
  healthNote: string;
  locale: string;
}

export type CreateAppointmentResult =
  | { success: true; appointmentId: string }
  | { success: false; error: string };

export interface AvailabilityRequest {
  date: string; // "YYYY-MM-DD"
  durationMin: number;
}

export interface AvailabilityResponse {
  slots: TimeSlot[];
}
