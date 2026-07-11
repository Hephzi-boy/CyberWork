"use client";

import Link from "next/link";

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
    icon: "shield",
  },
  {
    title: "Project Meridian",
    owner: "Efunsanwo Abisola Deborah",
    text: "Finance visibility focused on approvals, transfers, and transaction integrity.",
    icon: "account_balance",
  },
  {
    title: "Project Pulse",
    owner: "Salihu Aishat Chioma",
    text: "Engineering telemetry for release pressure, response timing, and workflow drift.",
    icon: "monitor_heart",
  },
  {
    title: "Project Atlas",
    owner: "Oredugba Oluwadamilare Elijah",
    text: "People and governance oversight built around policy drift and review health.",
    icon: "groups",
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
            <p>Behavioral analytics, finance signals, and human review in one company system.</p>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-shell split-panel split-panel--mission">
          <div className="split-panel__copy">
            <span className="eyebrow">Our Mission</span>
            <h2>Turn difficult organizational signals into responsible, reviewable action.</h2>
            <p>
              {metrics.totalEmployees} profiles tracked. {metrics.highRiskEmployees} high-priority cases surfaced.
            </p>
            <div className="visual-chip-row">
              <span className="visual-chip"><span className="material-symbols-outlined">visibility</span> Reviewable</span>
              <span className="visual-chip"><span className="material-symbols-outlined">policy</span> Governed</span>
              <span className="visual-chip"><span className="material-symbols-outlined">human_male</span> Human-led</span>
            </div>
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
              <h2>People, roles, and risk context at a glance.</h2>
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
                  <div className="visual-card-heading visual-card-heading--compact">
                    <span className="visual-icon visual-icon--small material-symbols-outlined">badge</span>
                    <h3>{person.employee.name}</h3>
                  </div>
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
              <h2>Project ownership shown with clear visual signals.</h2>
            </div>
          </div>

          <div className="insights-grid">
            {projects.map((project) => (
              <article key={project.title} className="insight-article">
                <span className="insight-article__meta">
                  <span className="material-symbols-outlined">{project.icon}</span> Flagship program
                </span>
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
            <h2>From research system to company-ready platform.</h2>
          </div>
          <div className="timeline-stack">
            {milestones.map((milestone, index) => (
              <article
                key={milestone.year}
                className={index % 2 === 0 ? "timeline-item" : "timeline-item timeline-item--reverse"}
              >
                <div className="timeline-item__year">{milestone.year}</div>
                <div className="timeline-item__body">
                  <div className="visual-card-heading visual-card-heading--compact">
                    <span className="visual-icon visual-icon--small material-symbols-outlined">military_tech</span>
                    <h3>{milestone.title}</h3>
                  </div>
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
            <h2>Enterprise product signals, easier to understand.</h2>
          </div>
          <Link className="button button--primary" href="/contact">
            Partner With Us
          </Link>
        </div>
      </section>
    </main>
  );
}
