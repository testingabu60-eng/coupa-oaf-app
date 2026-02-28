// src/app/App.jsx
import React, { useRef, useEffect, useState } from "react";
import MainView from "../features/ui/views/MainView";
import "../../styles/app.css";   // CORRECT PATH (root/styles folder)

const App = () => {
  const shellRef = useRef(null);

  const [size, setSize] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("byoa_shell_size") || "{}");
      return {
        width: saved.width || 420,
        height: saved.height || 560,
      };
    } catch {
      return { width: 420, height: 560 };
    }
  });

  useEffect(() => {
    if (shellRef.current) {
      shellRef.current.style.width = `${size.width}px`;
      shellRef.current.style.height = `${size.height}px`;
    }
  }, []);

  useEffect(() => {
    if (!shellRef.current) return;

    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      const newSize = { width: Math.round(width), height: Math.round(height) };
      setSize(newSize);
      localStorage.setItem("byoa_shell_size", JSON.stringify(newSize));
    });

    ro.observe(shellRef.current);
    return () => ro.disconnect();
  }, []);

  const handleMaximize = () => {
    shellRef.current.style.width = "900px";
    shellRef.current.style.height = "900px";
  };

  const handleRestore = () => {
    shellRef.current.style.width = "420px";
    shellRef.current.style.height = "560px";
  };

  return (
    <div className="byoa-shell" ref={shellRef}>
      <div className="byoa-controls">
        <button className="byoa-btn" onClick={handleRestore}>Restore</button>
        <button className="byoa-btn" onClick={handleMaximize}>Maximize</button>
      </div>

      <MainView />
    </div>
  );
};

export default App;