const fs = require('fs');

const path = './src/messages/en.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Delete Charter and Roadmap
delete data.Charter;
delete data.Roadmap;

// Update Hero
data.Hero.title = "Nanai, care that softens pain and sorrow.";
data.Hero.lead = "Nanai means a tender caress used to calm and soothe. We bring this philosophy into the science of skincare. True skin maintenance is never a one-size-fits-all template. We trade rigid beauty templates for real, close, and human wisdom to help you care for yourself completely.";

// Update About
data.About.title = "Nanai Care";
data.About.meaning = "The word Nanai means a tender caress used to calm pain or sorrow. When we perform an intuitive massage or facial ritual, we are not just applying products. Through slow, intentional, and deeply comforting touch, we send a direct signal back up that neural highway to your brain, telling your nervous system that it is safe to relax.";
data.About.vision = "By calming the brain, we turn off the stress response, lower inflammation, and allow your skin to truly heal from within. Caring for it regularly isn't a luxury—it’s how you say thank you to the body that carries you every day.";

// Update Policies
data.Policies.title = "Our Appointment & Cancellation Policy";
data.Policies.subtitle = "To ensure a seamless, luxurious experience for every guest, we kindly ask you to review our booking standards.";
data.Policies.items = [
  {
    title: "Secure Your Sanctuary (50% Advanced Deposit)",
    body: "To guarantee your desired time slot, a 50% deposit is required at the time of booking. Your appointment is only fully confirmed once this deposit is processed."
  },
  {
    title: "The 24-Hour Rule (Cancellations & Rescheduling)",
    body: "We respect your schedule, and we ask that you respect ours. You must cancel or reschedule your appointment at least 24 hours in advance. Failure to do so, or failing to show up to your appointment, results in the automatic forfeit of your 50% deposit (no refunds will be issued)."
  },
  {
    title: "Respecting the Clock (Punctuality Policy)",
    body: "Please arrive on time to immerse yourself fully in your treatment. If you arrive late, your session will be shortened to protect the schedule of the next guest. The full treatment price will still apply."
  },
  {
    title: "Our Commitment to You (Therapist Cancellations)",
    body: "In the rare event that your therapist is unable to perform your session due to unforeseen circumstances, your investment is fully protected. You will be able to seamlessly reschedule your treatment to a mutually agreed upon date and time."
  }
];

// Update Services Items
data.Services.items = [
  {
    tag: "Body · 60/90 min",
    title: "Release Ritual: The Passionate Escape",
    description: "Surrender your senses and dissolve into pure bliss. Disconnect from the chaos and step into a sanctuary of pure peace. This deeply comforting, slow-rhythm massage acts as a love letter to your nervous system."
  },
  {
    tag: "Body · 60/90 min",
    title: "The Deep-Tissue Release",
    description: "Stop enduring your pain. This high-intensity massage therapy fearlessly hunts down your deepest discomfort—shattering stubborn knots, easing chronic pain, and re-architecting your posture."
  },
  {
    tag: "Body · 60 min",
    title: "The Volcanic Hot Stone Massage",
    description: "60 minutes of deep, molten relaxation. Surrender to the intoxicating warmth of the earth. This sensory ritual harnesses heated volcanic rocks to dissolve your stubbornest physical knots."
  },
  {
    tag: "Body · 50 min",
    title: "Indian head Nanai massage",
    description: "50 minutes to dissolve your mental burdens and transcend daily stress. Surrender to an intoxicating oasis of pure stillness."
  },
  {
    tag: "Body · 50 min",
    title: "The Crown & Face Masterpiece",
    description: "A powerful fusion of Shiatsu pressure points and Lymphatic Drainage to release TMJ jaw tension, relieve headaches, and banish micro-puffiness."
  },
  {
    tag: "Body",
    title: "Pure Nanai for Mother To Be",
    description: "A pregnancy massage is a sacred pause in your journey. A deeply intuitive, gravity-defying ritual designed to cradle you and your baby in absolute safety."
  },
  {
    tag: "Body · 60 min",
    title: "The Lymphatic Fluid-Sculpt & Detox",
    description: "60 minutes of pure, lightweight ecstasy and deep cellular renewal. The Intoxicating Cellular Reset that completely liberates your body from heavy, stagnant fluids and hidden toxins."
  },
  {
    tag: "Body · 45 min",
    title: "Energizing leg ritual",
    description: "A revitalizing leg ritual massage is an invigorating treatment designed to banish heaviness and restore vitality to tired limbs."
  },
  {
    tag: "Facial · 120 min",
    title: "Deep cleansing care",
    description: "Is a multi step skin care treatments design to go far beyond your daily routine. Purifies the skin unclogging the pores removing dead cells and extracting impurities."
  },
  {
    tag: "Facial · 60 min",
    title: "Sensitive Nanai care",
    description: "The Ritual cloud cleanse: A ultra-gentle, whisper-soft purification. An exquisitely calm, sculpted, and intensely hydrated complexion tailored exclusively for sensitive skin."
  },
  {
    tag: "Facial",
    title: "Sculpt and Glow Lymphatic Drainage",
    description: "Say goodbye to morning puffiness. This gentle, rhythmic massage channels your body’s natural drainage network to flush toxins, release jaw tension, and boost cellular circulation."
  },
  {
    tag: "Facial · 90 min",
    title: "Post Acné Treatment",
    description: "After an acne treatment, you want to improve the appearance of your skin & feel comfortable. Here you have the support that you need with a tailor made treatment."
  },
  {
    tag: "Facial",
    title: "Microneedling with peptides",
    description: "Unlock your Skin's Natural Glow! This minimally invasive treatment uses tiny, precise needles to stimulate collagen and elastin production."
  },
  {
    tag: "Facial",
    title: "Exosomes & Clear skin",
    description: "If you have some hyperpigmentation like melasma, sun spots or acne scars, in Nanai Care you can press the reset button to peel away years of sun damage."
  },
  {
    tag: "Facial",
    title: "Summer Glow and Cryo Hydration Facial",
    description: "The Ultimate Summer Melt-Proof Formula. Crafted to rescue sun-drenched skin, this high-performance treatment floods your skin barrier with advanced hydration."
  },
  {
    tag: "Facial",
    title: "Nanai Signature care",
    description: "The Ultimate 'Me Time' Obsession. Deep Cleanse & Hydrafacial, Lymphatic & Uplifting Massage, Infrared, Aroma & Premium Mask."
  },
  {
    tag: "Package · 60 min",
    title: "The Sole & Soul Serenity Ritual (Legs & Head)",
    description: "60 minutes of pure, weightless luxury from head to toe. This targeted dual-action ritual completely lightens heavy lower bodies while melting away chronic tension from the neck up."
  },
  {
    tag: "Package · 60 min",
    title: "Head To Toe Refreshing Glow Ritual (Legs & Face)",
    description: "60 Minutes of Pure Haute-Skincare Luxury. The ultimate high-performance escape that relieves heavy lower bodies while unleashing a lit-from-within facial radiance."
  },
  {
    tag: "Package",
    title: "The Back Side Beauty & Relax Ritual",
    description: "The ultimate deep-pore purification and muscle-melting escape. Give the most neglected part of your body the high-performance luxury it begs for."
  }
];

fs.writeFileSync(path, JSON.stringify(data, null, 2));
