/* ============================================================
   Content model for the MG Motor Mumbai website.
   Car lineup, pricing, specifications, and dealer facts are
   rebranded to MG Motor Mumbai.
   ============================================================ */

/* Indian numbering (lakh/crore) grouping, e.g. 1090700 -> "10,90,700". */
export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const accentCycle = [
  "var(--accent-red)",
  "var(--accent-violet)",
  "var(--accent-orange)",
  "var(--accent-blue)",
];

/* ---- Canonical business identity (NAP), used everywhere + in schema ---- */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.mgmotormumbai.com";

export const company = {
  name: "MG Motor Mumbai",
  tagline: "Premium Dealership",
  phone: "98877 33000",
  phoneE164: "+919887733000",
  email: "contact@mgmotormumbai.com",
  primaryAddress: {
    street: "5th Floor, Modi House, Link Road, Malad (West)",
    locality: "Mumbai",
    region: "Maharashtra",
    postalCode: "400064",
    country: "IN",
  },
  hours: "Mon to Sun, 9:00 AM to 8:00 PM",
  hoursSpec: { days: "Mo-Su", opens: "09:00", closes: "20:00" },
  areasServed: ["Mumbai", "Thane", "Navi Mumbai", "Malad", "Andheri"],
  stats: {
    legacy: "100+ Years",
    happyCustomers: "50,000+",
    showrooms: "6+",
    satisfaction: "100%",
    carsSold: "50,000+",
    usedCarsSold: "35,000+",
    servicesDone: "120,000+",
  },
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    twitter: "https://twitter.com/",
    youtube: "https://www.youtube.com/",
    linkedin: "https://www.linkedin.com/",
  },
};

export const nav = {
  phone: "98877 33000",
  links: [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/about" },
    { label: "Models", href: "/cars" },
    { label: "Services", href: "/locate-service-centre" },
    { label: "Locations", href: "/locations" },
    { label: "Contact Us", href: "/contact-us" },
  ],
};

/* ---- About Us section content ---- */
export const aboutHeroImage = "/images/about-hero.jpg";
export const aboutCultureImage = "/images/about-culture.png";

export const groupInfo = {
  name: "Gautam Modi Group",
  url: "https://gautammodigroup.com",
  founded:
    "Grown over decades from a small dedicated team to a premium automotive dealer organization in Mumbai.",
  growth:
    "With state-of-the-art facilities across the city, we deliver excellence in sales and service.",
  brands: ["MG"],
  ventures: [
    { name: "MG Insurance", text: "Insurance solutions for MG vehicle owners." },
    { name: "MG Trade-In", text: "The group's premium pre-owned vehicle exchange program." },
  ],
  values: [
    {
      title: "Customer First",
      text: "Your satisfaction is our priority, from purchase to long-term ownership care.",
    },
    {
      title: "Integrity",
      text: "Honest, transparent, and trustworthy in everything we do.",
    },
    {
      title: "Innovation",
      text: "Embracing new ideas and technologies to drive the future of mobility.",
    },
    {
      title: "Excellence",
      text: "Delivering the highest standards in products, services, and operations.",
    },
    {
      title: "Passion",
      text: "Driven by our love for cars and the experiences they create for people.",
    },
  ],
  headquarters:
    "5th Floor, Modi House, Link Road, Malad (West), Mumbai – 400064",
};

export const mgIndiaFacts = {
  tagline: "Passion Drives",
  founded: 1924,
  plant: "Manufacturing plant in Halol, Gujarat, with advanced robotics and sustainability initiatives.",
  network: "Wide sales and service network across India providing seamless support.",
  milestone: "Celebrating 100+ years of MG legacy worldwide, delivering premium motoring experiences.",
  csr: [
    {
      title: "MG SEWA",
      text: "Supporting community empowerment, diversity, and girl child education across India.",
    },
    {
      title: "Green Mobility",
      text: "Pioneering the electric vehicle landscape with Windsor, ZS EV and eco-initiatives.",
    },
  ],
};

export const aboutFaqData = [
  {
    question: "Who owns MG Motor Mumbai?",
    answer:
      "MG Motor Mumbai is owned and operated by the Gautam Modi Group, a trusted automotive business group in India.",
  },
  {
    question: "Is MG Motor Mumbai an authorized MG dealership?",
    answer:
      "Yes. MG Motor Mumbai is an authorized MG Motor India dealership, with showrooms and service centers located in Malad, Andheri, Thane, and Navi Mumbai.",
  },
  {
    question: "How many customers does MG Motor Mumbai have?",
    answer:
      "MG Motor Mumbai has served over 50,000+ happy customers in Mumbai with premium sales, insurance, finance, and award-winning service.",
  },
  {
    question: "What areas do you cover in Mumbai?",
    answer:
      "Our showrooms and workshops are strategically located across Mumbai, including Malad (West), Andheri (West), Thane, and Navi Mumbai.",
  },
  {
    question: "When was MG founded?",
    answer:
      "MG (Morris Garages) was founded in the UK in 1924. Today it has a 100+ year global legacy and is a pioneer in modern connected and electric vehicles.",
  },
];

export type Slide = {
  model: string;
  badge: string;
  headline: string;
  sub: string;
  price: string;
  image: string;
  alt: string;
  features: string[];
};

export const heroSlides: Slide[] = [
  {
    model: "MG MOTOR LINEUP 1",
    badge: "PREMIUM PERFORMANCE",
    headline: "DRIVEN BY INNOVATION",
    sub: "Experience the best of British automotive engineering.",
    price: "10.00",
    image: "https://mgmotor.scene7.com/is/image/mgmotor/0152-herocarousel-bn-dsc?hei=2160&qlt=80&resMode=bisharp",
    alt: "MG Motor Premium Lineup 1",
    features: [],
  },
  {
    model: "MG MOTOR LINEUP 2",
    badge: "PREMIUM COMFORT",
    headline: "ELEGANCE IN EVERY DETAIL",
    sub: "Unmatched space, luxury, and technology.",
    price: "12.00",
    image: "https://mgmotor.scene7.com/is/image/mgmotor/0145-herocarousel-bn-dsc?hei=1920&qlt=80&resMode=bisharp",
    alt: "MG Motor Premium Lineup 2",
    features: [],
  },
  {
    model: "MG MOTOR LINEUP 3",
    badge: "SMART MOBILITY",
    headline: "FUTURE-READY DESIGN",
    sub: "Connected technology and intelligent driving aids.",
    price: "15.00",
    image: "https://mgmotor.scene7.com/is/image/mgmotor/mg-bn-dsc-087?hei=1920&qlt=80&resMode=bisharp",
    alt: "MG Motor Premium Lineup 3",
    features: [],
  },
  {
    model: "MG HECTOR",
    badge: "INTERNET SUV",
    headline: "BOLD & POWERFUL",
    sub: "Make a statement with an Argyle-inspired front grille and Level 2 ADAS.",
    price: "11.99",
    image: "https://mgmotor.scene7.com/is/image/mgmotor/mgi-hector-bn-homepage-003?hei=1920&qlt=80&resMode=bisharp",
    alt: "MG Hector SUV",
    features: [],
  },
  {
    model: "MG WINDSOR EV",
    badge: "PURE ELECTRIC CUV",
    headline: "BUSINESS CLASS COMFORT",
    sub: "India's first CUV, combining sedan luxury with SUV space.",
    price: "13.50",
    image: "https://mgmotor.scene7.com/is/image/mgmotor/cuv-bn-dsc-033?hei=1920&qlt=80&resMode=bisharp",
    alt: "MG Windsor EV CUV",
    features: [],
  },
];

export type CarCategory = "SUV" | "Sedan" | "Hatchback" | "Electric" | "Select";

export type CarColor = {
  name: string;
  hex: string;
  cssFilter: string;
  image?: string;
};

export type CarSpecs = {
  length: string;
  width: string;
  height: string;
  wheelbase: string;
  power: string;
  torque: string;
  battery?: string;
  acceleration?: string;
  safety: string[];
  features: string[];
  chassis: string;
  suspension: string;
  brakes: string;
  infotainment: string;
  warranty: string;
};

export type DetailedSection = {
  title: string;
  description: string;
  image: string;
};

export type FeatureCard = {
  title: string;
  description: string;
  image: string;
};

export type CategorizedFeatures = {
  exterior: FeatureCard[];
  safety: FeatureCard[];
  tech: FeatureCard[];
};

export type FeatureSectionItem = {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  highlights?: string[];
};

export type FeatureSection = {
  tab: string;
  icon: string;
  items: FeatureSectionItem[];
};

export type Car = {
  id: string;
  name: string;
  type: string;
  category: CarCategory;
  price: string;
  priceINR: number;
  engine: string;
  transmission: string;
  blurb: string;
  cta: string;
  fuel: string;
  image: string;
  alt: string;
  seating: string;
  mileage: string;
  bootSpace: string;
  highlights: string[];
  heroImage: string;
  interiorImage: string;
  galleryImages: { src: string; caption: string }[];
  colors: CarColor[];
  details: CarSpecs;
  detailedSections: DetailedSection[];
  youtubeVideo: string;
  categorizedFeatures: CategorizedFeatures;
  featureSections?: FeatureSection[];
};

const lakh = (inr: number) => (inr / 100000).toFixed(2);

