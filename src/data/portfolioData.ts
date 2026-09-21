import { SiteConfig, ProjectItem, ServiceItem, ProcessStep, GraphicDesignItem } from '../types';

/* =========================================================================================
   📌 বাংলা নির্দেশিকা (BENGALI EDITING GUIDE):
   ১. টেক্সট ও টাইটেল পরিবর্তন: 
      - নিচে `siteConfig` অবজেক্টের মধ্যে headline, subheadline, stats, email পরিবর্তন করুন।
   ২. প্রজেক্টের ছবি (Thumbnail) পরিবর্তন:
      - `projectsData` অ্যারের মধ্যে প্রতিটি প্রজেক্টের `thumbnail` ফিল্ডে আপনার ইমেজ লিঙ্ক (URL) দিন।
      - আপনি Unsplash, Imgur বা আপনার যেকোনো হোস্ট করা ছবির লিংক দিতে পারেন।
   ৩. ভিডিও লিংক (Video URL) পরিবর্তন:
      - `videoUrl` এ আপনার MP4 ভিডিও লিঙ্ক অথবা YouTube Embed URL (যেমন: 'https://www.youtube.com/embed/VIDEO_ID') দিন।
      - `videoType`: 'mp4' অথবা 'youtube' লিখুন।
   ৪. রিলস/শর্টস (Vertical 9:16 Video):
      - মোবাইল ফরম্যাটের জন্য `isVertical: true` রাখুন।
   ৫. ক্লায়েন্ট এবং পরিসংখ্যান (Stats):
      - `client`, `duration`, `views`, `roas`, `software` ইত্যাদি সহজে এডিট করতে পারেন।
   ========================================================================================= */

// ==========================================
// 🏢 ১. এজেন্সি এবং সাধারণ টেক্সট কনফিগ (SITE CONFIG)
// ==========================================
export const siteConfig: SiteConfig = {
  // এজেন্সির নাম (Agency Name)
  agencyName: "BORHAN UDDIN",
  
  // 👤 প্রোফাইল ছবি / লোগো (Profile Avatar / Logo URL)
  avatarUrl: "/borhan-dp.jpg",
  
  // ট্যাগলাইন (Brand Tagline)
  brandTagline: "High-End Video Editing & Creative Motion Agency",
  
  // বর্তমান কাজের প্রাপ্যতা (Work Availability Status)
  availabilityStatus: "Available for New Projects (Q2/Q3)",
  isAvailableForHire: true,

  // 👤 বায়ো ডাটা (Creator Bio / Profile)
  bio: {
    name: "BORHAN UDDIN",
    role: "Video editor & Motion Designer",
    location: "Dhaka",
    photoUrl: "/borhan-dp.jpg",
    photoLink: "https://www.facebook.com/share/1BuYp4HLTY/",
    aboutText: "Crafting high-retention video edits, viral pacing, and direct-response motion design that transform brand visions into captivating visual stories.",
    skills: ["Premiere Pro", "After Effects", "3D Camera", "Motion Design", "Sound Design", "Color Grading"],
    experienceYears: "4+ Years of Crafting Edits",
    openToWork: true
  },

  // হিরো সেকশন টেক্সট (Hero Section Content)
  hero: {
    badge: "SELECTED WORKS & CASE STUDIES",
    headline: "Transforming raw footage into",
    highlightedText: "high-converting visual stories.",
    subheadline: "We help hyper-growth brands, creators, and modern founders scale with direct-response motion ads, viral short-form retention edits, and cinematic commercials.",
    ctaPrimary: "Explore Works",
    ctaSecondary: "Book a Discovery Call"
  },

  // 🎬 শোরিল কনফিগারেশন (Featured Showreel Video & Headline)
  // এখানে আপনি আপনার MP4 বা YouTube Embed ভিডিওর লিংক সহজে পরিবর্তন করতে পারেন
  showreel: {
    title: "Showreels",
    badge: "FEATURED WORK",
    subheadline: "Borhan Uddin • Motion Designer & Video Editor Showreels",
    videoUrl: "https://youtu.be/lvLHvxsWwk4",
    videoType: "youtube"
  },

  // যোগাযোগ তথ্য (Contact Details & Social Media Links)
  contact: {
    email: "borhanxzone@gmail.com",
    whatsapp: "+880 1301-339247",
    telegram: "https://t.me/borhanuddin",
    calendlyUrl: "https://calendly.com",
    location: "Dhaka, Bangladesh • Serving Worldwide",
    socials: {
      facebook: "https://www.facebook.com/share/1BuYp4HLTY/",
      youtube: "https://www.youtube.com/@Borhan_Creation-e6n",
      instagram: "https://www.instagram.com/borhan_xyz/",
      behance: "https://www.behance.net/borhanuddin-2004",
    }
  }
};

