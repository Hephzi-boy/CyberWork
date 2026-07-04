export function RiskMeter({ score }: { score: number }) {
  return (
    <section className="analysis-card risk-meter-card">
      <div className="panel-heading">
        <div>
          <span className="caps-label muted">Composite Threat Score</span>
          <h2>Risk Meter</h2>
        </div>
        <strong className="risk-meter-card__score">{score}</strong>
      </div>
      <div className="risk-meter-card__track">
        <div className="risk-meter-card__zones">
          <span />
          <span />
          <span />
        </div>
        <div className="risk-meter-card__fill" style={{ width: `${score}%` }} />
      </div>
      <div className="risk-meter-card__scale">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>
    </section>
  );
}