export const cars: Car[] = [
  {
    id: "astor",
    name: "ASTOR",
    type: "Mid-size SUV",
    category: "SUV",
    price: lakh(998000),
    priceINR: 998000,
    engine: "1.5L VTi-TECH Petrol",
    transmission: "5-Speed Manual, CVT",
    fuel: "Petrol",
    blurb: "MG's tech-forward mid-size SUV, featuring Personal AI Assistant and Level 2 ADAS.",
    cta: "Explore the Astor",
    image: "/images/models/model-astor-transparent.png",
    alt: "MG Astor SUV",
    seating: "5 Seater",
    mileage: "14.5 kmpl",
    bootSpace: "488 Litres",
    highlights: [
      "Personal AI Assistant on dashboard",
      "Level 2 ADAS with 14 autonomous features",
      "Panoramic Skyroof",
      "10.1-inch HD Touchscreen",
    ],
    heroImage: "/images/models/model-astor.png",
    interiorImage: "/images/models/astor/10-dashboard-59.jpg",
    galleryImages: [
      { src: "/images/models/astor/01-front-left-side-47.jpg", caption: "Commanding front-facing road posture" },
      { src: "/images/models/astor/04-exterior-image-166.jpg", caption: "Sporty rear-three-quarters profile" },
      { src: "/images/models/astor/10-dashboard-59.jpg", caption: "Premium high-tech dashboard layout" },
      { src: "/images/models/astor/14-door-view-of-driver-seat-51.jpg", caption: "Ergonomic dual-tone leatherette seats" },
      { src: "/images/models/astor/16-infotainment-system-main-menu-183.jpg", caption: "10.1-inch HD touchscreen display" },
      { src: "/images/models/astor/03-exterior-image-165.jpg", caption: "Sleek and aerodynamic side silhouette" },
      { src: "/images/models/astor/12-steering-wheel-54.jpg", caption: "Leather-wrapped multi-function steering wheel" },
      { src: "/images/models/astor/02-exterior-image-164.jpg", caption: "Celestial front chrome grille design" },
      { src: "/images/models/astor/05-exterior-image-167.jpg", caption: "Dynamic 17-inch turbine alloy wheels" },
    ],
    colors: [
      { name: "Candy White", hex: "#ffffff", cssFilter: "none", image: "/images/astor/as-img-dsc-0341.png" },
      { name: "Aurora Silver", hex: "#cccccc", cssFilter: "none", image: "/images/astor/as-img-dsc-0340.png" },
      { name: "Glaze Red", hex: "#b81d24", cssFilter: "none", image: "/images/astor/as-img-dsc-0338.png" },
      { name: "Havana Grey", hex: "#7f848a", cssFilter: "none", image: "/images/astor/as-img-dsc-0339.png" },
      { name: "Starry Black", hex: "#111111", cssFilter: "none", image: "/images/astor/as-img-dsc-0342.png" },
    ],
    details: {
      length: "4323 mm",
      width: "1809 mm",
      height: "1650 mm",
      wheelbase: "2585 mm",
      power: "110 PS @ 6000 rpm",
      torque: "144 Nm @ 4400 rpm",
      chassis: "High-tensile steel monocoque body structure safety frame",
      suspension: "Front: MacPherson Strut | Rear: Torsion Beam suspension",
      brakes: "Front: Disc | Rear: Disc brake assembly",
      infotainment: "10.1-inch HD Touchscreen console with wireless Apple CarPlay & Android Auto",
      warranty: "3 Years / Unlimited Kilometers warranty coverage program",
      safety: [
        "6 Airbags",
        "ESP, ABS + EBD, Hill Hold Control",
        "360 Degree Around View Camera",
        "Heated ORVMs",
      ],
      features: [
        "Personal AI Assistant robot",
        "i-SMART with 80+ connected features",
        "3-mode electric power steering",
        "PM 2.5 air filter",
      ],
    },
    detailedSections: [
      {
        title: "Celestial Front Grille & LEDs",
        description: "The signature Celestial Chrome front grille combined with Hawkeye LED headlights gives the MG Astor a commanding premium road presence in Mumbai.",
        image: "/images/models/astor/02-exterior-image-164.jpg"
      },
      {
        title: "Personal AI Assistant Robot",
        description: "Equipped with an interactive personal AI robot sitting on the dashboard, responding to voice inputs, displaying human-like emotions, and sharing real-time Wiki search facts.",
        image: "/images/models/astor/10-dashboard-59.jpg"
      },
      {
        title: "Autonomous Level 2 Driving",
        description: "Driven by mid-range radars and advanced camera systems, featuring Adaptive Cruise Control, Lane Keep Assist, Speed Assist System, and Lane Departure Warning for first-class safety.",
        image: "/images/models/astor/01-front-left-side-47.jpg"
      }
    ],
    youtubeVideo: "https://www.youtube.com/embed/eW-eQJ4Jz_A",
    categorizedFeatures: {
      exterior: [
        { title: "CELESTIAL FRONT GRILLE", description: "Bold chrome celestial pattern design.", image: "/images/models/astor/02-exterior-image-164.jpg" },
        { title: "HAWKEYE LED HEADLAMPS", description: "Hawkeye styling for supreme clarity.", image: "/images/models/astor/08-headlight-43.jpg" },
        { title: "TURBINE ALLOY WHEELS", description: "Dynamic 17-inch alloy finishes.", image: "/images/models/astor/05-exterior-image-167.jpg" }
      ],
      safety: [
        { title: "LEVEL 2 ADAS DRIVING", description: "Active braking and lane assist.", image: "https://www.motorbeam.com/wp-content/uploads/MG-Astor-ADAS.jpeg" },
        { title: "360-DEGREE SURROUND VIEW", description: "Seamless bird's-eye view camera.", image: "/images/models/astor/16-infotainment-system-main-menu-183.jpg" }
      ],
      tech: [
        { title: "PERSONAL AI DASHBOT", description: "Interactive dashboard AI companion.", image: "/images/models/astor/10-dashboard-59.jpg" },
        { title: "CONNECTED i-SMART SUITE", description: "80+ connected features and updates.", image: "/images/models/astor/16-infotainment-system-main-menu-183.jpg" }
      ]
    },
    featureSections: [
      {
        tab: "EXTERIOR",
        icon: "car",
        items: [
          {
            title: "CELESTIAL FRONT CHROME GRILLE",
            subtitle: "Cosmic front stance design",
            description: "The Celestial front grille features dynamic chrome accents radiating outwards from the MG badge. Inspired by star formations, it creates a striking three-dimensional effect that demands attention.",
            image: "/images/models/astor/02-exterior-image-164.jpg",
            highlights: ["Radial chrome stars design", "Bold presence on highways", "Three-dimensional depth accents"]
          },
          {
            title: "HAWKEYE LED HEADLIGHTS",
            subtitle: "Razor-sharp visual projection",
            description: "Equipped with Hawkeye LED projector headlamps featuring dynamic daytime DRL brows. Renders a wide, high-contrast light beam ensuring maximum clarity in misty or dark driving conditions.",
            image: "/images/models/astor/08-headlight-43.jpg",
            highlights: ["Sleek eyebrow LED DRLs", "Automatic level adjusters", "High-intensity projector output"]
          }
        ]
      },
      {
        tab: "INTERIOR",
        icon: "seat",
        items: [
          {
            title: "PREMIUM DUAL-TONE CABIN SUITE",
            subtitle: "Crafted soft-touch luxury layout",
            description: "Adorned with high-quality Sangria Red and Dark Grey dual-tone leatherette upholstery. Crafted with soft-touch dashboard panels, elegant brushed aluminum buttons, and ergonomic steering wheel grips.",
            image: "/images/models/astor/14-door-view-of-driver-seat-51.jpg",
            highlights: ["quilted dual-tone leatherette", "Brushed metal dashboard switches", "Soft-touch materials on armrests"]
          },
          {
            title: "PANORAMIC SUNROOF",
            subtitle: "Sweeping views of sky",
            description: "The panoramic skyroof covers over 90% of the vehicle roof area, flooding the cabin with ambient daylight and creating a spacious and airy passenger environment.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI7GepKQ5MLSe9FZ8gau25wiBKLILUUbZXT9KHlxGulapn6IjmPkeOEgex&s=10",
            highlights: ["Sliding anti-pinch glass blind", "Integrated bug-mesh wind barrier", "One-touch electronic switch"]
          }
        ]
      },
      {
        tab: "AI ASSISTANT",
        icon: "cpu",
        items: [
          {
            title: "PERSONAL AI DASHBOARD ASSISTANT",
            subtitle: "Humanoid AI robot companion",
            description: "A first-in-segment humanoid robot companion sitting on the center dashboard. It turns to look at the speaker, uses visual emojis to express emotions, and processes complex voice queries through Wikipedia search databases.",
            image: "/images/models/astor/10-dashboard-59.jpg",
            highlights: ["Interactive dashbot module", "Dynamic face screen emojis", "Contextual NLP voice engine"]
          }
        ]
      },
      {
        tab: "ADAS",
        icon: "shield",
        items: [
          {
            title: "AUTONOMOUS LEVEL 2 ADAS",
            subtitle: "State-of-the-art crash mitigation",
            description: "Features a network of radars and camera sensors supporting 14 autonomous driving aids. Offers active lane alignment, emergency braking control, speed sign warnings, and adaptive tracking support.",
            image: "https://www.motorbeam.com/wp-content/uploads/MG-Astor-ADAS.jpeg",
            highlights: ["14 autonomous driving aids", "Rear Cross Traffic Alert radars", "Lane Keeping Assist alignment"]
          }
        ]
      }
    ]
  },
  {
    id: "hector",
    name: "HECTOR",
    type: "Internet SUV",
    category: "SUV",
    price: lakh(1199000),
    priceINR: 1199000,
    engine: "1.5L Turbo Petrol, 2.0L Diesel",
    transmission: "6-Speed Manual, CVT",
    fuel: "Petrol · Diesel",
    blurb: "India's first internet SUV, redefined with the bold new Aura Hex grille and immersive interior tech.",
    cta: "Explore the Hector",
    image: "/images/models/model-hector-transparent.png",
    alt: "MG Hector SUV",
    seating: "5, 6 or 7 Seater",
    mileage: "13.7 kmpl",
    bootSpace: "587 Litres",
    highlights: [
      "New Aura Hex Front Chrome Grille",
      "Largest 14-inch Portrait HD Touchscreen",
      "Dual Tone Urban Tan Interior Suite",
      "Level 2 ADAS Safety Protection",
    ],
    heroImage: "/images/models/model-hector.png",
    interiorImage: "/images/models/hector/08-dashboard-59.jpg",
    galleryImages: [
      { src: "/images/models/hector/01-front-left-side-47.jpg", caption: "MG Hector — Commanding front road posture" },
      { src: "/images/models/hector/02-exterior-image-164.jpg", caption: "Sporty front-facing road stance" },
      { src: "/images/models/hector/08-dashboard-59.jpg", caption: "Premium dashboard and 14-inch vertical display" },
      { src: "/images/models/hector/12-door-view-of-driver-seat-51.jpg", caption: "Dual Tone Urban Tan leatherette cabin seats" },
      { src: "/images/models/hector/19-sun-roof-moon-roof-81.jpg", caption: "Electrically operated panoramic sunroof view" },
      { src: "/images/models/hector/16-apple-carplay-wired-wireless-284.jpg", caption: "Wireless Apple CarPlay and infotainment display" },
      { src: "/images/models/hector/09-steering-wheel-54.jpg", caption: "Leather-wrapped multi-function steering wheel" },
      { src: "/images/models/hector/03-grille-97.jpg", caption: "Beehive Hex front chrome grille detail" },
      { src: "/images/models/hector/04-wheel-42.jpg", caption: "Dynamic multi-spoke alloy wheels" },
    ],
    colors: [
      { name: "Celadon Blue", hex: "#1a4d6e", cssFilter: "none", image: "/images/models/hector-color-celadon-blue.png" },
      { name: "Pearl White", hex: "#f9f9f9", cssFilter: "none", image: "/images/models/hector-color-pearl-white.png" },
      { name: "Glaze Red", hex: "#b81d24", cssFilter: "none", image: "/images/models/hector-color-glaze-red.png" },
      { name: "Aurora Silver", hex: "#c0c0c0", cssFilter: "none", image: "/images/models/hector-color-aurora-silver.png" },
      { name: "Starry Black", hex: "#111111", cssFilter: "none", image: "/images/models/hector-color-starry-black.png" },
    ],
    details: {
      length: "4699 mm",
      width: "1835 mm",
      height: "1760 mm",
      wheelbase: "2750 mm",
      power: "143 PS @ 5000 rpm",
      torque: "250 Nm @ 1600-3600 rpm",
      chassis: "Rigid body-on-frame platform architecture safety shell",
      suspension: "Front: MacPherson Strut with Stabilizer bar | Rear: Semi-independent Helical Spring Torsion Beam",
      brakes: "Front: Ventilated Disc | Rear: Solid Disc brakes",
      infotainment: "14-inch HD Portrait touchscreen console with Smart Boost and i-SMART connected dashboard",
      warranty: "3 Years / Unlimited km + 3 Years Roadside Assistance coverage",
      safety: [
        "Level 2 ADAS with 11 Autonomous features",
        "6 Airbags Standard across trims",
        "360 HD Camera with unique Wheel View",
        "ABS, EBD, ESP & Traction Control",
      ],
      features: [
        "14-inch Portrait HD Touchscreen console",
        "i-SWIPE Touch Gesture Control module",
        "Dual-pane panoramic sunroof",
        "Infinity sound staging (subwoofer & amp)",
      ],
    },
    detailedSections: [
      {
        title: "Aura Hex Front Grille",
        description: "The bold front signature is defined by the new Aura Hex front chrome grille, giving the MG Hector a massive road presence in Mumbai.",
        image: "/images/models/hector/03-grille-97.jpg"
      },
      {
        title: "14-inch Portrait Screen",
        description: "India's largest vertical touchscreen console, built with Smart Boost processing speed to manage i-SMART apps, music, climate control, and digital navigation.",
        image: "/images/models/hector/08-dashboard-59.jpg"
      },
      {
        title: "i-SWIPE Touch Gesture Control",
        description: "Take full control of your cabin options with intuitive i-SWIPE multi-touch gesture commands that simplify operations while driving.",
        image: "/images/models/hector/16-apple-carplay-wired-wireless-284.jpg"
      }
    ],
    youtubeVideo: "https://www.youtube.com/embed/g2J03pT9114",
    categorizedFeatures: {
      exterior: [
        { title: "AURA HEX CHROME GRILLE", description: "Elegant front-face hexagon layout design.", image: "/images/models/hector/03-grille-97.jpg" },
        { title: "AURA SCULPT BUMPERS", description: "Deep sculpted sporty visual bumpers.", image: "/images/models/hector/02-exterior-image-164.jpg" },
        { title: "AURA BOLT ALLOY WHEELS", description: "Precision styled multi-spoke sports alloys.", image: "/images/models/hector/04-wheel-42.jpg" }
      ],
      safety: [
        { title: "LEVEL 2 ADAS SAFETY", description: "Advanced active steering and collision braking safety.", image: "/images/models/hector/20-airbags-94.jpg" },
        { title: "360 HD CAMERA WHEEL VIEW", description: "Accurate wheel view monitor for tight gaps.", image: "/images/models/hector/17-parking-camera-display-136.jpg" }
      ],
      tech: [
        { title: "14-INCH SMART PORTRAIT", description: "India's largest vertical display with Smart Boost.", image: "/images/models/hector/08-dashboard-59.jpg" },
        { title: "DUAL TONE URBAN TAN", description: "Sophisticated interior finish and seat quilting.", image: "https://etimg.etb2bimg.com/photo/125974723.cms" }
      ]
    },
    featureSections: [
      {
        tab: "EXTERIOR",
        icon: "car",
        items: [
          {
            title: "AURA HEX FRONT GRILLE",
            subtitle: "Design to turn heads",
            description: "The signature Aura Hex Chrome Grille defines the bold new face of the Hector. Inspired by the hexagonal geometry of a beehive, the grille radiates a premium, commanding character that turns heads on every Mumbai street.",
            image: "/images/models/hector/03-grille-97.jpg",
            highlights: ["Hexagonal chrome pattern", "LED Headlamps with DRL", "Sculpted hood lines"]
          },
          {
            title: "DYNAMIC SIDE PROFILE",
            subtitle: "Bold & aerodynamic",
            description: "The Hector's sculpted side profile features sharp shoulder lines, a floating roof illusion, and Aura Bolt alloy wheels — creating a dynamic silhouette that's unmistakably aggressive and modern.",
            image: "/images/models/hector/01-front-left-side-47.jpg",
            highlights: ["18-inch Aura Bolt alloys", "Flush-fit door handles", "Panoramic glass roof"]
          },
          {
            title: "SPORTY REAR DESIGN",
            subtitle: "Power in every angle",
            description: "The Hector's confident rear is shaped with a full-width LED tail lamp cluster, Aura fin antenna, and a sculpted twin-tipped exhaust finish — making a statement from every angle.",
            image: "https://media.zigcdn.com/media/model/2025/Dec/rear-back-1028881429_930x620.jpg",
            highlights: ["Full-width LED tail lamps", "Aura fin antenna", "Shark-fin roof antenna"]
          },
          {
            title: "PANORAMIC SKYROOF",
            subtitle: "Open up the sky",
            description: "The electrically operated dual-pane panoramic skyroof stretches across both rows, flooding the cabin with natural light and creating an incredibly open and airy driving experience.",
            image: "/images/models/hector/19-sun-roof-moon-roof-81.jpg",
            highlights: ["Dual-pane glass", "Anti-pinch function", "UV & IR filter coating"]
          }
        ]
      },
      {
        tab: "INTERIOR",
        icon: "seat",
        items: [
          {
            title: "14-INCH PORTRAIT DISPLAY",
            subtitle: "India's largest touchscreen",
            description: "The industry-first 14-inch HD Portrait Infotainment System is India's largest in-class vertical touchscreen — powered by Smart Boost for faster response. Manage navigation, media, climate, and 80+ connected i-SMART features from one immersive screen.",
            image: "/images/models/hector/08-dashboard-59.jpg",
            highlights: ["14-inch HD Portrait display", "Smart Boost processor", "Wireless Apple CarPlay & Android Auto"]
          },
          {
            title: "DUAL TONE URBAN TAN",
            subtitle: "Inspired by modern city living",
            description: "The refreshed Dual Tone Urban Tan interior is inspired by modern city aesthetics, with Hydra Gloss Finish accents on the central console, armrest, and door trims — creating an environment that feels premium and contemporary.",
            image: "https://etimg.etb2bimg.com/photo/125974723.cms",
            highlights: ["Hydra Gloss accents", "Premium leatherette seats", "Ambient lighting system"]
          },
          {
            title: "i-SWIPE GESTURE CONTROL",
            subtitle: "Touch less, control more",
            description: "The segment-first i-SWIPE Touch Gesture Control lets you navigate key vehicle functions — media, climate, and more — with simple swipe gestures on a dedicated touch-zone without even looking away from the road.",
            image: "/images/models/hector/16-apple-carplay-wired-wireless-284.jpg",
            highlights: ["Swipe gesture navigation", "Voice command integration", "Haptic feedback controls"]
          },
          {
            title: "PREMIUM CABIN AMBIENCE",
            subtitle: "Every journey elevated",
            description: "From the soft-touch dashboard panels to the illuminated ambient strip lighting and the spacious second-row legroom, every inch of the Hector's cabin is engineered for maximum comfort and refinement.",
            image: "/images/models/hector/12-door-view-of-driver-seat-51.jpg",
            highlights: ["64-color ambient lighting", "Ventilated front seats", "Rear AC vents & USB"]
          }
        ]
      },
      {
        tab: "i-SMART",
        icon: "wifi",
        items: [
          {
            title: "80+ CONNECTED FEATURES",
            subtitle: "Always online, always smart",
            description: "The MG Hector's i-SMART suite puts over 80 connected features at your fingertips — from remote engine start and real-time location sharing to in-car hot spot and Over-The-Air (OTA) software updates, all controlled through the i-SMART app.",
            image: "/images/models/hector/08-dashboard-59.jpg",
            highlights: ["OTA software updates", "Remote engine start", "4G Wi-Fi hotspot"]
          },
          {
            title: "DIGITAL BLUETOOTH KEY",
            subtitle: "Your phone is your key",
            description: "Share your car securely with family and friends using a Digital Bluetooth Key — no physical key required. Set access schedules, speed limits, and geo-fencing alerts for full peace of mind.",
            image: "/images/models/hector/10-steering-controls-138.jpg",
            highlights: ["Keyless digital access", "Guest access scheduling", "Speed & geo-fence alerts"]
          },
          {
            title: "LIVE VEHICLE DIAGNOSTICS",
            subtitle: "Real-time health monitoring",
            description: "Get real-time diagnostics of battery health, tyre pressure, fuel efficiency, and engine status directly on the i-SMART app — so you're always informed about your Hector's condition.",
            image: "/images/models/hector/11-instrument-cluster-62.jpg",
            highlights: ["TPMS real-time alerts", "Fuel & efficiency reports", "Remote window & sunroof control"]
          }
        ]
      },
      {
        tab: "ADAS",
        icon: "shield",
        items: [
          {
            title: "LEVEL 2 ADAS SAFETY",
            subtitle: "11 autonomous systems",
            description: "The Hector's Level 2 ADAS suite integrates forward radars, cameras, and ultrasonic sensors to actively help you avoid collisions, maintain lane discipline, and control speed — making every drive safer in Mumbai's dynamic traffic.",
            image: "/images/models/hector/20-airbags-94.jpg",
            highlights: ["Adaptive Cruise Control (ACC)", "Automatic Emergency Braking (AEB)", "Lane Keep Assist (LKA)"]
          },
          {
            title: "ADAPTIVE CRUISE CONTROL",
            subtitle: "Intelligent speed management",
            description: "Adaptive Cruise Control automatically adjusts the Hector's speed to maintain a safe distance from the vehicle ahead — reducing driver fatigue on long expressway drives to Pune, Nashik, or Gujarat.",
            image: "/images/models/hector/09-steering-wheel-54.jpg",
            highlights: ["Auto speed adjustment", "Stop-and-Go traffic mode", "Speed Assist System (SAS)"]
          },
          {
            title: "LANE CHANGE ASSISTANCE",
            subtitle: "Never miss your lane",
            description: "Lane Departure Warning and Lane Keep Assist monitor road markings and alert you if you drift — while the Lane Change Assist and Blind Spot Detection warn you of vehicles in adjacent lanes before every maneuver.",
            image: "https://www.carandbike.com/_next/image?url=https%3A%2F%2Fimages.carandbike.com%2Fcar-images%2Fgallery%2Fmg%2Fhector-plus%2Fexterior%2Fmg_hector_plus_safety_3.jpg%3Fv%3D2024-08-02&w=1920&q=90",
            highlights: ["Lane Departure Warning", "Blind Spot Detection (BSD)", "Rear Cross Traffic Alert (RCTA)"]
          }
        ]
      },
      {
        tab: "SAFETY",
        icon: "airbag",
        items: [
          {
            title: "360° HD CAMERA SYSTEM",
            subtitle: "See everything, everywhere",
            description: "The 360° HD Around View Camera system stitches real-time images from four cameras into a seamless bird's-eye view — giving you unmatched visibility in tight parking spots, narrow lanes, and busy Mumbai streets. The unique Wheel View mode shows exactly where your front wheels are pointing.",
            image: "/images/models/hector/17-parking-camera-display-136.jpg",
            highlights: ["360° bird's-eye view", "Exclusive Wheel View mode", "HD front & rear cameras"]
          },
          {
            title: "6 AIRBAGS & STEEL BODY",
            subtitle: "Protecting what matters most",
            description: "The Hector comes standard with 6 airbags across all variants — front dual airbags, side curtain airbags, and front side airbags — backed by a high-tensile steel body structure engineered to absorb and redirect crash forces away from occupants.",
            image: "/images/models/hector/20-airbags-94.jpg",
            highlights: ["6 standard airbags", "High-tensile steel body", "3-point ELR seatbelts all rows"]
          },
          {
            title: "ELECTRIC PARKING BRAKE",
            subtitle: "Precision braking control",
            description: "The Electronic Parking Brake (EPB) with Auto Hold technology replaces the conventional handbrake with a one-touch operation — automatically holding the Hector on inclines and releasing smoothly when you accelerate, preventing rollback on Mumbai's steep roads.",
            image: "https://www.marketresearchintellect.com/images/blogs/driving-forward-the-rise-of-electric-parking-brake-systems-in-modern-vehicles.webp",
            highlights: ["Auto-hold on inclines", "Hill Start Assist (HSA)", "ABS + EBD + ESC"]
          }
        ]
      }
    ]
  },
  {
    id: "zs-ev",
    name: "ZS EV",
    type: "Premium Electric SUV",
    category: "Electric",
    price: lakh(1898000),
    priceINR: 1898000,
    engine: "50.3 kWh Battery, 176 PS Motor",
    transmission: "Automatic",
    fuel: "Electric",
    blurb: "The premium electric SUV delivering clean style, Level 2 ADAS safety, and long range electric performance.",
    cta: "Explore ZS EV",
    image: "/images/models/model-zs-ev-transparent.png",
    alt: "MG ZS EV SUV",
    seating: "5 Seater",
    mileage: "461 km Range*",
    bootSpace: "448 Litres",
    highlights: [
      "Level 2 ADAS with 11 advanced systems",
      "360 Degree View Camera",
      "Wireless Phone Charging & Digital Key",
      "Full digital instrument cluster",
    ],
    heroImage: "/images/models/model-zs-ev.png",
    interiorImage: "/images/models/zs-ev/15-dashboard-59.jpg",
    galleryImages: [
      { src: "/images/models/zs-ev/01-front-left-side-47.jpg", caption: "MG ZS EV — Commanding front road posture" },
      { src: "/images/models/zs-ev/03-side-view-left-90.jpg", caption: "Sleek and aerodynamic side silhouette" },
      { src: "/images/models/zs-ev/15-dashboard-59.jpg", caption: "Premium high-tech cockpit layout" },
      { src: "/images/models/zs-ev/18-seats-aerial-view-53.jpg", caption: "Spacious dual-tone interior seats" },
      { src: "/images/models/zs-ev/26-sun-roof-moon-roof-81.jpg", caption: "Panoramic dual-pane sunroof cabin view" },
      { src: "/images/models/zs-ev/23-infotainment-system-main-menu-183.jpg", caption: "10.1-inch HD responsive touchscreen display" },
      { src: "/images/models/zs-ev/16-steering-wheel-54.jpg", caption: "Leather-wrapped multi-function steering wheel" },
      { src: "/images/models/zs-ev/07-grille-97.jpg", caption: "Closed aerodynamic front grille design" },
      { src: "/images/models/zs-ev/08-wheel-42.jpg", caption: "Dynamic 17-inch Tomahawk alloy wheels" },
    ],
    colors: [
      { name: "Candy White", hex: "#ffffff", cssFilter: "none", image: "/images/models/zs-color-4.png" },
      { name: "Aurora Silver", hex: "#c0c0c0", cssFilter: "none", image: "/images/models/zs-color-2.png" },
      { name: "Glaze Red", hex: "#b81d24", cssFilter: "none", image: "/images/models/zs-color-1.png" },
      { name: "Starry Black", hex: "#111111", cssFilter: "none", image: "/images/models/zs-color-3.png" },
    ],
    details: {
      length: "4323 mm",
      width: "1809 mm",
      height: "1649 mm",
      wheelbase: "2585 mm",
      power: "176 PS",
      torque: "280 Nm",
      battery: "50.3 kWh Prismatic Cell LFP",
      acceleration: "0-100 km/h in 8.5 seconds",
      chassis: "Enhanced battery-integrated safety cage steel monocoque structure",
      suspension: "Front: MacPherson Strut | Rear: Torsion Beam suspension system",
      brakes: "Front: Disc | Rear: Disc with smart energy regeneration brakes",
      infotainment: "10.1-inch HD touchscreen console with connected car apps and electric diagnostic screen",
      warranty: "5 Years / 150,000 km vehicle warranty + 8 Years battery pack coverage",
      safety: [
        "6 Airbags",
        "Lane Keep Assist & Adaptive Cruise Control",
        "Blind Spot Detection (BSD)",
        "Rear Cross Traffic Alert",
      ],
      features: [
        "10.1-inch HD touchscreen display",
        "Digital Bluetooth Key",
        "PM 2.5 Air Purifier",
        "Dual-pane panoramic skyroof",
      ],
    },
    detailedSections: [
      {
        title: "Dual-Pane Skyroof & Space",
        description: "Offers a wide dual-pane panoramic skyroof that fills the premium cabin with light, creating an airy and highly spacious luxury experience.",
        image: "/images/models/zs-ev/26-sun-roof-moon-roof-81.jpg"
      },
      {
        title: "50.3 kWh Advanced Battery",
        description: "Equipped with a prismatic LFP cell battery pack, certified under IP67 water/dust standards, offering long-term reliability and 461km of range.",
        image: "/images/models/zs-ev/11-gas-cap-open-77.jpg"
      },
      {
        title: "ADAS Active Crash Prevention",
        description: "State-of-the-art camera and radar integration monitors road markings, warns of pedestrians, alerts blind spots, and auto-brakes in emergency conditions.",
        image: "/images/models/zs-ev/28-airbags-94.jpg"
      }
    ],
    youtubeVideo: "https://www.youtube.com/embed/41f1q3-6n48",
    categorizedFeatures: {
      exterior: [
        { title: "AERODYNAMIC FRONT DESIGN", description: "Sporty closed-off grille aesthetics.", image: "/images/models/zs-ev/07-grille-97.jpg" },
        { title: "LED HEADLAMPS", description: "Sleek eye-shaped dynamic LED projection units.", image: "/images/models/zs-ev/12-headlight-43.jpg" },
        { title: "17-INCH SPORTS ALLOYS", description: "Aerodynamically optimized multi-spoke wheel design.", image: "/images/models/zs-ev/08-wheel-42.jpg" }
      ],
      safety: [
        { title: "BLIND SPOT SENSORS", description: "Warns of flanking vehicles in real-time.", image: "/images/models/zs-ev/09-side-mirror-body-93.jpg" },
        { title: "360 HD PARKING CAMERA", description: "Synthetic overhead bird's-eye parking assist view.", image: "/images/models/zs-ev/23-infotainment-system-main-menu-183.jpg" }
      ],
      tech: [
        { title: "FULL DIGITAL DASH", description: "Crisp dynamic instrumentation screen.", image: "/images/models/zs-ev/15-dashboard-59.jpg" },
        { title: "10.1-INCH TOUCHSCREEN", description: "High responsiveness screen with connected media.", image: "/images/models/zs-ev/23-infotainment-system-main-menu-183.jpg" }
      ]
    },
    featureSections: [
      {
        tab: "EXTERIOR",
        icon: "car",
        items: [
          {
            title: "AERODYNAMIC CLOSED FRONT GRILLE",
            subtitle: "Futuristic & efficient",
            description: "The ZS EV features a sleek, closed-off front grille design that reduces drag and maximizes electric efficiency. The integrated charging port is cleanly hidden behind the iconic MG badge, combining utility with clean aesthetics.",
            image: "/images/models/zs-ev/07-grille-97.jpg",
            highlights: ["Closed aerodynamic grille", "Hidden front charging port", "Plush body lines"]
          },
          {
            title: "17-INCH TOMAHAWK ALLOY WHEELS",
            subtitle: "Designed for efficiency",
            description: "Equipped with lightweight 17-inch Tomahawk alloy wheels that feature aerodynamic blade inserts. These inserts minimize air turbulence around the wheels, helping extend your driving range in city commutes.",
            image: "/images/models/zs-ev/08-wheel-42.jpg",
            highlights: ["Aerodynamic blade inserts", "215/55 R17 profile tyres", "Low rolling resistance design"]
          },
          {
            title: "HAWKEYE LED HEADLAMPS",
            subtitle: "Sharp visibility on road",
            description: "The Hawkeye LED headlamps feature signature Daytime Running Lights (DRLs) that frame the front face of the ZS EV, casting a wide and brilliant beam to illuminate dark stretches of road.",
            image: "/images/models/zs-ev/12-headlight-43.jpg",
            highlights: ["Hawk-eye daytime DRLs", "Automatic light sensing", "Follow-me-home headlight delay"]
          },
          {
            title: "SPORTY REAR STANCE",
            subtitle: "Clean and bold rear details",
            description: "The rear design of the ZS EV features a sculpted tailgate with integrated rear spoiler, modern LED light guide tail lamps, and a sporty dual-tone rear bumper diffuser.",
            image: "/images/models/zs-ev/04-rear-view-119.jpg",
            highlights: ["Kinetic LED light guide tail lamps", "Integrated sporty rear spoiler", "Dynamic rear bumper design"]
          }
        ]
      },
      {
        tab: "INTERIOR",
        icon: "seat",
        items: [
          {
            title: "ICONIC IVORY DUAL-TONE CABIN",
            subtitle: "First-class cabin comfort",
            description: "The interior is finished in a premium Ivory and Dark Grey dual-tone color theme. Crafted with soft-touch materials, carbon-fiber textures, and contrast stitching to elevate your daily drives.",
            image: "/images/models/zs-ev/18-seats-aerial-view-53.jpg",
            highlights: ["Ivory & Dark Grey contrast theme", "Carbon-fiber dashboard accents", "Soft-touch leatherette upholstery"]
          },
          {
            title: "10.1-INCH TOUCHSCREEN CONSOLE",
            subtitle: "Responsive command center",
            description: "A wide-aspect 10.1-inch high-definition screen sits in the center of the dashboard. Manage your EV diagnostics, maps, Apple CarPlay, Android Auto, and climate controls with ease.",
            image: "/images/models/zs-ev/23-infotainment-system-main-menu-183.jpg",
            highlights: ["10.1-inch HD wide panel", "EV power-flow metrics dashboard", "Seamless smartphone replication"]
          },
          {
            title: "FULL DIGITAL INSTRUMENT CLUSTER",
            subtitle: "All details at a glance",
            description: "Ditch the analog dials. The ZS EV has a 7-inch digital screen behind the steering wheel showing real-time speed, battery percentage, active regenerations, and ADAS alerts.",
            image: "/images/models/zs-ev/15-dashboard-59.jpg",
            highlights: ["7-inch high resolution cluster", "Real-time regenerative braking meters", "ADAS safety indicator symbols"]
          },
          {
            title: "PM 2.5 HEALTH AIR PURIFIER",
            subtitle: "Breathe clean air",
            description: "The integrated PM 2.5 air purification system filters out smoke, dust, and pollen, ensuring the cabin air remains clean and fresh throughout your journey.",
            image: "/images/models/zs-ev/24-front-air-vents-144.jpg",
            highlights: ["High-efficiency particulate filter", "Real-time cabin air index indicator", "Quiet automatic operation mode"]
          }
        ]
      },
      {
        tab: "i-SMART",
        icon: "wifi",
        items: [
          {
            title: "75+ CONNECTED SMART FEATURES",
            subtitle: "Next-gen connectivity suite",
            description: "The premium i-SMART suite provides over 75 connected features. Control lock/unlock, check charging progress, set boundaries, and pre-cool the cabin remotely through the mobile application.",
            image: "/images/models/zs-ev/23-infotainment-system-main-menu-183.jpg",
            highlights: ["i-SMART mobile remote app", "Pre-cool cabin temperature controls", "Live tracking & geo-fencing limits"]
          },
          {
            title: "DIGITAL BLUETOOTH KEY",
            subtitle: "Drive keyless with phone",
            description: "Activate your ZS EV and drive away using only your smartphone. The Digital Bluetooth Key uses secure signals to authenticate and unlock your vehicle without standard keys.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5DJKeL_tzQjW-S-GcqTEJPG7hp5lo-JTMBoQf81BsjdzPWq2Q024Cwc4&s=10",
            highlights: ["Secure Bluetooth authorization", "Physical keyless convenience", "Safe digital key sharing option"]
          }
        ]
      },
      {
        tab: "ADAS",
        icon: "shield",
        items: [
          {
            title: "LEVEL 2 ADAS AUTOMATION",
            subtitle: "Intelligent driving systems",
            description: "Level 2 Advanced Driver Assistance System uses high-definition camera arrays and forward radar systems to actively guide, decelerate, and guard the ZS EV on open roads.",
            image: "https://images.here.com/x7rx8ayph7ee/78eb921e-37f5-49ee-bec4-e9f059a80333/e1c6a3a71a852e416cea3608dbbaf135/adas-driverless-car-blog.jpg?w=827&q=80&fm=webp",
            highlights: ["Lane Departure Warning (LDW)", "Emergency Lane Keep (ELK)", "Forward Collision Warning (FCW)"]
          },
          {
            title: "BLIND SPOT DETECTION",
            subtitle: "Extra set of eyes on side",
            description: "Side radar sensors constantly check your blind spots. Indicator lights on the side mirrors light up if a vehicle is passing in adjacent lanes.",
            image: "/images/models/zs-ev/09-side-mirror-body-93.jpg",
            highlights: ["Rear side radar sensors", "Side mirror visual indicators", "Rear Cross Traffic Alert alerts"]
          }
        ]
      },
      {
        tab: "SAFETY",
        icon: "airbag",
        items: [
          {
            title: "360-DEGREE VIEW CAMERA",
            subtitle: "Park with absolute ease",
            description: "The 360-degree Around View Camera stitches footage from four wide-angle lenses to render an overhead bird's-eye view, making tight parking spots simple to navigate.",
            image: "https://spn-sta.spinny.com/blog/20230818204705/360_camera-1160x653.webp?compress=true&quality=80&w=1200&dpr=2.6",
            highlights: ["Four dynamic HD cameras", "Synthesized top-down view grid", "Dynamic guidelines indicator"]
          },
          {
            title: "6 AIRBAGS STANDARD SAFETY",
            subtitle: "Full-cabin impact cushion",
            description: "Equipped with six impact airbags standard — dual front, side, and full-length curtain airbags — providing wrap-around protection in crash events.",
            image: "/images/models/zs-ev/28-airbags-94.jpg",
            highlights: ["6 multi-stage SRS airbags", "High-strength steel monocoque frame", "IP67 dust & water proof battery pack"]
          }
        ]
      }
    ]
  },
  {
    id: "windsor-ev",
    name: "WINDSOR EV",
    type: "Business Class CUV",
    category: "Electric",
    price: lakh(1349800),
    priceINR: 1349800,
    engine: "38 kWh Battery, 136 PS Motor",
    transmission: "Automatic",
    fuel: "Electric",
    blurb: "India's first CUV, combining the luxury of a sedan with the spaciousness of an SUV.",
    cta: "Explore Windsor EV",
    image: "/images/models/model-windsor-transparent.png",
    alt: "MG Windsor EV crossover",
    seating: "5 Seater",
    mileage: "331 km Range*",
    bootSpace: "604 Litres",
    highlights: [
      "135 Degree Aero Lounge Seats",
      "15.6-inch Grand Portrait Touchscreen",
      "Smart Connectivity with i-SMART",
      "9-Speaker Infinity Audio System",
    ],
    heroImage: "/images/models/model-windsor.png",
    interiorImage: "/images/models/windsor-ev/40-dashboard-59.jpg",
    galleryImages: [
      { src: "/images/models/windsor-ev/01-front-left-side-47.jpg", caption: "MG Windsor EV — Commanding front road posture" },
      { src: "/images/models/windsor-ev/03-side-view-left-90.jpg", caption: "Sleek aerodynamic side silhouette" },
      { src: "/images/models/windsor-ev/40-dashboard-59.jpg", caption: "Premium high-tech cockpit dashboard layout" },
      { src: "/images/models/windsor-ev/56-rear-seats-52.jpg", caption: "Spacious business class 135-degree lounge rear seats" },
      { src: "/images/models/windsor-ev/82-sun-roof-moon-roof-81.jpg", caption: "Infinity-view premium glass skyroof" },
      { src: "/images/models/windsor-ev/69-infotainment-system-main-menu-183.jpg", caption: "15.6-inch grand touchscreen display menu" },
      { src: "/images/models/windsor-ev/41-steering-wheel-54.jpg", caption: "Leather-wrapped multi-function steering wheel" },
      { src: "/images/models/windsor-ev/13-grille-97.jpg", caption: "Aerodynamically optimized front grille design" },
      { src: "/images/models/windsor-ev/16-wheel-42.jpg", caption: "Dynamic 18-inch aerodynamic alloy wheels" },
    ],
    colors: [
      { name: "Clay Beige", hex: "#bba895", cssFilter: "none", image: "/images/models/windsor-ev/99-turquoise-green-2d4047.jpg" }, // using a valid color placeholder
      { name: "Turquoise Green", hex: "#005952", cssFilter: "none", image: "/images/models/windsor-ev/99-turquoise-green-2d4047.jpg" },
      { name: "Pearl White", hex: "#f3f4f6", cssFilter: "none", image: "/images/models/windsor-ev/97-223-pearl-white-c0c0c0.jpg" },
      { name: "Starry Black", hex: "#111111", cssFilter: "none", image: "/images/models/windsor-ev/98-starburst-black-000000.jpg" },
    ],
    details: {
      length: "4300 mm",
      width: "1850 mm",
      height: "1675 mm",
      wheelbase: "2700 mm",
      power: "136 PS",
      torque: "200 Nm",
      battery: "38 kWh battery pack",
      chassis: "Pure Electric Crossover Architecture frame structural design",
      suspension: "Front: MacPherson Strut | Rear: Semi-Independent suspension package",
      brakes: "Front: Disc | Rear: Disc with electronic parking brakes",
      infotainment: "15.6-inch Grand View Touchscreen console running i-SMART media suite",
      warranty: "3 Years / Unlimited km + Lifetime battery warranty for first original owners",
      safety: [
        "6 Airbags",
        "Electronic Stability Program (ESP)",
        "360 Surround View Camera",
        "Hill Start Assist & Descent Control",
      ],
      features: [
        "135 degree backseat recline",
        "15.6-inch Grand View Touchscreen",
        "Bubbled Leatherette seat upholstery",
        "Infinity Premium Speaker suite",
      ],
    },
    detailedSections: [
      {
        title: "135° Reclining Aero Lounge",
        description: "Re-defines rear seat passenger space by offering airline-style 135-degree lounge reclines, finished in premium quilted bubbled leatherette.",
        image: "/images/models/windsor-ev/56-rear-seats-52.jpg"
      },
      {
        title: "15.6-inch Grand Portrait Screen",
        description: "An absolute visual focal point, managing connected vehicle operations, entertainment, climate configurations, and i-SMART services in full HD.",
        image: "/images/models/windsor-ev/69-infotainment-system-main-menu-183.jpg"
      },
      {
        title: "Premium 9-Speaker Infinity Audio",
        description: "Designed in collaboration with Infinity, the 9-speaker soundstage renders rich acoustics, punchy bass, and true cinema sound within the silent electric cabin.",
        image: "/images/models/windsor-ev/73-speakers-58.jpg"
      }
    ],
    youtubeVideo: "https://www.youtube.com/embed/T656965E5xU",
    categorizedFeatures: {
      exterior: [
        { title: "AERODYNAMIC CUV POSTURE", description: "Smooth drag-reducing cross silhouette.", image: "/images/models/windsor-ev/03-side-view-left-90.jpg" }
      ],
      safety: [
        { title: "360 HD CAMERA SUITE", description: "Full 3D perimeter surround monitoring.", image: "/images/models/windsor-ev/37-360-camera-front-249.jpg" }
      ],
      tech: [
        { title: "135-DEGREE AERO LOUNGE", description: "Quilted airline recliner seating comfort.", image: "/images/models/windsor-ev/56-rear-seats-52.jpg" },
        { title: "15.6-INCH GRAND VIEW SCREEN", description: "High definition centralized command.", image: "/images/models/windsor-ev/69-infotainment-system-main-menu-183.jpg" }
      ]
    },
    featureSections: [
      {
        tab: "EXTERIOR",
        icon: "car",
        items: [
          {
            title: "AEROGLIDE EXTERIOR SILHOUETTE",
            subtitle: "Futuristic crossover aesthetics",
            description: "The Windsor EV features a unique AeroGlide silhouette, blending SUV styling with MPV space. Its low drag coefficient maximizes battery range and runs silently on highway commutes.",
            image: "/images/models/windsor-ev/03-side-view-left-90.jpg",
            highlights: ["Futuristic CUV styling", "Low rolling resistance tyres", "Concealed door handles design"]
          },
          {
            title: "LED LIGHT GUIDE SYSTEM",
            subtitle: "Illuminating road presence",
            description: "Equipped with thin-strip LED daytime running lights sweep across the front bonnet, coupled with vertical LED projection headlights providing great visibility.",
            image: "/images/models/windsor-ev/27-drl-237.jpg",
            highlights: ["Bonnet-sweeping LED lightbar", "Vertical headlight projection", "Dynamic tail lamp guide"]
          }
        ]
      },
      {
        tab: "INTERIOR",
        icon: "seat",
        items: [
          {
            title: "135° RECLINING AERO LOUNGE SEATS",
            subtitle: "First-class cabin comfort",
            description: "Relax in airline-style luxury. The rear seats recline up to 135 degrees, helping rear-seat passengers rest during long road trips.",
            image: "/images/models/windsor-ev/56-rear-seats-52.jpg",
            highlights: ["135-degree lounge reclines", "Bubbled quilted leatherette", "Extra-wide central armrest"]
          },
          {
            title: "INFINITY-VIEW GLASS ROOF",
            subtitle: "Expansive overhead sky ceiling",
            description: "The wide-aspect panoramic glass roof floods the cabin with natural light, offering a sweeping sky view for all passengers.",
            image: "/images/models/windsor-ev/82-sun-roof-moon-roof-81.jpg",
            highlights: ["Infinity view dual pane glass", "Integrated electric sun blind", "UVR protection coating"]
          }
        ]
      },
      {
        tab: "i-SMART",
        icon: "wifi",
        items: [
          {
            title: "15.6-INCH GRANDVIEW TOUCHSCREEN",
            subtitle: "Tablet-like infotainment cockpit",
            description: "A gigantic 15.6-inch touchscreen panel handles all entertainment, connected i-SMART applications, electric vehicle metrics, and climate control.",
            image: "/images/models/windsor-ev/69-infotainment-system-main-menu-183.jpg",
            highlights: ["15.6-inch HD screen console", "i-SMART app store ecosystem", "Wireless Apple & Android replication"]
          }
        ]
      },
      {
        tab: "SAFETY",
        icon: "shield",
        items: [
          {
            title: "360 SURROUND CAMERA MONITOR",
            subtitle: "Synthetic top-down parking guide",
            description: "Four wide-angle cameras generate a seamless 3D overhead perimeter view of the Windsor EV, making urban parking simple and safe.",
            image: "/images/models/windsor-ev/37-360-camera-front-249.jpg",
            highlights: ["Four dynamic HD cameras", "Synthesized 3D surrounding map", "Rear obstacle warnings"]
          }
        ]
      }
    ]
  },
  {
    id: "comet-ev",
    name: "COMET EV",
    type: "Smart City Hatchback",
    category: "Hatchback",
    price: lakh(699000),
    priceINR: 699000,
    engine: "17.3 kWh Battery, 42 PS Motor",
    transmission: "Automatic",
    fuel: "Electric",
    blurb: "Ultra-compact smart urban hatchback, designed for easy city parking and emission-free transit.",
    cta: "Explore Comet EV",
    image: "/images/models/model-comet-ev-transparent.png",
    alt: "MG Comet EV",
    seating: "4 Seater",
    mileage: "230 km Range*",
    bootSpace: "150 Litres",
    highlights: [
      "Compact 2.9m length, tight turning radius",
      "Dual 10.25-inch screen cluster layout",
      "Connected Car Tech with keyless start",
      "Fast home charging setup",
    ],
    heroImage: "/images/models/model-comet-ev.png",
    interiorImage: "/images/models/comet-ev/21-dashboard-59.jpg",
    galleryImages: [
      { src: "/images/models/comet-ev/01-front-left-side-47.jpg", caption: "MG Comet EV — Commanding front road posture" },
      { src: "/images/models/comet-ev/03-side-view-left-90.jpg", caption: "Sleek aerodynamic side profile" },
      { src: "/images/models/comet-ev/21-dashboard-59.jpg", caption: "Modern high-tech dual-screen cockpit dashboard layout" },
      { src: "/images/models/comet-ev/25-door-view-of-driver-seat-51.jpg", caption: "Spacious and modern front passenger cabin" },
      { src: "/images/models/comet-ev/26-rear-seats-52.jpg", caption: "Space-optimized rear passenger seats" },
      { src: "/images/models/comet-ev/31-infotainment-system-main-menu-183.jpg", caption: "10.25-inch high-resolution touchscreen menu" },
      { src: "/images/models/comet-ev/22-steering-wheel-54.jpg", caption: "Multi-function steering wheel with smart controls" },
      { src: "/images/models/comet-ev/13-grille-97.jpg", caption: "Front fascia with illuminated badge and LED light bar" },
      { src: "/images/models/comet-ev/14-wheel-42.jpg", caption: "Stylized urban alloy wheels" },
    ],
    colors: [
      { name: "Apple Green / Black", hex: "#7fff00", cssFilter: "none", image: "/images/models/comet-ev/38-green-with-black-sunroof-98ca31.jpg" },
      { name: "Candy White", hex: "#ffffff", cssFilter: "none", image: "/images/models/comet-ev/42-candy-white-e0dfe4.jpg" },
      { name: "Aurora Silver", hex: "#cccccc", cssFilter: "none", image: "/images/models/comet-ev/40-aurora-silver-8e929a.jpg" },
      { name: "Starry Black", hex: "#111111", cssFilter: "none", image: "/images/models/comet-ev/39-starry-black-292929.jpg" },
    ],
    details: {
      length: "2974 mm",
      width: "1505 mm",
      height: "1640 mm",
      wheelbase: "2010 mm",
      power: "42 PS",
      torque: "110 Nm",
      battery: "17.3 kWh IP67 certified battery",
      chassis: "High-strength city passenger safety cell cage architecture",
      suspension: "Front: MacPherson Strut | Rear: Multi-link Coil Spring suspension",
      brakes: "Front: Disc | Rear: Drum with regenerative energy recovery",
      infotainment: "Dual 10.25-inch integrated high-resolution screen panel console",
      warranty: "3 Years / 100,000 km warranty + 8 Years battery pack coverage program",
      safety: [
        "Dual Front Airbags",
        "Rear Parking Sensors & Camera",
        "ISOFIX Child Seat Anchors",
        "ABS with EBD",
      ],
      features: [
        "Dual 10.25-inch integrated screens",
        "Smart Start system (no start button)",
        "Over-The-Air (OTA) updates support",
        "Digital Bluetooth Key sharing",
      ],
    },
    detailedSections: [
      {
        title: "Ultra-Compact City Form",
        description: "Measuring just 2.9 meters long with a tight 4.2-meter turning radius, the Comet EV navigates narrow traffic lines and tight parking spaces effortlessly.",
        image: "/images/models/comet-ev/03-side-view-left-90.jpg"
      },
      {
        title: "Dual 10.25-inch Screens",
        description: "Integrates a wide screen setup containing a digital driver dashboard and a high-resolution central infotainment screen supporting custom widgets.",
        image: "/images/models/comet-ev/31-infotainment-system-main-menu-183.jpg"
      },
      {
        title: "Digital Bluetooth Key Sharing",
        description: "Share access to your vehicle securely with friends or family members using the i-SMART mobile application, eliminating physical keys completely.",
        image: "/images/models/comet-ev/36-key-79.jpg"
      }
    ],
    youtubeVideo: "https://www.youtube.com/embed/yF8z2fD35P0",
    categorizedFeatures: {
      exterior: [
        { title: "SMART COMPACT PROFILE", description: "Boxy mini-styling built for dense cities.", image: "/images/models/comet-ev/03-side-view-left-90.jpg" }
      ],
      safety: [
        { title: "DUAL FRONT AIRBAGS", description: "Reliable SRS active airbag units.", image: "/images/models/comet-ev/21-dashboard-59.jpg" }
      ],
      tech: [
        { title: "DUAL 10.25-INCH INTERFACE", description: "Curved digital display cluster panels.", image: "/images/comet/cm-img-dsc-0143.png" }
      ]
    },
    featureSections: [
      {
        tab: "EXTERIOR",
        icon: "car",
        items: [
          {
            title: "SMART URBAN BODY PROFILE",
            subtitle: "Optimized city parking layout",
            description: "The Comet EV measures under 3 meters, making it the easiest car in Mumbai to park and filter through dense urban traffic lanes.",
            image: "/images/models/comet-ev/03-side-view-left-90.jpg",
            highlights: ["2.9-meter overall length", "Tight 4.2m turning radius", "Aerodynamic vertical glasshouse"]
          },
          {
            title: "ILLUMINATED FRONT EMBLEM",
            subtitle: "Modern visual signature",
            description: "An elegant illuminated MG badge sits at the center of the front charging flap, flanked by a sweeping high-contrast LED lightbar.",
            image: "/images/models/comet-ev/13-grille-97.jpg",
            highlights: ["Illuminated central MG emblem", "Bonnet-wide LED daytime runner", "Futuristic split-lamp details"]
          }
        ]
      },
      {
        tab: "INTERIOR",
        icon: "seat",
        items: [
          {
            title: "DUAL 10.25-INCH FLOATING COCKPIT",
            subtitle: "Tech-focused driver layout",
            description: "A gorgeous single-pane curved glass panel houses two 10.25-inch high-resolution displays for digital instruments and media navigation.",
            image: "/images/models/comet-ev/21-dashboard-59.jpg",
            highlights: ["Dual 10.25-inch digital screens", "Dynamic interface widgets", "Responsive voice-assistant support"]
          },
          {
            title: "SPACE-OPTIMIZED CABIN",
            subtitle: "First-class passenger space",
            description: "Built on a dedicated electric platform with wheels pushed to the corners, providing a surprisingly spacious flat-floor passenger cabin.",
            image: "/images/models/comet-ev/25-door-view-of-driver-seat-51.jpg",
            highlights: ["Flat cabin floor design", "50:50 split rear seats", "Modern bright-tone upholstery"]
          }
        ]
      },
      {
        tab: "i-SMART",
        icon: "wifi",
        items: [
          {
            title: "KEYLESS SMART START",
            subtitle: "Walk in and drive off",
            description: "The Comet EV requires no starter button. Securely unlock with your phone or remote, step inside, press the brake, and shift into Drive.",
            image: "/images/models/comet-ev/22-steering-wheel-54.jpg",
            highlights: ["No starter button keyway", "Digital Bluetooth key auth", "Live telemetry monitoring"]
          }
        ]
      },
      {
        tab: "SAFETY",
        icon: "shield",
        items: [
          {
            title: "SAFETY CAGE FRAME PROTECTION",
            subtitle: "High strength steel cage",
            description: "Built with a high proportion of high-tensile hot-stamped steel, wrapping around the passenger cabin for excellent impact defense.",
            image: "/images/models/comet-ev/01-front-left-side-47.jpg",
            highlights: ["High-strength steel safety cage", "IP67 dust & water proof battery", "Dual front SRS airbags standard"]
          }
        ]
      }
    ]
  },
  {
    id: "majestor",
    name: "MAJESTOR",
    type: "Premium Luxury SUV",
    category: "SUV",
    price: lakh(4099000),
    priceINR: 4099000,
    engine: "2.0L Twin-Turbo Diesel Engine",
    transmission: "8-Speed Automatic (AT)",
    fuel: "Diesel",
    blurb: "A new level of power & presence. The ultimate premium luxury SUV commanding respect on all roads.",
    cta: "Explore the Majestor",
    image: "/images/models/model-majestor-transparent.png",
    alt: "MG Majestor SUV",
    seating: "7 Seater",
    mileage: "12.4 kmpl",
    bootSpace: "343 Litres",
    highlights: [
      "Level 2 ADAS (Advanced Driver Assistance System)",
      "2.0L Twin Turbocharged Diesel (215.5 PS)",
      "70+ Next-Gen Connected Features",
      "Panoramic Sunroof & Massaging Seats",
    ],
    heroImage: "/images/models/model-majestor.png",
    interiorImage: "/images/models/majestor/52-dashboard-59.jpg",
    galleryImages: [
      { src: "/images/models/majestor/01-front-left-side-47.jpg", caption: "MG Majestor — Commanding front road posture" },
      { src: "/images/models/majestor/03-side-view-left-90.jpg", caption: "Sleek aerodynamic side profile" },
      { src: "/images/models/majestor/52-dashboard-59.jpg", caption: "Premium high-tech cockpit dashboard layout" },
      { src: "/images/models/majestor/65-door-view-of-driver-seat-51.jpg", caption: "Luxury leatherette driver captain seat" },
      { src: "/images/models/majestor/72-rear-seats-52.jpg", caption: "Spacious business class second-row captain seats" },
      { src: "/images/models/majestor/90-infotainment-system-main-menu-183.jpg", caption: "12.3-inch high-resolution touchscreen display menu" },
      { src: "/images/models/majestor/55-steering-wheel-54.jpg", caption: "Leather-wrapped multi-function steering wheel" },
      { src: "/images/models/majestor/09-grille-97.jpg", caption: "Bold chrome front grille design" },
      { src: "/images/models/majestor/13-wheel-42.jpg", caption: "Dynamic multi-spoke alloy wheels" },
    ],
    colors: [
      { name: "Pearl White", hex: "#ffffff", cssFilter: "none", image: "/images/models/majestor/140-pearl-white-edefef.jpg" },
      { name: "Concrete Grey", hex: "#7e8285", cssFilter: "none", image: "/images/models/majestor/141-concrete-grey-5c616a.jpg" },
      { name: "Metal Black", hex: "#111111", cssFilter: "none", image: "/images/models/majestor/139-black-metal-0b0c0c.jpg" },
      { name: "Metal Ash", hex: "#4f5459", cssFilter: "none", image: "/images/models/majestor/142-black-ash-2a2a2a.jpg" },
    ],
    details: {
      length: "4985 mm",
      width: "1926 mm",
      height: "1867 mm",
      wheelbase: "2950 mm",
      power: "215.5 PS @ 4000 rpm",
      torque: "480 Nm @ 1500-2400 rpm",
      chassis: "Heavy-duty ladder frame body-on-frame structural steel chassis safety frame",
      suspension: "Front: Double Wishbone suspension | Rear: Five-link Integral suspension system",
      brakes: "Front: Ventilated Disc | Rear: Ventilated Disc brakes",
      infotainment: "12.3-inch HD Touchscreen console with premium i-SMART 2.0 connected app store",
      warranty: "3 Years / 100,000 km warranty coverage program protection",
      safety: [
        "6 Airbags & ESP",
        "Adaptive Cruise Control & Forward Collision Warning",
        "Automatic Emergency Braking (AEB)",
        "Lane Keep Assist",
      ],
      features: [
        "12-way power adjustable driver seat",
        "Heating, ventilation & massage seats",
        "Three-zone climate control setup",
        "12-speaker premium sound package",
      ],
    },
    detailedSections: [
      {
        title: "2.0L Twin-Turbo Diesel Power",
        description: "Renders massive performance with a high-power twin-turbo diesel engine delivering 215.5 PS and 480 Nm torque, managed by a smart 8-speed automatic box.",
        image: "/images/models/majestor/03-side-view-left-90.jpg"
      },
      {
        title: "Ventilated & Massaging Seats",
        description: "Elevates luxury with multi-massage patterns, driver seat memory storage, and three-stage heating/cooling vents to tackle extreme Mumbai climates.",
        image: "/images/models/majestor/125-ventilated-seat-close-up-305.jpg"
      },
      {
        title: "All-Terrain System (ATS)",
        description: "Tackle off-road challenges using a high-tech terrain mode system with 7 custom driving states (Snow, Mud, Sand, Eco, Sport, Auto, Rock).",
        image: "/images/models/majestor/57-configuration-selector-knob-140.jpg"
      }
    ],
    youtubeVideo: "https://www.youtube.com/embed/5F_S7y6O2zE",
    categorizedFeatures: {
      exterior: [
        { title: "LARGE FRONT CHROME GRILLE", description: "Bold chrome visual lines defining front posture.", image: "/images/models/majestor/09-grille-97.jpg" },
        { title: "VERTICALLY STACKED LED HEADLAMPS", description: "Sleek vertical stacked headlights.", image: "/images/models/majestor/29-headlight-43.jpg" },
        { title: "EYEBROW LED DRLS", description: "Distinct signature DRL eyebrows.", image: "/images/models/majestor/28-drl-237.jpg" }
      ],
      safety: [
        { title: "LEVEL 2 ADAS PACKAGE", description: "Advanced active steering and collision braking safety.", image: "/images/models/majestor/132-adas-menu-316.jpg" },
        { title: "THREE LOCKING DIFFERENTIALS", description: "High traction off-road differential locks.", image: "/images/models/majestor/57-configuration-selector-knob-140.jpg" }
      ],
      tech: [
        { title: "MULTI-FUNCTION STEERING WHEEL", description: "Telescopic steering with integrated console controls.", image: "/images/models/majestor/55-steering-wheel-54.jpg" },
        { title: "12-SPEAKER PREMIUM JBL SOUND", description: "Cinematic audio staging across 12 high-fidelity speakers.", image: "/images/models/majestor/96-speakers-58.jpg" },
        { title: "M-LOUNGE MASSAGING SEATS", description: "Airline first-class massage seats.", image: "/images/models/majestor/125-ventilated-seat-close-up-305.jpg" }
      ]
    },
    featureSections: [
      {
        tab: "EXTERIOR",
        icon: "car",
        items: [
          {
            title: "OCTAGONAL FRONT CHROMED GRILLE",
            subtitle: "Dominating off-road visual lines",
            description: "An incredibly large octagonal chrome grille highlights the front styling of the Majestor, presenting an aggressive off-road stance.",
            image: "/images/models/majestor/09-grille-97.jpg",
            highlights: ["Chrome octagonal visual bars", "Polished aluminum framing", "Bold front hood lining"]
          },
          {
            title: "VERTICALLY STACKED LED HEADLAMPS",
            subtitle: "Split layout high projection",
            description: "Vertically stacked LED projector headlight clusters framing the grille, projecting wide daylight-like beams on deep mountain trails.",
            image: "/images/models/majestor/29-headlight-43.jpg",
            highlights: ["Vertically stacked reflectors", "Eyebrow LED dynamic DRLs", "Automatic cornering light assistance"]
          }
        ]
      },
      {
        tab: "INTERIOR",
        icon: "seat",
        items: [
          {
            title: "MASSAGING FIRST-CLASS CHAIRS",
            subtitle: "Interactive massage seating suite",
            description: "The front captain seats are equipped with heating, ventilation, and premium multi-mode massaging functions to relieve stress during long highway travels.",
            image: "/images/models/majestor/125-ventilated-seat-close-up-305.jpg",
            highlights: ["12-way power adjustments", "Three-intensity pulse massage", "Quilted leather wrap accents"]
          },
          {
            title: "PANORAMIC SKY Sunroof",
            subtitle: "Expansive overhead light canopy",
            description: "A wide dual-pane panoramic skyroof spans across all three seat rows, allowing ambient sunlight into the entire luxury cabin.",
            image: "/images/models/majestor/107-sun-roof-moon-roof-81.jpg",
            highlights: ["90% overall ceiling coverage", "Anti-pinch sliding glass blind", "High heat-deflection layers"]
          }
        ]
      },
      {
        tab: "TERRAIN",
        icon: "cpu",
        items: [
          {
            title: "ALL-TERRAIN SYSTEM (ATS)",
            subtitle: "7 custom off-road driving states",
            description: "Rotate the central console dial to activate off-road traction modes: Snow, Mud, Sand, Eco, Sport, Auto, Rock. Active torque transfer handles the rest.",
            image: "/images/models/majestor/57-configuration-selector-knob-140.jpg",
            highlights: ["7 custom torque profiles", "Three locking differentials locking", "BorgWarner intelligent torque vector transfer"]
          }
        ]
      },
      {
        tab: "SAFETY",
        icon: "shield",
        items: [
          {
            title: "LEVEL 2 ADAS SHIELD",
            subtitle: "Autonomous radar alignment",
            description: "Includes high-frequency forward radar and surround cameras guiding lane centerings, cruise speeds, collision alerts, and emergency braking actions.",
            image: "/images/models/majestor/132-adas-menu-316.jpg",
            highlights: ["Automatic emergency braking system", "Blind spot detection warnings", "Lane Departure Warning assistances"]
          }
        ]
      }
    ]
  },
  {
    id: "m9",
    name: "M9",
    type: "Premium Electric MPV",
    category: "Select",
    price: lakh(12000000),
    priceINR: 12000000,
    engine: "Dual Motor, 245 hp",
    transmission: "Single Speed Automatic",
    fuel: "Electric",
    blurb: "MG Select's flagship electric luxury MPV, redefining first-class travel in Mumbai.",
    cta: "Explore MG M9",
    image: "/images/models/model-m9-transparent.png",
    alt: "MG M9 Electric Luxury MPV",
    seating: "7 Seater",
    mileage: "480 km Range*",
    bootSpace: "650 Litres",
    highlights: [
      "Electric Sliding Doors",
      "Business Class Lounge Seating",
      "Intelligent Rear Seat Screen Controls",
      "Panoramic Glass Roof with Mood Lighting",
    ],
    heroImage: "/images/models/model-m9.png",
    interiorImage: "/images/models/m9/49-dashboard-59.jpg",
    galleryImages: [
      { src: "/images/models/m9/01-front-left-side-47.jpg", caption: "MG M9 — Front profile styling" },
      { src: "/images/models/m9/03-side-view-left-90.jpg", caption: "Sleek aerodynamic side profile" },
      { src: "/images/models/m9/49-dashboard-59.jpg", caption: "Premium high-tech cockpit dashboard layout" },
      { src: "/images/models/m9/59-door-view-of-driver-seat-51.jpg", caption: "Luxury leatherette driver cabin seating" },
      { src: "/images/models/m9/65-rear-seats-52.jpg", caption: "Spacious business class second-row captain armchairs" },
      { src: "/images/models/m9/85-infotainment-system-main-menu-183.jpg", caption: "12.3-inch high-resolution touchscreen display menu" },
      { src: "/images/models/m9/52-steering-wheel-54.jpg", caption: "Leather-wrapped multi-function steering wheel" },
      { src: "/images/models/m9/13-grille-97.jpg", caption: "Front fascia detail with premium chrome grille" },
      { src: "/images/models/m9/17-wheel-42.jpg", caption: "Stylized multi-spoke alloy wheels" },
    ],
    colors: [
      { name: "Pearl White", hex: "#ffffff", cssFilter: "none", image: "/images/models/m9/121-pearl-white-with-black-roof-c0c0c0.jpg" },
      { name: "Aurora Silver", hex: "#cccccc", cssFilter: "none", image: "/images/models/m9/122-concrete-grey-with-black-roof-74787b.jpg" },
      { name: "Starry Black", hex: "#111111", cssFilter: "saturate(0.1) brightness(0.25) contrast(1.4)", image: "/images/models/m9/123-metal-black-010101.jpg" },
    ],
    details: {
      length: "5270 mm",
      width: "2000 mm",
      height: "1840 mm",
      wheelbase: "3200 mm",
      power: "245 hp / 180 kW",
      torque: "350 Nm",
      battery: "90 kWh Lithium-Ion Pack",
      chassis: "Flagship luxury EV platform monocoque high-rigidity structural frame",
      suspension: "Front: Double Wishbone | Rear: Multi-link independent air suspension package",
      brakes: "Front: Ventilated Disc | Rear: Disc brakes with smart energy recovery",
      infotainment: "12.3-inch HD dual cluster panels + individual rear armchair armrest screen controls",
      warranty: "5 Years / 150,000 km vehicle warranty + 8 Years battery pack coverage program",
      safety: [
        "10 Airbags",
        "Autonomous Emergency Braking (AEB)",
        "Lane Change Assist & Lane Keeping Assist",
        "360 High-Definition Monitor Suite",
      ],
      features: [
        "Second-row luxury business seats",
        "Individual smart armrest controllers",
        "Electric panoramic double glass sunroof",
        "64-color ambient light system",
      ],
    },
    detailedSections: [
      {
        title: "Executive Business Lounge",
        description: "The second-row individual business class armchairs offer multiple power reclines, message therapies, integrated armrest screens, and leg-rest extensions.",
        image: "/images/models/m9/65-rear-seats-52.jpg"
      },
      {
        title: "Electric Sliding Lounge Doors",
        description: "Step in and out with absolute grace. The M9 is equipped with soft-close electric sliding side doors operated via keyless remote or driver ceiling controls.",
        image: "/images/models/m9/03-side-view-left-90.jpg"
      },
      {
        title: "Dual Panoramic Sky Canopy",
        description: "Renders dual electric sky curtains allowing the front and rear passengers to manage light levels independently inside the premium first-class cabin.",
        image: "/images/models/m9/99-sun-roof-moon-roof-81.jpg"
      }
    ],
    youtubeVideo: "https://www.youtube.com/embed/8-Wj4j2Z9Xk",
    categorizedFeatures: {
      exterior: [
        { title: "SLIDING ELECTRIC ENTRY", description: "Smooth electric-powered sliding passenger doors.", image: "/images/models/m9/03-side-view-left-90.jpg" },
        { title: "PANORAMIC SKY CANOPY", description: "Dual-pane electric panoramic roof glass ceiling.", image: "/images/models/m9/99-sun-roof-moon-roof-81.jpg" },
        { title: "LUXURY EXTERIOR STANCE", description: "Bold upright proportions and premium LED lighting.", image: "/images/models/m9/01-front-left-side-47.jpg" }
      ],
      safety: [
        { title: "10 AIRBAG SYSTEM SHIELD", description: "Multi-point protective impact airbags.", image: "/images/models/m9/110-driver-airbag-311.jpg" },
        { title: "360 HD MONITOR SUITE", description: "High-definition 360-degree surround camera view.", image: "/images/models/m9/94-360-camera-view-285.jpg" }
      ],
      tech: [
        { title: "ARMREST TOUCH CONTROLS", description: "Rear armrest touch panels managing seating angles.", image: "/images/models/m9/91-entertainment-system-rear-143.jpg" },
        { title: "64-COLOR AMBIENT LIGHTING", description: "Customizable mood lighting across the full cabin.", image: "/images/models/m9/117-ambient-lighting-display-320.jpg" },
        { title: "DUAL COCKPIT DISPLAYS", description: "Driver + rear passenger individual smart screens.", image: "/images/models/m9/49-dashboard-59.jpg" }
      ]
    },
    featureSections: [
      {
        tab: "EXTERIOR",
        icon: "car",
        items: [
          {
            title: "ELECTRIC SMART SLIDING DOORS",
            subtitle: "Touchless passenger ingress",
            description: "Equipped with dual electric-powered sliding rear passenger doors, operated via smart remote keys, roof control panel, or B-pillar push buttons.",
            image: "/images/models/m9/03-side-view-left-90.jpg",
            highlights: ["Dual soft-close electric doors", "Anti-pinch safety alignment", "Obstacle detection sensors"]
          },
          {
            title: "COMMANDING VIP ROAD POSTURE",
            subtitle: "Bold upright flagship design",
            description: "The M9 features dynamic visual lines with split-LED headlamps, dynamic scrolling rear tail lights, and 19-inch multi-spoke alloy wheels.",
            image: "/images/models/m9/01-front-left-side-47.jpg",
            highlights: ["Flagship upright footprint", "Scrolling LED tail lamps", "Aerodynamic vertical pillars"]
          }
        ]
      },
      {
        tab: "INTERIOR",
        icon: "seat",
        items: [
          {
            title: "INDIVIDUAL AIRLINE CAPTAIN SEATS",
            subtitle: "Second-row luxury recliners",
            description: "Renders business-class individual armchairs with folding tray tables, pneumatic multi-intensity massage system, and 3-stage heating/ventilation panels.",
            image: "/images/models/m9/65-rear-seats-52.jpg",
            highlights: ["quilted leatherette wrap", "Integrated calf support extensions", "Folding laptop tables"]
          },
          {
            title: "DUAL ELECTRIC SKY CURTAINS",
            subtitle: "Panoramic double-glass sunroof",
            description: "A dual-pane electric glass sunroof stretches across the cabin, equipped with separate front and rear electric blinds to control sunlight levels.",
            image: "/images/models/m9/99-sun-roof-moon-roof-81.jpg",
            highlights: ["Dual-pane layout sunroof", "Independent electric blind shades", "UVR light block layer"]
          }
        ]
      },
      {
        tab: "TECH",
        icon: "cpu",
        items: [
          {
            title: "ARMREST DIGITAL CONTROLLER",
            subtitle: "Rear seat touch screens",
            description: "Embedded HD touch screens on seat armrests allow second-row passengers to control seat massage modes, recline angles, climate settings, and roof blinds.",
            image: "/images/models/m9/91-entertainment-system-rear-143.jpg",
            highlights: ["HD armrest touch screen", "Climate and seat memory sync", "Cabin lighting brightness control"]
          }
        ]
      },
      {
        tab: "SAFETY",
        icon: "shield",
        items: [
          {
            title: "10-AIRBAG WRAP-AROUND SYSTEM",
            subtitle: "Flagship cabin impact cushion",
            description: "Ten standard SRS airbags, including driver knee and full-length side curtain airbags, provide complete crash protection for all three rows.",
            image: "/images/models/m9/110-driver-airbag-311.jpg",
            highlights: ["10 SRS impact airbags standard", "Double B-pillar rollover frame", "Rigid battery protective case"]
          }
        ]
      }
    ]
  },
  {
    id: "cyberster",
    name: "CYBERSTER",
    type: "Electric Roadster",
    category: "Select",
    price: lakh(6500000),
    priceINR: 6500000,
    engine: "508 hp Dual Motor AWD",
    transmission: "Single Speed Automatic",
    fuel: "Electric",
    blurb: "The premium electric scissor-door roadster, delivering supercar dynamics and performance.",
    cta: "Explore Cyberster",
    image: "/images/models/model-cyberster-transparent.png",
    alt: "MG Cyberster Electric Roadster",
    seating: "2 Seater",
    mileage: "509 km Range*",
    bootSpace: "200 Litres",
    highlights: [
      "Automatic Scissor Doors",
      "0-100 km/h in 3.2 seconds",
      "Triple Screen Curved Display Layout",
      "F1-Inspired Chassis Tuning",
    ],
    heroImage: "/images/models/model-cyberster.png",
    interiorImage: "/images/models/cyberster/48-dashboard-59.jpg",
    galleryImages: [
      { src: "/images/models/cyberster/01-front-left-side-47.jpg", caption: "MG Cyberster — Commanding front-left road posture" },
      { src: "/images/models/cyberster/03-side-view-left-90.jpg", caption: "Sleek aerodynamic side profile" },
      { src: "/images/models/cyberster/48-dashboard-59.jpg", caption: "Premium cockpit wrap-around layout" },
      { src: "/images/models/cyberster/62-door-view-of-driver-seat-51.jpg", caption: "Luxury sports bucket seats" },
      { src: "/images/models/cyberster/63-front-seats-passenger-view-88.jpg", caption: "Spacious passenger cabin view" },
      { src: "/images/models/cyberster/79-infotainment-system-main-menu-183.jpg", caption: "Touchscreen infotainment controls screen" },
      { src: "/images/models/cyberster/52-steering-wheel-54.jpg", caption: "Leather-wrapped multi-function steering wheel" },
      { src: "/images/models/cyberster/19-grille-97.jpg", caption: "Front detail with honeycomb grille pattern" },
      { src: "/images/models/cyberster/23-wheel-42.jpg", caption: "Dynamic turbine alloy wheels" },
    ],
    colors: [
      { name: "Dynamic Red", hex: "#cc0000", cssFilter: "none", image: "/images/models/cyberster/108-flare-red-ba0116.jpg" },
      { name: "Electric Yellow", hex: "#ffea00", cssFilter: "none", image: "/images/models/cyberster/107-nuclear-yellow-eeac37.jpg" },
      { name: "Bullet Silver", hex: "#cccccc", cssFilter: "saturate(0.1) brightness(1.2) contrast(0.9)", image: "/images/models/cyberster/109-modern-beige-b8b5a8.jpg" }, // matching beige/silver placeholder
      { name: "Starry Black", hex: "#111111", cssFilter: "saturate(0.1) brightness(0.25) contrast(1.4)", image: "/images/models/cyberster/106-andes-grey-3b3b3b.jpg" },
    ],
    details: {
      length: "4535 mm",
      width: "1913 mm",
      height: "1329 mm",
      wheelbase: "2690 mm",
      power: "544 PS / 400 kW (Combined)",
      torque: "725 Nm",
      battery: "77 kWh ternary lithium battery",
      acceleration: "3.2 seconds (0-100 km/h)",
      chassis: "Lightweight high-rigidity sports monocoque roadster platform safety shell",
      suspension: "Front: Double Wishbone | Rear: Multi-link sports tuned suspension setup",
      brakes: "Front: Brembo high-performance red calipers | Rear: Performance Disc brakes package",
      infotainment: "Wrap-around cockpit curved triple screens console setup running i-SMART",
      warranty: "5 Years / 150,000 km vehicle warranty + 8 Years battery pack coverage protection",
      safety: [
        "Active Roll Bars & Rigidity Frame",
        "Brembo high-performance braking caliper package",
        "Adaptive Cruise Control & Lane Center Centering",
        "Anti-collision warning sensors",
      ],
      features: [
        "Electric soft convertible top",
        "Wrap-around cockpit triple screens",
        "Premium Alcantara sport seating",
        "Bose acoustic sound package",
      ],
    },
    detailedSections: [
      {
        title: "Automatic Scissor Doors",
        description: "Features classic upward-opening scissor doors with active anti-collision sensors, operated at the press of a button for unmatched sport roadster drama.",
        image: "/images/models/cyberster/10-perspective-view-doors-open-145.jpg"
      },
      {
        title: "3.2s Supercar Acceleration",
        description: "Driven by dual electric motors outputting 544 PS and AWD torque vectoring, achieving zero-to-hundred acceleration in a staggering 3.2 seconds.",
        image: "/images/models/cyberster/01-front-left-side-47.jpg"
      },
      {
        title: "Curved Cockpit Screen Wrap",
        description: "Aligns three curved high-resolution monitors wrapping around the driver, displaying power meters, ADAS mapping, media dashboard, and performance telemetry.",
        image: "/images/models/cyberster/60-instrument-cluster-62.jpg"
      }
    ],
    youtubeVideo: "https://www.youtube.com/embed/e_6HkGZ_mms",
    categorizedFeatures: {
      exterior: [
        { title: "AUTOMATIC SCISSOR DOORS", description: "Upward scissor wing doors operated with sensors.", image: "/images/models/cyberster/10-perspective-view-doors-open-145.jpg" },
        { title: "SPORTS CONVERTIBLE ROOF", description: "Electric soft-fold convertible roof panel system.", image: "/images/models/cyberster/03-side-view-left-90.jpg" },
        { title: "AERODYNAMIC BODY LINES", description: "Wind-carved silhouette and active rear diffuser.", image: "/images/models/cyberster/01-front-left-side-47.jpg" }
      ],
      safety: [
        { title: "BREMBO CALIPERS SYSTEM", description: "Supercar-grade Brembo red brake calipers.", image: "/images/models/cyberster/23-wheel-42.jpg" },
        { title: "ACTIVE ROLL BAR FRAME", description: "Deploy-on-impact active roll protection bars.", image: "/images/models/cyberster/05-rear-view-119.jpg" }
      ],
      tech: [
        { title: "TRIPLE COCKPIT SCREENS", description: "Three wrap-around screen displays facing driver.", image: "/images/models/cyberster/60-instrument-cluster-62.jpg" },
        { title: "AWD TORROW VECTORING", description: "Precision per-wheel torque for supercar cornering.", image: "/images/models/cyberster/01-front-left-side-47.jpg" },
        { title: "BOSE ACOUSTIC AUDIO", description: "Concert-grade Bose speaker soundstage in cabin.", image: "/images/models/cyberster/83-speakers-58.jpg" }
      ]
    },
    featureSections: [
      {
        tab: "EXTERIOR",
        icon: "car",
        items: [
          {
            title: "AUTOMATIC SCISSOR WING DOORS",
            subtitle: "Supercar upward opening doors",
            description: "Equipped with electric scissor doors that open upwards dynamically. Integrated radar sensors prevent them from touching nearby obstacles.",
            image: "/images/models/cyberster/10-perspective-view-doors-open-145.jpg",
            highlights: ["Electric upward scissor open", "Active anti-collision sensors", "Sleek touchless push buttons"]
          },
          {
            title: "ELECTRIC SOFT CONVERTIBLE TOP",
            subtitle: "One-touch open top freedom",
            description: "The premium multi-layer fabric convertible top folds away electrically behind the roll bars in under 10 seconds at speeds up to 50 km/h.",
            image: "/images/models/cyberster/03-side-view-left-90.jpg",
            highlights: ["Folds in under 10 seconds", "Operable at speeds up to 50 km/h", "High noise-insulation layers"]
          }
        ]
      },
      {
        tab: "INTERIOR",
        icon: "seat",
        items: [
          {
            title: "WRAP-AROUND CURVED TRIPLE SCREENS",
            subtitle: "F1-inspired driver command",
            description: "Aligns three curved driver-facing digital screens displaying torque distributions, maps, speedometers, and connected vehicle indicators.",
            image: "/images/models/cyberster/60-instrument-cluster-62.jpg",
            highlights: ["Curved surround panel screens", "Custom driving telemetry display", "Co-pilot media navigation widgets"]
          },
          {
            title: "Premium ALCANTARA SPORTS SEATS",
            subtitle: "Hugging sport seat comfort",
            description: "High-performance body-hugging bucket seats finished in authentic Alcantara leather with integrated headrests and lateral bolster guides.",
            image: "/images/models/cyberster/62-door-view-of-driver-seat-51.jpg",
            highlights: ["quilted Alcantara support", "lateral G-force bolsters", "Lower back lumbar power controls"]
          }
        ]
      },
      {
        tab: "PERFORMANCE",
        icon: "cpu",
        items: [
          {
            title: "544 PS DUAL MOTOR AWD",
            subtitle: "Supercar performance output",
            description: "Two high-density electric motors on front and rear axles output a combined 544 PS and 725 Nm torque, propelling the roadster to 100 km/h in 3.2 seconds.",
            image: "/images/models/cyberster/01-front-left-side-47.jpg",
            highlights: ["0-100 km/h in 3.2 seconds", "Intelligent AWD torque vectoring", "Active battery thermal systems"]
          }
        ]
      },
      {
        tab: "SAFETY",
        icon: "shield",
        items: [
          {
            title: "BREMBO CALIPER BRAKING SYSTEM",
            subtitle: "Supercar stopping power",
            description: "Four-piston Brembo red brake calipers grip ventilated performance discs, offering instant deceleration and excellent track heat dissipation.",
            image: "/images/models/cyberster/23-wheel-42.jpg",
            highlights: ["4-piston red Brembo calipers", "Ventilated disc brakes standard", "Precision brake pedal feedback"]
          }
        ]
      }
    ]
  },
];

