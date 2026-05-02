"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { PROJECTS, type Project } from "@/data/projects";

const CARDS_PER_RING = 4;

// Default helix geometry. The site loads with these values; visitors can
// adjust live via the panel and reset back to these.
const HELIX_NO_SELECT_CSS = `
  .helix-stage, .helix-stage * {
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
  .helix-stage img {
    -webkit-user-drag: none;
    user-drag: none;
    pointer-events: none;
  }
  .helix-stage button img {
    pointer-events: none;
  }
`;

const TWEAK_DEFAULTS = {
  helixRadius: 440,
  ringSpacing: 280,
  autoRotateSpeed: 13,
  velocityDamping: 0.0001,
  focusDistance: 240,
  zoom: 0.6,
  centerX: 0,
  centerY: 0,
};

type Tweaks = typeof TWEAK_DEFAULTS;

export default function HelixPortfolio() {
  const [theta, setTheta] = useState(0);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [railOpen, setRailOpen] = useState(true);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [tweaks, setTweaks] = useState<Tweaks>(TWEAK_DEFAULTS);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const animationFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerDownPosRef = useRef({ x: 0, y: 0 });

  // Tweaks ref so the RAF loop reads current values without restarting
  const tweaksRef = useRef(tweaks);
  useEffect(() => {
    tweaksRef.current = tweaks;
  }, [tweaks]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkMotion = () => setPrefersReducedMotion(motionQuery.matches);

    checkMobile();
    checkMotion();
    window.addEventListener("resize", checkMobile);
    motionQuery.addEventListener("change", checkMotion);

    return () => {
      window.removeEventListener("resize", checkMobile);
      motionQuery.removeEventListener("change", checkMotion);
    };
  }, []);

  // RAF auto-rotation loop. Reads tweaks and focus state via refs so
  // we don't restart the loop on every change.
  const focusedRef = useRef<string | null>(null);
  useEffect(() => {
    focusedRef.current = focusedId;
  }, [focusedId]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const animate = () => {
      const now = Date.now();
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      const t = tweaksRef.current;

      if (!isDraggingRef.current && focusedRef.current === null) {
        const autoRotation = t.autoRotateSpeed * dt;
        setTheta((prev) => prev + autoRotation + velocityRef.current * dt);
        velocityRef.current *= Math.pow(t.velocityDamping, dt);
        if (Math.abs(velocityRef.current) < 0.01) velocityRef.current = 0;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = Date.now();
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [prefersReducedMotion]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isMobile) return;
    isDraggingRef.current = true;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
    pointerDownPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || isMobile) return;
    const dx = e.clientX - lastXRef.current;
    setTheta((prev) => prev + dx * 0.35);
    velocityRef.current = dx * 12;
    lastXRef.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || isMobile) return;
    isDraggingRef.current = false;

    const dragDistance = Math.hypot(
      e.clientX - pointerDownPosRef.current.x,
      e.clientY - pointerDownPosRef.current.y
    );

    if (dragDistance < 5 && focusedId !== null) {
      const target = e.target as HTMLElement;
      if (!target.closest(".helix-card")) setFocusedId(null);
    }
  };

  const openProject = useCallback((id: string) => {
    velocityRef.current = 0;
    setFocusedId(id);
    setGalleryIndex(0);
  }, []);

  const closeProject = useCallback(() => setFocusedId(null), []);

  const updateTweak = useCallback(<K extends keyof Tweaks>(key: K, value: Tweaks[K]) => {
    setTweaks((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetTweaks = useCallback(() => setTweaks(TWEAK_DEFAULTS), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && focusedId !== null) setFocusedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focusedId]);

  const focusedProject = PROJECTS.find((p) => p.id === focusedId) ?? null;

  return (
    <div
      className="helix-stage grid-bg"
      style={{ width: "100%", height: "100vh", position: "relative", overflow: "hidden" }}
    >
      <style>{HELIX_NO_SELECT_CSS}</style>
      <TopBar isMobile={isMobile} />

      {!isMobile && (
        <SideRail railOpen={railOpen} focusedId={focusedId} onProjectClick={openProject} />
      )}

      {!isMobile && <RailToggle open={railOpen} onToggle={() => setRailOpen(!railOpen)} />}

      <div
        ref={containerRef}
        className="helix-stage"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => (isDraggingRef.current = false)}
        style={{
          position: "absolute",
          left: 0,
          right: focusedId && !isMobile ? "440px" : 0,
          top: "40px",
          bottom: "32px",
          transition: "right 0.3s ease",
          perspective: "1600px",
          perspectiveOrigin: "50% 50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {isMobile ? (
          <MobileList onProjectClick={openProject} />
        ) : (
          <Helix theta={theta} tweaks={tweaks} focusedId={focusedId} onCardClick={openProject} />
        )}
      </div>

      {focusedProject && (
        <DetailPanel
          project={focusedProject}
          galleryIndex={galleryIndex}
          setGalleryIndex={setGalleryIndex}
          onClose={closeProject}
          isMobile={isMobile}
        />
      )}

      <BottomBar />

      {!isMobile && (
        <TweaksPanel
          open={tweaksOpen}
          onToggle={() => setTweaksOpen(!tweaksOpen)}
          tweaks={tweaks}
          onChange={updateTweak}
          onReset={resetTweaks}
        />
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// Stage
// ──────────────────────────────────────────────────────────────────

function Helix({
  theta,
  tweaks,
  focusedId,
  onCardClick,
}: {
  theta: number;
  tweaks: Tweaks;
  focusedId: string | null;
  onCardClick: (id: string) => void;
}) {
  const getCardTransform = (index: number) => {
    const ring = Math.floor(index / CARDS_PER_RING);
    const slot = index % CARDS_PER_RING;
    const baseAngle = (slot / CARDS_PER_RING) * 360 + ring * 45;
    const ringY = (ring - 1) * tweaks.ringSpacing;

    const project = PROJECTS[index];
    const isFocused = focusedId === project.id;

    // When focusing, compute the nearest equivalent of 0 deg to the current
    // rotation so we don't transition across 700+ degrees of accumulated theta.
    const liveRotation = theta + baseAngle;
    const focusedRotation = Math.round(liveRotation / 360) * 360;

    const rotateY = isFocused ? focusedRotation : liveRotation;
    const translateZ = isFocused
      ? tweaks.helixRadius + tweaks.focusDistance
      : tweaks.helixRadius;
    const translateY = isFocused ? 0 : ringY;

    return {
      transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px) translateY(${translateY}px) rotateY(${-rotateY}deg)`,
      opacity: isFocused ? 1 : focusedId ? 0.2 : 1,
      filter: focusedId && !isFocused ? "grayscale(1)" : "grayscale(0)",
      transition: isFocused
        ? "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
        : "opacity 0.3s, filter 0.3s",
    };
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        transformStyle: "preserve-3d",
        transform: `scale(${tweaks.zoom}) translate(${tweaks.centerX}px, ${tweaks.centerY}px)`,
      }}
    >
      {PROJECTS.map((project, index) => {
        const cardStyle = getCardTransform(index);
        const isFocused = focusedId === project.id;

        return (
          <div
            key={project.id}
            className="helix-card"
            onClick={(e) => {
              e.stopPropagation();
              if (!isFocused) onCardClick(project.id);
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-144px",
              marginLeft: "-120px",
              width: "240px",
              height: "288px",
              background: "#f4f1ea",
              border: "2px solid #111",
              boxShadow: "6px 6px 0 0 #111",
              transformStyle: "preserve-3d",
              cursor: isFocused ? "default" : "pointer",
              ...cardStyle,
            }}
            onMouseEnter={(e) => {
              if (!focusedId) {
                e.currentTarget.style.borderColor = "#ff3b00";
                e.currentTarget.style.boxShadow = "6px 6px 0 0 #ff3b00";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#111";
              e.currentTarget.style.boxShadow = "6px 6px 0 0 #111";
            }}
          >
            <CardImage src={project.hero} alt={project.title} height={180} />
            <div style={{ padding: "16px" }}>
              <div
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  marginBottom: "8px",
                  color: "var(--ink-soft)",
                }}
              >
                {project.number} · {project.year}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: 1.3,
                }}
              >
                {project.title}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  marginTop: "8px",
                }}
              >
                {project.type}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MobileList({ onProjectClick }: { onProjectClick: (id: string) => void }) {
  return (
    <div className="mobile-list" style={{ width: "100%", height: "100%", overflowY: "auto", padding: "20px" }}>
      <div
        style={{
          fontFamily: "var(--font-instrument-serif)",
          fontSize: "32px",
          marginBottom: "8px",
        }}
      >
        Ben Speedy
      </div>
      <div
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontSize: "14px",
          color: "var(--ink-soft)",
          marginBottom: "32px",
          lineHeight: 1.7,
        }}
      >
        An index of work.
      </div>

      {PROJECTS.map((project) => (
        <button
          key={project.id}
          onClick={() => onProjectClick(project.id)}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            marginBottom: "24px",
            border: "2px solid #111",
            background: "#f4f1ea",
            boxShadow: "6px 6px 0 0 #111",
          }}
        >
          <CardImage src={project.hero} alt={project.title} aspectRatio="4 / 3" />
          <div style={{ padding: "16px" }}>
            <div
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                marginBottom: "8px",
              }}
            >
              {project.number} · {project.year}
            </div>
            <div
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              {project.title}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// Chrome
// ──────────────────────────────────────────────────────────────────

function TopBar({ isMobile }: { isMobile: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "40px",
        borderBottom: "1px solid #111",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        fontFamily: "var(--font-jetbrains)",
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        zIndex: 50,
        background: "#f4f1ea",
      }}
    >
      <span>BS · Index of Work</span>
      <span style={{ display: isMobile ? "none" : "block" }}>Helix View</span>
      <span>Auckland, NZ</span>
    </div>
  );
}

function BottomBar() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "32px",
        borderTop: "1px solid #111",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        fontFamily: "var(--font-jetbrains)",
        fontSize: "10px",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--ink-soft)",
        zIndex: 50,
        background: "#f4f1ea",
      }}
    >
      <span>Drag to rotate</span>
      <span>© Ben Speedy</span>
    </div>
  );
}

function SideRail({
  railOpen,
  focusedId,
  onProjectClick,
}: {
  railOpen: boolean;
  focusedId: string | null;
  onProjectClick: (id: string) => void;
}) {
  return (
    <div
      className="side-rail"
      style={{
        position: "absolute",
        left: railOpen ? 0 : -320,
        top: "40px",
        bottom: "32px",
        width: "320px",
        borderRight: "1px solid #111",
        background: "#f4f1ea",
        transition: "left 0.3s ease",
        zIndex: 30,
        overflowY: "auto",
        padding: "24px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-instrument-serif)",
          fontSize: "28px",
          marginBottom: "8px",
        }}
      >
        Ben Speedy
      </div>
      <div
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontSize: "13px",
          color: "var(--ink-soft)",
          marginBottom: "32px",
          lineHeight: 1.6,
        }}
      >
        An index of work.
      </div>

      <div>
        {PROJECTS.map((project) => {
          const active = focusedId === project.id;
          return (
            <button
              key={project.id}
              onClick={() => onProjectClick(project.id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "12px 0",
                borderBottom: "1px solid rgba(17,17,17,0.1)",
                color: active ? "var(--accent)" : "var(--ink)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = active ? "var(--accent)" : "var(--ink)")
              }
            >
              <div
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  marginBottom: "4px",
                }}
              >
                {project.number} · {project.year}
              </div>
              <div style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "14px" }}>
                {project.title}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RailToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={open ? "Close index" : "Open index"}
      style={{
        position: "absolute",
        left: open ? "320px" : "0",
        top: "50%",
        transform: "translateY(-50%)",
        width: "24px",
        height: "60px",
        border: "1px solid #111",
        borderLeft: open ? "none" : "1px solid #111",
        background: "#f4f1ea",
        transition: "left 0.3s ease",
        zIndex: 35,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
      }}
    >
      {open ? "‹" : "›"}
    </button>
  );
}

// ──────────────────────────────────────────────────────────────────
// Detail panel
// ──────────────────────────────────────────────────────────────────

function DetailPanel({
  project,
  galleryIndex,
  setGalleryIndex,
  onClose,
  isMobile,
}: {
  project: Project;
  galleryIndex: number;
  setGalleryIndex: (i: number) => void;
  onClose: () => void;
  isMobile: boolean;
}) {
  const allImages = [project.hero, ...project.gallery];
  const currentImage = allImages[galleryIndex] ?? project.hero;
  const thumbStripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = thumbStripRef.current;
    if (!strip) return;
    const activeThumb = strip.querySelectorAll("button")[galleryIndex] as HTMLElement | undefined;
    if (!activeThumb) return;
    const stripRect = strip.getBoundingClientRect();
    const thumbRect = activeThumb.getBoundingClientRect();
    const offset =
      thumbRect.left - stripRect.left - stripRect.width / 2 + thumbRect.width / 2;
    strip.scrollTo({ left: strip.scrollLeft + offset, behavior: "smooth" });
  }, [galleryIndex]);

  return (
    <div
      className="detail-panel"
      style={{
        position: "absolute",
        right: 0,
        top: "40px",
        bottom: "32px",
        width: isMobile ? "100%" : "560px",
        background: "#f4f1ea",
        borderLeft: isMobile ? "none" : "1px solid #111",
        zIndex: 40,
        overflowY: "auto",
        animation: "slideIn 0.3s ease",
      }}
    >
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          borderBottom: "1px solid #111",
          position: "sticky",
          top: 0,
          background: "#f4f1ea",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          {project.number} · {project.year}
        </div>
        <button
          onClick={onClose}
          aria-label="Close project"
          style={{
            fontSize: "24px",
            lineHeight: 1,
            color: "var(--ink)",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink)")}
        >
          ×
        </button>
      </div>

      <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3" }}>
        <CardImage src={currentImage} alt={project.title} fill />
      </div>

      {allImages.length > 1 && (
        <div
          style={{
            position: "relative",
            borderBottom: "1px solid rgba(17,17,17,0.1)",
          }}
          onMouseEnter={(e) => {
            const arrows = e.currentTarget.querySelectorAll<HTMLButtonElement>("[data-gallery-arrow]");
            arrows.forEach((a) => (a.style.opacity = "1"));
          }}
          onMouseLeave={(e) => {
            const arrows = e.currentTarget.querySelectorAll<HTMLButtonElement>("[data-gallery-arrow]");
            arrows.forEach((a) => (a.style.opacity = "0"));
          }}
        >
          <button
            data-gallery-arrow
            onClick={() =>
              setGalleryIndex(
                galleryIndex === 0 ? allImages.length - 1 : galleryIndex - 1,
              )
            }
            aria-label="Previous image"
            style={{
              position: "absolute",
              left: "4px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(244, 241, 234, 0.9)",
              border: "1px solid rgba(17,17,17,0.15)",
              color: "var(--ink)",
              fontSize: "14px",
              lineHeight: 1,
              cursor: "pointer",
              opacity: 0,
              transition: "opacity 0.2s",
              zIndex: 2,
            }}
          >
            ‹
          </button>
          <button
            data-gallery-arrow
            onClick={() =>
              setGalleryIndex((galleryIndex + 1) % allImages.length)
            }
            aria-label="Next image"
            style={{
              position: "absolute",
              right: "4px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(244, 241, 234, 0.9)",
              border: "1px solid rgba(17,17,17,0.15)",
              color: "var(--ink)",
              fontSize: "14px",
              lineHeight: 1,
              cursor: "pointer",
              opacity: 0,
              transition: "opacity 0.2s",
              zIndex: 2,
            }}
          >
            ›
          </button>
          <div
            ref={thumbStripRef}
            className="gallery-thumb-strip"
            style={{
              display: "flex",
              gap: "8px",
              padding: "12px 36px",
              overflowX: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollBehavior: "smooth",
            }}
          >
            <style>{`.gallery-thumb-strip::-webkit-scrollbar { display: none; }`}</style>
            {allImages.map((src, i) => (
              <button
                key={`${src}-${i}`}
                onClick={() => setGalleryIndex(i)}
                aria-label={`View image ${i + 1}`}
                style={{
                  position: "relative",
                  flex: "0 0 auto",
                  width: "60px",
                  height: "60px",
                  border:
                    i === galleryIndex
                      ? "2px solid var(--accent)"
                      : "1px solid rgba(17,17,17,0.2)",
                  overflow: "hidden",
                }}
              >
                <CardImage src={src} alt="" fill />
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ padding: "24px" }}>
        <h2
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "36px",
            marginBottom: "8px",
            lineHeight: 1.15,
            fontWeight: 400,
          }}
        >
          {project.title}
        </h2>

        <div
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "24px",
          }}
        >
          {project.type}
        </div>

        <p
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "15px",
            lineHeight: 1.7,
            color: "var(--ink)",
            marginBottom: "32px",
          }}
        >
          {project.description}
        </p>

        <div style={{ borderTop: "1px solid rgba(17,17,17,0.15)", paddingTop: "20px" }}>
          <Meta label="Year" value={project.year} />
          <Meta label="Location" value={project.location} />
          <Meta label="Status" value={project.status} />
          <Meta label="Type" value={project.type} />
          <Meta label="Role" value={project.role} />
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: "10px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--ink-soft)",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>
      <div style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "14px" }}>{value}</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// Tweaks panel (always available, collapsed by default)
// ──────────────────────────────────────────────────────────────────

function TweaksPanel({
  open,
  onToggle,
  tweaks,
  onChange,
  onReset,
}: {
  open: boolean;
  onToggle: () => void;
  tweaks: Tweaks;
  onChange: <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => void;
  onReset: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        bottom: "32px",
        zIndex: 60,
        fontFamily: "var(--font-jetbrains)",
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        style={{
          display: "block",
          marginLeft: "auto",
          padding: "8px 14px",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--ink)",
          background: "#f4f1ea",
          border: "1px solid #111",
          borderRight: "none",
          borderBottom: "none",
          cursor: "pointer",
        }}
      >
        {open ? "close ×" : "tweak ⚙"}
      </button>

      {open && (
        <div
          style={{
            width: "280px",
            background: "#f4f1ea",
            border: "1px solid #111",
            borderRight: "none",
            borderBottom: "none",
            padding: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
              paddingBottom: "12px",
              borderBottom: "1px solid rgba(17,17,17,0.15)",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--ink)",
                fontWeight: 500,
              }}
            >
              Tweaks
            </span>
            <button
              onClick={onReset}
              style={{
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--accent)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              reset
            </button>
          </div>

          <Slider label="Helix Radius" suffix="px" value={tweaks.helixRadius} min={200} max={800} step={20} onChange={(v) => onChange("helixRadius", v)} />
          <Slider label="Ring Spacing" suffix="px" value={tweaks.ringSpacing} min={50} max={500} step={10} onChange={(v) => onChange("ringSpacing", v)} />
          <Slider label="Rotation Speed" suffix="°/s" value={tweaks.autoRotateSpeed} min={0} max={30} step={1} onChange={(v) => onChange("autoRotateSpeed", v)} />
          <Slider label="Focus Pop Distance" suffix="px" value={tweaks.focusDistance} min={0} max={500} step={20} onChange={(v) => onChange("focusDistance", v)} />
          <Slider label="Velocity Damping" value={tweaks.velocityDamping} min={0.0001} max={0.01} step={0.0001} fractionDigits={4} onChange={(v) => onChange("velocityDamping", v)} />
          <Slider label="Zoom" suffix="x" value={tweaks.zoom} min={0.3} max={2} step={0.05} fractionDigits={2} onChange={(v) => onChange("zoom", v)} />
          <Slider label="Center X" suffix="px" value={tweaks.centerX} min={-500} max={500} step={10} onChange={(v) => onChange("centerX", v)} />
          <Slider label="Center Y" suffix="px" value={tweaks.centerY} min={-500} max={500} step={10} onChange={(v) => onChange("centerY", v)} last />
        </div>
      )}
    </div>
  );
}

function Slider({
  label,
  suffix = "",
  value,
  min,
  max,
  step,
  fractionDigits,
  onChange,
  last,
}: {
  label: string;
  suffix?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  fractionDigits?: number;
  onChange: (value: number) => void;
  last?: boolean;
}) {
  const display = fractionDigits !== undefined ? value.toFixed(fractionDigits) : value;
  return (
    <div style={{ marginBottom: last ? 0 : 20 }}>
      <div
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontSize: "13px",
          color: "var(--ink-soft)",
          marginBottom: "8px",
          fontWeight: 400,
        }}
      >
        {label}: {display}{suffix}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="tweak-slider"
      />
    </div>
  );
}

// Image wrapper. Uses Next/Image with unoptimized to play nicely with
// static export and our SVG placeholders.
function CardImage({
  src,
  alt,
  height,
  fill,
  aspectRatio,
}: {
  src: string;
  alt: string;
  height?: number;
  fill?: boolean;
  aspectRatio?: string;
}) {
  if (fill) {
    return (
      <Image src={src} alt={alt} fill sizes="440px" style={{ objectFit: "cover" }} unoptimized />
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: height ? `${height}px` : undefined,
        aspectRatio: aspectRatio,
        overflow: "hidden",
      }}
    >
      <Image src={src} alt={alt} fill sizes="240px" style={{ objectFit: "cover" }} unoptimized />
    </div>
  );
}
