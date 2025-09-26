import React, { useEffect, useState } from "react";
import { database } from "./firebaseConfig";
import { ref, onChildChanged, onValue, push, remove } from "firebase/database";

function App() {
  const [logs, setLogs] = useState([]);
  const [prevUsers, setPrevUsers] = useState({});

  const formatTimestamp = (date) => {
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    const usersRef = ref(database, "users/");
    const logsRef = ref(database, "updateLogs/");

    // Load existing logs from Firebase
    onValue(logsRef, (snapshot) => {
      const data = snapshot.val() || {};
      // Flatten logs so each field change is a separate entry
      const flattenedLogs = [];
      Object.values(data).forEach((log) => {
        log.changes.forEach((change) => {
          flattenedLogs.push({
            timestamp: log.timestamp,
            userId: log.userId,
            change,
          });
        });
      });
      setLogs(flattenedLogs);
    });

    // Initialize prevUsers
    onValue(usersRef, (snapshot) => {
      setPrevUsers(snapshot.val() || {});
    });

    // Listen for individual user changes
    const unsubscribe = onChildChanged(usersRef, (snapshot) => {
      const newUser = snapshot.val();
      const userId = snapshot.key;
      const oldUser = prevUsers[userId] || {};
      const timestamp = new Date();
      const changes = [];

      if (oldUser.name !== newUser.name) {
        changes.push(`Name updated: ${oldUser.name || "N/A"} → ${newUser.name}`);
      }
      if (oldUser.age !== newUser.age) {
        changes.push(`Age updated: ${oldUser.age !== undefined ? oldUser.age : "N/A"} → ${newUser.age}`);
      }

      if (changes.length > 0) {
        changes.forEach((change) => {
          const newLog = {
            timestamp: formatTimestamp(timestamp),
            userId,
            change,
          };
          push(logsRef, { ...newLog, changes: [change] }); // save each field separately
        });

        setPrevUsers((prev) => ({ ...prev, [userId]: newUser }));
      }
    });

    return () => unsubscribe();
  }, [prevUsers]);

  // Delete all logs
  const deleteLogs = () => {
    const logsRef = ref(database, "updateLogs/");
    remove(logsRef);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Realtime Update Logs</h1>
      <button onClick={deleteLogs} style={{ marginBottom: "10px" }}>
        Delete All Logs
      </button>

      {logs.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {logs.map((log, index) => (
            <li
              key={index}
              style={{
                background: "#f8f9fa",
                padding: "10px",
                marginBottom: "5px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            >
              <strong>{log.timestamp}</strong> — {log.userId}: {log.change}
            </li>
          ))}
        </ul>
      ) : (
        <p>No updates yet...</p>
      )}
    </div>
  );
}

export default App;