export const trust = [
  {
    icon: "shield",
    title: "Authorized MG Dealer",
    text: "Every car, spare part, and accessory is 100% genuine, sourced directly from MG Motor India.",
  },
  {
    icon: "users",
    title: "50,000+ Happy Customers",
    text: "Mumbai's premier MG dealer network, offering premium sales and award-winning support.",
  },
  {
    icon: "network",
    title: "6+ Modern Showrooms",
    text: "Strategically located showrooms and state-of-the-art service workshops across Mumbai & Thane.",
  },
  {
    icon: "rupee",
    title: "Easy Finance & Trade-In",
    text: "Flexible EMI schemes, instant valuation on your old car, and rapid loan approvals.",
  },
  {
    icon: "wrench",
    title: "Certified MG Service",
    text: "Factory-trained experts using advanced diagnostics and authentic MG genuine parts.",
  },
];

export type Offer = {
  title: string;
  amount: string;
  caption: string;
  icon: string;
};

export const offers: Offer[] = [
  {
    title: "Cash Benefits",
    amount: "Up to ₹1,00,000*",
    caption: "Exciting cash savings on select MG models this season.",
    icon: "gift",
  },
  {
    title: "Exchange Bonus",
    amount: "Up to ₹75,000*",
    caption: "Get maximum valuation and extra bonus when trading in your old car.",
    icon: "car",
  },
  {
    title: "Extended Warranty",
    amount: "Up to 3 Years*",
    caption: "Drive with absolute peace of mind with 3-year additional warranty cover.",
    icon: "shield",
  },
];

