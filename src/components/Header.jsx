import React, { useState } from "react";

export default function Header({ onSync }) {
  const [lastSync, setLastSync] = useState(null);

  const handleSync = async () => {
    await onSync();
    setLastSync(new Date().toLocaleTimeString());
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <h2>🍔 POS System</h2>
      </div>
      <div className="header-right">
        {lastSync && (
          <span className="sync-status">Last synced: {lastSync}</span>
        )}
        <button onClick={handleSync}>🔄 Sync</button>
      </div>
    </header>
  );
}

