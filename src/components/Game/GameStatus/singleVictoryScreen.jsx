import styles from "./styles.module.scss";

/**
 * @param {string} props.name - Winner's name
 */
export default function SingleVictoryScreen({ name }) {
  return (
    <div className={styles.victoryMessage}>🏆 {name} venceu esta partida!</div>
  );
}
