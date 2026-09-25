import genesisHero from "@/assets/genesis-hero.jpg";

export type Category = "all" | "blockbuster" | "international" | "afa" | "series";

export interface FilmWork {
  id: string;
  title: string;
  year: string;
  category: "blockbuster" | "international" | "afa" | "series" | "genesis";
  categoryLabel: string;
  tagline: string;
  credits: string;
  director?: string;
  producers?: string;
  image: string;
  alt: string;
  description: string;
  videoId?: string;
  startSeconds?: number;
  link?: string;
}

export interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  poster: string;
  badge: string;
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  statusLabel: string;
  primaryCta: {
    label: string;
    action: "link" | "filmModal" | "videoModal";
    href?: string;
    filmId?: string;
    videoId?: string;
    startSeconds?: number;
  };
  secondaryCta: {
    label: string;
    action: "link" | "filmModal" | "videoModal";
    href?: string;
    filmId?: string;
    videoId?: string;
    startSeconds?: number;
  };
  backdropImage: string;
  videoId?: string;
  startSeconds?: number;
}

export const featuredHeroSlides: HeroSlide[] = [
  {
    id: "genesis",
    eyebrow: "IN PRODUCTION • 90-MINUTE AI FEATURE FILM",
    title: "THE BOOK OF GENESIS",
    tagline: "NRIM Visual Bible Project - 90 Minute Feature Film",
    description:
      "Nations Reach International Missions (NRIM) and Fusion Edge Media unite to produce a historic 90-minute visual bible feature film utilizing an unprecedented, cutting-edge generative AI cinema pipeline.",
    statusLabel: "In Production",
    primaryCta: {
      label: "Watch Chapters",
      action: "link",
      href: "https://visualbible.nrim.org/",
    },
    secondaryCta: {
      label: "Watch Teaser",
      action: "videoModal",
      videoId: "jk47kD9vq1c",
      startSeconds: 2279,
    },
    backdropImage: "/images/posters/genesis-45.png",
    videoId: "jk47kD9vq1c",
    startSeconds: 2279,
  },
  {
    id: "enthiran",
    eyebrow: "HOLLYWOOD VFX & SUN PICTURES COLLABORATION",
    title: "ENTHIRAN",
    tagline: "Asia's Tech Marvel with Stan Winston's Legacy Effects",
    description:
      "Director Shankar's landmark sci-fi magnum opus starring Rajinikanth & Aishwarya Rai. Bringing together 180+ Hollywood visual effects artists and animatronic legends behind Jurassic Park and Iron Man.",
    statusLabel: "Sun Pictures & Legacy Effects",
    primaryCta: {
      label: "Explore Film",
      action: "filmModal",
      filmId: "enthiran",
    },
    secondaryCta: {
      label: "Watch VFX Reel",
      action: "videoModal",
      videoId: "-Igs9ALteeI",
      startSeconds: 0,
    },
    backdropImage: "/images/posters/Screenshot-2025-07-22-125800.png",
    videoId: "-Igs9ALteeI",
    startSeconds: 0,
  },
  {
    id: "cherans-journey",
    eyebrow: "STREAMING GLOBALLY ON SONYLIV",
    title: "CHERAN'S JOURNEY",
    tagline: "5 Lives. 5 Purposes. 1 Opportunity.",
    description:
      "Five-time National Award-winning director Cheran's international series premiere across 7 languages, produced in strategic collaboration with Fusion Edge Media.",
    statusLabel: "SonyLIV Originals",
    primaryCta: {
      label: "Watch on SonyLIV",
      action: "link",
      href: "https://www.sonyliv.com/shows/cherans-journey-marathi-1700001370",
    },
    secondaryCta: {
      label: "Watch Trailer",
      action: "videoModal",
      videoId: "aDzrp_5y8vQ",
      startSeconds: 0,
    },
    backdropImage: "/images/posters/cherans-journey.png",
    videoId: "aDzrp_5y8vQ",
    startSeconds: 0,
  },
  {
    id: "7th-sense",
    eyebrow: "WORLDWIDE THEATRICAL RELEASE",
    title: "7TH SENSE",
    tagline: "A Legendary Martial Arts & Sci-Fi Masterpiece",
    description:
      "A.R. Murugadoss' sci-fi martial arts thriller starring Suriya and Shruti Haasan. Released and distributed across European and Nordic theatrical networks by Fusion Edge Media.",
    statusLabel: "European Theatrical",
    primaryCta: {
      label: "Explore Film",
      action: "filmModal",
      filmId: "7th-sense",
    },
    secondaryCta: {
      label: "Watch Trailer",
      action: "videoModal",
      videoId: "cuzsQqCcm8c",
      startSeconds: 0,
    },
    backdropImage: "/images/posters/7th-sense.jpg",
    videoId: "cuzsQqCcm8c",
    startSeconds: 0,
  },
];

