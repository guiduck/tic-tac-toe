import styles from "./styles.module.scss";

export default function GameTitle() {
  return (
    <div className={styles.gameTitle}>
      <h1>Polvos vs Ratos</h1>
      <p className={styles.subtitle}>A Batalha pela Dominação Mundial</p>
    </div>
  );
}
