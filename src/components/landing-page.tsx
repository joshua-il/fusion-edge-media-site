import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Film,
  Menu,
  Play,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import genesisHero from "@/assets/genesis-hero.jpg";
import {
  afaFilms,
  allFilmWorks,
  featuredHeroSlides,
  type FilmWork,
  genesisDetails,
  type HeroSlide,
  inReleaseFilms,
  studioDivisions,
} from "@/data/site-content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Coming Soon", href: "#coming-soon" },
  { label: "In Release", href: "#in-release" },
  { label: "AFA Slate", href: "#afa-slate" },
  { label: "Divisions", href: "#divisions" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

interface VideoModalState {
  id: string;
  title: string;
  category?: string | undefined;
  startSeconds?: number | undefined;
}

function CinemaVideoModal({
  video,
  onClose,
}: {
  video: VideoModalState | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!video) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [video, onClose]);

  if (!video) return null;

  const startParam = video.startSeconds ? `&start=${video.startSeconds}` : "";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-reveal"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border/40 px-6 py-4 bg-background/90">
          <div>
            {video.category && (
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1d63ff]">
                {video.category}
              </span>
            )}
            <h3 className="font-display text-xl uppercase tracking-wider text-foreground sm:text-2xl">
              {video.title}
            </h3>
          </div>
          <button
            type="button"
            aria-label="Close video player"
            onClick={onClose}
            className="rounded-full border border-border/50 p-2 text-muted-foreground transition hover:border-primary hover:text-foreground cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1${startParam}`}
            title={video.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

function PosterInspectorModal({
  film,
  onClose,
  onPlayVideo,
}: {
  film: FilmWork | null;
  onClose: () => void;
  onPlayVideo: (id: string, title: string, category?: string, startSeconds?: number) => void;
}) {
  useEffect(() => {
    if (!film) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [film, onClose]);

  if (!film) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={film.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-reveal"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col md:flex-row overflow-hidden rounded-2xl border border-white/15 bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[2/3] md:w-1/2 overflow-hidden bg-black shrink-0">
          <img
            src={film.image}
            alt={film.alt}
            className="h-full w-full object-contain md:object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between p-6 md:p-8 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-[#1d63ff]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1d63ff]">
                {film.categoryLabel}
              </span>
              <button
                type="button"
                aria-label="Close poster view"
                onClick={onClose}
                className="rounded-full border border-border/50 p-1.5 text-muted-foreground transition hover:text-foreground cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <h3 className="mt-4 font-display text-3xl uppercase text-foreground md:text-4xl">
              {film.title}
            </h3>
            <span className="font-mono text-sm text-[#1d63ff] font-bold">{film.year}</span>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-foreground/80">
              {film.tagline}
            </p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{film.description}</p>

            <div className="mt-6 space-y-2 border-t border-border/40 pt-4 text-xs">
              {film.director && (
                <div>
                  <span className="font-bold text-foreground">Director:</span>{" "}
                  <span className="text-muted-foreground">{film.director}</span>
                </div>
              )}
              {film.producers && (
                <div>
                  <span className="font-bold text-foreground">Production:</span>{" "}
                  <span className="text-muted-foreground">{film.producers}</span>
                </div>
              )}
              {film.credits && (
                <div>
                  <span className="font-bold text-foreground">Starring:</span>{" "}
                  <span className="text-muted-foreground">{film.credits}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {film.videoId && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onPlayVideo(film.videoId!, film.title, "Official Reel");
                }}
                className="flex-1 rounded-full bg-[#1d63ff] hover:bg-[#1550d4] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play size={14} className="fill-current" /> Watch Video
              </button>
            )}
            {film.link && (
              <a
                href={film.link}
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 text-center"
              >
                Stream Now <ExternalLink size={14} />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/20 px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-white transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UniversalHeader({
  onPlayVfxReel,
}: {
  onPlayVfxReel: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-background/95 backdrop-blur-xl transition-all">
      <div className="page-gutter flex h-20 items-center justify-between lg:h-24">
        {/* Prominent Fusion Edge Media Studio Logo - Large, Crisp, No Box */}
        <a
          href="#top"
          aria-label="Fusion Edge Media home"
          className="relative z-50 flex items-center transition-transform hover:scale-105 focus-visible:outline-none"
        >
          <img
            src="/images/logos/fusion-edge-logo.png"
            alt="Fusion Edge Media"
            className="h-12 sm:h-14 md:h-16 w-auto object-contain"
            width="480"
            height="140"
          />
        </a>

        {/* Desktop Hollywood Studio Navigation */}
        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-bold uppercase tracking-[0.18em] text-foreground/75 hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Prominent link to Fusion Edge VFX Showreel */}
          <button
            type="button"
            onClick={onPlayVfxReel}
            className="flex items-center gap-2 rounded-full border border-[#1d63ff]/80 bg-[#1d63ff]/15 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#1d63ff] transition-all cursor-pointer shadow-lg shadow-blue-500/20"
          >
            <Play size={13} className="fill-current text-[#1d63ff] group-hover:text-white" />
            Watch VFX Reel
          </button>

          <a
            href="#contact"
            className="rounded-full border border-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground hover:border-white hover:bg-white/10 transition-all"
          >
            Contact
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((val) => !val)}
          className="relative z-50 rounded-lg p-2 text-foreground hover:bg-white/10 lg:hidden cursor-pointer"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-center bg-background/98 px-8 transition-all duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-border/40 py-3.5 font-display text-2xl uppercase tracking-wider text-foreground hover:text-[#1d63ff] transition-colors"
            >
              <span className="mr-3 font-sans text-xs text-[#1d63ff] font-bold">0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            className="rounded-full bg-[#1d63ff] text-white py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => {
              setOpen(false);
              onPlayVfxReel();
            }}
          >
            <Play size={14} className="fill-current" /> Watch VFX Reel
          </button>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="rounded-full border border-white/30 text-white py-4 text-xs font-bold uppercase tracking-wider text-center"
          >
            Contact Studio
          </a>
        </div>
      </div>
    </header>
  );
}

function UniversalHeroSlider({
  onPlayVideo,
  onInspectFilm,
}: {
  onPlayVideo: (id: string, title: string, category?: string, startSeconds?: number) => void;
  onInspectFilm: (filmId: string) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [progressKey, setProgressKey] = useState(0);

  const activeSlide: HeroSlide = featuredHeroSlides[currentIndex] ?? featuredHeroSlides[0]!;

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgressKey((k) => k + 1);
  };

  // Auto advance every 10 seconds smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % featuredHeroSlides.length;
        setProgressKey((k) => k + 1);
        return next;
      });
    }, 10000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    goToSlide((currentIndex - 1 + featuredHeroSlides.length) % featuredHeroSlides.length);
  };

  const handleNext = () => {
    goToSlide((currentIndex + 1) % featuredHeroSlides.length);
  };

  const handlePrimaryAction = (slide: HeroSlide) => {
    if (slide.primaryCta.action === "link" && slide.primaryCta.href) {
      window.open(slide.primaryCta.href, "_blank", "noopener,noreferrer");
    } else if (slide.primaryCta.action === "filmModal" && slide.primaryCta.filmId) {
      onInspectFilm(slide.primaryCta.filmId);
    }
  };

  const handleSecondaryAction = (slide: HeroSlide) => {
    if (slide.secondaryCta.action === "videoModal" && slide.secondaryCta.videoId) {
      onPlayVideo(
        slide.secondaryCta.videoId,
        slide.title,
        slide.statusLabel,
        slide.secondaryCta.startSeconds ?? slide.startSeconds
      );
    } else if (slide.secondaryCta.action === "filmModal" && slide.secondaryCta.filmId) {
      onInspectFilm(slide.secondaryCta.filmId);
    } else if (slide.secondaryCta.action === "link" && slide.secondaryCta.href) {
      window.open(slide.secondaryCta.href, "_blank", "noopener,noreferrer");
    }
  };

  const currentVideoId = activeSlide.videoId ?? "kZn8QN_uLBY";
  const startParam = activeSlide.startSeconds ? `&start=${activeSlide.startSeconds}` : "";

  return (
    <section
      id="top"
      aria-label="Fusion Edge Studio Feature Banner"
      className="relative flex min-h-[92svh] flex-col justify-between overflow-hidden pt-28 pb-10 md:pt-32 md:pb-12 border-b border-border/40"
    >
      {/* Background Cinematic Motion Video - 100% VISIBLE & CRISP, NO OVERLAY CONTROLS OR PAUSE BUTTONS */}
      <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
        {/* Crisp Backdrop Image Fallback */}
        <img
          src={activeSlide.backdropImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-in-out"
        />

        {/* Dynamic Video Iframe: Full 100% Opacity, NO CONTROLS, CONTINUOUS LOOP */}
        <iframe
          key={`${activeSlide.id}-${currentVideoId}-${isMuted}`}
          src={`https://www.youtube-nocookie.com/embed/${currentVideoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&disablekb=1&fs=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&loop=1&playlist=${currentVideoId}&vq=hd1080${startParam}`}
          title={activeSlide.title}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100svh] min-w-[177.78svh] object-cover pointer-events-none select-none scale-[1.08] opacity-100 transition-opacity duration-1000 ease-in-out"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />

        {/* Hollywood Directional Gradient: Dark on left behind text, 100% crystal clear on center & right */}
        <div className="absolute inset-0 bg-hero-scrim pointer-events-none" />

        {/* Transparent Shield Overlay - Intercepts all clicks/touches to guarantee YouTube is never paused or focused */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 select-none cursor-default bg-transparent pointer-events-auto"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        />
      </div>

      {/* Audio Mute & Expand Controls (Top Right of Hero) */}
      <div className="page-gutter relative z-20 flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={() => setIsMuted((val) => !val)}
          aria-label={isMuted ? "Unmute background audio" : "Mute background audio"}
          className="rounded-full border border-white/30 bg-black/60 p-2.5 text-white backdrop-blur-md transition hover:border-white hover:bg-black/90 cursor-pointer shadow-lg"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <button
          type="button"
          onClick={() =>
            onPlayVideo(
              currentVideoId,
              activeSlide.title,
              activeSlide.statusLabel,
              activeSlide.startSeconds
            )
          }
          className="rounded-full border border-white/30 bg-black/60 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition hover:border-white hover:bg-black/90 cursor-pointer flex items-center gap-1.5 shadow-lg"
        >
          <Play size={13} className="fill-current text-[#1d63ff]" /> Expand Video
        </button>
      </div>

      {/* Center Left Showcase Content with Smooth Cinematic Entrance */}
      <div className="page-gutter relative z-20 my-auto py-12 md:py-16 max-w-3xl">
        <div key={activeSlide.id} className="animate-hero-slide">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mb-2">
            {activeSlide.eyebrow}
          </p>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-white leading-[0.88] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            {activeSlide.title}
          </h1>

          <p className="mt-3.5 max-w-xl text-base sm:text-lg md:text-xl font-semibold text-white/95 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {activeSlide.tagline}
          </p>

          <p className="mt-2 max-w-lg text-xs sm:text-sm text-white/80 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {activeSlide.description}
          </p>

          {/* Action Buttons (Blue Solid Pill + Frosted Outline Pill) */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => handlePrimaryAction(activeSlide)}
              className="rounded-full bg-[#1d63ff] hover:bg-[#1550d4] text-white px-9 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-xl shadow-blue-500/30 flex items-center gap-2 cursor-pointer"
            >
              {activeSlide.primaryCta.label} <ArrowRight size={15} />
            </button>

            <button
              type="button"
              onClick={() => handleSecondaryAction(activeSlide)}
              className="rounded-full border border-white/50 bg-black/40 hover:border-white hover:bg-black/70 text-white backdrop-blur-md px-9 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Play size={14} className="fill-current text-[#1d63ff]" />
              {activeSlide.secondaryCta.label}
            </button>
          </div>
        </div>
      </div>

      {/* Universal Pictures Style Bottom Slider Dock */}
      <div className="page-gutter relative z-20 w-full">
        <div className="mx-auto max-w-5xl rounded-full border border-white/15 bg-black/70 px-4 py-2.5 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-3 sm:gap-6">
          {/* Arrow Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous featured film"
              className="rounded-full border border-white/20 p-2 text-white/80 hover:border-white hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next featured film"
              className="rounded-full border border-white/20 p-2 text-white/80 hover:border-white hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Film Titles Bar with Animated Progress Bar */}
          <div className="flex flex-1 items-center justify-around gap-2 overflow-x-auto hide-scrollbar">
            {featuredHeroSlides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className="group relative flex flex-col items-center px-3 py-1 cursor-pointer transition text-left"
                >
                  <span
                    className={cn(
                      "text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors whitespace-nowrap",
                      isActive ? "text-white" : "text-white/60 group-hover:text-white"
                    )}
                  >
                    {slide.title}
                  </span>
                  <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-muted-foreground">
                    {slide.statusLabel}
                  </span>

                  {/* Active Animated Progress Underline */}
                  <div className="mt-1.5 h-0.5 w-full rounded-full overflow-hidden bg-white/10">
                    {isActive ? (
                      <div
                        key={`progress-${slide.id}-${progressKey}`}
                        className="h-full bg-[#1d63ff] rounded-full"
                        style={{
                          animation: "heroDockProgress 10s linear",
                        }}
                      />
                    ) : (
                      <div className="h-full w-full bg-transparent group-hover:bg-white/20 transition-colors" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function InReleaseShelf({
  onInspectFilm,
  onPlayVideo,
}: {
  onInspectFilm: (film: FilmWork) => void;
  onPlayVideo: (id: string, title: string, category?: string, startSeconds?: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -420, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 420, behavior: "smooth" });
    }
  };

  return (
    <section id="in-release" aria-label="In Release" className="section-pad border-b border-border/40">
      <div className="page-gutter">
        {/* Universal Pictures "In Release" Top Header Row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-white/10 pb-6">
          <div>
            <p className="eyebrow text-[#1d63ff]">Theatrical & Global Streaming</p>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase text-foreground leading-none">
              In Release
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Scroll films left"
              className="rounded-full border border-white/20 bg-card p-3 text-foreground hover:border-white hover:bg-white/10 transition cursor-pointer"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Scroll films right"
              className="rounded-full border border-white/20 bg-card p-3 text-foreground hover:border-white hover:bg-white/10 transition cursor-pointer"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Blue Progress Bar Accent (Exact Universal Screenshot) */}
        <div className="h-1 w-full bg-white/10 mt-2 rounded-full overflow-hidden">
          <div className="h-full w-1/4 bg-[#1d63ff] rounded-full" />
        </div>

        {/* Horizontal Film Poster Carousel */}
        <div
          ref={scrollRef}
          className="mt-8 flex gap-6 overflow-x-auto pb-6 pt-2 hide-scrollbar scroll-smooth"
        >
          {inReleaseFilms.map((film) => (
            <div
              key={film.id}
              className="group flex flex-col w-[260px] sm:w-[290px] md:w-[320px] shrink-0"
            >
              {/* 2:3 Vertical Poster Card with Hover Zoom */}
              <div
                onClick={() => onInspectFilm(film)}
                className="relative aspect-[2/3] w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-lg cursor-pointer transition-transform duration-300 group-hover:scale-[1.03] group-hover:border-white/30"
              >
                <img
                  src={film.image}
                  alt={film.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                <span className="absolute top-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md border border-white/10">
                  {film.year}
                </span>
              </div>

              {/* Title with Right Arrow */}
              <button
                type="button"
                onClick={() => onInspectFilm(film)}
                className="mt-4 text-left font-display text-xl uppercase tracking-wider text-foreground hover:text-[#1d63ff] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>{film.title}</span>
                <ArrowRight size={16} className="text-[#1d63ff]" />
              </button>

              <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                {film.tagline}
              </p>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onInspectFilm(film)}
                  className={cn(
                    "rounded-full bg-[#1d63ff] hover:bg-[#1550d4] text-white py-2.5 text-xs font-bold uppercase tracking-wider transition-all text-center cursor-pointer shadow-md shadow-blue-500/20",
                    film.videoId ? "flex-1" : "w-full"
                  )}
                >
                  Explore Film
                </button>

                {film.videoId && (
                  <button
                    type="button"
                    onClick={() => onPlayVideo(film.videoId!, film.title, "Official Reel")}
                    className="flex-1 rounded-full border border-white/30 bg-black/50 hover:bg-white/10 text-white py-2.5 text-xs font-bold uppercase tracking-wider transition-all text-center cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Play size={12} className="fill-current text-[#1d63ff]" /> Trailer
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComingSoonSection({
  onPlayVideo,
  onInspectFilm,
}: {
  onPlayVideo: (id: string, title: string, category?: string, startSeconds?: number) => void;
  onInspectFilm: (filmId: string) => void;
}) {
  return (
    <section id="coming-soon" aria-label="Coming Soon" className="section-pad border-b border-border/40">
      <div className="page-gutter">
        {/* Universal Pictures Screenshot 3 Style Layout */}
        <div className="grid gap-12 lg:grid-cols-[380px_1fr] items-start">
          {/* Left Column: Big Bold Title & Overview */}
          <div>
            <p className="eyebrow text-[#1d63ff]">Production Pipeline</p>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl uppercase text-foreground leading-[0.88]">
              Coming
              <br />
              Soon
            </h2>
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
              Fusion Edge Media is pioneering the next era of cinematic storytelling. From
              groundbreaking generative AI features to international co-productions, explore what is
              next on our horizon.
            </p>
            <a
              href={genesisDetails.watchChaptersUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#1d63ff] hover:text-white transition-colors"
            >
              Explore NRIM Chapters Online <ArrowRight size={14} />
            </a>
          </div>

          {/* Right Column: Centerpiece Feature - NRIM Visual Bible Project: The Book of Genesis */}
          <div className="rounded-2xl border border-white/15 bg-card/60 p-6 md:p-8 backdrop-blur-xl relative overflow-hidden">
            {/* Background art glow */}
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#1d63ff]/20 blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Poster Art - High-Impact Genesis Portrait Poster */}
              <div className="relative aspect-[2/3] w-full max-w-[280px] sm:max-w-[320px] shrink-0 overflow-hidden rounded-xl border border-white/20 bg-black shadow-2xl group">
                <img
                  src={genesisDetails.posterImage}
                  alt="The Book of Genesis Poster"
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 rounded-full bg-[#1d63ff] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  In Production
                </span>
              </div>

              {/* Information & Actions */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4">
                    <img
                      src="/images/logos/nrim-logo-white.png"
                      alt="NRIM Logo"
                      className="h-10 w-auto object-contain opacity-90"
                      width="160"
                      height="40"
                    />
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1d63ff] border border-white/10">
                      Visual Bible Project
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-3xl sm:text-5xl uppercase tracking-tight text-foreground">
                    {genesisDetails.title}
                  </h3>

                  <p className="mt-2 text-base sm:text-lg font-bold uppercase tracking-wider text-[#1d63ff]">
                    {genesisDetails.headline}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {genesisDetails.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-white/10 py-4">
                    {genesisDetails.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="font-display text-2xl uppercase text-foreground">{stat.value}</p>
                        <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pill Action Buttons (Exact User Request) */}
                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href={genesisDetails.watchChaptersUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[#1d63ff] hover:bg-[#1550d4] text-white px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2 cursor-pointer"
                  >
                    Watch Chapters <ExternalLink size={15} />
                  </a>

                  <button
                    type="button"
                    onClick={() =>
                      onPlayVideo(
                        genesisDetails.aiShowreelId,
                        "The Book of Genesis",
                        "In Production",
                        genesisDetails.startSeconds
                      )
                    }
                    className="rounded-full border border-white/40 bg-black/40 hover:border-white hover:bg-black/60 text-white backdrop-blur-md px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Play size={14} className="fill-current text-[#1d63ff]" />
                    Watch Teaser
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AmericanFilmAcademySlate({
  onInspectFilm,
}: {
  onInspectFilm: (film: FilmWork) => void;
}) {
  return (
    <section id="afa-slate" aria-label="American Film Academy Slate" className="section-pad border-b border-border/40">
      <div className="page-gutter">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-white/10 pb-6">
          <div>
            <p className="eyebrow text-[#1d63ff]">American Film Academy & Indie Productions</p>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase text-foreground leading-none">
              AFA Production Slate
            </h2>
          </div>
          <a
            href="https://afa.education/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#1d63ff] hover:text-white transition-colors"
          >
            Visit AFA Education <ExternalLink size={14} />
          </a>
        </div>

        {/* 8 Film Poster Cards Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {afaFilms.map((film) => (
            <div
              key={film.id}
              onClick={() => onInspectFilm(film)}
              className="group flex flex-col cursor-pointer"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-lg transition-transform duration-300 group-hover:scale-[1.03] group-hover:border-white/30">
                <img
                  src={film.image}
                  alt={film.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-75 group-hover:opacity-50 transition-opacity" />
                <span className="absolute top-3 right-3 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md border border-white/10">
                  {film.year}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <h4 className="font-display text-lg uppercase tracking-wider text-foreground group-hover:text-[#1d63ff] transition-colors">
                  {film.title} →
                </h4>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-1">{film.tagline}</p>

              <button
                type="button"
                className="mt-3 rounded-full border border-white/20 bg-card py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground group-hover:border-[#1d63ff] group-hover:text-white transition-all text-center cursor-pointer"
              >
                Explore Film
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudioDivisionsSection() {
  return (
    <section id="divisions" aria-label="Studio Divisions" className="section-pad border-b border-border/40">
      <div className="page-gutter">
        <p className="eyebrow text-[#1d63ff]">Global Ecosystem</p>
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase text-foreground leading-none">
          Studio Divisions
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {studioDivisions.map((div) => (
            <div
              key={div.title}
              className="flex flex-col justify-between rounded-2xl border border-white/15 bg-card/60 p-6 md:p-8 backdrop-blur-xl transition hover:border-[#1d63ff]/60 group"
            >
              <div>
                {/* Authentic Division Brand Logo Header */}
                <div className="h-16 flex items-center justify-start mb-6">
                  {div.title === "American Film Academy" ? (
                    <div className="h-14 px-3 py-1.5 rounded-lg bg-white flex items-center shadow-md">
                      <img
                        src={div.logo}
                        alt={`${div.title} Logo`}
                        className="h-full w-auto object-contain"
                        width="200"
                        height="56"
                      />
                    </div>
                  ) : div.title === "Prossiga Media" ? (
                    <div className="flex items-center gap-3">
                      <img
                        src={div.logo}
                        alt={`${div.title} Logo`}
                        className="h-14 w-auto object-contain drop-shadow-[0_0_15px_rgba(29,99,255,0.3)] transition-transform duration-300 group-hover:scale-105"
                        width="80"
                        height="56"
                      />
                      <span className="font-display text-2xl uppercase tracking-wider text-foreground">
                        Prossiga Media
                      </span>
                    </div>
                  ) : (
                    <img
                      src={div.logo}
                      alt={`${div.title} Logo`}
                      className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      width="200"
                      height="56"
                    />
                  )}
                </div>

                <span className="rounded-full bg-[#1d63ff]/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#1d63ff]">
                  {div.badge}
                </span>

                <h3 className="mt-4 font-display text-2xl uppercase tracking-wider text-foreground sm:text-3xl">
                  {div.title}
                </h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-foreground/80">
                  {div.tagline}
                </p>
                <p className="mt-4 text-xs leading-6 text-muted-foreground">
                  {div.description}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <a
                  href={div.action.href}
                  target={div.action.external ? "_blank" : undefined}
                  rel={div.action.external ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#1d63ff] hover:text-white transition-colors"
                >
                  {div.action.label} <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" aria-label="Studio Contact" className="section-pad border-b border-border/40">
      <div className="page-gutter">
        <div className="rounded-3xl border border-white/15 bg-card/70 p-8 sm:p-12 md:p-16 backdrop-blur-2xl text-center relative overflow-hidden">
          <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-[#1d63ff]/20 blur-3xl pointer-events-none" />

          <p className="eyebrow text-[#1d63ff]">Connect Continents</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase text-foreground leading-[0.88]">
            Let’s Make
            <br />
            The Next One.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            Bring your feature production, co-production, or worldwide distribution conversation to
            Fusion Edge Media.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+18189628062"
              className="rounded-full bg-[#1d63ff] hover:bg-[#1550d4] text-white px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2"
            >
              Call Studio: +1 818 962 8062 <ArrowRight size={16} />
            </a>

            <a
              href="https://fusionedgemedia.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2"
            >
              Visit fusionedgemedia.com <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function UniversalFooter() {
  return (
    <footer className="border-t border-white/10 bg-background">
      <div className="page-gutter grid gap-10 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          {/* Big clean logo - No box */}
          <a href="#top" aria-label="Fusion Edge Media">
            <img
              src="/images/logos/fusion-edge-logo.png"
              alt="Fusion Edge Media"
              className="h-12 md:h-14 w-auto object-contain"
              width="480"
              height="140"
            />
          </a>
          <p className="mt-4 max-w-sm text-xs leading-6 text-muted-foreground">
            Connecting continents in filmmaking. Bridging Hollywood, Indian cinema, and global
            theatrical markets with cutting-edge visual technology and premier storytelling.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">Films & Slate</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#coming-soon" className="hover:text-[#1d63ff]">
                The Book of Genesis (AI)
              </a>
            </li>
            <li>
              <a href="#in-release" className="hover:text-[#1d63ff]">
                In Release
              </a>
            </li>
            <li>
              <a href="#afa-slate" className="hover:text-[#1d63ff]">
                American Film Academy Slate
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">Divisions</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="https://globalglitz.com/" target="_blank" rel="noreferrer" className="hover:text-[#1d63ff]">
                Global Glitz (Streaming)
              </a>
            </li>
            <li>
              <a href="https://afa.education/" target="_blank" rel="noreferrer" className="hover:text-[#1d63ff]">
                American Film Academy
              </a>
            </li>
            <li>
              <a href="http://prossigacorp.com/" target="_blank" rel="noreferrer" className="hover:text-[#1d63ff]">
                Prossiga Media
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">Studio Office</p>
          <p className="mt-4 text-xs leading-6 text-muted-foreground">
            P.O. Box 65154
            <br />
            Virginia Beach, VA 23464, US
          </p>
          <a
            href="tel:+18189628062"
            className="mt-3 inline-block text-xs font-bold text-[#1d63ff] hover:underline"
          >
            +1 818 962 8062
          </a>
        </div>
      </div>

      <div className="page-gutter flex flex-col gap-3 border-t border-border/40 py-6 text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Fusion Edge Media. All rights reserved.</span>
        <span>A Prossiga Corp Company</span>
      </div>
    </footer>
  );
}

export function LandingPage() {
  const [activeVideo, setActiveVideo] = useState<VideoModalState | null>(null);
  const [activeFilm, setActiveFilm] = useState<FilmWork | null>(null);

  const handlePlayVideo = (
    id: string,
    title: string,
    category?: string,
    startSeconds?: number
  ) => {
    setActiveVideo({ id, title, category, startSeconds });
  };

  const handleInspectFilm = (filmOrId: FilmWork | string) => {
    if (typeof filmOrId === "string") {
      const match = allFilmWorks.find((f) => f.id === filmOrId);
      if (match) setActiveFilm(match);
    } else {
      setActiveFilm(filmOrId);
    }
  };

  const handlePlayVfxReel = () => {
    // Official Fusion Edge VFX Showreel
    setActiveVideo({
      id: "-Igs9ALteeI",
      title: "Fusion Edge Media - Enthiran Hollywood VFX Collaboration",
      category: "Official VFX Reel",
      startSeconds: 0,
    });
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Universal Pictures Style Header with Large Unboxed Logo */}
      <UniversalHeader onPlayVfxReel={handlePlayVfxReel} />

      <main>
        {/* Full Bleed Universal Studio Hero Banner with Dock Slider */}
        <UniversalHeroSlider
          onPlayVideo={handlePlayVideo}
          onInspectFilm={handleInspectFilm}
        />

        {/* Section 1: Coming Soon - Spotlight on NRIM Visual Bible: The Book of Genesis */}
        <ComingSoonSection
          onPlayVideo={handlePlayVideo}
          onInspectFilm={handleInspectFilm}
        />

        {/* Section 2: In Release - Universal Horizontal Poster Shelf */}
        <InReleaseShelf
          onInspectFilm={handleInspectFilm}
          onPlayVideo={handlePlayVideo}
        />

        {/* Section 3: American Film Academy Slate - 8 Real Indie Features */}
        <AmericanFilmAcademySlate onInspectFilm={handleInspectFilm} />

        {/* Section 4: Studio Divisions */}
        <StudioDivisionsSection />

        {/* Section 5: Studio Contact & Headquarter */}
        <ContactSection />
      </main>

      {/* Universal Studio Footer */}
      <UniversalFooter />

      {/* Video Modal Player */}
      <CinemaVideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />

      {/* Film Poster Inspector Modal */}
      <PosterInspectorModal
        film={activeFilm}
        onClose={() => setActiveFilm(null)}
        onPlayVideo={handlePlayVideo}
      />
    </div>
  );
}
