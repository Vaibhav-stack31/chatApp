import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button className="btn btn-sm flex items-center gap-2" onClick={toggleTheme}>
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
