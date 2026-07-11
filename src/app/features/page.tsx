"use client";

import { useEffect } from "react";
import Link from "next/link";

import { siteImages } from "@/data/siteImages";
import { useAppSelector } from "@/store/hooks";
import {
  selectPotentialLeakAlerts,
  selectDashboardMetrics,
  selectDepartmentPressure,
  selectEmployeeTimeline,
  selectOverviewEmployees,
  selectSelectedAnalysis,
  selectSentimentRecords,
} from "@/store/slices/analysisSlice";
import { selectSelectedEmployee } from "@/store/slices/employeeSlice";

export default function FeaturesPage() {
  const employee = useAppSelector(selectSelectedEmployee);
  const analysis = useAppSelector(selectSelectedAnalysis);
  const timeline = useAppSelector(selectEmployeeTimeline);
  const alerts = useAppSelector(selectPotentialLeakAlerts);
  const metrics = useAppSelector(selectDashboardMetrics);
  const departments = useAppSelector(selectDepartmentPressure);
  const topProfiles = useAppSelector(selectOverviewEmployees).slice(0, 3);
  const sentimentRecords = useAppSelector(selectSentimentRecords);

  const priorityDepartment = [...departments].sort((left, right) => right.avgRisk - left.avgRisk)[0];
  const currentLeakAlert =
    alerts.find((alert) => alert.employee.id === employee?.id) ?? null;
  const sentiment =
    sentimentRecords.find((record) => record.employeeId === employee?.id) ?? null;
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    if (window.location.hash !== "#case-review") {
      return;
    }

    const timer = window.setTimeout(() => {
      document.getElementById("case-review")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [employee?.id]);

  const leakIndicators = [
    {
      icon: "alternate_email",
      label: "External email",
      value: analysis?.externalEmailCount ?? 0,
      note: `${analysis?.suspiciousAttachmentCount ?? 0} attachments`,
    },
    {
      icon: "chat",
      label: "Chat disclosure",
      value: analysis?.externalChatDisclosureCount ?? 0,
      note: `${analysis?.offPlatformCallMinutes ?? 0} call minutes`,
    },
    {
      icon: "account_balance_wallet",
      label: "Finance movement",
      value: analysis?.walletTransferAttempts ?? 0,
      note: `${analysis?.transactionHistoryExportCount ?? 0} exports`,
    },
  ];

  return (
    <main className="company-page">
      <section className="hero-banner hero-banner--compact hero-banner--features">
        <div className="hero-banner__media">
          <img alt="" className="hero-banner__image" src={siteImages.control} />
          <div className="hero-banner__veil hero-banner__veil--dense" />
        </div>
        <div className="hero-banner__content container-shell">
          <div className="hero-banner__copy">
            <span className="eyebrow">Advanced Research Infrastructure</span>
            <h1>Technical platform capabilities built around real monitoring and response signals.</h1>
            <p>
              Visual monitoring for communication, access, transaction, and file risk.
            </p>
            <div className="visual-chip-row">
              {["mail", "chat", "call", "account_balance", "file_upload"].map((icon) => (
                <span className="visual-chip visual-chip--icon-only" key={icon}>
                  <span className="material-symbols-outlined">{icon}</span>
                </span>
              ))}
            </div>
            <div className="hero-banner__actions">
              <Link className="button button--primary" href="/contact">
                Request Demo
              </Link>
              <Link className="button button--ghost" href="/about">
                Meet Nexora
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell section-shell--tight" id="case-review">
        <div className="container-shell">
          <div className="case-review">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Flagged Case Review</span>
              <h2>
                  {employee?.name ?? "Selected worker"} is the current reviewed
                  escalation profile.
                </h2>
                <p>
                  Case signal, risk metrics, leak paths, and recommended response.
                </p>
              </div>
              {currentLeakAlert ? (
                <span className="severity-tag severity-tag--high">
                  automatic detection
                </span>
              ) : null}
            </div>

            <div className="case-review__grid">
              <article className="case-review__hero-card">
                <span className="eyebrow eyebrow--dark">Incident Summary</span>
                <h3>{currentLeakAlert?.title ?? timeline[0]?.title ?? "No active leak event selected"}</h3>
                <p>
                  {currentLeakAlert?.detail ??
                    timeline[0]?.detail ??
                    "Select a worker to review a detailed incident record."}
                </p>
                <div className="case-review__meta">
                  <span>{currentLeakAlert?.timestamp ?? timeline[0]?.timestamp ?? "Timestamp unavailable"}</span>
                  <span>{employee?.department ?? "Department unavailable"}</span>
                  <span>{employee?.role ?? "Role unavailable"}</span>
                </div>
              </article>

              <article className="case-review__metric-card">
                <h3><span className="material-symbols-outlined">speed</span> Risk Context</h3>
                <div className="case-review__metric-list">
                  <div>
                    <span>Composite score</span>
                    <strong>{analysis?.finalRiskScore ?? 0}/100</strong>
                  </div>
                  <div>
                    <span>Policy violations</span>
                    <strong>{analysis?.policyViolationCount ?? 0}</strong>
                  </div>
                  <div>
                    <span>After-hours sessions</span>
                    <strong>{analysis?.afterHoursAccessCount ?? 0}</strong>
                  </div>
                  <div>
                    <span>Sentiment score</span>
                    <strong>{analysis?.sentimentScore ?? 0}/100</strong>
                  </div>
                  <div>
                    <span>Communication risk</span>
                    <strong>{analysis?.communicationRiskScore ?? 0}/100</strong>
                  </div>
                  <div>
                    <span>Financial risk</span>
                    <strong>{analysis?.financialRiskScore ?? 0}/100</strong>
                  </div>
                </div>
              </article>

              <article className="case-review__list-card">
                <h3><span className="material-symbols-outlined">route</span> Leak Path Indicators</h3>
                <div className="signal-tile-grid">
                  {leakIndicators.map((item) => (
                    <div className="signal-tile" key={item.label}>
                      <span className="material-symbols-outlined">{item.icon}</span>
                      <strong>{item.value}</strong>
                      <small>{item.label}</small>
                      <em>{item.note}</em>
                    </div>
                  ))}
                </div>
              </article>

              <article className="case-review__list-card">
                <h3><span className="material-symbols-outlined">rule</span> Board Recommendation</h3>
                <div className="case-review__stack">
                  <p>
                    {analysis?.boardRecommendation ??
                      "No board recommendation is currently available for this case."}
                  </p>
                  <p>
                    {analysis?.caseSynopsis ??
                      "No leak synopsis is currently available for this case."}
                  </p>
                  <p>
                    {sentiment?.latestSummary ??
                      "No communication summary is currently available for this case."}
                  </p>
                  {(analysis?.recommendations ?? []).map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell section-shell--soft">
        <div className="container-shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Leak Monitoring Coverage</span>
              <h2>Employee communications, data exports, and fund movement in one review layer.</h2>
            </div>
            <Link className="text-link" href="/contact">
              Request deployment access
            </Link>
          </div>
          <div className="surveillance-grid">
            <article className="surveillance-card">
              <div className="visual-card-heading">
                <span className="visual-icon material-symbols-outlined">alternate_email</span>
                <div>
                  <span className="eyebrow eyebrow--dark">Communication Surveillance</span>
                  <h3>Email, chat, and call inspection</h3>
                </div>
              </div>
              <div className="surveillance-card__metric-row">
                <span>External emails</span>
                <strong>{analysis?.externalEmailCount ?? 0}</strong>
              </div>
              <div className="surveillance-card__metric-row">
                <span>Chat disclosures</span>
                <strong>{analysis?.externalChatDisclosureCount ?? 0}</strong>
              </div>
              <div className="surveillance-card__metric-row">
                <span>Off-platform call minutes</span>
                <strong>{analysis?.offPlatformCallMinutes ?? 0}</strong>
              </div>
              <p className="surveillance-card__note">
                Emails, chats, calls, and suspicious recipients in one view.
              </p>
            </article>

            <article className="surveillance-card">
              <div className="visual-card-heading">
                <span className="visual-icon material-symbols-outlined">account_balance_wallet</span>
                <div>
                  <span className="eyebrow eyebrow--dark">Financial Monitoring</span>
                  <h3>Transaction and wallet leak control</h3>
                </div>
              </div>
              <div className="surveillance-card__metric-row">
                <span>History exports</span>
                <strong>{analysis?.transactionHistoryExportCount ?? 0}</strong>
              </div>
              <div className="surveillance-card__metric-row">
                <span>Wallet transfer attempts</span>
                <strong>{analysis?.walletTransferAttempts ?? 0}</strong>
              </div>
              <div className="surveillance-card__metric-row">
                <span>Amount under review</span>
                <strong>{currencyFormatter.format(analysis?.walletTransferAmountUsd ?? 0)}</strong>
              </div>
              <p className="surveillance-card__note">
                Exports, payouts, and wallet movement surfaced for review.
              </p>
            </article>

            <article className="surveillance-card surveillance-card--alert">
              <div className="visual-card-heading">
                <span className="visual-icon material-symbols-outlined">verified_user</span>
                <div>
                  <span className="eyebrow eyebrow--dark">Board Advisory</span>
                  <h3>Recommended oversight action</h3>
                </div>
              </div>
              <ul className="surveillance-card__list">
                {(analysis?.watchVectors ?? []).map((vector) => (
                  <li key={vector}>{vector}</li>
                ))}
              </ul>
              <p className="surveillance-card__note">
                {analysis?.boardRecommendation ??
                  "Maintain elevated human review before any punitive action."}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-shell split-panel">
          <div className="split-panel__media">
            <img alt="" src={siteImages.control} />
          </div>
          <div className="split-panel__copy">
            <span className="eyebrow">The Hub Of Global Intelligence</span>
            <h2>From fragmented evidence to one dependable operating picture.</h2>
            <p>
              {metrics.totalEmployees} specialists, {metrics.unusualActivityAlerts} active anomalies, one operating view.
            </p>
            <div className="metric-pair-grid">
              <article>
                <strong>{analysis?.finalRiskScore ?? 0}</strong>
                <span>Selected live score</span>
              </article>
              <article>
                <strong>{priorityDepartment?.avgRisk ?? 0}</strong>
                <span>{priorityDepartment?.department ?? "Operations"} pressure index</span>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-shell feature-stack">
          <article className="feature-row">
            <div className="feature-row__copy">
              <div className="visual-card-heading visual-card-heading--feature">
                <span className="icon-pill">
                  <span className="material-symbols-outlined">analytics</span>
                </span>
                <h2>Advanced data modeling</h2>
              </div>
              <p>
                Many signals become one explainable risk score.
              </p>
              <ul className="bullet-list">
                <li><span className="material-symbols-outlined">psychology</span> Behavior</li>
                <li><span className="material-symbols-outlined">forum</span> Communication</li>
                <li><span className="material-symbols-outlined">payments</span> Finance</li>
              </ul>
            </div>
            <div className="feature-row__media">
              <img alt="" src={siteImages.modeling} />
            </div>
          </article>

          <article className="feature-row feature-row--reverse feature-row--soft">
            <div className="feature-row__copy">
              <div className="visual-card-heading visual-card-heading--feature">
                <span className="icon-pill">
                  <span className="material-symbols-outlined">query_stats</span>
                </span>
                <h2>Predictive analytics</h2>
              </div>
              <p>
                {employee?.name ?? "Selected worker"}: {analysis?.afterHoursAccessCount ?? 0} off-hours sessions,{" "}
                {analysis?.policyViolationCount ?? 0} policy exceptions, {analysis?.externalEmailCount ?? 0} external emails.
              </p>
              <div className="case-study-card">
                <span className="eyebrow eyebrow--dark">Current Case Study</span>
                <h3>{timeline[0]?.title ?? "Priority monitoring event"}</h3>
                <p>{timeline[0]?.detail ?? "Active monitoring insight unavailable."}</p>
                <Link href="/contact">Discuss an implementation scenario</Link>
              </div>
            </div>
            <div className="feature-row__media">
              <img alt="" src={siteImages.analytics} />
            </div>
          </article>

          <article className="feature-row">
            <div className="feature-row__copy">
              <div className="visual-card-heading visual-card-heading--feature">
                <span className="icon-pill">
                  <span className="material-symbols-outlined">satellite_alt</span>
                </span>
                <h2>Satellite intelligence architecture</h2>
              </div>
              <p>
                Corporate interface, same monitoring logic, clearer signal reading.
              </p>
              <div className="mini-spec-grid">
                <article>
                  <strong>{analysis?.anomalyScore ?? 0}/100</strong>
                  <span>Anomaly index</span>
                </article>
                <article>
                  <strong>{analysis?.sentimentScore ?? 0}/100</strong>
                  <span>Current sentiment</span>
                </article>
              </div>
            </div>
            <div className="feature-row__media">
              <img alt="" src={siteImages.infrastructure} />
            </div>
          </article>
        </div>
      </section>

      <section className="specs-panel">
        <div className="container-shell">
          <div className="section-heading section-heading--center section-heading--light">
            <span className="eyebrow">System Specifications</span>
            <h2>Enterprise-grade structure with explainable decision signals.</h2>
            <p>Real values from the current mock intelligence model.</p>
          </div>
          <div className="specs-grid">
            <article className="spec-card">
              <h3><span className="material-symbols-outlined">memory</span> Processing Logic</h3>
              <dl>
                <div>
                  <dt>High-risk profiles</dt>
                  <dd>{metrics.highRiskEmployees}</dd>
                </div>
                <div>
                  <dt>Average score</dt>
                  <dd>{metrics.averageRiskScore}/100</dd>
                </div>
                <div>
                  <dt>Signal model</dt>
                  <dd>Weighted composite</dd>
                </div>
              </dl>
            </article>
            <article className="spec-card">
              <h3><span className="material-symbols-outlined">lan</span> Connectivity</h3>
              <dl>
                <div>
                  <dt>Departments tracked</dt>
                  <dd>{departments.length}</dd>
                </div>
                <div>
                  <dt>Live alerts</dt>
                  <dd>{timeline.length}</dd>
                </div>
                <div>
                  <dt>Monitoring scope</dt>
                  <dd>Cross-functional</dd>
                </div>
              </dl>
            </article>
            <article className="spec-card">
              <h3><span className="material-symbols-outlined">verified</span> Availability</h3>
              <dl>
                <div>
                  <dt>Top analysts surfaced</dt>
                  <dd>{topProfiles.length}</dd>
                </div>
                <div>
                  <dt>Negative sentiment alerts</dt>
                  <dd>{metrics.negativeSentimentAlerts}</dd>
                </div>
                <div>
                  <dt>Review posture</dt>
                  <dd>Human validated</dd>
                </div>
              </dl>
            </article>
          </div>
        </div>
      </section>

      <section className="cta-band cta-band--yellow">
          <div className="container-shell cta-band__inner cta-band__inner--stacked">
          <div>
            <span className="eyebrow eyebrow--dark">Experience Nexora Technologies</span>
            <h2>Visual signals for faster executive review.</h2>
          </div>
          <Link className="button button--dark" href="/contact">
            Request Private Access
          </Link>
        </div>
      </section>
    </main>
  );
}
