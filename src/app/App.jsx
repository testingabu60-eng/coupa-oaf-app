import React, { useRef, useEffect, useState } from "react";
import MainView from "../features/ui/views/MainView";
import "../../styles/app.css";

const App = () => {
  const shellRef = useRef(null);

  // Load last saved size (optional)
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

  // Apply saved size on first load
  useEffect(() => {
    if (shellRef.current) {
      shellRef.current.style.width = `${size.width}px`;
      shellRef.current.style.height = `${size.height}px`;
    }
  }, []);

  // Track user drag resize
  useEffect(() => {
    if (!shellRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      const newSize = {
        width: Math.round(width),
        height: Math.round(height),
      };
      setSize(newSize);
      localStorage.setItem("byoa_shell_size", JSON.stringify(newSize));
    });

    observer.observe(shellRef.current);
    return () => observer.disconnect();
  }, []);

  // Maximise
  const handleMax = () => {
    if (!shellRef.current) return;
    shellRef.current.style.width = "900px";
    shellRef.current.style.height = "900px";
  };

  // Restore
  const handleRestore = () => {
    if (!shellRef.current) return;
    shellRef.current.style.width = "420px";
    shellRef.current.style.height = "560px";
  };

  return (
    <div className="byoa-shell" ref={shellRef}>
      <div className="byoa-controls">
        <button className="byoa-btn" onClick={handleRestore}>Restore</button>
        <button className="byoa-btn" onClick={handleMax}>Maximize</button>
      </div>

      <MainView />
    </div>
  );
};

export default App;