export const officialVideos: VideoItem[] = [
  {
    id: "header-reel",
    youtubeId: "kZn8QN_uLBY",
    title: "Connecting Continents in Filmmaking",
    category: "Studio Anthem",
    tagline: "Fusion Edge Media Official Header Reel",
    description:
      "Our premier studio showcase highlighting international film co-productions, high-end visual effects collaboration, and global storytelling across Hollywood, Indian cinema, and global screens.",
    poster: "/images/posters/Screenshot-2025-07-22-125800.png",
    badge: "Studio Reel",
  },
  {
    id: "ai-showreel",
    youtubeId: "OyQ3q0SC9fE",
    title: "AI Filmmaking Showreel",
    category: "NRIM Visual Bible & AI Cinema",
    tagline: "The Book of Genesis 90-Minute Feature Pipeline",
    description:
      "Pioneering generative cinematic pipelines developed for the NRIM Visual Bible Project, combining textual precision with breathtaking visual world-building for a full-length 90-minute feature film.",
    poster: genesisHero,
    badge: "AI Showreel",
  },
  {
    id: "enthiran-reel",
    youtubeId: "-Igs9ALteeI",
    title: "Enthiran / Robot Showreel",
    category: "Hollywood Collaboration",
    tagline: "Sun Pictures · Stan Winston Studios & Legacy Effects",
    description:
      "A landmark collaboration connecting Indian cinema with 180+ Hollywood crew members and artists behind Jurassic Park, Iron Man, and Avengers.",
    poster: "/images/posters/robot-poster.jpg",
    badge: "Enthiran Reel",
  },
  {
    id: "cherans-journey",
    youtubeId: "aDzrp_5y8vQ",
    title: "Cheran’s Journey Trailer",
    category: "SonyLIV Originals",
    tagline: "5 Lives. 5 Purposes. 1 Opportunity.",
    description:
      "National Award-winner Cheran's international OTT series premiere across 7 languages, produced in collaboration with Fusion Edge Media.",
    poster: "/images/posters/cherans-journey.png",
    badge: "Series Reel",
  },
];