// ==========================================
// 🎬 ২. পোর্টফোলিও প্রজেক্টের তালিকা (PROJECTS DATA)
// ==========================================
export const projectsData: ProjectItem[] = [
  // ==================== COLUMN 1 (LEFT) - TOP ====================
  {
    id: "project-1",
    title: "SBMC Video - Commercial Motion",
    category: "commercials",
    categoryLabel: "YouTube Video",
    client: "SBMC Production",
    clientIndustry: "Commercial / Motion Design",
    thumbnail: "https://img.youtube.com/vi/MGx7f66I2sI/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/MGx7f66I2sI",
    videoType: "youtube",
    isVertical: false,
    column: 1,
    duration: "1:24",
    stats: {
      views: "1.2M",
      roas: "4.5x",
      retention: "72%"
    },
    tags: ["Commercial Edit", "Dynamic Pacing", "Sound Design", "Color Grading"],
    description: "High-voltage commercial motion edit featuring rhythmic pacing, seamless transitions, and cinematic sound design.",
    challengeAndSolution: {
      challenge: "Creating an electrifying commercial presentation that hooks the audience in the opening seconds.",
      solution: "Engineered fast-paced visual cuts, custom motion graphics, and synchronized sound effects.",
      result: "Achieved outstanding engagement and audience retention across all digital channels."
    },
    deliverables: ["16:9 4K YouTube Master", "Audio Master Mix", "Social Teaser Cut"],
    software: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve"],
    year: "2024",
    featured: true
  },

  // 🆕 নতুন ভিডিও ১: এসবিএমসি এবং ইউআই মোশন-এর মাঝখানের গ্যাপ ফিলাপ (Column 1)
  {
    id: "project-skills-job",
    title: "How Many Skills We Need for Job & Business ?",
    category: "commercials",
    categoryLabel: "YouTube Video",
    client: "Borhan Creation",
    clientIndustry: "Career & Business / Educational",
    thumbnail: "https://img.youtube.com/vi/9VF0NvIpje4/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/9VF0NvIpje4",
    videoType: "youtube",
    isVertical: false,
    column: 1,
    duration: "1:45",
    stats: {
      views: "1.1M",
      retention: "74%"
    },
    tags: ["Career Video", "Motion Graphics", "Kinetic Typography", "Sound Design"],
    description: "High-engagement educational & corporate motion edit exploring essential modern skillsets for career and business growth with clear visual pacing.",
    challengeAndSolution: {
      challenge: "Transforming career development concepts into visually compelling, hook-driven motion storytelling.",
      solution: "Engineered clean kinetic typography, graphic callouts, and rhythmic visual pacing to maintain audience engagement.",
      result: "Achieved over 1.1M views with high completion and positive community interaction."
    },
    deliverables: ["16:9 YouTube Master", "Motion Graphics Package", "Audio Cleanup"],
    software: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    year: "2024",
    featured: true
  },

  // ==================== COLUMN 2 (CENTER) - VIRAL REELS ====================
  {
    id: "project-2",
    title: "SKILL IS POWER - Viral Reel",
    category: "reels-shorts",
    categoryLabel: "Reel / Short",
    client: "Borhan Creation",
    clientIndustry: "Creator Economy / Viral Shorts",
    thumbnail: "https://img.youtube.com/vi/NisDcFX2ui4/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/NisDcFX2ui4",
    videoType: "youtube",
    isVertical: true, // 9:16 রিলস ফরম্যাট (মাঝের কলামে থাকবে)
    column: 2,
    duration: "0:45",
    stats: {
      views: "3.4M",
      retention: "115%",
      shares: "48K"
    },
    tags: ["Viral Shorts", "Kinetic Typography", "Motion Graphics", "Fast Pacing"],
    description: "Punchy, retention-optimized vertical short created with kinetic typography, dynamic b-roll, and layered audio.",
    challengeAndSolution: {
      challenge: "Holding viewer attention beyond 3 seconds in a competitive short-form feed.",
      solution: "Implemented quick cuts, color pops, custom subtitle animations, and constant visual momentum.",
      result: "Delivered over 115% average retention rate with exponential organic shares."
    },
    deliverables: ["9:16 Vertical Master", "Subtitled Clean Version", "Hook Variation"],
    software: ["Premiere Pro", "After Effects"],
    year: "2024",
    featured: true
  },

  // ==================== COLUMN 3 (RIGHT) - TOP ====================
  {
    id: "project-3",
    title: "Nafees Salim Sir Project - Educational Edit",
    category: "commercials",
    categoryLabel: "YouTube Video",
    client: "Nafees Salim Sir Project",
    clientIndustry: "Education / Brand Storytelling",
    thumbnail: "https://img.youtube.com/vi/xNQKYBr9CPU/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/xNQKYBr9CPU",
    videoType: "youtube",
    isVertical: false,
    column: 3,
    duration: "2:10",
    stats: {
      views: "850K",
      retention: "68%"
    },
    tags: ["Educational Edit", "Visual Storytelling", "Audio Cleanup", "Transitions"],
    description: "Detailed educational video narrative edit crafted with clean visual aids, smooth transitions, and studio-grade voiceover clarity.",
    challengeAndSolution: {
      challenge: "Balancing informative lecture depth with entertaining visual rhythm.",
      solution: "Inserted synchronized graphics, kinetic highlights, and subtle background scoring.",
      result: "Boosted completion rates and earned high praise from students and viewers."
    },
    deliverables: ["16:9 YouTube Master", "Clean Dialogue Audio", "Chapter Cuts"],
    software: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    year: "2024",
    featured: false
  },

  // 🆕 নতুন ভিডিও ২: নাফিস সেলিম স্যার প্রজেক্ট এবং ইউআই মোশন-এর মাঝখানের গ্যাপ ফিলাপ (Column 3)
  {
    id: "project-video-ai",
    title: "Video with AI - Creative Motion",
    category: "motion-ads",
    categoryLabel: "YouTube Video",
    client: "Borhan Creation",
    clientIndustry: "AI & Motion Synthesis",
    thumbnail: "https://img.youtube.com/vi/3FAXOAtFRhE/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/3FAXOAtFRhE",
    videoType: "youtube",
    isVertical: false,
    column: 3,
    duration: "1:12",
    stats: {
      views: "920K",
      retention: "78%"
    },
    tags: ["AI Video", "Motion Ads", "Visual FX", "Direct Response"],
    description: "Cutting-edge video creation harnessing generative AI visuals, dynamic camera movement, kinetic text, and atmospheric audio design.",
    challengeAndSolution: {
      challenge: "Synthesizing generative AI imagery into a unified, high-octane visual commercial format.",
      solution: "Blended AI-generated assets with custom motion tracking, color harmonization, and custom sound design.",
      result: "Delivered an impactful showcase video demonstrating next-level AI production capabilities."
    },
    deliverables: ["16:9 4K Master Video", "AI Visual Synthesis", "Sound Design"],
    software: ["Premiere Pro", "After Effects", "AI Video Tools"],
    year: "2024",
    featured: true
  },

  // ==================== COLUMN 1 (LEFT) - MID ====================
  {
    id: "project-4",
    title: "UI MOTION - App & Dashboard Animation",
    category: "motion-ads",
    categoryLabel: "YouTube Video",
    client: "UI Product Lab",
    clientIndustry: "Tech & Software UI",
    thumbnail: "https://img.youtube.com/vi/OnJaaG1v_AM/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/OnJaaG1v_AM",
    videoType: "youtube",
    isVertical: false,
    column: 1,
    duration: "0:58",
    stats: {
      views: "1.5M",
      shares: "28K"
    },
    tags: ["UI Animation", "Micro-Interactions", "Motion Design", "3D Elements"],
    description: "Fluid interface animations, smooth micro-interactions, and 3D screen choreography designed to showcase software products.",
    challengeAndSolution: {
      challenge: "Translating static interface designs into living, breathing motion that explains UX intuitively.",
      solution: "Developed custom easing curves, 3D device tracking, and synchronized clicking soundscapes.",
      result: "Significantly improved user onboarding engagement and conversion demo requests."
    },
    deliverables: ["Product Motion Reel", "Transparent UI Assets", "Social Promo Cuts"],
    software: ["After Effects", "Illustrator", "Premiere Pro"],
    year: "2024",
    featured: true
  },

  // ==================== COLUMN 2 (CENTER) - REEL 2 ====================
  {
    id: "project-5",
    title: "AS-Sunnah Promo - Cinematic Short",
    category: "reels-shorts",
    categoryLabel: "Reel / Short",
    client: "AS-Sunnah Foundation",
    clientIndustry: "Non-Profit / Media",
    thumbnail: "https://img.youtube.com/vi/JC0tiK7tT5g/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/JC0tiK7tT5g",
    videoType: "youtube",
    isVertical: true, // 9:16 রিলস ফরম্যাট (মাঝের কলামে থাকবে)
    column: 2,
    duration: "0:50",
    stats: {
      views: "2.9M",
      retention: "108%",
      shares: "62K"
    },
    tags: ["Cinematic Short", "Emotional Pacing", "Sound Design", "Captions"],
    description: "Inspiring cinematic short with emotional pacing, impactful subtitle motion, and high-fidelity sound design.",
    challengeAndSolution: {
      challenge: "Evoking deep emotional resonance within a brief 50-second format.",
      solution: "Paired sensitive cinematic color tones with poignant soundscapes and readable typography.",
      result: "Reached millions of views across Facebook and YouTube with immense community feedback."
    },
    deliverables: ["9:16 High-Res Reel Master", "Bengali Kinetic Captions"],
    software: ["Premiere Pro", "DaVinci Resolve", "After Effects"],
    year: "2024",
    featured: true
  },

  // ==================== COLUMN 3 (RIGHT) - MID ====================
  {
    id: "project-6",
    title: "UI Motion - Interactive Product Showcase",
    category: "motion-ads",
    categoryLabel: "YouTube Video",
    client: "Digital Agency",
    clientIndustry: "Digital Agency / UX",
    thumbnail: "https://img.youtube.com/vi/Ar9oWO7rbnI/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Ar9oWO7rbnI",
    videoType: "youtube",
    isVertical: false,
    column: 3,
    duration: "1:05",
    stats: {
      views: "980K",
      retention: "75%"
    },
    tags: ["Product Walkthrough", "Kinetic Typography", "Motion Graphics", "3D Camera"],
    description: "Dynamic kinetic typography and product UI choreography highlighting user journeys and feature walkthroughs.",
    challengeAndSolution: {
      challenge: "Presenting complex software workflow steps in an accessible, visually appealing format.",
      solution: "Created 3D camera sweeps, highlighted data cards, and clean tactile animation curves.",
      result: "Delivered high-converting promotional asset for product launch."
    },
    deliverables: ["16:9 Showcase Master", "Feature Highlight Modules"],
    software: ["After Effects", "Premiere Pro"],
    year: "2024",
    featured: false
  },

  // ==================== COLUMN 1 (LEFT) - BOTTOM ====================
  {
    id: "project-7",
    title: "Use of AI - Futuristic Motion Graphics",
    category: "commercials",
    categoryLabel: "YouTube Video",
    client: "Tech & AI Frontier",
    clientIndustry: "Artificial Intelligence",
    thumbnail: "https://img.youtube.com/vi/L6-Fa2PKV4U/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/L6-Fa2PKV4U",
    videoType: "youtube",
    isVertical: false,
    column: 1,
    duration: "1:15",
    stats: {
      views: "1.8M",
      retention: "82%"
    },
    tags: ["AI Visuals", "Futuristic Motion", "Cyberpunk", "Audio Sync"],
    description: "Futuristic visual storytelling exploring cutting-edge generative AI capabilities with cyber motion graphics and electronic audio.",
    challengeAndSolution: {
      challenge: "Illustrating abstract artificial intelligence concepts with tangible, exciting visuals.",
      solution: "Blended generative neural imagery with sleek vector motion, HUD interfaces, and heavy synth bass.",
      result: "Generated 1.8M views with viral shares across tech communities."
    },
    deliverables: ["16:9 4K Video Master", "Looping Exhibition Cut"],
    software: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    year: "2024",
    featured: true
  },

  // 🆕 নতুন রিলস ১: Use of AI এর নিচে রিলস সাইজের ভিডিও (Column 1)
  {
    id: "project-reel-motion-video",
    title: "Motion Video - Visual Kinetic Reel",
    category: "reels-shorts",
    categoryLabel: "Reel / Short",
    client: "Borhan Creation",
    clientIndustry: "Visual Motion / Viral Reel",
    thumbnail: "https://img.youtube.com/vi/ecAnNUslwJU/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/ecAnNUslwJU",
    videoType: "youtube",
    isVertical: true, // 9:16 রিলস সাইজ
    column: 1,
    duration: "0:30",
    stats: {
      views: "1.6M",
      shares: "34K"
    },
    tags: ["Motion Video", "Kinetic Design", "Sound Design", "Viral Reel"],
    description: "High-energy motion video short featuring dynamic motion design, kinetic transitions, and immersive soundscapes crafted for social virality.",
    challengeAndSolution: {
      challenge: "Captivating viewers within the first 2 seconds on mobile vertical feed.",
      solution: "Engineered high-impact hook visuals, fluid camera motion, and synced sound effects.",
      result: "Achieved viral engagement and high audience retention rate."
    },
    deliverables: ["9:16 High-Res Reel Master", "Social Media Cut"],
    software: ["After Effects", "Premiere Pro", "DaVinci Resolve"],
    year: "2024",
    featured: true
  },

  // ==================== COLUMN 2 (CENTER) - REEL 3 ====================
  {
    id: "project-8",
    title: "Product Motion - 3D Commercial Short",
    category: "reels-shorts",
    categoryLabel: "Reel / Short",
    client: "Product Showcase",
    clientIndustry: "E-Commerce / Commercial",
    thumbnail: "https://img.youtube.com/vi/qJlp6BbkDQU/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/qJlp6BbkDQU",
    videoType: "youtube",
    isVertical: true, // 9:16 রিলস ফরম্যাট (মাঝের কলামে থাকবে)
    column: 2,
    duration: "0:40",
    stats: {
      views: "4.1M",
      roas: "4.8x",
      retention: "122%"
    },
    tags: ["Product Reveal", "Commercial Short", "VFX & Motion", "Viral Ads"],
    description: "High-energy commercial product reveal short engineered for viral conversion and social engagement.",
    challengeAndSolution: {
      challenge: "Capturing product textures and details in a vertical format optimized for mobile devices.",
      solution: "Used close-up macro tracking, dynamic lighting sweeps, and tactile sound design.",
      result: "Achieved 4.8x ROAS and scaled paid social campaigns."
    },
    deliverables: ["9:16 Vertical Master", "Ad Variations"],
    software: ["After Effects", "Premiere Pro", "DaVinci Resolve"],
    year: "2024",
    featured: true
  },

  // ==================== COLUMN 3 (RIGHT) - BOTTOM ====================
  {
    id: "project-9",
    title: "Borhan Creation - Master Edit Showcase",
    category: "commercials",
    categoryLabel: "YouTube Video",
    client: "Borhan Creation",
    clientIndustry: "Video & Motion Design",
    thumbnail: "https://img.youtube.com/vi/MGx7f66I2sI/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/MGx7f66I2sI",
    videoType: "youtube",
    isVertical: false,
    column: 3,
    duration: "1:24",
    stats: {
      views: "2.5M",
      retention: "85%"
    },
    tags: ["Showreel", "Master Montage", "Sound Design", "Motion Graphics"],
    description: "A signature showcase compilation featuring elite direct-response editing, dynamic sound design, and viral pacing.",
    challengeAndSolution: {
      challenge: "Presenting a versatile multi-genre skillset in a unified, high-octane montage.",
      solution: "Seamlessly intertwined commercial, viral reel, and UI motion sequences with continuous visual flow.",
      result: "Acts as Borhan's primary client-converting portfolio showcase."
    },
    deliverables: ["16:9 Master Showreel", "Portfolio Cutdowns"],
    software: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    year: "2024",
    featured: true
  },

  // 🆕 নতুন রিলস ২: Borhan Creation - Master Edit Showcase এর নিচে রিলস সাইজের ভিডিও (Column 3)
  {
    id: "project-reel-motion-graphics",
    title: "Motion Graphics - Dynamic VFX Reel",
    category: "reels-shorts",
    categoryLabel: "Reel / Short",
    client: "Borhan Creation",
    clientIndustry: "Motion Graphics / Creative VFX",
    thumbnail: "https://img.youtube.com/vi/ngoF0cXzMi8/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/ngoF0cXzMi8",
    videoType: "youtube",
    isVertical: true, // 9:16 রিলস সাইজ
    column: 3,
    duration: "0:35",
    stats: {
      views: "2.1M",
      shares: "45K"
    },
    tags: ["Motion Graphics", "VFX Reel", "Visual Rhythm", "Direct Response"],
    description: "Punchy vertical motion graphics showcase displaying advanced visual effects, smooth typography, and rhythmic pacing.",
    challengeAndSolution: {
      challenge: "Condensing complex motion graphics techniques into an electrifying short-form reel.",
      solution: "Created snappy keyframe choreography, kinetic motion bursts, and tight sound-to-visual synchronization.",
      result: "Earned strong viral performance with high replay and share volume."
    },
    deliverables: ["9:16 Vertical Master", "Shorts Optimization"],
    software: ["After Effects", "Premiere Pro"],
    year: "2024",
    featured: true
  }
];