export const services = [
  {
    icon: "wrench",
    title: "General Service",
    text: "Comprehensive mechanical check-up and regular maintenance for peak performance.",
  },
  {
    icon: "shield",
    title: "Engine Care",
    text: "Advanced diagnostics, engine tuning, and original fuel system care.",
  },
  {
    icon: "road",
    title: "Brake Service",
    text: "Thorough inspection, pad replacement, and brake fluid flushing for maximum safety.",
  },
  {
    icon: "wind",
    title: "AC Service",
    text: "Cabin cooling recharge, filter replacement, and system sanitization all year round.",
  },
  {
    icon: "disc",
    title: "Tyre & Wheel Care",
    text: "Precision alignment, balancing, and premium replacements for a smooth ride.",
  },
  {
    icon: "battery",
    title: "Battery Service",
    text: "Battery diagnostics, terminal cleaning, and quick replacements for uninterrupted journeys.",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Rakesh Patil",
    role: "Windsor EV owner",
    rating: 5,
    text: "Exceptional experience from start to finish. The team is professional, transparent and truly cares.",
    avatar: "/images/logo-mg.png",
  },
  {
    name: "Neha Sharma",
    role: "ZS EV owner",
    rating: 5,
    text: "Smooth buying process and excellent after-sales service. Highly recommended!",
    avatar: "/images/logo-mg.png",
  },
  {
    name: "Amit Verma",
    role: "Hector owner",
    rating: 5,
    text: "Very happy with my Hector. Amazing features, performance and the service is top-notch.",
    avatar: "/images/logo-mg.png",
  },
  {
    name: "Priya Mehta",
    role: "Comet EV owner",
    rating: 5,
    text: "The perfect city car! Smart, easy to park, and extremely low running costs. MG Mumbai team was great.",
    avatar: "/images/logo-mg.png",
  },
  {
    name: "Rajesh Malhotra",
    role: "Astor owner",
    rating: 5,
    text: "Tech-loaded SUV that feels extremely premium to drive. The ADAS safety features are excellent.",
    avatar: "/images/logo-mg.png",
  },
  {
    name: "Monsoon Master",
    role: "Majestor owner",
    rating: 5,
    text: "Absolute luxury on wheels. Outstanding road presence, powerful engine, and first-class cabin comfort.",
    avatar: "/images/logo-mg.png",
  },
];

