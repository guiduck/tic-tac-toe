import styles from "./styles.module.scss";

export default function PauseState() {
  return (
    <div className={styles.pauseMessage}>
      <span className={styles.pauseIcon}>⏸️</span>
      <span>Jogo Pausado</span>
    </div>
  );
}