export const allFilmWorks: FilmWork[] = [
  {
    id: "genesis",
    title: "The Book of Genesis",
    year: "2026",
    category: "genesis",
    categoryLabel: "NRIM Visual Bible Project",
    tagline: "The Book of Genesis - Fully AI 90-Minute Feature Film - In Production",
    credits: "Nations Reach International Missions · Fusion Edge Media",
    director: "Jack A Rajasekar & NRIM",
    producers: "Fusion Edge Media AI Cinematic Studio",
    image: "/images/posters/genesis-poster.jpg",
    alt: "The Book of Genesis Movie Poster",
    description:
      "A visionary chapter-based visual Bible initiative developed for Nations Reach International Missions (NRIM) and currently in production as a groundbreaking 90-minute fully AI-generated cinematic feature film.",
    videoId: "jk47kD9vq1c",
    startSeconds: 2279,
    link: "https://visualbible.nrim.org/",
  },
  {
    id: "enthiran",
    title: "Enthiran / Robot",
    year: "2010",
    category: "blockbuster",
    categoryLabel: "Hollywood & Sun Pictures",
    tagline: "If artificial intelligence outsmarts its creator, what will be the end?",
    credits: "Rajinikanth · Aishwarya Rai Bachchan · Danny Denzongpa",
    director: "S. Shankar",
    producers: "Kalanithi Maran · Sun Pictures · Hollywood VFX Unit: Legacy Effects",
    image: "/images/posters/robot-poster.jpg",
    alt: "Enthiran / Robot Blu-ray disc cover",
    description:
      "The biggest film made in Asia up to its release, bringing together over 180 Hollywood crew members and technicians from Stan Winston Studios and Legacy Effects.",
    videoId: "-Igs9ALteeI",
  },
  {
    id: "cherans-journey",
    title: "Cheran’s Journey",
    year: "2024",
    category: "series",
    categoryLabel: "SonyLIV Originals",
    tagline: "5 Lives. 5 Purposes. 1 Opportunity.",
    credits: "R Sarathkumar · Prasanna · Kalaiyarasan · Aari Arujunan · Divyabharathi",
    director: "Cheran (5-time National Award Winner)",
    producers: "Fusion Edge Media · Compass 8 Films",
    image: "/images/posters/cherans-journey.png",
    alt: "Cheran’s Journey official poster",
    description:
      "Five-time National Award-winning director Cheran makes his global OTT debut with Journey, an intense human drama streaming in 7 languages.",
    videoId: "aDzrp_5y8vQ",
    link: "https://www.sonyliv.com/shows/cherans-journey-marathi-1700001370",
  },
  {
    id: "7th-sense",
    title: "7th Sense (7aum Arivu)",
    year: "2011",
    category: "blockbuster",
    categoryLabel: "Europe & Nordic Release",
    tagline: "A Legendary Martial Arts & Sci-Fi Masterpiece",
    credits: "Surya · Shruti Haasan · Johnny Nguyen",
    director: "A.R. Murugadoss",
    producers: "Fusion Edge Media Europe Release · Udhayanidhi Stalin",
    image: "/images/posters/7th-sense.jpg",
    alt: "7th Sense / 7aum Arivu Fusion Edge Media Europe release poster",
    description:
      "High-octane martial arts sci-fi blockbuster distributed across European and Nordic cinema networks by Fusion Edge Media.",
    videoId: "cuzsQqCcm8c",
  },
  {
    id: "manmadhan-ambu",
    title: "Manmadhan Ambu",
    year: "2010",
    category: "blockbuster",
    categoryLabel: "Hollywood Unit Co-Production",
    tagline: "Romantic Action Comedy across Europe",
    credits: "Kamal Haasan · Trisha · R. Madhavan",
    director: "K.S. Ravikumar",
    producers: "Gemini · Red Giant Movies · Hollywood Exec: Jack A Rajasekar (FEM)",
    image: "/images/posters/manmadhan-ambu.jpg",
    alt: "Manmadhan Ambu film poster",
    description:
      "Shot across European cruise lines, with robot effects and Hollywood unit coordination supervised by Jack A Rajasekar and Legacy Effects.",
  },
  {
    id: "the-main-street",
    title: "The Main Street (Angaadi Theru)",
    year: "2010",
    category: "blockbuster",
    categoryLabel: "International & USA Release",
    tagline: "Rustic Neorealism that Moved Millions of Hearts",
    credits: "Mahesh · Anjali · A. Venkatesh",
    director: "Vasantabalan (Cannes Festival Recognized)",
    producers: "Ayngaran International · USA Marketing: Jack A Rajasekar / Fusion Edge",
    image: "/images/posters/the-main-street.jpg",
    alt: "The Main Street (Angaadi Theru) poster",
    description:
      "Critically acclaimed drama presented internationally and marketed in the USA by Fusion Edge Media and Jack A Rajasekar.",
  },
  {
    id: "the-farm",
    title: "The Farm",
    year: "2018",
    category: "international",
    categoryLabel: "Feature Drama",
    tagline: "Inspired by a True Story",
    credits: "Austin Chunn · Alicia Kelley",
    director: "Ryan Pace",
    producers: "Jack Rajasekar · Ryan Pace · Jamin Anderson",
    image: "/images/posters/the-farm.jpg",
    alt: "The Farm film poster",
    description:
      "A deeply moving drama inspired by a true story of resilience, family, and survival, executive produced by Jack Rajasekar.",
  },
  {
    id: "blood-and-curry",
    title: "Blood & Curry",
    year: "2011",
    category: "international",
    categoryLabel: "International Feature Thriller",
    tagline: "She came for the American dream but found a living nightmare.",
    credits: "Shaker Pictures in association with Fusion Edge Media",
    director: "Atul Sharma",
    producers: "Deon Louw · Jack A Rajasekar",
    image: "/images/posters/blood-and-curry.jpg",
    alt: "Blood & Curry poster artwork",
    description:
      "A gripping international crime thriller exploring cross-border migration, identity, and darkness, produced in collaboration with Fusion Edge Media.",
  },
  {
    id: "the-norwegian",
    title: "The Norwegian",
    year: "2012",
    category: "international",
    categoryLabel: "Cross-Continental Feature",
    tagline: "An International Mystery across Borders",
    credits: "Peter Braathen · Gabriel Schwalenstocker · Daniel Aldema",
    director: "Ryan Kai",
    producers: "Fusion Edge Media International Distribution",
    image: "/images/posters/the-norwegian.png",
    alt: "The Norwegian film poster artwork",
    description:
      "International feature drama following a mysterious diplomatic thriller, released through Fusion Edge Media distribution.",
  },
  {
    id: "the-enemy-god",
    title: "The Enemy God",
    year: "2010",
    category: "international",
    categoryLabel: "Award-Winning World Feature",
    tagline: "In the realm of spirits, will he surrender to his greatest foe?",
    credits: "Jack A Rajasekar Presents · Multi-Award Winner",
    director: "Christopher Bessette",
    producers: "Matt Castagna · Tom Khazoyan · Exec: Jack A Rajasekar",
    image: "/images/posters/the-enemy-god.jpg",
    alt: "The Enemy God film poster",
    description:
      "Acclaimed historical ethnographic drama winning over five international festival awards, presented worldwide by Jack A Rajasekar and Fusion Edge Media.",
  },
  {
    id: "karka-kasadara",
    title: "Karka Kasadara",
    year: "2005",
    category: "international",
    categoryLabel: "Universal Studios Post-Production",
    tagline: "The First Indian Movie Mixed at Universal Studios, USA",
    credits: "Vikranth · Lakshmi Rai · Diya",
    director: "R.V. Udayakumar",
    producers: "Smartline Pictures · USA Post: Jack Rasee & Mervin Michael",
    image: "/images/posters/karka-kasadara.jpg",
    alt: "Karka Kasadara film poster",
    description:
      "Historic landmark in Indian cinema technology: the very first Indian motion picture sound-mixed on the Universal Studios lot in Hollywood.",
  },
  {
    id: "corner-mart",
    title: "Corner Mart",
    year: "2021",
    category: "afa",
    categoryLabel: "AFA & Into Action Media",
    tagline: "Tensions Rise in the Heart of the City",
    credits: "Anthony Barker · Moud Sabra · Rand Faris · Malia Diaz",
    director: "Nadar Youssef",
    producers: "Bethany Paulsen · Shana Danielle · Exec: Jack A Rajasekar",
    image: "/images/posters/corner-mart.png",
    alt: "Corner Mart film poster",
    description:
      "A fast-paced urban thriller examining culture, high stakes, and survival, executive produced by Jack A Rajasekar.",
  },
  {
    id: "silkworm",
    title: "Silkworm",
    year: "2021",
    category: "afa",
    categoryLabel: "Into Action Media & AFA",
    tagline: "Generations Bound by Secret Threads",
    credits: "Eunhee Bang · Haley Lee · Elisa Cortez",
    director: "Jamin Lee Anderson",
    producers: "Jack A Rajasekar · Music: Joanna Rajasekar",
    image: "/images/posters/silkworm.png",
    alt: "Silkworm movie poster",
    description:
      "An evocative generational drama examining maternal heritage, sacrifice, and rebirth, produced by Jack A Rajasekar.",
  },
  {
    id: "strike",
    title: "Strike",
    year: "2021",
    category: "afa",
    categoryLabel: "Into Action Media",
    tagline: "When Silence is no Longer an Option",
    credits: "Solomon Reukauf · McKenzie Glass · Aime-Lynne Perez",
    director: "Jonathan Grassmeyer",
    producers: "Script: J R Sekar · Exec: Jack A Rajasekar",
    image: "/images/posters/strike.png",
    alt: "Strike movie poster",
    description:
      "A fierce examination of working-class defiance, scripted by J R Sekar and executive produced by Jack A Rajasekar.",
  },
  {
    id: "el-restaurante",
    title: "El Restaurante",
    year: "2021",
    category: "afa",
    categoryLabel: "Into Action Media Academy",
    tagline: "Secrets Behind the Kitchen Doors",
    credits: "Beckie Aybar · Jimmy O'Rourke · Emily Davidson",
    director: "Eduardo Camacho",
    producers: "Jack A Rajasekar · Lawrence Sace · Devin Maldonado",
    image: "/images/posters/el-restaurante.png",
    alt: "El Restaurante movie poster",
    description:
      "An atmospheric psychological drama unraveling inside a nocturnal kitchen, executive produced by Jack A Rajasekar.",
  },
  {
    id: "rainy-carolina",
    title: "Rainy Carolina",
    year: "2021",
    category: "afa",
    categoryLabel: "Regent University CTVU-427",
    tagline: "Weathering the Storm Within",
    credits: "Katie Hartmann · Tom O'Brien · Josh Olson",
    director: "Tom O'Brien",
    producers: "Jack Rajasekar · Ryan Pace · Cassia Sherrill",
    image: "/images/posters/rainy-carolina.jpg",
    alt: "Rainy Carolina film poster",
    description:
      "A poignant coming-of-age feature created in partnership with university talent and executive produced by Jack Rajasekar.",
  },
  {
    id: "clueless-kevin",
    title: "Clueless Kevin",
    year: "2021",
    category: "afa",
    categoryLabel: "American Film Academy",
    tagline: "A Fast-Paced Comedy of Errors",
    credits: "Shawn Mintz · Siva Gunasegaram",
    director: "Siva and Viswa",
    producers: "American Film Academy · Exec: Jack Rajashekar, Ryan Pace",
    image: "/images/posters/clueless-kevin.jpg",
    alt: "Clueless Kevin movie poster",
    description:
      "High-energy comedy showcase developed through the American Film Academy mentoring emerging comedic directors.",
  },
  {
    id: "maayam",
    title: "Maayam",
    year: "2021",
    category: "afa",
    categoryLabel: "AFA & Into Action Media",
    tagline: "The Shadow Between Truth and Illusion",
    credits: "SK Surya · Ganesan · Reena Joslin · Subash Anthony",
    director: "Daniel Ilangovan",
    producers: "Shaker A Rajasekar · Ryan Pace · DP: Joshua Ilangovan",
    image: "/images/posters/maayam.jpg",
    alt: "Maayam movie poster",
    description:
      "Striking neo-noir drama photographed with stark chiaroscuro lighting, produced by Shaker A Rajasekar and Ryan Pace.",
  },
  {
    id: "escape",
    title: "Escape",
    year: "2021",
    category: "afa",
    categoryLabel: "American Film Academy",
    tagline: "In the Darkest Corner, the Human Spirit Fights",
    credits: "Benjamin T Schroeder · Stephen R Schroeder · Bill Q Wallace",
    director: "Benjamin T Schroeder",
    producers: "Shaker A Rajasekar · Ryan Pace",
    image: "/images/posters/escape.jpg",
    alt: "Escape film poster",
    description:
      "Intense claustrophobic thriller produced under the American Film Academy banner by Shaker A Rajasekar and Ryan Pace.",
  },
];

