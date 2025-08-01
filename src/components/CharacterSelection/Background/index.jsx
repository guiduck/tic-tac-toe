import styles from "./styles.module.scss";

export default function Background() {
  return (
    <div className={styles.background}>
      <div className={styles.battleFieldLeft}></div>
      <div className={styles.battleFieldRight}></div>
      <div className={styles.vsSymbol}>VS</div>
    </div>
  );
}
