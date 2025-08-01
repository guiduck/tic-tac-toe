import styles from "./styles.module.scss";

/**
 * @param {Function} props.expandBoardAfterDraw - Handler for expanding the board
 */
export default function ExpandButton({ expandBoardAfterDraw }) {
  return (
    <div className={styles.drawSection}>
      <div className={styles.drawMessage}>
        <span className={styles.drawIcon}>⚖️</span>
        <span>Empate!</span>
      </div>
      <button
        className="btn primary"
        onClick={expandBoardAfterDraw}
        aria-label="Expandir tabuleiro em caso de empate"
      >
        Expandir Tabuleiro (E)
      </button>
    </div>
  );
}