export interface StudioDivision {
  title: string;
  badge: string;
  tagline: string;
  description: string;
  logo: string;
  action: {
    label: string;
    href: string;
    external?: boolean;
  };
}

export const studioDivisions: StudioDivision[] = [
  {
    title: "Global Glitz",
    badge: "Streaming Division",
    tagline: "Global Streaming & Digital Distribution",
    description:
      "Our premier global streaming division connecting international audiences with groundbreaking films, original series, and faith-based visual entertainment directly at globalglitz.com.",
    logo: "/images/logos/globalglitz-logo.png",
    action: { label: "Visit Global Glitz", href: "https://globalglitz.com/", external: true },
  },
  {
    title: "American Film Academy",
    badge: "Film Academy Institution",
    tagline: "Training Tomorrow's Filmmakers, Today",
    description:
      "Our dedicated film academy institution mentoring and empowering the next generation of directors, cinematographers, and technical artists through immersive, hands-on production.",
    logo: "/images/logos/afa-logo.png",
    action: { label: "Visit AFA", href: "https://afa.education/", external: true },
  },
  {
    title: "Prossiga Media",
    badge: "Overall Media Studio Division",
    tagline: "Parent Studio & Global Co-Production Hub",
    description:
      "Our overall media studio division spearheading multi-market film co-productions, high-end visual effects infrastructure, and cross-continental film operations.",
    logo: "/images/logos/prossiga-logo.png",
    action: { label: "Visit Prossiga Media", href: "http://prossigacorp.com/", external: true },
  },
];

