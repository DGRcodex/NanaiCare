export type TreatmentItem = {
  name: string;
  duration?: string;
  price?: number;
  descriptionEn?: string;
  descriptionEs?: string;
};

export type TreatmentCategory = {
  id: "body" | "facial" | "packages" | "subscriptions";
  image?: string;
  items: TreatmentItem[];
};

export const treatmentCatalog: TreatmentCategory[] = [
  {
    id: "body",
    image: "/images/treatments/spa_body_category_1782263626091.png",
    items: [
      { 
        name: "RELEASE RITUAL", 
        duration: "60 or 90 min", 
        price: 85,
        descriptionEn: "Disconnect from the chaos and step into a sanctuary of pure peace. This deeply comforting, slow-rhythm massage acts as a love letter to your nervous system—silencing a racing mind and washing away the heavy, invisible weight of daily life.",
        descriptionEs: "Desconecta del caos y entra a un santuario de paz. Este masaje profundo de ritmo lento actúa como una carta de amor a tu sistema nervioso, silenciando una mente acelerada y lavando el peso invisible de la vida diaria."
      },
      { 
        name: "DEEP TISSUE RELEASE", 
        duration: "60 or 90 min", 
        price: 95,
        descriptionEn: "Stop enduring your pain. This high-intensity massage therapy fearlessly hunts down your deepest discomfort—shattering stubborn knots, easing chronic pain, and re-architecting your posture to break the chains of daily physical stress.",
        descriptionEs: "Deja de soportar tu dolor. Esta terapia de masaje de alta intensidad busca tu incomodidad más profunda, rompiendo nudos rebeldes, aliviando el dolor crónico y re-arquitectando tu postura."
      },
      { 
        name: "VOLCANIC HOT STONE MASSAGE", 
        duration: "60 min", 
        price: 90,
        descriptionEn: "The Passionate Escape: surrender to the intoxicating warmth of the Earth. This sensory ritual uses heated volcanic rocks to dissolve your stubbornest physical knots, silence your overactive mind, and plunge your entire system into absolute serenity.",
        descriptionEs: "Ríndete al calor embriagador de la Tierra. Este ritual sensorial utiliza rocas volcánicas calientes para disolver tus nudos físicos más rebeldes, silenciar tu mente hiperactiva y sumergir todo tu sistema en una serenidad absoluta."
      },
      { 
        name: "NANAI INDIAN HEAD MASSAGE", 
        duration: "50 min", 
        price: 75,
        descriptionEn: "Surrender to an oasis of pure stillness. This slow, hypnotic massage deeply unravels the heavy physical and emotional weight trapped in your upper body—granting you absolute permission to disconnect from the world.",
        descriptionEs: "Ríndete a un oasis de pura quietud. Este masaje hipnótico y lento desenreda profundamente el gran peso físico y emocional atrapado en la parte superior de tu cuerpo, dándote permiso absoluto para desconectarte del mundo."
      },
      { 
        name: "PURE NANAI MOTHER TO BE", 
        duration: "60 min", 
        price: 85,
        descriptionEn: "A prenatal massage is a sacred pause in your journey. It is a deeply intuitive, gravity-defying ritual designed to cradle you and your baby in absolute safety as your body adapts to carry a new life.",
        descriptionEs: "Un masaje prenatal es una pausa sagrada en tu viaje. Es un ritual profundamente intuitivo diseñado para acunarte a ti y a tu bebé en absoluta seguridad mientras tu cuerpo se adapta para llevar una nueva vida."
      },
      { 
        name: "LYMPHATIC SCULPT & DETOX", 
        duration: "60 min", 
        price: 85,
        descriptionEn: "Prepare to experience the ultimate weightless sensation. This masterful, ultra-gentle therapy completely liberates your body from heavy, stagnant fluids and hidden toxins—instantly reviving your energy and speeding up post-surgery recovery.",
        descriptionEs: "Prepárate para experimentar la máxima sensación de ingravidez. Esta terapia magistral y ultra suave libera completamente tu cuerpo de fluidos pesados estancados y toxinas ocultas, reviviendo al instante tu energía."
      },
      { 
        name: "ENERGIZING LEGS & FEET RITUAL", 
        duration: "45 min", 
        price: 65,
        descriptionEn: "Combining deep-tissue techniques, lymphatic drainage, and cooling botanical therapies, this treatment boosts circulation, flushes out toxins, and leaves your legs feeling remarkably light, refreshed, and ready to move.",
        descriptionEs: "Combinando técnicas de tejido profundo, drenaje linfático y terapias botánicas refrescantes, este tratamiento aumenta la circulación, elimina toxinas y deja tus piernas sintiéndose increíblemente ligeras."
      },
    ],
  },
  {
    id: "facial",
    image: "/images/treatments/spa_facial_category_1782263635367.png",
    items: [
      { 
        name: "DEEP CLEANSING CARE", 
        duration: "120 min", 
        price: 150,
        descriptionEn: "A multi-step skin care treatment designed to go far beyond your daily routine. It purifies the skin and unclogs the pores, removing dead cells and extracting impurities, leaving you with fresh, balanced, and radiant skin.",
        descriptionEs: "Un tratamiento de cuidado de la piel de varios pasos diseñado para ir mucho más allá de tu rutina diaria. Purifica la piel y destapa los poros, eliminando células muertas y extrayendo impurezas."
      },
      { 
        name: "SENSITIVE NANAI CARE", 
        duration: "60 min", 
        price: 85,
        descriptionEn: "This facial treatment is designed to calm, detoxify, strengthen and hydrate the skin barrier, with quality cosmetological products especially formulated for sensitive skin.",
        descriptionEs: "Este tratamiento facial está diseñado para calmar, desintoxicar, fortalecer e hidratar la barrera de la piel, con productos cosmetológicos de calidad especialmente formulados para pieles sensibles."
      },
      { 
        name: "SCULP & GLOW LIMPHATIC DRAINAGE", 
        duration: "50 min", 
        price: 75,
        descriptionEn: "Say goodbye to morning puffiness. This gentle, rhythmic massage channels your body’s natural drainage network to flush toxins, release jaw tension, and boost cellular circulation.",
        descriptionEs: "Despídete de la hinchazón matutina. Este masaje rítmico y suave canaliza la red de drenaje natural de tu cuerpo para eliminar toxinas, liberar tensión en la mandíbula y aumentar la circulación celular."
      },
      { 
        name: "POST ACNÉ TREATMENT", 
        duration: "90 min", 
        price: 120,
        descriptionEn: "After an acne treatment, you want to improve the appearance of your skin and feel comfortable and secure of yourself. Here you will find the support that you need with a tailor-made treatment.",
        descriptionEs: "Después de un tratamiento para el acné, deseas mejorar la apariencia de tu piel y sentirte cómoda y segura de ti misma. Aquí encontrarás el apoyo que necesitas con un tratamiento a medida."
      },
      { 
        name: "MICRONEEDLING WITH PEPTIDES", 
        duration: "60 min", 
        price: 110,
        descriptionEn: "Unlock your Skin's Natural Glow with Microneedling! This minimally invasive treatment uses tiny, precise needles to stimulate collagen and elastin production. Smooth fine lines and reduce acne scars.",
        descriptionEs: "¡Desbloquea el brillo natural de tu piel con Microneedling! Este tratamiento mínimamente invasivo utiliza agujas pequeñas y precisas para estimular la producción de colágeno y elastina."
      },
      { 
        name: "CLEAR SKIN", 
        duration: "60 min", 
        price: 95,
        descriptionEn: "If you suffer from hyperpigmentation like melasma, sunspots or acne scars, in Nanai Care you can press the reset button to peel away years of sun damage. We use the right products and techniques, like peelings and infra-red treatment.",
        descriptionEs: "Si sufres de hiperpigmentación, aquí puedes presionar el botón de reinicio para eliminar años de daño solar. Usamos los productos y técnicas correctas, como peelings y tratamiento infrarrojo."
      },
      { 
        name: "SUMMER GLOW AND CRYO HYDRATION FACIAL", 
        duration: "75 min", 
        price: 105,
        descriptionEn: "Crafted to rescue sun-drenched skin, this high-performance treatment floods your skin barrier with advanced hydration. Experience an instant arctic rush with our signature Cold Spoon Cryotherapy.",
        descriptionEs: "Creado para rescatar la piel bañada por el sol, este tratamiento inunda tu barrera cutánea con hidratación avanzada. Experimenta una ráfaga ártica instantánea con nuestra exclusiva Crioterapia."
      },
      { 
        name: "NANAI SIGNATURE CARE", 
        duration: "90 min", 
        price: 135,
        descriptionEn: "The Ultimate 'Me Time' Obsession. A passionate, deep-pore vacuum extraction that floods your skin with liquid life, followed by a lymphatic uplifting massage and Premium Mask. You will emerge completely transformed.",
        descriptionEs: "La obsesión definitiva del 'Tiempo para mí'. Una extracción profunda seguida de un masaje linfático reafirmante y una Máscara Premium. Saldrás completamente transformada."
      },
    ],
  },
  {
    id: "packages",
    image: "/images/treatments/spa_packages_category_1782263643859.png",
    items: [
      { 
        name: "THE SOLE & SOUL SERENTY RITUAL", 
        duration: "60 min", 
        price: 100,
        descriptionEn: "The 60-Minute Reset: This targeted dual-action ritual completely lightens heavy lower bodies while melting away chronic tension from the neck up.",
        descriptionEs: "El reseteo de 60 minutos: Este ritual de doble acción aligera completamente la pesadez de las piernas mientras disuelve la tensión crónica desde el cuello hacia arriba."
      },
      { 
        name: "HEAD TO TOE REFRESHING GLOW RITUAL", 
        duration: "60 min", 
        price: 110,
        descriptionEn: "The Instant Reset: The ultimate high-performance escape. This 60-minute, dual-action treatment completely relieves heavy lower bodies while unleashing a jaw-dropping facial radiance.",
        descriptionEs: "El reseteo instantáneo: El escape definitivo de alto rendimiento. Un tratamiento de 60 minutos de doble acción que alivia la pesadez y desata un resplandor facial asombroso."
      },
      { 
        name: "BACK SIDE BEAUTY & RELAX RITUAL", 
        duration: "50 min", 
        price: 85,
        descriptionEn: "Give the most neglected part of your body the high-performance luxury it begs for. This specialized treatment targets congestion and stubborn muscle tension on your back.",
        descriptionEs: "Dale a la parte más descuidada de tu cuerpo el lujo de alto rendimiento que pide a gritos. Este tratamiento especializado combate la congestión y la tensión muscular persistente en tu espalda."
      },
    ],
  },
  {
    id: "subscriptions",
    items: [
      { name: "1-month membership", price: 120, descriptionEn: "Access to exclusive membership benefits for 1 month.", descriptionEs: "Acceso a beneficios exclusivos de membresía por 1 mes." },
      { name: "6-month membership", price: 650, descriptionEn: "Access to exclusive membership benefits for 6 months.", descriptionEs: "Acceso a beneficios exclusivos de membresía por 6 meses." },
    ],
  },
];
