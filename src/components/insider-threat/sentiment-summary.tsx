type SummaryMetric = {
  label: string;
  value: string;
  accent: "cyan" | "amber" | "red";
  note: string;
};

export function SentimentSummary({ metrics }: { metrics: SummaryMetric[] }) {
  return (
    <section className="summary-grid">
      {metrics.map((metric) => (
        <article key={metric.label} className={`summary-card accent-${metric.accent}`}>
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
          <p>{metric.note}</p>
        </article>
      ))}
    </section>
  );
}
