import { useEffect, useState } from "react";
import { ActivityEvent, fetchActivity } from "../api";
import { getSocket } from "../socket";
import ActivityFeed from "./ActivityFeed";

const ActivityPage = () => {
  const [events, setEvents] = useState<ActivityEvent[]>([]);

  useEffect(() => {
    // Load full history from backend when page opens
    fetchActivity()
      .then(setEvents)
      .catch(console.error);

    const socket = getSocket();

    socket.on("activity:event", (event: ActivityEvent) => {
      setEvents((prev) => [...prev, event]);
    });

    return () => {
      socket.off("activity:event");
    };
  }, []);

  return (
    <div className="placeholder-page">
      <h2>Activity</h2>
      <p className="placeholder-copy">
        End-to-end audit log for FlowBridge: task updates, automation events, and project changes.
      </p>
      <ActivityFeed events={events} />
    </div>
  );
};

export default ActivityPage;


