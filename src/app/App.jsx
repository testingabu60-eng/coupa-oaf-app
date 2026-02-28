// src/app/App.jsx
import React, { useRef, useEffect, useState } from "react";
import MainView from "../features/ui/views/MainView";
import "../../styles/app.css";   // your CSS folder is at project root, not inside src

const App = () => {
  const shellRef = useRef(null);

  // Remember size across openings
  const [size, setSize] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("byoa_shell_size") || "{}");
      return { width: saved.width || 420, height: saved.height || 560 };
    } catch {
      return { width: 420, height: 560 };
    }
  });

  // Apply saved size on first mount
  useEffect(() => {
    if (shellRef.current) {
      shellRef.current.style.width = `${size.width}px`;
      shellRef.current.style.height = `${size.height}px`;
    }
  }, []);

  // Track user drag-resizes and persist them
  useEffect(() => {
    if (!shellRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      const next = { width: Math.round(width), height: Math.round(height) };
      setSize(next);
      try {
        localStorage.setItem("byoa_shell_size", JSON.stringify(next));
      } catch {}
    });
    ro.observe(shellRef.current);
    return () => ro.disconnect();
  }, []);

  const handleMaximize = () => {
    if (!shellRef.current) return;
    shellRef.current.style.width = "900px";
    shellRef.current.style.height = "900px";
  };

  const handleRestore = () => {
    if (!shellRef.current) return;
    shellRef.current.style.width = "420px";
    shellRef.current.style.height = "560px";
  };

  // 👉 Inline styles here guarantee visibility even if other CSS overrides exist
  const forcedVisibleShellStyle = {
    backgroundColor: "#fffbe6",               // high-contrast pale yellow
    border: "3px solid #0F4C81",              // Coupa blue border
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.18)", // stronger shadow
    position: "relative",
    zIndex: 999999,                           // make sure it sits above other elements inside the iframe
  };

  return (
    <div className="byoa-shell" ref={shellRef} style={forcedVisibleShellStyle}>
      <div className="byoa-controls">
        <button className="byoa-btn" onClick={handleRestore}>Restore</button>
        <button className="byoa-btn" onClick={handleMaximize}>Maximize</button>
      </div>

      {/* Your actual UI */}
      <MainView />
    </div>
  );
};

export default App;