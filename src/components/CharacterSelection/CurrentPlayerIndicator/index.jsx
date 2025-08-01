import styles from "./styles.module.scss";

/**
 * @param {string} props.currentPlayerName - Current player name
 */
export default function CurrentPlayerIndicator({ currentPlayerName }) {
  return (
    <div className={styles.currentPlayerIndicator}>
      <h2>{currentPlayerName} - Escolha seu personagem</h2>
    </div>
  );
}
