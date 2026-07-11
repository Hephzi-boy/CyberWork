import { SuspiciousEvent } from "@/types/insider-threat";

export function AnalysisTimeline({ events }: { events: SuspiciousEvent[] }) {
  return (
    <section className="analysis-card">
      <div className="panel-heading">
        <div>
          <span className="caps-label muted">Suspicious Timeline</span>
          <h2>Flagged Event Feed</h2>
        </div>
      </div>
      <div className="timeline-list">
        {events.map((event) => (
          <article key={event.id} className="timeline-event">
            <div className={`timeline-event__dot timeline-event__dot--${event.severity}`}>
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <div className="timeline-event__body">
              <div className="timeline-event__head">
                <strong>{event.title}</strong>
                <span>{event.timestamp}</span>
              </div>
              <p>{event.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