// ==========================================
// 🛠️ ৩. সার্ভিস সমূহ (SERVICES LIST)
// ==========================================
export const servicesData: ServiceItem[] = [
  {
    id: "service-color-grading",
    title: "Color Grading & Correction",
    subtitle: "Cinematic Mood & Visual Depth",
    iconName: "Palette",
    description: "Industry-standard DaVinci Resolve color pipelines. Shot-matching, skin tone protection, dynamic LUT application, and bespoke cinematic palette styling.",
    deliverables: [
      "Precise shot-to-shot color balance & exposure matching",
      "Natural skin-tone preservation & separation",
      "Custom cinematic film-look emulate & color harmonies",
      "HDR & Rec.709 web/broadcast deliverables"
    ],
    popular: true
  },
  {
    id: "service-thumbnails",
    title: "Thumbnail & Graphic Design",
    subtitle: "High-CTR YouTube & Social Visuals",
    iconName: "Image",
    description: "Conversion-tested thumbnails and visual key art designed to boost Click-Through Rates (CTR). Highlighting emotion, bold typography, and visual clarity.",
    deliverables: [
      "High-contrast, high-CTR YouTube thumbnail designs",
      "Custom cutout treatments & facial retouching",
      "A/B test variations to maximize organic clicks",
      "Branded social banners & cover art"
    ],
    popular: false
  },
  {
    id: "service-retainers",
    title: "Full-Service Monthly Retainers",
    subtitle: "Dedicated Content Production Partner",
    iconName: "Repeat",
    description: "Reliable, high-volume video editing partnership for busy creators, agencies, and brands. Fast turnaround, seamless revisions, and consistent brand aesthetic.",
    deliverables: [
      "Guaranteed monthly video output & priority queue",
      "Dedicated communication channel",
      "Organized project archiving & raw footage management",
      "Fast 24-48 hour turnaround on revisions"
    ],
    popular: true
  },
  {
    id: "service-sound-design",
    title: "Sound Design & Audio Mixing",
    subtitle: "Immersive Audio Landscapes",
    iconName: "Volume2",
    description: "Transform flat footage into sensory experiences with layered Foley, whooshes, risers, sub-bass hits, and crisp dialogue leveling for maximum emotional impact.",
    deliverables: [
      "Studio-quality dialogue cleanup & noise reduction",
      "Multi-track Foley sound effects & transition audio",
      "Dynamic background music curation & ducking",
      "Broadcast-standard LUFS audio mastering"
    ],
    popular: false
  },
  {
    id: "service-motion-graphics",
    title: "3D & Motion Graphics",
    subtitle: "Kinetic UI, Explainer & CGI",
    iconName: "Sparkles",
    description: "Transform complex SaaS interfaces, crypto mechanisms, or product engineering into intuitive, visually breathtaking kinetic simulations and 3D device mockups.",
    deliverables: [
      "3D product showcase & CAD rendering",
      "Isometric app UI animations & micro-interactions",
      "Custom kinetic logo & title reveals",
      "Lottie / Web-optimized animations"
    ],
    popular: false
  },
  {
    id: "service-reels-shorts",
    title: "Viral Short-Form & Retention Edits",
    subtitle: "Reels, TikToks & YouTube Shorts",
    iconName: "Smartphone",
    description: "Turn podcasts, talking-heads, and founder stories into viral algorithmic magnets. We use tailored B-roll, expressive text animation, and rhythmic sound effects.",
    deliverables: [
      "100%+ viewer retention pacing",
      "Custom branded animated captions",
      "Sound effects (whooshes, pops, risers)",
      "Curated B-roll & 3D floating assets"
    ],
    popular: true
  }
];

