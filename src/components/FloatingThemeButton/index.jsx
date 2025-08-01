import { useTheme } from "../../contexts/ThemeContext";
import styles from "./styles.module.scss";

const sunIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const moonIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function FloatingThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.floatingButton}
      onClick={toggleTheme}
      title={
        theme === "light" ? "Mudar para tema escuro" : "Mudar para tema claro"
      }
      aria-label={
        theme === "light" ? "Mudar para tema escuro" : "Mudar para tema claro"
      }
    >
      <div className={styles.icon}>
        {theme === "light" ? moonIcon : sunIcon}
      </div>
      <span className={styles.label}>
        {theme === "light" ? "Escuro" : "Claro"}
      </span>
    </button>
  );
}
