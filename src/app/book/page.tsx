import { CalEmbed } from "@/components/booking/CalEmbed";
import Link from "next/link";

export default function BookPage() {
  return (
    <div
      className="min-h-screen relative overflow-hidden bg-nanai-canvas"
      style={{
        backgroundImage: "var(--nanai-bg-image-1)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "var(--nanai-section-bg-attachment-1)",
        backgroundBlendMode: "var(--nanai-section-bg-blend-1)" as any,
      }}
    >
      <div 
        className="absolute inset-0 bg-nanai-canvas" 
        style={{ opacity: "var(--nanai-section-bg-opacity-1)" }}
      />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-32">
        <Link href="/" className="inline-flex items-center text-sm tracking-widest uppercase font-medium text-nanai-sage mb-12 hover:text-nanai-ink transition-colors">
          ← Back to studio
        </Link>
        
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-6 text-nanai-ink">Reserve your time</h1>
          <p className="text-lg text-nanai-ink/80 leading-relaxed font-light max-w-2xl mx-auto">
            Choose a moment to pause. A 50% deposit will be requested to secure your booking, allowing us to prepare the space exclusively for you.
          </p>
        </header>

        {/* 
          Replace "nanaicare/facial-treatment" with your actual Cal.com event type link 
          once you set up your account at cal.com.
        */}
        <div className="bg-nanai-canvas/50 backdrop-blur-md rounded-[2rem] p-4 md:p-8 border border-nanai-blush shadow-nanai-soft">
          <CalEmbed calLink="nanaicare" theme="light" />
        </div>
      </div>
    </div>
  );
}
