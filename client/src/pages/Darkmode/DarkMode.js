import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import "./DarkMode.css";

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    const body = document.body;
    body.classList.toggle("dark-mode");
  };

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        checked={isDarkMode}
        onChange={handleToggle}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        {isDarkMode ? <FaMoon /> : <FaSun />}
      </label>
    </div>
  );
};

export default DarkMode;
