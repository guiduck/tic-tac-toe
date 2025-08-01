import { GAME_STATES } from "../../contexts/GameContext";
import styles from "./styles.module.scss";

export default function Footer({
  game,
  toggleGamePause,
  restartGame,
  backToCharacterSelection,
  toggleInstructions,
}) {
  return (
    <footer className={styles.footer}>
      <div className={styles.gameControls}>
        <button className="btn secondary" onClick={toggleGamePause}>
          {game.gameState === GAME_STATES.PAUSED
            ? "▶️ Continuar (P)"
            : "⏸️ Pausar (P)"}
        </button>
        <button className="btn secondary" onClick={restartGame}>
          🔄 Reiniciar (R)
        </button>
        <button className="btn secondary" onClick={backToCharacterSelection}>
          ← Voltar (Esc)
        </button>
      </div>

      <div className={styles.shortcutsSection}>
        <button className="btn primary" onClick={toggleInstructions}>
          ❓ Instruções (H)
        </button>

        <div className={styles.quickShortcuts}>
          <span>
            <kbd>↑↓←→</kbd> Navegar
          </span>
          <span>
            <kbd>Enter</kbd> Jogar
          </span>
          <span>
            <kbd>P</kbd> Pausar
          </span>
          <span>
            <kbd>H</kbd> Ajuda
          </span>
        </div>
      </div>
    </footer>
  );
}