export const faqData = [
  {
    question: "How do I book a test drive at MG Motor Mumbai?",
    answer:
      "You can book a test drive online using the form on our website, or by calling us at 98877 33000. Our team will verify your details and coordinate the test drive at your nearest showroom or at your doorstep.",
  },
  {
    question: "Do you offer car finance and exchange programs?",
    answer:
      "Yes. MG Motor Mumbai works with major financial institutions to offer tailored loan plans. You can also trade in your existing vehicle for an attractive exchange bonus.",
  },
  {
    question: "Can I book my MG service appointment online?",
    answer:
      "Absolutely. Head over to our Service section, select your preferred date, time, and service location, and submit the booking form. We will call you to confirm the appointment.",
  },
  {
    question: "What is the standard warranty on MG vehicles?",
    answer:
      "MG vehicles in India come with a comprehensive manufacturer warranty. We also offer extended warranty plans for up to 3 years to ensure long-term peace of mind.",
  },
  {
    question: "Where are the showroom locations in Mumbai?",
    answer:
      "Our showroom branches are located in Malad (West), Andheri (West), Thane (West), and Palm Beach Road in Navi Mumbai. Detailed addresses and contact details are available on our Contact Us page.",
  },
];

export type Blog = {
  date: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  image: string;
  alt: string;
};