// ==========================================
// 🚀 ৪. কাজের পদ্ধতি (PRODUCTION PROCESS)
// ==========================================
export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Brief & Hook Ideation",
    duration: "Day 1",
    iconName: "Compass",
    description: "We analyze your audience, product angle, and target platforms. We outline high-converting visual hooks and pacing structure before touching the timeline."
  },
  {
    step: "02",
    title: "Pacing & Storyboard Rough Cut",
    duration: "Day 2 - 3",
    iconName: "Scissors",
    description: "Raw footage is stripped of all filler. We assemble the narrative skeleton with seamless jump cuts, pattern interrupts, and rhythm synced to beat drops."
  },
  {
    step: "03",
    title: "Motion Graphics & Sound Design",
    duration: "Day 4 - 5",
    iconName: "Layers",
    description: "We inject life into the cut with custom vector animations, kinetic typography, 3D elements, and a multi-layered acoustic soundscape."
  },
  {
    step: "04",
    title: "Color Grading & Master Delivery",
    duration: "Day 6",
    iconName: "CheckCircle2",
    description: "Final cinematic LUT & color grading applied in DaVinci Resolve. Exported in high-bitrate ProRes/H.265 tailored to each social platform's algorithm."
  }
];

// ==========================================
// 🎨 ৫. গ্রাফিক্স ডিজাইন প্রজেক্টসমূহ (GRAPHIC DESIGN WORKS)
// 📌 নির্দেশিকা: এখানে ১ থেকে ৮ নম্বর সিরিয়াল অনুযায়ী ৮টি গ্রাফিক্স ডিজাইন পোস্ট সাজানো আছে।
// ==========================================
export const graphicsDesignData: GraphicDesignItem[] = [
  // ১নং গ্রাফিক্স ডিজাইন (Graphics 1)
  {
    id: "graphic-1",
    title: "Graphics 1",
    category: "thumbnail",
    categoryLabel: "গ্রাফিক্স ১",
    imageUrl: "/graphic1.jpg",
    description: "Creative Graphics Design - Graphics 1",
    software: ["Photoshop", "Illustrator"],
    aspectRatio: "16:9",
    year: "2024"
  },
  // ২নং গ্রাফিক্স ডিজাইন (Graphics 2)
  {
    id: "graphic-2",
    title: "Graphics 2",
    category: "poster",
    categoryLabel: "গ্রাফিক্স ২",
    imageUrl: "/graphic2.jpg",
    description: "Creative Graphics Design - Graphics 2",
    software: ["Photoshop", "Illustrator"],
    aspectRatio: "4:5",
    year: "2024"
  },
  // ৩নং গ্রাফিক্স ডিজাইন (Graphics 3)
  {
    id: "graphic-3",
    title: "Graphics 3",
    category: "social-creative",
    categoryLabel: "গ্রাফিক্স ৩",
    imageUrl: "/graphic3.jpg",
    description: "Creative Graphics Design - Graphics 3",
    software: ["Photoshop", "Illustrator"],
    aspectRatio: "16:9",
    year: "2024"
  },
  // ৪নং গ্রাফিক্স ডিজাইন (Graphics 4)
  {
    id: "graphic-4",
    title: "Graphics 4",
    category: "thumbnail",
    categoryLabel: "গ্রাফিক্স ৪",
    imageUrl: "/graphic4.jpg",
    description: "Creative Graphics Design - Graphics 4",
    software: ["Photoshop", "Illustrator"],
    aspectRatio: "16:9",
    year: "2024"
  },
  // ৫নং গ্রাফিক্স ডিজাইন (Graphics 5)
  {
    id: "graphic-5",
    title: "Graphics 5",
    category: "manipulation",
    categoryLabel: "গ্রাফিক্স ৫",
    imageUrl: "/graphic5.jpg",
    description: "Creative Graphics Design - Graphics 5",
    software: ["Photoshop", "Illustrator"],
    aspectRatio: "16:9",
    year: "2024"
  },
  // ৬নং গ্রাফিক্স ডিজাইন (Graphics 6)
  {
    id: "graphic-6",
    title: "Graphics 6",
    category: "branding",
    categoryLabel: "গ্রাফিক্স ৬",
    imageUrl: "/graphic6.jpg",
    description: "Creative Graphics Design - Graphics 6",
    software: ["Photoshop", "Illustrator"],
    aspectRatio: "1:1",
    year: "2024"
  },
  // ৭নং গ্রাফিক্স ডিজাইন (Graphics 7)
  {
    id: "graphic-7",
    title: "Graphics 7",
    category: "poster",
    categoryLabel: "গ্রাফিক্স ৭",
    imageUrl: "/graphic7.jpg",
    description: "Creative Graphics Design - Graphics 7",
    software: ["Photoshop", "Illustrator"],
    aspectRatio: "4:5",
    year: "2024"
  },
  // ৮নং গ্রাফিক্স ডিজাইন (Graphics 8)
  {
    id: "graphic-8",
    title: "Graphics 8",
    category: "social-creative",
    categoryLabel: "গ্রাফিক্স ৮",
    imageUrl: "/graphic8.jpg",
    description: "Creative Graphics Design - Graphics 8",
    software: ["Photoshop", "Illustrator"],
    aspectRatio: "16:9",
    year: "2024"
  }
];

