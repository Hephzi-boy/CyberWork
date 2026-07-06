"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { GlobalLeakToast } from "@/components/insider-threat/global-leak-toast";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/features" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const mobileItems = [
  { label: "Home", href: "/", activeKey: "Home" },
  { label: "Solutions", href: "/features", activeKey: "Solutions" },
  { label: "About", href: "/about", activeKey: "About" },
  { label: "Contact", href: "/contact", activeKey: "Contact" },
];

const getActiveLabel = (pathname: string) => {
  if (pathname.startsWith("/features") || pathname.startsWith("/analysis")) {
    return "Solutions";
  }

  if (pathname.startsWith("/about") || pathname.startsWith("/results")) {
    return "About";
  }

  if (pathname.startsWith("/contact")) {
    return "Contact";
  }

  return "Home";
};

function NexoraMark() {
  return (
    <svg
      aria-hidden="true"
      className="site-brand__logo-svg"
      focusable="false"
      style={{ display: "block", height: "100%", width: "100%", opacity: 1, visibility: "visible" }}
      viewBox="0 0 188 154"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="nexoraStrokeA" x1="30" x2="151" y1="18" y2="139" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#04B7FF" />
          <stop offset="0.52" stopColor="#0095FF" />
          <stop offset="1" stopColor="#7047FF" />
        </linearGradient>
        <linearGradient id="nexoraStrokeB" x1="66" x2="148" y1="44" y2="131" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#04B7FF" />
          <stop offset="1" stopColor="#7047FF" />
        </linearGradient>
        <filter id="nexoraSoftGlow" x="-18" y="-18" width="224" height="190" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#009DFF" floodOpacity="0.42" />
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000000" floodOpacity="0.45" />
        </filter>
      </defs>

      <rect width="188" height="154" rx="16" fill="#020817" />
      <ellipse cx="96" cy="145" rx="38" ry="4" fill="#00A3FF" opacity="0.55" />
      <g filter="url(#nexoraSoftGlow)">
        <path
          d="M46 122V32L132 122V42"
          fill="none"
          stroke="url(#nexoraStrokeA)"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth="17"
        />
        <path d="M34 116V136" stroke="#04A6FF" strokeLinecap="round" strokeWidth="4" />
        <circle cx="34" cy="141" r="6" fill="#020817" stroke="#04A6FF" strokeWidth="4" />
        <path d="M139 28V47" stroke="#04A6FF" strokeLinecap="round" strokeWidth="4" />
        <circle cx="139" cy="23" r="6" fill="#020817" stroke="#04A6FF" strokeWidth="4" />
        <path d="M45 18V34" stroke="#04A6FF" strokeLinecap="round" strokeWidth="4" />
        <circle cx="45" cy="13" r="4" fill="#020817" stroke="#04A6FF" strokeWidth="3" />
      </g>
    </svg>
  );
}

export function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const active = getActiveLabel(pathname);

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <div className="site-header__brand-group">
            <Link className="site-brand" aria-label="Nexora Technologies home" href="/">
              <span className="site-brand__logo-shell">
                <NexoraMark />
              </span>
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
            <Link className="site-brand site-brand--footer" aria-label="Nexora Technologies home" href="/">
              <span className="site-brand__logo-shell">
                <NexoraMark />
              </span>
            </Link>
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
                  <Link href="/features">Executive Dashboards</Link>
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
          <p>2026 Nexora Technologies. All rights reserved.</p>
          <div className="site-footer__legal">
            <span>Privacy Policy</span>
            <span>Legal Notes</span>
            <span>Accessibility</span>
          </div>
        </div>
      </footer>

    </>
  );
}