export const blogs: Blog[] = [
  {
    date: "May 28, 2025",
    category: "Electric Vehicles",
    title: "Future is Electric: Why EVs are the Smarter Choice",
    excerpt: "Explore how MG's electric mobility lineup is shaping a cleaner, smarter, and more sustainable tomorrow.",
    readTime: "5 min read",
    image: "/images/blog-ev.png",
    alt: "Future of EV banner",
  },
  {
    date: "May 25, 2025",
    category: "MG News",
    title: "MG Cyberster: Redefining Electric Performance",
    excerpt: "A closer look at MG's all-electric roadster and the future of performance EVs.",
    readTime: "5 min read",
    image: "/images/blog-cyberster.jpg",
    alt: "MG Cyberster roadster",
  },
  {
    date: "May 15, 2025",
    category: "Ownership Tips",
    title: "5 Essential Tips for a Smooth MG Drive",
    excerpt: "Simple maintenance habits and driving habits that keep your MG performing at its best.",
    readTime: "4 min read",
    image: "/images/blog-drive.jpg",
    alt: "MG highway drive",
  },
  {
    date: "May 10, 2025",
    category: "Technology",
    title: "How MG i-SMART Makes Every Drive Smarter",
    excerpt: "Explore the connected dashboard and app features that keep you safe, informed, and in control.",
    readTime: "5 min read",
    image: "/images/blog-ismart.png",
    alt: "MG i-SMART screen",
  },
  {
    date: "May 05, 2025",
    category: "Buying Guide",
    title: "SUV vs EV: Which MG Fits Your Lifestyle?",
    excerpt: "Compare the benefits of traditional fuel efficiency and electric power to find your perfect match.",
    readTime: "4 min read",
    image: "/images/blog-suv-vs-ev.jpg",
    alt: "MG SUVs lineup",
  },
  {
    date: "May 01, 2025",
    category: "Car Care",
    title: "Preparing Your MG for Mumbai's Monsoon Season",
    excerpt: "Essential care tips to keep your MG safe, dry, and road-ready during heavy rainfall.",
    readTime: "4 min read",
    image: "/images/blog-monsoon.jpg",
    alt: "Monsoon driving tips",
  },
];

