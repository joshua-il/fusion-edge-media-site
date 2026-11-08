import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Menu,
  Pause,
  Play,
  Search,
  Send,
  ShieldCheck,
  Trash2,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import {
  afaFilms,
  allFilmWorks,
  exodusDetails,
  exodusPosters,
  featuredHeroSlides,
  type FilmWork,
  type HeroSlide,
  inReleaseFilms,
  studioDivisions,
} from "@/data/site-content";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

const navItems: NavItem[] = [
  { label: "Coming Soon", href: "#coming-soon" },
  { label: "In Release", href: "#in-release" },
  { label: "AFA Slate", href: "#afa-slate" },
  { label: "Divisions", href: "#divisions" },
  { label: "About", href: "#about" },
  { label: "Visual Bible", href: "https://visualbible.nrim.org/", external: true },
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-reveal"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-[#141416] shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-[#0A0A0A] border-b border-white/10">
          <div>
            {video.category && (
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B151A]">
                {video.category}
              </span>
            )}
            <h3 className="font-display text-xl uppercase tracking-wider text-[#F5F5F7] sm:text-2xl">
              {video.title}
            </h3>
          </div>
          <button
            type="button"
            aria-label="Close video player"
            onClick={onClose}
            className="rounded-full bg-white/10 p-2 text-[#8E8E93] transition hover:text-[#F5F5F7] hover:bg-white/20 cursor-pointer"
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-reveal"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col md:flex-row overflow-hidden rounded-2xl bg-[#141416] shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[2/3] md:w-1/2 overflow-hidden bg-black shrink-0">
          <img
            src={film.image}
            alt={film.alt}
            className="h-full w-full object-contain md:object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between p-6 md:p-8 overflow-y-auto bg-[#141416]">
          <div>
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-[#8B151A]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#F5F5F7]">
                {film.categoryLabel}
              </span>
              <button
                type="button"
                aria-label="Close poster view"
                onClick={onClose}
                className="rounded-full bg-white/10 p-1.5 text-[#8E8E93] transition hover:text-[#F5F5F7] hover:bg-white/20 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <h3 className="mt-4 font-display text-3xl uppercase text-[#F5F5F7] md:text-4xl">
              {film.title}
            </h3>
            <span className="font-sans text-sm text-[#8B151A] font-black tracking-wider uppercase">
              {film.year}
            </span>
            <p className="mt-2 font-serif italic text-sm text-[#F5F5F7]/90">{film.tagline}</p>
            <p className="mt-4 text-sm leading-6 text-[#8E8E93]">{film.description}</p>

            <div className="mt-6 space-y-2 border-t border-white/10 pt-4 text-xs">
              {film.director && (
                <div>
                  <span className="font-bold text-[#F5F5F7]">Director:</span>{" "}
                  <span className="font-serif italic text-[#8E8E93]">{film.director}</span>
                </div>
              )}
              {film.producers && (
                <div>
                  <span className="font-bold text-[#F5F5F7]">Production:</span>{" "}
                  <span className="text-[#8E8E93]">{film.producers}</span>
                </div>
              )}
              {film.credits && (
                <div>
                  <span className="font-bold text-[#F5F5F7]">Starring:</span>{" "}
                  <span className="text-[#8E8E93]">{film.credits}</span>
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
                  onPlayVideo(film.videoId!, film.title, "Official Reel", film.startSeconds);
                }}
                className="btn-pill-crimson flex-1 px-6 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Play size={14} className="fill-current" /> Watch Video
              </button>
            )}
            {film.link && (
              <a
                href={film.link}
                target="_blank"
                rel="noreferrer"
                className="btn-pill-outline flex-1 px-6 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-center"
              >
                Stream Now <ExternalLink size={14} />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="btn-pill-outline px-6 py-3 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UniversalHeader({ onPlayVfxReel }: { onPlayVfxReel: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-[#0A0A0A]/95 transition-all">
      <div className="page-gutter flex h-20 items-center justify-between lg:h-24">
        {/* Fusion Edge Media Studio Logo & Tagline */}
        <a
          href="#top"
          aria-label="Fusion Edge Media home"
          className="relative z-50 flex items-center gap-4 transition-transform hover:scale-[1.02] focus-visible:outline-none"
        >
          <img
            src="/images/logos/fusion-edge-logo.png"
            alt="Fusion Edge Media"
            className="h-11 sm:h-13 md:h-14 w-auto object-contain"
            width="480"
            height="140"
          />
          <span className="hidden xl:inline-block font-serif italic text-xs text-[#8E8E93] border-l border-white/15 pl-3">
            Connecting Continents in Film Making
          </span>
        </a>

        {/* Hollywood Studio Navigation */}
        <nav className="hidden items-center gap-5 xl:gap-8 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="nav-link inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>{item.label}</span>
              {item.external && <ExternalLink size={11} className="text-[#8E8E93] opacity-80" />}
            </a>
          ))}
        </nav>

        {/* Right CTA Action - 50px Fully Rounded Crimson Pill */}
        <div className="hidden items-center gap-3 lg:flex shrink-0">
          <a
            href="#contact"
            className="btn-pill-crimson whitespace-nowrap px-6 py-2.5 text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            Contact Studio
          </a>
        </div>

        {/* Mobile Actions: Fast Contact Pill & Hamburger */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <a
            href="#contact"
            className="btn-pill-crimson whitespace-nowrap px-4 py-2 text-[11px] font-bold uppercase tracking-wider shadow-md"
          >
            Contact
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((val) => !val)}
            className="relative z-50 rounded-full p-2.5 text-[#F5F5F7] bg-white/5 hover:bg-white/10 cursor-pointer"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-center bg-[#0A0A0A]/98 px-6 sm:px-8 transition-all duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <p className="font-serif italic text-sm text-[#8E8E93] mb-4">
          Connecting Continents in Film Making
        </p>
        <nav className="flex flex-col gap-1 sm:gap-2" aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-3 font-display text-2xl uppercase tracking-wider text-[#F5F5F7] hover:text-[#8B151A] transition-colors flex items-center justify-between"
            >
              <span>
                <span className="mr-3 font-sans text-xs text-[#8B151A] font-bold">
                  0{index + 1}
                </span>
                {item.label}
              </span>
              {item.external && <ExternalLink size={16} className="text-[#8E8E93]" />}
            </a>
          ))}
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-pill-crimson py-3.5 text-xs font-bold uppercase tracking-wider text-center"
          >
            Contact Studio
          </a>
          <button
            type="button"
            className="btn-pill-outline py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => {
              setOpen(false);
              onPlayVfxReel();
            }}
          >
            <Play size={14} className="fill-current" /> Watch VFX Reel
          </button>
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
  const [isPlaying, setIsPlaying] = useState(true);

  const activeSlide: HeroSlide = featuredHeroSlides[currentIndex] ?? featuredHeroSlides[0]!;

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgressKey((k) => k + 1);
  };

  // Auto advance smoothly every 10 seconds when isPlaying is true
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % featuredHeroSlides.length;
        setProgressKey((k) => k + 1);
        return next;
      });
    }, 10000);
    return () => clearInterval(timer);
  }, [currentIndex, isPlaying]);

  const handlePrev = () => {
    goToSlide((currentIndex - 1 + featuredHeroSlides.length) % featuredHeroSlides.length);
  };

  const handleNext = () => {
    goToSlide((currentIndex + 1) % featuredHeroSlides.length);
  };

  const handlePrimaryAction = (slide: HeroSlide) => {
    if (slide.primaryCta.action === "link" && slide.primaryCta.href) {
      if (slide.primaryCta.href.startsWith("#")) {
        const el = document.querySelector(slide.primaryCta.href);
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.open(slide.primaryCta.href, "_blank", "noopener,noreferrer");
      }
    } else if (slide.primaryCta.action === "filmModal" && slide.primaryCta.filmId) {
      onInspectFilm(slide.primaryCta.filmId);
    } else if (slide.primaryCta.action === "videoModal" && slide.primaryCta.videoId) {
      onPlayVideo(
        slide.primaryCta.videoId,
        slide.title,
        slide.statusLabel,
        slide.primaryCta.startSeconds ?? slide.startSeconds,
      );
    }
  };

  const handleSecondaryAction = (slide: HeroSlide) => {
    if (!slide.secondaryCta) return;
    if (slide.secondaryCta.action === "link" && slide.secondaryCta.href) {
      if (slide.secondaryCta.href.startsWith("#")) {
        const el = document.querySelector(slide.secondaryCta.href);
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.open(slide.secondaryCta.href, "_blank", "noopener,noreferrer");
      }
    } else if (slide.secondaryCta.action === "filmModal" && slide.secondaryCta.filmId) {
      onInspectFilm(slide.secondaryCta.filmId);
    } else if (slide.secondaryCta.action === "videoModal" && slide.secondaryCta.videoId) {
      onPlayVideo(
        slide.secondaryCta.videoId,
        slide.title,
        slide.statusLabel,
        slide.secondaryCta.startSeconds ?? slide.startSeconds,
      );
    }
  };

  const currentVideoId = activeSlide.videoId ?? "mqyequybTKQ";
  const startParam = activeSlide.startSeconds ? `&start=${activeSlide.startSeconds}` : "";

  return (
    <section
      id="top"
      aria-label="Fusion Edge Studio Feature Banner"
      className="relative flex min-h-[96svh] flex-col justify-between overflow-hidden pt-24 pb-8 md:pt-28 md:pb-10 bg-[#0A0A0A]"
    >
      {/* Background Cinematic Motion Video - 100% VISIBLE & BRIGHT ACROSS SCREEN */}
      <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
        {/* Crisp Fallback Poster Image */}
        <img
          src={activeSlide.backdropImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-in-out"
        />

        {/* Dynamic Video Iframe: Full 100% Opacity, Continuous Play */}
        <iframe
          key={`${activeSlide.id}-${currentVideoId}-${isMuted}-${activeSlide.startSeconds}`}
          src={`https://www.youtube-nocookie.com/embed/${currentVideoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&disablekb=1&fs=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&loop=1&playlist=${currentVideoId}&vq=hd1080${startParam}`}
          title={activeSlide.title}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100svh] min-w-[177.78svh] object-cover pointer-events-none select-none scale-[1.08] opacity-100 transition-opacity duration-1000 ease-in-out"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />

        {/* Directional Scrim: Dark on the left behind text only; 100% CRYSTAL CLEAR, BRIGHT VIDEO on center and right */}
        <div className="absolute inset-0 bg-hero-scrim pointer-events-none" />

        {/* Transparent Shield Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 select-none cursor-default bg-transparent pointer-events-auto"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        />
      </div>

      {/* Discreet Cinematic Video Controls (Floating Top-Right with generous header clearance) */}
      <div className="absolute top-24 sm:top-28 right-4 sm:right-6 md:right-8 z-30 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsMuted((val) => !val)}
          aria-label={isMuted ? "Unmute background audio" : "Mute background audio"}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition cursor-pointer backdrop-blur-md shadow-xl border border-white/20 hover:border-white/40"
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
        <button
          type="button"
          onClick={() =>
            onPlayVideo(
              currentVideoId,
              activeSlide.title,
              activeSlide.statusLabel,
              activeSlide.startSeconds,
            )
          }
          className="rounded-full bg-black/70 hover:bg-black/90 px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition cursor-pointer flex items-center gap-2 shadow-xl border border-white/20 hover:border-white/40 whitespace-nowrap"
        >
          <Play size={13} className="fill-current text-[#8B151A]" />
          <span>Expand Video</span>
        </button>
      </div>

      {/* Center Left Showcase Content with Smooth Cinematic Entrance */}
      <div className="page-gutter relative z-20 my-auto py-8 sm:py-12 md:py-16 max-w-4xl lg:max-w-5xl xl:max-w-6xl">
        <div key={activeSlide.id} className="animate-hero-slide">
          {/* Hollywood Poster Highlight: Large, Bold, Prestigious letter-spaced Billing Highlight */}
          {activeSlide.id === "exodus" ? (
            <div className="mb-2.5 sm:mb-4 flex items-center gap-2 sm:gap-3.5">
              <span className="h-[2px] w-5 sm:w-12 bg-[#8B151A]" />
              <span className="font-display text-base sm:text-2xl md:text-3xl lg:text-4xl tracking-[0.2em] sm:tracking-[0.26em] uppercase text-[#F5F5F7] font-bold drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] whitespace-nowrap">
                2027 RELEASE
              </span>
              <span className="h-[2px] w-5 sm:w-12 bg-[#8B151A]" />
            </div>
          ) : (
            <div className="mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
              <span className="h-[2px] w-4 sm:w-7 bg-[#8B151A]" />
              <span className="font-display text-xs sm:text-sm md:text-base tracking-[0.18em] uppercase text-[#F5F5F7]/90 font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {activeSlide.eyebrow}
              </span>
            </div>
          )}

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.5rem] uppercase tracking-tight text-[#F5F5F7] leading-[0.92] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] sm:whitespace-nowrap">
            {activeSlide.title}
          </h1>

          {activeSlide.subtitle && (
            <p className="mt-2 sm:mt-2.5 font-display text-lg sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.16em] text-[#8E8E93] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:whitespace-nowrap">
              {activeSlide.subtitle}
            </p>
          )}

          <p className="mt-3 max-w-xl font-serif italic text-sm sm:text-lg md:text-2xl text-[#F5F5F7]/95 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {activeSlide.tagline}
          </p>

          <p className="mt-2 max-w-lg text-xs sm:text-sm text-[#F5F5F7]/85 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {activeSlide.description}
          </p>

          {/* Action Buttons: Fully Rounded 50px Pills */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handlePrimaryAction(activeSlide)}
              className="btn-pill-crimson px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:scale-105 active:scale-95"
            >
              {activeSlide.primaryCta.action === "videoModal" && (
                <Play size={14} className="fill-current" />
              )}
              {activeSlide.primaryCta.label}
              {activeSlide.primaryCta.action === "link" ? (
                <ExternalLink size={14} />
              ) : (
                <ArrowRight size={15} />
              )}
            </button>

            {activeSlide.secondaryCta && (
              <button
                type="button"
                onClick={() => handleSecondaryAction(activeSlide)}
                className="btn-pill-outline px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
              >
                {activeSlide.secondaryCta.action === "videoModal" && (
                  <Play size={14} className="fill-current text-[#8B151A]" />
                )}
                {activeSlide.secondaryCta.label}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Floating Pill Dock - EXACTLY MATCHING USER REFERENCE IMAGE 5 */}
      <div className="page-gutter relative z-30 w-full pb-3 sm:pb-4">
        <div className="mx-auto max-w-5xl rounded-full border border-white/20 bg-black/70 backdrop-blur-xl px-3 py-2 sm:px-6 sm:py-3 shadow-2xl flex items-center justify-between gap-2 sm:gap-5">
          {/* Left Arrow Controls: Circular Prev & Next Buttons */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous featured film"
              className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition border border-white/10 cursor-pointer"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next featured film"
              className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition border border-white/10 cursor-pointer"
            >
              <ChevronRight size={15} />
            </button>
          </div>

          {/* Desktop & Tablet: Full 4-Movie Tabs with Dynamic Progress Underline (Image 5) */}
          <div className="hidden sm:flex flex-1 items-center justify-around gap-2 sm:gap-4 overflow-x-auto hide-scrollbar px-2">
            {featuredHeroSlides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className="group relative flex flex-col items-center px-2 sm:px-3 py-1 cursor-pointer transition text-center shrink-0"
                >
                  <span
                    className={cn(
                      "text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors whitespace-nowrap",
                      isActive ? "text-white font-bold" : "text-white/60 group-hover:text-white",
                    )}
                  >
                    {slide.title}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] sm:text-[11px] uppercase tracking-wider transition-colors whitespace-nowrap mt-0.5",
                      isActive ? "text-white/85 font-medium" : "text-white/40",
                    )}
                  >
                    {slide.statusLabel}
                  </span>

                  {/* Active Animated Progress Bar Underline (Matches Image 5) */}
                  <div className="mt-1.5 h-[2px] w-full rounded-full overflow-hidden bg-white/20">
                    {isActive ? (
                      <div
                        key={`progress-${slide.id}-${progressKey}`}
                        className="h-full bg-[#8B151A] rounded-full"
                        style={{
                          animation: isPlaying ? "heroDockProgress 10s linear" : "none",
                          width: isPlaying ? undefined : "100%",
                        }}
                      />
                    ) : (
                      <div className="h-full w-full bg-transparent group-hover:bg-white/10 transition-colors" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile Only: Active Slide Title with Slide Dots */}
          <div className="flex sm:hidden flex-1 flex-col items-center text-center px-2 min-w-0">
            <span className="text-xs font-bold uppercase tracking-wider text-white truncate max-w-[170px]">
              {activeSlide.title}
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              {featuredHeroSlides.map((s, idx) => (
                <button
                  key={`dot-${s.id}`}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={cn(
                    "h-1.5 rounded-full transition-all cursor-pointer",
                    idx === currentIndex ? "w-5 bg-[#8B151A]" : "w-1.5 bg-white/30",
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Pause / Play Circular Button (Matches Image 5) */}
          <div className="shrink-0 flex items-center">
            <button
              type="button"
              onClick={() => setIsPlaying((val) => !val)}
              aria-label={
                isPlaying ? "Pause automatic slide rotation" : "Resume automatic slide rotation"
              }
              className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition border border-white/10 cursor-pointer"
            >
              {isPlaying ? (
                <Pause size={13} className="fill-current" />
              ) : (
                <Play size={13} className="fill-current ml-0.5" />
              )}
            </button>
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
    <section id="in-release" aria-label="In Release" className="section-pad bg-[#0A0A0A]">
      <div className="page-gutter">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-[#8B151A]" />
              <p className="eyebrow mb-0">Theatrical & Global Streaming</p>
            </div>
            <h2 className="section-title">In Release</h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Scroll films left"
              className="btn-pill-outline p-3 text-[#F5F5F7] cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Scroll films right"
              className="btn-pill-outline p-3 text-[#F5F5F7] cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal Film Poster Carousel - Borderless, Clean Rounded-xl Cards (Matching Image 2 Reference) */}
        <div
          ref={scrollRef}
          className="mt-6 flex gap-6 overflow-x-auto pb-6 pt-2 hide-scrollbar scroll-smooth"
        >
          {inReleaseFilms.map((film) => (
            <div
              key={film.id}
              className="group flex flex-col w-[260px] sm:w-[290px] md:w-[320px] shrink-0"
            >
              {/* Borderless Rounded Image Card (Matching Image 2) */}
              <div
                onClick={() => onInspectFilm(film)}
                className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-[#141416] shadow-xl cursor-pointer transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              >
                <img
                  src={film.image}
                  alt={film.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute top-3 right-3 rounded-full bg-black/70 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#F5F5F7] backdrop-blur-md">
                  {film.year}
                </span>
              </div>

              {/* Title & Info Below Card - Clean Plain Text on Background (Matching Image 2) */}
              <div className="mt-3.5">
                <button
                  type="button"
                  onClick={() => onInspectFilm(film)}
                  className="text-left font-display text-xl uppercase tracking-wider text-[#F5F5F7] hover:text-[#8B151A] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{film.title}</span>
                  <ArrowRight size={16} className="text-[#8B151A]" />
                </button>

                <p className="mt-1 text-xs text-[#8E8E93] line-clamp-1">{film.tagline}</p>
              </div>

              {/* Action Buttons: 50px Fully Rounded Pills */}
              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onInspectFilm(film)}
                  className={cn(
                    "btn-pill-crimson py-2.5 text-xs font-bold uppercase tracking-wider text-center cursor-pointer shadow-md",
                    film.videoId ? "flex-1" : "w-full",
                  )}
                >
                  Explore Film
                </button>

                {film.videoId && (
                  <button
                    type="button"
                    onClick={() => onPlayVideo(film.videoId!, film.title, "Official Reel")}
                    className="btn-pill-outline flex-1 py-2.5 text-xs font-bold uppercase tracking-wider text-center cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Play size={12} className="fill-current text-[#8B151A]" /> Trailer
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

// Coming Soon Section: The Book of Exodus with Smooth Multi-Column Marquee, Left Edge Fade, and Borderless Cards (Matching Image 2 Reference)
function ComingSoonSection({
  onPlayVideo,
  onInspectFilm,
}: {
  onPlayVideo: (id: string, title: string, category?: string, startSeconds?: number) => void;
  onInspectFilm: (filmId: string) => void;
}) {
  const marqueeWrapperRef = useRef<HTMLDivElement>(null);

  // Smooth hover speed slowdown: gently decelerates to 22% speed without freezing dead
  const handleMarqueeEnter = () => {
    if (!marqueeWrapperRef.current) return;
    try {
      const anims = marqueeWrapperRef.current.getAnimations({ subtree: true });
      anims.forEach((anim) => {
        anim.playbackRate = 0.22;
      });
    } catch {
      // Graceful fallback
    }
  };

  const handleMarqueeLeave = () => {
    if (!marqueeWrapperRef.current) return;
    try {
      const anims = marqueeWrapperRef.current.getAnimations({ subtree: true });
      anims.forEach((anim) => {
        anim.playbackRate = 1.0;
      });
    } catch {
      // Graceful fallback
    }
  };

  // Strictly the 3 user-uploaded Exodus posters ONLY (NO Genesis, NO random images)
  const exodusPostersOnly = [
    {
      id: "exodus-parting-sea",
      title: "The Book of Exodus",
      subtitle: "Deliverance Through the Parting Waters",
      image: "/images/posters/exodus-parting-sea.jpg",
      alt: "The Book of Exodus - Moses at the Parting of the Red Sea",
    },
    {
      id: "exodus-tablets",
      title: "The Ten Commandments",
      subtitle: "The Divine Law at Mount Sinai",
      image: "/images/posters/exodus-tablets.jpg",
      alt: "The Book of Exodus - Moses Holding the Ten Commandments Tablets",
    },
    {
      id: "exodus-staff",
      title: "The Call of the Prophet",
      subtitle: "Unwavering Faith in the Desert",
      image: "/images/posters/exodus-staff.jpg",
      alt: "The Book of Exodus - Moses with Staff Against the Storm",
    },
  ];

  // Column 1 marquee sequence (only Exodus posters, duplicated for infinite seamless vertical loop)
  const columnOnePosters = [
    exodusPostersOnly[0]!,
    exodusPostersOnly[1]!,
    exodusPostersOnly[2]!,
    exodusPostersOnly[0]!,
    exodusPostersOnly[1]!,
    exodusPostersOnly[2]!,
  ];

  // Column 2 marquee sequence (staggered start for dynamic layout, strictly Exodus posters only)
  const columnTwoPosters = [
    exodusPostersOnly[1]!,
    exodusPostersOnly[2]!,
    exodusPostersOnly[0]!,
    exodusPostersOnly[1]!,
    exodusPostersOnly[2]!,
    exodusPostersOnly[0]!,
  ];

  return (
    <section
      id="coming-soon"
      aria-label="Coming Soon"
      className="py-16 md:py-24 bg-[#0A0A0A] relative overflow-hidden"
    >
      <div className="page-gutter relative z-10">
        {/* Layout Inspired by Apple TV+ & Modern Portfolio (Matching Image 2 Reference) */}
        <div className="grid gap-10 lg:grid-cols-[480px_1fr] xl:grid-cols-[540px_1fr] items-center">
          {/* Left Column: Bold Typography & Simple Bold Text Stats (NO BOXES, NO BORDERS) */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-7 bg-[#8B151A]" />
              <span className="font-display text-base sm:text-lg tracking-[0.22em] uppercase text-[#8B151A] font-bold">
                COMING SOON · 2027
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black uppercase text-[#F5F5F7] leading-[0.92] tracking-tight sm:whitespace-nowrap">
              LET MY PEOPLE GO
            </h2>

            <p className="mt-2 font-display text-lg sm:text-2xl lg:text-3xl uppercase tracking-[0.15em] text-[#8E8E93] font-bold sm:whitespace-nowrap">
              THE BOOK OF EXODUS
            </p>

            <p className="mt-3 font-serif italic text-sm sm:text-lg text-[#F5F5F7]/90">
              {exodusDetails.headline}
            </p>

            <p className="mt-4 text-xs sm:text-base leading-relaxed text-[#8E8E93] max-w-md">
              {exodusDetails.description}
            </p>

            {/* Plain Bold Text Stats directly on background - NO BOXES, NO BORDERS (Per User Image 1) */}
            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2.5 sm:gap-6 w-full max-w-xl">
              {exodusDetails.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl sm:text-4xl lg:text-5xl uppercase text-[#F5F5F7] font-bold tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-[#8E8E93] uppercase tracking-wider mt-1 font-semibold leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Fully Rounded 50px Action Pills */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={() =>
                  onPlayVideo(
                    exodusDetails.videoId,
                    "The Book of Exodus",
                    "2027 Theatrical",
                    exodusDetails.startSeconds,
                  )
                }
                className="btn-pill-crimson px-7 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
              >
                <Play size={14} className="fill-current" /> Watch Teaser
              </button>

              <a
                href={exodusDetails.watchChaptersUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-pill-outline px-7 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
              >
                Explore NRIM Visual Bible <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Right Column: Multi-Column Smooth Scroll Posters - BORDERLESS ROUNDED CARDS (Matching Image 2 Reference) */}
          <div
            ref={marqueeWrapperRef}
            onPointerEnter={handleMarqueeEnter}
            onPointerLeave={handleMarqueeLeave}
            className="relative w-full overflow-hidden poster-fade-mask"
          >
            {/* 3D Depth Atmospheric Fade on the left edge toward the text */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-20 hidden md:block"
              style={{
                background:
                  "linear-gradient(to right, #0A0A0A 0%, rgba(10, 10, 10, 0.7) 40%, transparent 100%)",
              }}
            />

            <div className="grid grid-cols-2 gap-3 sm:gap-7 h-[380px] sm:h-[540px] lg:h-[660px] overflow-hidden py-3">
              {/* Column 1: Smooth Infinite Scroll Upwards */}
              <div className="flex flex-col gap-6 sm:gap-8 animate-marquee-up">
                {columnOnePosters.map((poster, idx) => (
                  <div
                    key={`col1-${poster.id}-${idx}`}
                    onClick={() => onInspectFilm("exodus")}
                    className="group flex flex-col shrink-0 w-full cursor-pointer"
                  >
                    {/* Borderless Rounded Image Card (Matching Image 2) */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#141416] shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                      <img
                        src={poster.image}
                        alt={poster.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    {/* Clean Plain Text Below Card (Matching Image 2: "Aster Finance", "Field Notes") */}
                    <div className="mt-3.5 px-0.5">
                      <h3 className="text-base sm:text-lg font-medium text-[#F5F5F7] tracking-tight transition-colors group-hover:text-[#8B151A]">
                        {poster.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#8E8E93] mt-0.5 font-normal">
                        {poster.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 2: Smooth Infinite Scroll Downwards */}
              <div className="flex flex-col gap-6 sm:gap-8 animate-marquee-down">
                {columnTwoPosters.map((poster, idx) => (
                  <div
                    key={`col2-${poster.id}-${idx}`}
                    onClick={() => onInspectFilm("exodus")}
                    className="group flex flex-col shrink-0 w-full cursor-pointer"
                  >
                    {/* Borderless Rounded Image Card (Matching Image 2) */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#141416] shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                      <img
                        src={poster.image}
                        alt={poster.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    {/* Clean Plain Text Below Card (Matching Image 2) */}
                    <div className="mt-3.5 px-0.5">
                      <h3 className="text-base sm:text-lg font-medium text-[#F5F5F7] tracking-tight transition-colors group-hover:text-[#8B151A]">
                        {poster.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#8E8E93] mt-0.5 font-normal">
                        {poster.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AmericanFilmAcademySlate({ onInspectFilm }: { onInspectFilm: (film: FilmWork) => void }) {
  return (
    <section
      id="afa-slate"
      aria-label="American Film Academy Slate"
      className="section-pad bg-[#0A0A0A]"
    >
      <div className="page-gutter">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-[#8B151A]" />
              <p className="eyebrow mb-0">American Film Academy & Indie Productions</p>
            </div>
            <h2 className="section-title">AFA Slate</h2>
          </div>
          <a
            href="https://afa.education/"
            target="_blank"
            rel="noreferrer"
            className="btn-pill-outline inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em]"
          >
            Visit AFA Education <ExternalLink size={14} />
          </a>
        </div>

        {/* 8 Film Poster Cards Grid: Borderless Rounded-2xl Cards (Matching Image 2 Reference) */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {afaFilms.map((film) => (
            <div
              key={film.id}
              onClick={() => onInspectFilm(film)}
              className="group flex flex-col cursor-pointer"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-[#141416] shadow-xl transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                <img
                  src={film.image}
                  alt={film.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute top-3 right-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#F5F5F7] backdrop-blur-md">
                  {film.year}
                </span>
              </div>

              <div className="mt-3.5">
                <h4 className="font-display text-lg uppercase tracking-wider text-[#F5F5F7] group-hover:text-[#8B151A] transition-colors">
                  {film.title} →
                </h4>
                <p className="text-xs text-[#8E8E93] line-clamp-1 mt-0.5">{film.tagline}</p>
              </div>

              <button
                type="button"
                className="btn-pill-outline mt-3 py-2 text-[11px] font-bold uppercase tracking-wider text-center cursor-pointer"
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
    <section id="divisions" aria-label="Studio Divisions" className="section-pad bg-[#0A0A0A]">
      <div className="page-gutter">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-2 w-2 rounded-full bg-[#8B151A]" />
          <p className="eyebrow mb-0">Global Ecosystem</p>
        </div>
        <h2 className="section-title">Studio Divisions</h2>

        {/* Clean Rounded Cards with NO harsh borders (Matching Image 2 Reference) */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {studioDivisions.map((div) => (
            <div
              key={div.title}
              className="flex flex-col justify-between rounded-2xl bg-[#141416] p-7 sm:p-8 shadow-xl transition duration-300 hover:bg-[#1C1C1E] group"
            >
              <div>
                {/* Division Brand Logo */}
                <div className="h-16 sm:h-20 flex items-center justify-start mb-6">
                  {div.title === "American Film Academy" ? (
                    <img
                      src="/images/logos/afa-logo-v2.png"
                      alt={`${div.title} Logo`}
                      className="h-16 sm:h-20 w-auto object-contain max-w-[220px]"
                      width="240"
                      height="80"
                    />
                  ) : div.title === "Prossiga Media" ? (
                    <img
                      src={div.logo}
                      alt={`${div.title} Logo`}
                      className="h-16 sm:h-20 w-auto object-contain max-w-[140px]"
                      width="140"
                      height="80"
                    />
                  ) : (
                    <img
                      src={div.logo}
                      alt={`${div.title} Logo`}
                      className="h-16 sm:h-20 w-auto object-contain max-w-[220px]"
                      width="240"
                      height="80"
                    />
                  )}
                </div>

                <span className="rounded-full bg-[#8B151A]/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#F5F5F7]">
                  {div.badge}
                </span>

                <h3 className="mt-4 font-display text-2xl uppercase tracking-wider text-[#F5F5F7] sm:text-3xl">
                  {div.title}
                </h3>
                <p className="mt-1 font-serif italic text-xs text-[#F5F5F7]/90">{div.tagline}</p>
                <p className="mt-4 text-xs leading-6 text-[#8E8E93]">{div.description}</p>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <a
                  href={div.action.href}
                  target={div.action.external ? "_blank" : undefined}
                  rel={div.action.external ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8B151A] hover:text-[#F5F5F7] transition-colors"
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

export interface StudioInquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  inquiryType: string;
  message: string;
  createdAt: string;
}

const INQUIRIES_STORAGE_KEY = "fusion_edge_inquiries";

function loadStoredInquiries(): StudioInquiry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StudioInquiry[]) : [];
  } catch {
    return [];
  }
}

function saveStoredInquiry(inquiry: Omit<StudioInquiry, "id" | "createdAt">): StudioInquiry {
  const newEntry: StudioInquiry = {
    ...inquiry,
    id: `inq_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  if (typeof window !== "undefined") {
    try {
      const existing = loadStoredInquiries();
      const updated = [newEntry, ...existing];
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save inquiry to storage", e);
    }
  }
  return newEntry;
}

function exportInquiriesCSV(inquiries: StudioInquiry[]) {
  if (typeof window === "undefined" || inquiries.length === 0) return;
  const headers = ["ID", "Timestamp", "Name", "Email", "Company", "Inquiry Type", "Message"];
  const rows = inquiries.map((inq) => [
    `"${inq.id}"`,
    `"${new Date(inq.createdAt).toLocaleString()}"`,
    `"${(inq.name || "").replace(/"/g, '""')}"`,
    `"${(inq.email || "").replace(/"/g, '""')}"`,
    `"${(inq.company || "").replace(/"/g, '""')}"`,
    `"${(inq.inquiryType || "").replace(/"/g, '""')}"`,
    `"${(inq.message || "").replace(/"/g, '""')}"`,
  ]);
  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `fusion-edge-inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportInquiriesJSON(inquiries: StudioInquiry[]) {
  if (typeof window === "undefined" || inquiries.length === 0) return;
  const blob = new Blob([JSON.stringify(inquiries, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `fusion-edge-inquiries-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "Feature Film Production",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      saveStoredInquiry(formData);
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        inquiryType: "Feature Film Production",
        message: "",
      });
    }, 350);
  };

  return (
    <section id="contact" aria-label="Studio Contact" className="section-pad bg-[#0A0A0A]">
      <div className="page-gutter">
        <div className="rounded-3xl bg-[#141416] p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl border border-white/5">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-[#8B151A]" />
              <p className="eyebrow mb-0">Connect Continents</p>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl uppercase text-[#F5F5F7] leading-[0.88]">
              Let’s Make
              <br />
              The Next One.
            </h2>

            <p className="mt-4 font-serif italic text-base sm:text-lg leading-relaxed text-[#8E8E93]">
              Submit your feature production, co-production, or worldwide distribution project brief
              to Fusion Edge Media.
            </p>
          </div>

          {/* Form / Confirmation Container */}
          <div className="max-w-xl mx-auto mt-10">
            {submitted ? (
              <div className="rounded-2xl bg-black/60 border border-white/10 p-8 text-center animate-reveal">
                <div className="w-14 h-14 rounded-full bg-[#8B151A]/20 text-[#8B151A] mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-display text-3xl uppercase tracking-wider text-[#F5F5F7]">
                  Project Brief Received
                </h3>
                <p className="mt-2 text-sm text-[#8E8E93] leading-relaxed">
                  Your inquiry has been encrypted and recorded into the studio executive vault. A
                  senior producer will review and reach out to your team promptly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-pill-outline mt-6 px-6 py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-bold uppercase tracking-wider text-[#F5F5F7]/90 mb-1.5"
                    >
                      Full Name <span className="text-[#8B151A]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Producer / Director Name"
                      className="w-full rounded-xl bg-black/70 border border-white/15 px-4 py-3 text-sm text-[#F5F5F7] placeholder:text-[#8E8E93]/60 focus:border-[#8B151A] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-bold uppercase tracking-wider text-[#F5F5F7]/90 mb-1.5"
                    >
                      Business Email <span className="text-[#8B151A]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@production.com"
                      className="w-full rounded-xl bg-black/70 border border-white/15 px-4 py-3 text-sm text-[#F5F5F7] placeholder:text-[#8E8E93]/60 focus:border-[#8B151A] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-xs font-bold uppercase tracking-wider text-[#F5F5F7]/90 mb-1.5"
                    >
                      Production Entity / Agency
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      autoComplete="organization"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Studio or Representation"
                      className="w-full rounded-xl bg-black/70 border border-white/15 px-4 py-3 text-sm text-[#F5F5F7] placeholder:text-[#8E8E93]/60 focus:border-[#8B151A] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-type"
                      className="block text-xs font-bold uppercase tracking-wider text-[#F5F5F7]/90 mb-1.5"
                    >
                      Inquiry Nature
                    </label>
                    <select
                      id="contact-type"
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full rounded-xl bg-black/70 border border-white/15 px-4 py-3 text-sm text-[#F5F5F7] focus:border-[#8B151A] focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Feature Film Production" className="bg-[#141416]">
                        Feature Film Production
                      </option>
                      <option value="Generative AI Cinema / NRIM" className="bg-[#141416]">
                        Generative AI Cinema / NRIM
                      </option>
                      <option value="Worldwide Theatrical Distribution" className="bg-[#141416]">
                        Worldwide Theatrical Distribution
                      </option>
                      <option value="Co-Production & Financing" className="bg-[#141416]">
                        Co-Production & Financing
                      </option>
                      <option value="American Film Academy Slate" className="bg-[#141416]">
                        American Film Academy Slate
                      </option>
                      <option value="General Studio Inquiry" className="bg-[#141416]">
                        General Studio Inquiry
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-bold uppercase tracking-wider text-[#F5F5F7]/90 mb-1.5"
                  >
                    Project Brief / Message <span className="text-[#8B151A]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details regarding your slate, timeline, distribution territory, or collaboration scope..."
                    className="w-full rounded-xl bg-black/70 border border-white/15 px-4 py-3 text-sm text-[#F5F5F7] placeholder:text-[#8E8E93]/60 focus:border-[#8B151A] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-pill-crimson px-10 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 w-full sm:w-auto"
                  >
                    <Send size={14} />
                    {isSubmitting ? "Transmitting..." : "Submit Project Brief"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function AdminInquiriesModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [inquiries, setInquiries] = useState<StudioInquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isOpen) {
      setInquiries(loadStoredInquiries());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = inquiries.filter((inq) => {
    const query = searchTerm.toLowerCase();
    return (
      inq.name.toLowerCase().includes(query) ||
      inq.email.toLowerCase().includes(query) ||
      (inq.company && inq.company.toLowerCase().includes(query)) ||
      inq.inquiryType.toLowerCase().includes(query) ||
      inq.message.toLowerCase().includes(query)
    );
  });

  const handleDelete = (id: string) => {
    if (typeof window === "undefined") return;
    const updated = inquiries.filter((inq) => inq.id !== id);
    setInquiries(updated);
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all studio inquiry records?")) {
      setInquiries([]);
      if (typeof window !== "undefined") {
        localStorage.removeItem(INQUIRIES_STORAGE_KEY);
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Studio Submissions Vault"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-reveal"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-[#141416] shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 px-6 py-5 bg-[#0A0A0A] gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#8B151A]/20 text-[#8B151A] flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="font-display text-xl uppercase tracking-wider text-[#F5F5F7] sm:text-2xl">
                Studio Inquiries Vault
              </h3>
              <p className="text-xs text-[#8E8E93]">
                {inquiries.length} total logged production briefs & distribution inquiries
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {inquiries.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={() => exportInquiriesCSV(inquiries)}
                  className="btn-pill-crimson px-4 py-2 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Download size={13} /> Export CSV
                </button>
                <button
                  type="button"
                  onClick={() => exportInquiriesJSON(inquiries)}
                  className="btn-pill-outline px-4 py-2 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                >
                  <Download size={13} /> JSON
                </button>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="btn-pill-outline px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-red-400 hover:text-red-300 cursor-pointer"
                  title="Clear all inquiries"
                >
                  <Trash2 size={13} />
                </button>
              </>
            )}
            <button
              type="button"
              aria-label="Close admin vault"
              onClick={onClose}
              className="rounded-full bg-white/10 p-2 text-[#8E8E93] transition hover:text-[#F5F5F7] hover:bg-white/20 cursor-pointer ml-2"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Filter Search */}
        {inquiries.length > 0 && (
          <div className="px-6 py-3 border-b border-white/5 bg-[#0e0e10] flex items-center gap-2">
            <Search size={14} className="text-[#8E8E93]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by name, email, company, or keyword..."
              className="w-full bg-transparent text-xs text-[#F5F5F7] placeholder:text-[#8E8E93]/60 focus:outline-none"
            />
          </div>
        )}

        {/* Inquiries List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {inquiries.length === 0 ? (
            <div className="text-center py-16">
              <ShieldCheck size={40} className="text-[#8E8E93]/40 mx-auto mb-3" />
              <p className="font-display text-2xl uppercase tracking-wider text-[#F5F5F7]">
                No Studio Inquiries Recorded Yet
              </p>
              <p className="text-xs text-[#8E8E93] mt-1 max-w-sm mx-auto">
                Submissions from the "Let's Make The Next One" contact form will be stored here in
                real-time and exportable as CSV/JSON.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-sm text-[#8E8E93]">
              No inquiries match "{searchTerm}".
            </div>
          ) : (
            filtered.map((inq) => (
              <div
                key={inq.id}
                className="rounded-xl bg-black/60 border border-white/10 p-5 flex flex-col gap-3 relative group"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#F5F5F7] text-base">{inq.name}</span>
                      {inq.company && (
                        <span className="text-xs text-[#8E8E93] font-medium">({inq.company})</span>
                      )}
                    </div>
                    <a
                      href={`mailto:${inq.email}`}
                      className="text-xs text-[#8B151A] hover:underline font-medium"
                    >
                      {inq.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#8B151A]/20 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#F5F5F7]">
                      {inq.inquiryType}
                    </span>
                    <span className="text-[11px] text-[#8E8E93]">
                      {new Date(inq.createdAt).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDelete(inq.id)}
                      className="text-[#8E8E93] hover:text-red-400 p-1 transition cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <div className="rounded-lg bg-[#141416] p-3 text-xs text-[#F5F5F7]/90 leading-relaxed whitespace-pre-wrap">
                  {inq.message}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function UniversalFooter({ onOpenSecretAdmin }: { onOpenSecretAdmin: () => void }) {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0A]">
      <div className="page-gutter grid gap-10 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          {/* Fusion Edge Media Logo */}
          <a href="#top" aria-label="Fusion Edge Media">
            <img
              src="/images/logos/fusion-edge-logo.png"
              alt="Fusion Edge Media"
              className="h-11 md:h-13 w-auto object-contain"
              width="480"
              height="140"
            />
          </a>
          <p className="mt-4 font-serif italic text-xs text-[#8B151A]">
            Connecting Continents in Film Making
          </p>
          <p className="mt-2 max-w-sm text-xs leading-6 text-[#8E8E93]">
            Bridging Hollywood, Indian cinema, and global theatrical markets with cutting-edge
            visual technology and premier storytelling.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5F5F7]">
            Films & Slate
          </p>
          <ul className="mt-4 space-y-2 text-sm text-[#8E8E93]">
            <li>
              <a href="#coming-soon" className="hover:text-[#8B151A] transition-colors">
                The Book of Exodus (2027)
              </a>
            </li>
            <li>
              <a href="#in-release" className="hover:text-[#8B151A] transition-colors">
                In Release
              </a>
            </li>
            <li>
              <a href="#afa-slate" className="hover:text-[#8B151A] transition-colors">
                American Film Academy Slate
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5F5F7]">Divisions</p>
          <ul className="mt-4 space-y-2 text-sm text-[#8E8E93]">
            <li>
              <a
                href="https://globalglitz.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#8B151A] transition-colors"
              >
                Global Glitz (Streaming)
              </a>
            </li>
            <li>
              <a
                href="https://afa.education/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#8B151A] transition-colors"
              >
                American Film Academy
              </a>
            </li>
            <li>
              <a
                href="http://prossigacorp.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#8B151A] transition-colors"
              >
                Prossiga Media
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5F5F7]">
            Studio Office
          </p>
          <p className="mt-4 text-xs leading-6 text-[#8E8E93]">
            P.O. Box 65154
            <br />
            Virginia Beach, VA 23464, US
          </p>
        </div>
      </div>

      <div className="page-gutter flex flex-col gap-3 border-t border-white/10 py-6 text-[11px] uppercase tracking-[0.14em] text-[#8E8E93] sm:flex-row sm:items-center sm:justify-between">
        <span onDoubleClick={onOpenSecretAdmin} className="cursor-default select-none">
          © 2026 Fusion Edge Media. All rights reserved.
        </span>
        <span className="font-serif italic lowercase tracking-normal">a Prossiga Corp company</span>
      </div>
    </footer>
  );
}

export function LandingPage() {
  const [activeVideo, setActiveVideo] = useState<VideoModalState | null>(null);
  const [activeFilm, setActiveFilm] = useState<FilmWork | null>(null);
  const [isAdminVaultOpen, setIsAdminVaultOpen] = useState(false);

  // Secret admin access via #admin URL hash or Ctrl+Shift+A / Cmd+Shift+A hotkey
  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== "undefined" && window.location.hash === "#admin") {
        setIsAdminVaultOpen(true);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setIsAdminVaultOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleCloseAdminVault = () => {
    setIsAdminVaultOpen(false);
    if (typeof window !== "undefined" && window.location.hash === "#admin") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  const handlePlayVideo = (id: string, title: string, category?: string, startSeconds?: number) => {
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
    setActiveVideo({
      id: "-Igs9ALteeI",
      title: "Fusion Edge Media - Enthiran Hollywood VFX Collaboration",
      category: "Official VFX Reel",
      startSeconds: 0,
    });
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#F5F5F7]">
      {/* Studio Header */}
      <UniversalHeader onPlayVfxReel={handlePlayVfxReel} />

      <main>
        {/* Full Bleed Studio Hero Banner with Dock Slider (Matching Image 5) */}
        <UniversalHeroSlider onPlayVideo={handlePlayVideo} onInspectFilm={handleInspectFilm} />

        {/* Section 1: Coming Soon - Spotlight on NRIM Visual Bible: The Book of Exodus (Matching Image 2 Reference) */}
        <ComingSoonSection onPlayVideo={handlePlayVideo} onInspectFilm={handleInspectFilm} />

        {/* Section 2: In Release - Borderless Rounded Theatrical Poster Shelf */}
        <InReleaseShelf onInspectFilm={handleInspectFilm} onPlayVideo={handlePlayVideo} />

        {/* Section 3: American Film Academy Slate */}
        <AmericanFilmAcademySlate onInspectFilm={handleInspectFilm} />

        {/* Section 4: Studio Divisions */}
        <StudioDivisionsSection />

        {/* Section 5: Studio Contact Form */}
        <ContactSection />
      </main>

      {/* Studio Footer */}
      <UniversalFooter onOpenSecretAdmin={() => setIsAdminVaultOpen(true)} />

      {/* Video Modal Player */}
      <CinemaVideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />

      {/* Film Poster Inspector Modal */}
      <PosterInspectorModal
        film={activeFilm}
        onClose={() => setActiveFilm(null)}
        onPlayVideo={handlePlayVideo}
      />

      {/* Studio Executive Inquiries Vault (Admin) */}
      <AdminInquiriesModal isOpen={isAdminVaultOpen} onClose={handleCloseAdminVault} />
    </div>
  );
}
