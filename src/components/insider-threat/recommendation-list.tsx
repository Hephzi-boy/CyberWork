export function RecommendationList({ items }: { items: string[] }) {
  return (
    <section className="analysis-card">
      <div className="panel-heading">
        <div>
          <span className="caps-label muted">Analyst Recommendation Panel</span>
          <h2>Recommended Actions</h2>
        </div>
      </div>
      <div className="recommendation-stack">
        {items.map((item, index) => (
          <article key={item} className="recommendation-entry">
            <span className="material-symbols-outlined">
              {index === 0 ? "admin_panel_settings" : index === 1 ? "visibility" : "groups"}
            </span>
            <p>{item}</p>
          </article>
        ))}
        <p className="recommendation-footnote">
          No automated punitive action should occur without human validation and policy
          review.
        </p>
      </div>
    </section>
  );
}
