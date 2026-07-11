"use client";

import Link from "next/link";

import { siteImages } from "@/data/siteImages";
import { useAppSelector } from "@/store/hooks";
import {
  selectDashboardMetrics,
  selectDepartmentPressure,
  selectEventFeed,
  selectOverviewEmployees,
} from "@/store/slices/analysisSlice";

const eventLabels: Record<string, string> = {
  access: "Access Monitoring",
  behavior: "Behavioral Signals",
  sentiment: "Sentiment Intelligence",
  policy: "Policy Controls",
  communication: "Communication Surveillance",
  finance: "Financial Monitoring",
  transfer: "Transfer Inspection",
};

const eventIcons: Record<string, string> = {
  access: "key",
  behavior: "psychology",
  sentiment: "sentiment_satisfied",
  policy: "gavel",
  communication: "alternate_email",
  finance: "account_balance_wallet",
  transfer: "file_upload",
};

export default function HomePage() {
  const metrics = useAppSelector(selectDashboardMetrics);
  const departmentPressure = useAppSelector(selectDepartmentPressure);
  const employees = useAppSelector(selectOverviewEmployees);
  const events = useAppSelector(selectEventFeed);

  const watchlist = employees.slice(0, 3);
  const highestDepartment = [...departmentPressure].sort(
    (left, right) => right.avgRisk - left.avgRisk,
  )[0];
  const latestSignals = [...events].slice(0, 3);
  const leadProfile = watchlist[0];

  const capabilityCards = [
    {
      title: "Signal-Rich Infrastructure",
      text: `Monitoring ${metrics.totalEmployees} active specialist profiles across email, chat, call, endpoint, and transfer intelligence.`,
      icon: "hub",
      image: siteImages.infrastructure,
      link: "/features",
    },
    {
      title: "Predictive Research Systems",
      text: `${metrics.unusualActivityAlerts} active anomaly, communication, or transaction leak patterns are currently informing escalation models.`,
      icon: "query_stats",
      image: siteImages.systems,
      link: "/features",
    },
    {
      title: "Global Intelligence Network",
      text: `${highestDepartment?.department ?? "Operations"} is the most active pressure point for possible insider data or fund leakage in the current operational picture.`,
      icon: "public",
      image: siteImages.network,
      link: "/about",
    },
  ];

  const signalChips = [
    { icon: "mail", label: "Email" },
    { icon: "chat", label: "Chat" },
    { icon: "call", label: "Calls" },
    { icon: "wallet", label: "Wallet" },
    { icon: "folder_copy", label: "Files" },
  ];

  const stats = [
    { icon: "groups", value: metrics.totalEmployees, label: "Active specialists" },
    { icon: "emergency_home", value: metrics.highRiskEmployees, label: "High priority" },
    { icon: "warning", value: metrics.unusualActivityAlerts, label: "Anomalies" },
    { icon: "speed", value: metrics.averageRiskScore, label: "Average score" },
  ];

  return (
    <main className="company-page">
      <section className="hero-banner hero-banner--home">
        <div className="hero-banner__media">
          <img
            alt="Nexora Technologies skyline"
            className="hero-banner__image"
            src={siteImages.hero}
          />
          <div className="hero-banner__veil" />
        </div>
        <div className="hero-banner__content container-shell">
          <div className="hero-banner__copy">
            <h1>Information before it leaks out of the building.</h1>
            <p>
              One dashboard for communication, access, file movement, and finance risk.
            </p>
            <div className="visual-chip-row" aria-label="Monitored signal types">
              {signalChips.map((chip) => (
                <span className="visual-chip" key={chip.label}>
                  <span className="material-symbols-outlined">{chip.icon}</span>
                  {chip.label}
                </span>
              ))}
            </div>
            <div className="hero-banner__actions">
              <Link className="button button--primary" href="/features">
                Explore Solutions
              </Link>
              <Link className="button button--ghost" href="/contact">
                Speak With The Team
              </Link>
            </div>
          </div>
          <div className="hero-banner__panel">
            <span className="eyebrow eyebrow--muted">Live Priority Signal</span>
            <strong>
              {leadProfile?.employee.name ?? "Gbadebo Faidat Adeola"} /{" "}
              {leadProfile?.analysis.finalRiskScore ?? 0}
            </strong>
            <p>
              {leadProfile?.employee.department ?? "Security Operations"} leads the active watchlist.
            </p>
            <div className="hero-banner__mini-chart" aria-hidden="true">
              {(leadProfile?.sentiment?.trend ?? []).map((point) => (
                <span key={point.label} style={{ height: `${Math.max(point.score, 12)}%` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="stats-ribbon">
        <div className="container-shell stats-ribbon__grid">
          {stats.map((stat) => (
            <article className="visual-stat" key={stat.label}>
              <span className="visual-icon visual-icon--small material-symbols-outlined">
                {stat.icon}
              </span>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="container-shell">
          <div className="section-heading section-heading--center">
            <span className="eyebrow">What Nexora Delivers</span>
            <h2>Built to identify weak signals before they become operational incidents.</h2>
            <p>
              Communications, access, files, and finance are combined into one risk picture.
            </p>
          </div>

          <div className="capability-grid">
            <article className="capability-grid__featured">
              <img alt="" src={capabilityCards[0].image} />
              <div className="capability-grid__overlay">
                <div className="visual-card-heading">
                  <span className="visual-icon material-symbols-outlined">{capabilityCards[0].icon}</span>
                  <div>
                    <span className="eyebrow">Integrated Monitoring</span>
                    <h3>{capabilityCards[0].title}</h3>
                  </div>
                </div>
                <p>{capabilityCards[0].text}</p>
                <Link href={capabilityCards[0].link}>View the feature architecture</Link>
              </div>
            </article>

            <article className="capability-card">
              <img alt="" src={capabilityCards[1].image} />
              <div className="capability-card__body">
                <div className="visual-card-heading">
                  <span className="visual-icon material-symbols-outlined">{capabilityCards[1].icon}</span>
                  <div>
                    <span className="pill">Active Research</span>
                    <h3>{capabilityCards[1].title}</h3>
                  </div>
                </div>
                <p>{capabilityCards[1].text}</p>
              </div>
            </article>

            <article className="capability-card capability-card--dark">
              <div className="visual-card-heading">
                <span className="capability-card__signal material-symbols-outlined">
                  {capabilityCards[2].icon}
                </span>
                <h3>{capabilityCards[2].title}</h3>
              </div>
              <p>{capabilityCards[2].text}</p>
              <Link href={capabilityCards[2].link}>See how the company is structured</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="impact-panel">
        <div className="container-shell impact-panel__grid">
          <div className="impact-panel__media">
            <img alt="" src={siteImages.network} />
          </div>
          <div className="impact-panel__copy">
            <span className="eyebrow">Operational Reach</span>
            <h2>One intelligence layer across research, oversight, and response.</h2>
            <p>
              Strongest pressure zone:{" "}
              <strong>{highestDepartment?.department ?? "Security Operations"}</strong> at{" "}
              <strong>{highestDepartment?.avgRisk ?? 0}/100</strong>.
            </p>
            <div className="impact-points">
              <article>
                <span className="material-symbols-outlined">hub</span>
                <div>
                  <h3>Unified Intelligence Network</h3>
                  <p>Shared signals across departments, people, and event streams.</p>
                </div>
              </article>
              <article>
                <span className="material-symbols-outlined">query_stats</span>
                <div>
                  <h3>Decision-Ready Forecasting</h3>
                  <p>Live scoring for drift, anomalies, and escalation timing.</p>
                </div>
              </article>
            </div>
            <Link className="button button--primary" href="/about">
              Read The Company Story
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell section-shell--soft">
          <div className="container-shell">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Latest Intelligence</span>
                <h2>Signals from the active Nexora environment.</h2>
              </div>
              <Link className="text-link" href="/features">
                Open full capabilities
            </Link>
          </div>

          <div className="insights-grid">
            {latestSignals.map((event) => (
              <article key={event.id} className="insight-article">
                <span className="insight-article__meta">
                  <span className="material-symbols-outlined">{eventIcons[event.type]}</span>{" "}
                  {eventLabels[event.type]} / {event.timestamp}
                </span>
                <h3>{event.title}</h3>
                <p>{event.detail}</p>
                <div className="insight-article__footer">
                  <span className={`severity-tag severity-tag--${event.severity}`}>
                    {event.severity} priority
                  </span>
                  <span>{event.employeeId.toUpperCase()}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container-shell cta-band__inner">
          <div>
            <span className="eyebrow">Partner With Precision</span>
            <h2>Sharper monitoring. Faster understanding. Clearer action.</h2>
          </div>
          <Link className="button button--primary" href="/contact">
            Request A Private Demo
          </Link>
        </div>
      </section>
    </main>
  );
}
