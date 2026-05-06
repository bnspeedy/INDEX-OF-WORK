"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./MobileMenu.module.css";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const isWork = path === "/";
  const isProcess = path?.startsWith("/process");
  const isHistory = path?.startsWith("/history");

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [path]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`${styles.line} ${open ? styles.lineOpenTop : ""}`} />
        <span className={`${styles.line} ${open ? styles.lineOpenBottom : ""}`} />
      </button>

      {open && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <nav className={styles.nav}>
            {isWork ? (
              <span className={`${styles.link} ${styles.linkActive}`}>Work</span>
            ) : (
              <Link href="/" className={styles.link}>Work</Link>
            )}
            {isProcess ? (
              <span className={`${styles.link} ${styles.linkActive}`}>Process</span>
            ) : (
              <Link href="/process" className={styles.link}>Process</Link>
            )}
            {isHistory ? (
              <span className={`${styles.link} ${styles.linkActive}`}>History</span>
            ) : (
              <Link href="/history" className={styles.link}>History</Link>
            )}
          </nav>
          <div className={styles.footer}>Auckland, NZ</div>
        </div>
      )}
    </>
  );
}
