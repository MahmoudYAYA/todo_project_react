import { Sun, Moon } from "lucide-react";
import type { Theme } from "../hooks/useTheme";

type ThemeToggleProps = {
  theme: Theme;
  onToggle: () => void;
};

export const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="btn btn-circle btn-ghost hover:bg-base-200 transition-all"
      title={`Basculer en mode ${theme === "light" ? "sombre" : "clair"}`}>
      {theme === "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
};
