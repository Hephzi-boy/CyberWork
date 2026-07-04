export function OverviewHero() {
  return (
    <section className="hero-panel">
      <div className="hero-copy">
        <p className="eyebrow">Behavioral Sentiment Fusion</p>
        <h1>Insider Cyber Threat Detection Using Behavioral Sentiment Analysis</h1>
        <p className="hero-text">
          This demo correlates employee sentiment drift, after-hours access, policy
          violations, and anomalous behavior into a single insider-risk view.
        </p>
      </div>
      <div className="hero-grid">
        <div className="hero-signal">
          <span>Signals fused</span>
          <strong>Communication, access, policy, transfer</strong>
        </div>
        <div className="hero-signal">
          <span>Scoring model</span>
          <strong>0-100 weighted risk index</strong>
        </div>
        <div className="hero-signal">
          <span>Use case</span>
          <strong>Security ops triage and analyst review</strong>
        </div>
      </div>
    </section>
  );
}