export type Location = {
  name: string;
  type: "Showroom" | "Service Centre";
  city: string;
  address: string;
  phone: string;
  image: string;
};

export const locations: Location[] = [
  {
    name: "MG Motor Krishiv Auto Showroom",
    type: "Showroom",
    city: "Jogeshwari",
    address: "CTS 227, Service Rd JVLR, Western Express Hwy, Opp Balasaheb Thackeray Hospital, Jogeshwari East 400060",
    phone: "98877 33000",
    image: "/images/dealer-jogeshwari.jpg",
  },
  {
    name: "MG Motor Krishiv Auto Showroom",
    type: "Showroom",
    city: "Prabhadevi",
    address: "G-2 Electric Mansion, Plot 1086, Appasaheb Marathe Marg, Century Bazaar, Prabhadevi, Mumbai 400025",
    phone: "98877 33000",
    image: "/images/dealer-prabhadevi.png",
  },
  {
    name: "MG Motor Krishiv Auto Showroom",
    type: "Showroom",
    city: "Malad",
    address: "Shakti Premises, New Link Rd, Near Inorbit Mall, Opp Cloud Nine Hospital, Malad West, Mumbai, Maharashtra 400064",
    phone: "98877 33000",
    image: "/images/dealer-malad.png",
  },
  {
    name: "MG Motor Krishiv Auto Showroom",
    type: "Showroom",
    city: "Vasai",
    address: "Ground Fl Shop 1-2, Rajprabha Ind Estate, Boidpada, Sativali Rd, Goli Naka, Vasai East 401208",
    phone: "98877 33000",
    image: "/images/dealer-vasai.png",
  },
  {
    name: "MG Select Mumbai",
    type: "Showroom",
    city: "Worli",
    address: "Atur House 87, Dr Annie Besant Rd, Tulsi Vihar, Siddharth Nagar, Worli, Mumbai, Maharashtra 400018",
    phone: "98877 33000",
    image: "https://stimg2.cardekho.com/images/carNewsimages/userimages/34057/1739439356801/ElectricCar.jpg",
  },
];

