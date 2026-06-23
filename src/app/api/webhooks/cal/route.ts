import { NextResponse } from "next/server";

// This webhook is triggered by Cal.com when a new booking is created.
// It sends an email to the client with the payment instructions (Tikkie / IBAN) for the 50% deposit.

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Verify webhook secret if configured
    const calSecret = process.env.CAL_WEBHOOK_SECRET;
    const signature = request.headers.get("X-Cal-Signature");
    
    // In production, we should verify the signature using crypto.
    // For now, we process the payload.

    const { triggerEvent, payload } = body;

    // We only care about new bookings
    if (triggerEvent !== "BOOKING_CREATED") {
      return NextResponse.json({ message: "Ignored event type" });
    }

    const { attendees, title, start, eventType, uid } = payload;
    const client = attendees[0];
    
    if (!client || !client.email) {
      console.error("No client email found in booking payload");
      return NextResponse.json({ error: "Missing client data" }, { status: 400 });
    }

    // In a real implementation, we would map the eventType to our treatmentCatalog
    // to find the exact price and calculate 50%.
    // For now, we will send a generic message or assume a standard deposit.
    const depositAmount = 45; // Mock 50% of 90 euros

    // ==========================================
    // EMAIL SENDING LOGIC (Resend Integration)
    // ==========================================
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.warn("RESEND_API_KEY is not set. Webhook received successfully, but email was skipped.");
      console.log(`[MOCK EMAIL] To: ${client.email}`);
      console.log(`[MOCK EMAIL] Subject: Your NanaiCare Reservation - Deposit Required`);
      console.log(`[MOCK EMAIL] Body: Please pay €${depositAmount} for ${title} on ${new Date(start).toLocaleDateString()}.`);
      
      return NextResponse.json({ 
        success: true, 
        message: "Webhook processed, email skipped (no API key)" 
      });
    }

    // If we have the key, send the real email
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "NanaiCare <contact@nanaicare.com>",
        to: [client.email],
        subject: "Completa tu reserva en NanaiCare - Depósito requerido",
        html: `
          <div style="font-family: sans-serif; color: #3D2E32; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #3D2E32;">¡Gracias por elegir NanaiCare, ${client.name}!</h1>
            <p>Hemos recibido tu solicitud de reserva para <strong>${title}</strong> el día ${new Date(start).toLocaleDateString()}.</p>
            <p>Para confirmar tu cita, requerimos un depósito del 50% (<strong>€${depositAmount}</strong>).</p>
            
            <div style="background-color: #FDFBFB; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #E5D5D3;">
              <h3 style="margin-top: 0;">Opción 1: Tikkie (Recomendado)</h3>
              <p><a href="#" style="background-color: #3D2E32; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Pagar con Tikkie</a></p>
              
              <h3>Opción 2: Transferencia Bancaria</h3>
              <p><strong>Titular:</strong> Nicol Castro</p>
              <p><strong>IBAN:</strong> NL00ABNA0000000000</p>
              <p><strong>Concepto:</strong> Reserva ${uid}</p>
            </div>
            
            <p>Tienes 24 horas para realizar el pago. Una vez recibido, confirmaremos tu cita de inmediato.</p>
            <p>Con cariño,<br/>Nicol, NanaiCare</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      console.error("Failed to send email via Resend", await res.text());
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Email sent" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
