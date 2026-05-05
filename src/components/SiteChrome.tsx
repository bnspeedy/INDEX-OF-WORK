"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteChrome.module.css";

type Props = {
  topLeft: string;
  topRight?: string;
  bottomLeft: React.ReactNode;
  bottomRight: React.ReactNode;
  children: React.ReactNode;
};

export default function SiteChrome({
  topLeft,
  topRight = "Auckland",
  bottomLeft,
  bottomRight,
  children,
}: Props) {
  const path = usePathname();
  const isWork = path === "/";
  const isProcess = path?.startsWith("/process");
  const isHistory = path?.startsWith("/history");

  return (
    <>
      <div className={styles.topBar}>
        <span>{topLeft}</span>
        <nav className={styles.nav}>
          {isWork ? (
            <span className={styles.navActive}>Work</span>
          ) : (
            <Link href="/">Work</Link>
          )}
          {isProcess ? (
            <span className={styles.navActive}>Process</span>
          ) : (
            <Link href="/process">Process</Link>
          )}
          {isHistory ? (
            <span className={styles.navActive}>History</span>
          ) : (
            <Link href="/history">History</Link>
          )}
        </nav>
        <span>{topRight}</span>
      </div>

      {children}

      <div className={styles.bottomBar}>
        <span>{bottomLeft}</span>
        <span>{bottomRight}</span>
      </div>
    </>
  );
}
