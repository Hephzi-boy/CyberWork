"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTORS = [
  ".hero-banner__copy",
  ".hero-banner__panel",
  ".stats-ribbon__grid article",
  ".section-heading",
  ".capability-grid__featured",
  ".capability-card",
  ".impact-panel__media",
  ".impact-panel__copy",
  ".insight-article",
  ".case-review",
  ".surveillance-card",
  ".split-panel__media",
  ".split-panel__copy",
  ".feature-row__copy",
  ".feature-row__media",
  ".spec-card",
  ".person-card",
  ".timeline-item",
  ".contact-form-card",
  ".contact-map-card",
  ".office-list-card",
  ".urgent-card",
  ".newsletter-band__inner",
  ".cta-band__inner",
  ".site-footer__identity",
  ".site-footer__grid > section",
].join(", ");

const INITIAL_VISIBILITY_THRESHOLD = 0.88;
const STAGGER_INTERVAL_MS = 90;

export function ScrollReveal() {
  const pathname = usePathname();
  const scheduleScanRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const body = document.body;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frameId = 0;
    let revealTimer = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const target = entry.target as HTMLElement;
          target.dataset.reveal = "visible";
          observer.unobserve(target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    const scanTargets = () => {
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>(REVEAL_SELECTORS),
      );

      if (targets.length === 0) {
        return;
      }

      if (prefersReducedMotion) {
        targets.forEach((target) => {
          target.dataset.revealReady = "true";
          target.dataset.reveal = "visible";
          target.style.removeProperty("--reveal-delay");
          observer.unobserve(target);
        });

        return;
      }

      body.classList.add("scroll-reveal-ready");

      const immediateRevealTargets: HTMLElement[] = [];
      let staggerIndex = 0;

      targets.forEach((target) => {
        if (target.dataset.revealReady === "true") {
          return;
        }

        target.dataset.revealReady = "true";
        target.dataset.reveal = "hidden";
        target.style.setProperty(
          "--reveal-delay",
          `${(staggerIndex % 4) * STAGGER_INTERVAL_MS}ms`,
        );
        staggerIndex += 1;

        const isAboveFold =
          target.getBoundingClientRect().top <=
          window.innerHeight * INITIAL_VISIBILITY_THRESHOLD;

        if (isAboveFold) {
          immediateRevealTargets.push(target);
          return;
        }

        observer.observe(target);
      });

      if (immediateRevealTargets.length > 0) {
        window.clearTimeout(revealTimer);
        revealTimer = window.setTimeout(() => {
          immediateRevealTargets.forEach((target) => {
            target.dataset.reveal = "visible";
            observer.unobserve(target);
          });
        }, 70);
      }
    };

    const scheduleScan = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        scanTargets();
      });
    };

    scheduleScanRef.current = scheduleScan;

    const mutationObserver = new MutationObserver(() => {
      scheduleScan();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("hashchange", scheduleScan);
    window.addEventListener("resize", scheduleScan);
    scheduleScan();

    return () => {
      window.clearTimeout(revealTimer);
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("hashchange", scheduleScan);
      window.removeEventListener("resize", scheduleScan);
      scheduleScanRef.current = null;
    };
  }, []);

  useEffect(() => {
    scheduleScanRef.current?.();
  }, [pathname]);

  return null;
}