export const genesisDetails = {
  title: "NRIM Visual Bible Project",
  headline: "The Book of Genesis - Fully AI 90 minute Feature film - In Production",
  client: "Nations Reach International Missions (NRIM)",
  production: "Fusion Edge Media",
  aiShowreelId: "jk47kD9vq1c",
  startSeconds: 2279,
  watchChaptersUrl: "https://visualbible.nrim.org/",
  globalGlitzUrl: "https://globalglitz.com/",
  posterImage: "/images/posters/genesis-poster.jpg",
  description:
    "A visionary chapter-based visual Bible initiative developed for Nations Reach International Missions (NRIM) and currently in production as a groundbreaking 90-minute fully AI-generated cinematic feature film. Setting the standard for how biblical narrative and generative visual fidelity unite.",
  stats: [
    { value: "90 Min", label: "Feature Film" },
    { value: "37", label: "Visual Chapters" },
    { value: "Fully AI", label: "Cinematic Pipeline" },
    { value: "NRIM", label: "Mission Partner" },
  ],
};

export interface UpcomingTitle {
  id: string;
  title: string;
  posterImage: string;
  tagline?: string;
  videoId?: string;
  startSeconds?: number;
  externalUrl?: string;
}

export const upcomingTitles: UpcomingTitle[] = [
  {
    id: "genesis",
    title: "THE BOOK OF GENESIS",
    posterImage: "/images/posters/genesis-poster.jpg",
    tagline: "NRIM Visual Bible · 90-Min AI Feature Film",
    videoId: "jk47kD9vq1c",
    startSeconds: 2279,
    externalUrl: "https://visualbible.nrim.org/",
  },
  {
    id: "silkworm",
    title: "SILKWORM",
    posterImage: "/images/posters/silkworm.png",
    tagline: "Generations Bound by Secret Threads",
  },
  {
    id: "strike",
    title: "STRIKE",
    posterImage: "/images/posters/strike.png",
    tagline: "When Silence is no Longer an Option",
  },
  {
    id: "corner-mart",
    title: "CORNER MART",
    posterImage: "/images/posters/corner-mart.png",
    tagline: "Tensions Rise in the Heart of the City",
  },
  {
    id: "el-restaurante",
    title: "EL RESTAURANTE",
    posterImage: "/images/posters/el-restaurante.png",
    tagline: "Secrets Behind the Kitchen Doors",
  },
  {
    id: "the-norwegian",
    title: "THE NORWEGIAN",
    posterImage: "/images/posters/the-norwegian.png",
    tagline: "An International Mystery across Borders",
  },
  {
    id: "the-farm",
    title: "THE FARM",
    posterImage: "/images/posters/the-farm.jpg",
    tagline: "Inspired by a True Story",
  },
  {
    id: "escape",
    title: "ESCAPE",
    posterImage: "/images/posters/escape.jpg",
    tagline: "In the Darkest Corner, the Human Spirit Fights",
  },
  {
    id: "clueless-kevin",
    title: "CLUELESS KEVIN",
    posterImage: "/images/posters/clueless-kevin.jpg",
    tagline: "A Fast-Paced Comedy of Errors",
  },
];

export const inReleaseFilms = allFilmWorks.filter(
  (film) => film.category === "blockbuster" || film.category === "series" || film.category === "international"
);

export const afaFilms = allFilmWorks.filter((film) => film.category === "afa");

export const studioImage = "/images/posters/Screenshot-2025-07-22-125800.png";
