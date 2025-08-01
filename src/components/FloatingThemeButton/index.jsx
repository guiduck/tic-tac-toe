import { useState } from "react";
import styles from "./styles.module.scss";
import { useColorCustomization } from "../../hooks/useColorCustomization";
import { useTheme } from "../../hooks/useTheme";

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

const settingsIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z" />
  </svg>
);

export default function FloatingThemeButton() {
  const { theme, toggleTheme } = useTheme();
  const { customColors, updateCharacterColor, resetColors } =
    useColorCustomization();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleColorChange = (character, color) => {
    updateCharacterColor(character, color);
  };

  return (
    <div className={styles.floatingMenu}>
      {isMenuOpen && (
        <div className={styles.menuPanel}>
          <div className={styles.menuHeader}>
            <h3>🎨 Personalização</h3>
          </div>

          <div className={styles.menuSection}>
            <h4>Tema</h4>
            <button
              className={styles.themeButton}
              onClick={toggleTheme}
              title={
                theme === "light"
                  ? "Mudar para tema escuro"
                  : "Mudar para tema claro"
              }
            >
              <div className={styles.icon}>
                {theme === "light" ? moonIcon : sunIcon}
              </div>
              <span>{theme === "light" ? "Escuro" : "Claro"}</span>
            </button>
          </div>

          <div className={styles.menuSection}>
            <h4>Cores dos Personagens</h4>

            <div className={styles.colorPicker}>
              <label htmlFor="rat-color">🐭 Ratos</label>
              <input
                id="rat-color"
                type="color"
                value={customColors.rat}
                onChange={(e) => handleColorChange("rat", e.target.value)}
                className={styles.colorInput}
              />
            </div>

            <div className={styles.colorPicker}>
              <label htmlFor="octopus-color">🐙 Polvos</label>
              <input
                id="octopus-color"
                type="color"
                value={customColors.octopus}
                onChange={(e) => handleColorChange("octopus", e.target.value)}
                className={styles.colorInput}
              />
            </div>

            <button
              className={styles.resetButton}
              onClick={resetColors}
              title="Restaurar cores padrão"
            >
              ↺ Restaurar Padrão
            </button>
          </div>
        </div>
      )}

      {/* Botão principal */}
      <button
        className={`${styles.floatingButton} ${
          isMenuOpen ? styles.active : ""
        }`}
        onClick={toggleMenu}
        title="Personalização"
        aria-label="Abrir menu de personalização"
      >
        <div className={styles.icon}>{settingsIcon}</div>
        <span className={styles.label}>Personalizar</span>
      </button>
    </div>
  );
}
