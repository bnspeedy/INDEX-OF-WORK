"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";
import { PHASES } from "@/data/processPhases";
import styles from "./process.module.css";

type View = "essay" | "timeline";

const HIGHLIGHT = /\b(real brief|deep investigation|honesty|listening|topography|investigation|hypothesis|home)\b/i;

function highlight(para: string): React.ReactNode {
  const match = para.match(HIGHLIGHT);
  if (!match || match.index === undefined) return para;
  const before = para.slice(0, match.index);
  const word = match[0];
  const after = para.slice(match.index + word.length);
  return (
    <>
      {before}
      <span className={styles.highlight}>{word}</span>
      {after}
    </>
  );
}

export default function ProcessPage() {
  const [view, setView] = useState<View>("essay");
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const bottomLeft = view === "essay" ? "Scroll · Long-form essay" : "Click any phase to expand";

  return (
    <SiteChrome
      topLeft="BS · Process · 2026"
      bottomLeft={bottomLeft}
      bottomRight="7 phases · 1 method"
    >
      <div className={styles.viewSwitcher}>
        <button
          className={view === "essay" ? styles.active : ""}
          onClick={() => setView("essay")}
        >
          Essay
        </button>
        <button
          className={view === "timeline" ? styles.active : ""}
          onClick={() => setView("timeline")}
        >
          Timeline
        </button>
      </div>

      {view === "essay" ? (
        <EssayView />
      ) : (
        <TimelineView expanded={expanded} setExpanded={setExpanded} />
      )}
    </SiteChrome>
  );
}

function EssayView() {
  return (
    <div className={`${styles.view} ${styles.gridBg}`}>
      <div className={styles.narrative}>
        <div className={styles.narrativeHero}>
          <div className={styles.narrativeEyebrow}>A note on method · Ben Speedy</div>
          <h1 className={styles.narrativeTitle}>
            I don&apos;t design <em>buildings.</em> I investigate <em>briefs</em> until they tell me what they want to become.
          </h1>
          <p className={styles.narrativeLede}>
            Architecture, for me, is less about drawing and more about listening. Every project starts with a question that has nothing to do with form, and ends with a building that could only have been this one.
          </p>
        </div>

        {PHASES.map((phase, i) => (
          <div key={phase.num} className={styles.chapter}>
            <div className={styles.chapterMeta}>
              <div className={styles.chapterNum}>Chapter {phase.num}</div>
              <div className={styles.chapterMarker}>{phase.marker}.</div>
            </div>
            <div className={styles.chapterContent}>
              <h2>{phase.title}</h2>
              {phase.body.map((para, j) => (
                <p key={j}>{highlight(para)}</p>
              ))}

              {i === 1 && (
                <div className={styles.pullQuote}>
                  The site is not a blank page; it is a manuscript, and my job is to read it before I add to it.
                </div>
              )}

              {i === 3 ? (
                <div className={styles.imagePair}>
                  <ChapterImage
                    src="/process/modern-dwelling/floor-plan-1.svg"
                    alt="Plan iteration A"
                    caption="Plan study A · early"
                  />
                  <ChapterImage
                    src="/process/modern-dwelling/floor-plan-2.svg"
                    alt="Plan iteration B"
                    caption="Plan study B · resolved"
                  />
                </div>
              ) : (
                <ChapterImage
                  src={phase.image}
                  alt={phase.marker}
                  caption={phase.caption}
                />
              )}

              <p className={styles.chapterDetail}>{phase.detail}</p>
            </div>
          </div>
        ))}

        <div className={styles.essayEnd}>
          <div className={styles.essayEndEyebrow}>End of essay</div>
          <div className={styles.essayEndText}>
            If you&apos;ve read this far, you already understand how I work. The rest is just buildings.
          </div>
          <Link href="/" className={styles.essayEndCta}>
            ← See the work
          </Link>
        </div>
      </div>
    </div>
  );
}

function ChapterImage({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <div className={styles.chapterImage}>
      <img src={src} alt={alt} loading="lazy" />
      <div className={styles.chapterImageCaption}>{caption}</div>
    </div>
  );
}

function TimelineView({
  expanded,
  setExpanded,
}: {
  expanded: number | null;
  setExpanded: (i: number | null) => void;
}) {
  return (
    <div className={`${styles.view} ${styles.gridBg}`}>
      <div className={styles.timelineView}>
        <div className={styles.timelineIntro}>
          <div className={styles.timelineIntroEyebrow}>The seven postures</div>
          <h1>A project, as I work through it.</h1>
          <p>
            Click any phase to read the longer note. The order is roughly chronological, but in practice they bleed into each other, I am often listening at the same time I am resolving, still discovering even as I hand over.
          </p>
        </div>

        <div className={styles.timeline}>
          {PHASES.map((p, i) => {
            const isExpanded = expanded === i;
            return (
              <div
                key={p.num}
                className={`${styles.tPhase} ${isExpanded ? styles.tPhaseExpanded : ""}`}
                onClick={() => setExpanded(isExpanded ? null : i)}
              >
                <div className={styles.tMarker}>{p.num}</div>
                <div className={styles.tContent}>
                  <div className={styles.tText}>
                    <div className={styles.tEyebrow}>{p.eyebrow}</div>
                    <h3>{p.marker}</h3>
                    <p>{p.body[0]}</p>
                    <div className={styles.tDetail}>
                      <div className={styles.tDetailContent}>
                        <p style={{ marginBottom: "12px" }}>{p.body[1]}</p>
                        <p style={{ fontStyle: "italic" }}>{p.detail}</p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.tImage}>
                    <img src={p.image} alt={p.marker} loading="lazy" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
