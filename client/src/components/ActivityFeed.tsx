import type { ActivityEvent } from "../api";

interface Props {
  events: ActivityEvent[];
}

const ActivityFeed = ({ events }: Props) => {
  const sorted = [...events].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <section className="card activity-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">Activity Feed</h2>
          <p className="card-subtitle">Automation and collaboration in one stream</p>
        </div>
      </div>
      <ul className="activity-list">
        {sorted.map((event) => (
          <li key={event.id} className="activity-item">
            <div className="activity-dot" />
            <div className="activity-content">
              <div className="activity-message">{event.message}</div>
              <div className="activity-meta">
                {new Date(event.createdAt).toLocaleTimeString()} · {event.type}
              </div>
            </div>
          </li>
        ))}
        {sorted.length === 0 && (
          <li className="activity-empty">No activity yet. Create or update a task to see events.</li>
        )}
      </ul>
    </section>
  );
};

export default ActivityFeed;


