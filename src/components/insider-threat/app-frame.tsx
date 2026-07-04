"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { GlobalLeakToast } from "@/components/insider-threat/global-leak-toast";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Lab Features", href: "/features" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const mobileItems = [
  { label: "Home", href: "/", activeKey: "Home" },
  { label: "Features", href: "/features", activeKey: "Lab Features" },
  { label: "About", href: "/about", activeKey: "About" },
  { label: "Contact", href: "/contact", activeKey: "Contact" },
];

const getActiveLabel = (pathname: string) => {
  if (pathname.startsWith("/features") || pathname.startsWith("/analysis")) {
    return "Lab Features";
  }

  if (pathname.startsWith("/about") || pathname.startsWith("/results")) {
    return "About";
  }

  if (pathname.startsWith("/contact")) {
    return "Contact";
  }

  return "Home";
};

export function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const active = getActiveLabel(pathname);

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <div className="site-header__brand-group">
            <Link className="site-brand" href="/">
              Intelligence Lab
            </Link>
            <nav className="site-nav" aria-label="Primary">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  className={
                    item.label === active ? "site-nav__link is-active" : "site-nav__link"
                  }
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="site-header__actions">
            <button className="icon-button" aria-label="Select language" type="button">
              <span className="material-symbols-outlined">language</span>
            </button>
            <button className="icon-button" aria-label="Search" type="button">
              <span className="material-symbols-outlined">search</span>
            </button>
            <Link className="header-cta" href="/contact">
              Request Access
            </Link>
          </div>
        </div>
      </header>

      <GlobalLeakToast />

      <div className="page-chrome">{children}</div>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__identity">
            <span className="site-brand">Intelligence Lab</span>
            <p>
              Corporate intelligence infrastructure for behavioral analytics,
              operational visibility, and trusted decision support.
            </p>
          </div>
          <div className="site-footer__grid">
            <section>
              <h5>Capabilities</h5>
              <ul>
                <li>
                  <Link href="/features">Signal Modeling</Link>
                </li>
                <li>
                  <Link href="/features">Predictive Analytics</Link>
                </li>
                <li>
                  <Link href="/features">Satellite Intelligence</Link>
                </li>
              </ul>
            </section>
            <section>
              <h5>Company</h5>
              <ul>
                <li>
                  <Link href="/about">Our Mission</Link>
                </li>
                <li>
                  <Link href="/about">Leadership</Link>
                </li>
                <li>
                  <Link href="/contact">Global Hubs</Link>
                </li>
              </ul>
            </section>
            <section>
              <h5>Operations</h5>
              <div className="site-status">
                <span className="site-status__dot" />
                <span>ACTIVE SIGNAL GRID</span>
              </div>
            </section>
          </div>
        </div>
        <div className="site-footer__lower">
          <p>2026 Intelligence Lab. All rights reserved.</p>
          <div className="site-footer__legal">
            <span>Privacy Policy</span>
            <span>Legal Notes</span>
            <span>Accessibility</span>
          </div>
        </div>
      </footer>

      <nav className="mobile-nav" aria-label="Mobile">
        {mobileItems.map((item) => (
          <Link
            key={item.label}
            className={
              item.activeKey === active
                ? "mobile-nav__link is-active"
                : "mobile-nav__link"
            }
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
