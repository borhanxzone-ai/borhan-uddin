export type ProjectCategory = 
  | 'all'
  | 'motion-ads'
  | 'reels-shorts'
  | 'commercials'
  | 'documentary'
  | 'motion-graphics';

export interface ProjectItem {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  client: string;
  clientIndustry?: string;
  thumbnail: string;
  /**
   * Video URL: Can be an MP4/WebM direct URL or a YouTube/Vimeo embed link
   */
  videoUrl: string;
  videoType: 'mp4' | 'youtube' | 'vimeo';
  isVertical?: boolean; // Set to true for 9:16 TikTok / Instagram Reels / YouTube Shorts
  duration: string;
  stats: {
    views?: string;
    retention?: string;
    roas?: string;
    shares?: string;
  };
  tags: string[];
  description: string;
  challengeAndSolution?: {
    challenge: string;
    solution: string;
    result: string;
  };
  deliverables: string[];
  software: string[];
  year: string;
  featured?: boolean;
  column?: 1 | 2 | 3;
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  popular?: boolean;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  duration: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  projectHighlight: string;
  metric: string;
  rating: number;
}

export interface GraphicDesignItem {
  id: string;
  title: string;
  category: 'thumbnail' | 'poster' | 'social-creative' | 'branding' | 'manipulation';
  categoryLabel: string;
  imageUrl: string;
  description: string;
  client?: string;
  software: string[];
  metricsOrHighlight?: string;
  aspectRatio?: '16:9' | '1:1' | '4:5' | '9:16';
  year?: string;
}

export interface ShowreelConfig {
  title: string;
  badge?: string;
  subheadline?: string;
  videoUrl: string;
  videoType: 'mp4' | 'youtube';
}

export interface BioConfig {
  name: string;
  role: string;
  location: string;
  photoUrl: string;
  photoLink?: string; // Link opened when user clicks the picture
  aboutText?: string;
  skills?: string[];
  experienceYears?: string;
  openToWork?: boolean;
}

export interface SiteConfig {
  agencyName: string;
  avatarUrl?: string; // Profile photo / brand avatar URL
  brandTagline: string;
  availabilityStatus: string;
  isAvailableForHire: boolean;
  bio?: BioConfig;
  hero: {
    badge: string;
    headline: string;
    highlightedText: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  showreel?: ShowreelConfig;
  stats?: Array<{
    value: string;
    label: string;
    description: string;
  }>;
  contact: {
    email: string;
    whatsapp: string;
    telegram?: string;
    calendlyUrl: string;
    location: string;
    socials: {
      facebook?: string;
      youtube?: string;
      instagram?: string;
      twitter?: string;
      linkedin?: string;
      behance?: string;
    };
  };
}
