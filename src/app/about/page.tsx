"use client";

import Link from "next/link";

import { ManualFlagControl } from "@/components/insider-threat/manual-flag-control";
import { siteImages } from "@/data/siteImages";
import { useAppSelector } from "@/store/hooks";
import { selectDashboardMetrics, selectOverviewEmployees } from "@/store/slices/analysisSlice";

const milestones = [
  {
    year: "2018",
    title: "Foundational Research Program",
    text: "Nexora Technologies was structured to combine human review with measurable telemetry rather than rely on opaque scoring alone.",
  },
  {
    year: "2021",
    title: "Cross-Functional Expansion",
    text: "Security, engineering, finance, HR, and legal workflows were unified into a shared signal architecture.",
  },
  {
    year: "2024",
    title: "Predictive Intelligence Layer",
    text: "Composite behavior and sentiment modeling evolved into a live prioritization engine for decision support.",
  },
  {
    year: "Today",
    title: "Executive-Grade Platform",
    text: "The current redesign positions Nexora Technologies as a polished company product while retaining the original analytical core.",
  },
];

const projects = [
  {
    title: "Project Halo",
    owner: "Gbadebo Faidat Adeola",
    text: "Security operations coverage for high-signal access review and escalation readiness.",
  },
  {
    title: "Project Meridian",
    owner: "Efunsanwo Abisola Deborah",
    text: "Finance visibility focused on approvals, transfers, and transaction integrity.",
  },
  {
    title: "Project Pulse",
    owner: "Salihu Aishat Chioma",
    text: "Engineering telemetry for release pressure, response timing, and workflow drift.",
  },
  {
    title: "Project Atlas",
    owner: "Oredugba Oluwadamilare Elijah",
    text: "People and governance oversight built around policy drift and review health.",
  },
];

export default function AboutPage() {
  const metrics = useAppSelector(selectDashboardMetrics);
  const people = useAppSelector(selectOverviewEmployees).slice(0, 6);

  return (
    <main className="company-page">
      <section className="hero-banner hero-banner--compact hero-banner--about">
        <div className="hero-banner__media">
          <img alt="" className="hero-banner__image hero-banner__image--desaturated" src={siteImages.hero} />
          <div className="hero-banner__veil hero-banner__veil--dense" />
        </div>
          <div className="hero-banner__content container-shell">
          <div className="hero-banner__copy hero-banner__copy--wide">
            <span className="eyebrow">About Nexora Technologies</span>
            <h1>Precision is the discipline. Trusted intelligence is the outcome.</h1>
            <p>
              Nexora Technologies brings research discipline, behavioral analytics,
              and operational design into one coherent company story.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell section-shell--tight">
        <div className="container-shell">
          <ManualFlagControl
            title="Escalate a manual concern"
            description="Operational teams can raise a manual leak concern from this page without disrupting the automatic monitoring rules already in place."
          />
        </div>
      </section>

      <section className="section-shell">
        <div className="container-shell split-panel split-panel--mission">
          <div className="split-panel__copy">
            <span className="eyebrow">Our Mission</span>
            <h2>Turn difficult organizational signals into responsible, reviewable action.</h2>
            <p>
              The mission of the platform is to reduce ambiguity at critical moments. The
              current system tracks {metrics.totalEmployees} active profiles, surfaces{" "}
              {metrics.highRiskEmployees} high-priority cases, and keeps human review at
              the center of interpretation.
            </p>
            <div className="metric-pair-grid">
              <article>
                <strong>{metrics.averageRiskScore}</strong>
                <span>Average active score</span>
              </article>
              <article>
                <strong>{metrics.negativeSentimentAlerts}</strong>
                <span>Negative sentiment alerts</span>
              </article>
            </div>
          </div>
          <div className="split-panel__media">
            <img alt="" src={siteImages.hero} />
          </div>
        </div>
      </section>

      <section className="section-shell section-shell--soft">
        <div className="container-shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Leadership And Talent</span>
              <h2>The current people dataset now reads like a credible company roster.</h2>
            </div>
            <Link className="text-link" href="/contact">
              Start a conversation
            </Link>
          </div>

          <div className="people-grid">
            {people.map((person, index) => (
              <article key={person.employee.id} className="person-card">
                <div className="person-card__media">
                  <img alt="" src={index % 2 === 0 ? siteImages.teamOne : siteImages.teamTwo} />
                </div>
                <div className="person-card__body">
                  <h3>{person.employee.name}</h3>
                  <p>
                    {person.employee.role} / {person.employee.department}
                  </p>
                  <span>{person.employee.location}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Projects In Motion</span>
              <h2>The requested team names now also appear as active project ownership.</h2>
            </div>
          </div>

          <div className="insights-grid">
            {projects.map((project) => (
              <article key={project.title} className="insight-article">
                <span className="insight-article__meta">Flagship program</span>
                <h3>{project.title}</h3>
                <p>{project.text}</p>
                <div className="insight-article__footer">
                  <span className="severity-tag severity-tag--low">owner</span>
                  <span>{project.owner}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-shell">
          <div className="section-heading section-heading--center">
            <span className="eyebrow">A Legacy Of Breakthroughs</span>
            <h2>Structured like a credible company platform, not just a prototype interface.</h2>
          </div>
          <div className="timeline-stack">
            {milestones.map((milestone, index) => (
              <article
                key={milestone.year}
                className={index % 2 === 0 ? "timeline-item" : "timeline-item timeline-item--reverse"}
              >
                <div className="timeline-item__year">{milestone.year}</div>
                <div className="timeline-item__body">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container-shell cta-band__inner">
          <div>
            <span className="eyebrow">Next Step</span>
            <h2>Position Nexora Technologies like an enterprise product teams can trust immediately.</h2>
          </div>
          <Link className="button button--primary" href="/contact">
            Partner With Us
          </Link>
        </div>
      </section>
    </main>
  );
}
