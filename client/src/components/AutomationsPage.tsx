const AutomationsPage = () => {
  return (
    <div className="placeholder-page">
      <h2>Automation Rules</h2>
      <p className="placeholder-copy">
        FlowBridge applies opinionated workflow rules on the backend so teams never lose track of
        critical work.
      </p>
      <ul className="automation-list">
        <li>
          <strong>Auto-progress critical backlog</strong> – when a task is created with priority
          "critical" in Backlog, the automation engine immediately moves it to In Progress and logs
          an activity event.
        </li>
        <li>
          <strong>Auto-block overdue work</strong> – if a task&apos;s due date passes and it is not
          Done, the engine marks it Blocked and surfaces it in the Activity feed.
        </li>
        <li>
          <strong>Real-time broadcasting</strong> – every automation change is emitted via Socket.IO
          so all dashboards stay in sync without refresh.
        </li>
      </ul>
      <p className="placeholder-copy">
        In a production version, these rules could be configured per project from this screen with a
        visual rule builder.
      </p>
    </div>
  );
};

export default AutomationsPage;