export const workshops: Location[] = [
  {
    name: "MG Motor Krishiv Auto Service Center",
    type: "Service Centre",
    city: "Kandivali",
    address: "301, New Link Rd, Opp Sonal Link Residency, Kandivali, Mithchowki, Malad West, Mumbai, Maharashtra 400064",
    phone: "98877 33000",
    image: "/images/dealer-malad.png",
  },
  {
    name: "MG Motor Krishiv Auto Service Center",
    type: "Service Centre",
    city: "Jogeshwari",
    address: "CTS 227, Service Rd near JVLR, Western Express Hwy, Beside MG Showroom, Jogeshwari East, Mumbai, Maharashtra 400060",
    phone: "98877 33000",
    image: "/images/dealer-jogeshwari.jpg",
  },
  {
    name: "MG Motor Krishiv Auto Service Center",
    type: "Service Centre",
    city: "Tokersy Jivraj",
    address: "MG South Shree Ram Cotton Press Compound, Tokersy Jivraj Rd, Railway Bridge, Opp Cotton Green Station, Mumbai 400015",
    phone: "98877 33000",
    image: "/images/dealer-prabhadevi.png",
  },
];

export const popularCars = cars.slice(0, 3);
export const carModels = cars.map((c) => c.name);
export const cityOptions = [
  "MG Motor Krishiv Auto Showroom (Jogeshwari)",
  "MG Motor Krishiv Auto Showroom (Prabhadevi)",
  "MG Motor Krishiv Auto Showroom (Malad)",
  "MG Motor Krishiv Auto Showroom (Vasai)",
  "MG Select Mumbai (Worli)",
  "MG Motor Krishiv Auto Service Center (Kandivali)",
  "MG Motor Krishiv Auto Service Center (Jogeshwari)",
  "MG Motor Krishiv Auto Service Center (Tokersy Jivraj)",
];
export const testDriveImage = "/images/test-drive-interior.png";
