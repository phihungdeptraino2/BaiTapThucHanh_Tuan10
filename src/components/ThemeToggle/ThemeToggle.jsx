"use client";

import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../store/slices/themeSlice";
import "./ThemeToggle.css";

function ThemeToggle() {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <div className="theme-toggle">
      <span className="theme-label">Theme:</span>
      <button className="toggle-button" onClick={() => dispatch(toggleTheme())}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </div>
  );
}

export default ThemeToggle;
