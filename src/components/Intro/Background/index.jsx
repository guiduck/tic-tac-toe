import styles from "./styles.module.scss";

export default function Background() {
  return (
    <div className={styles.background}>
      <div className={styles.oceanWaves}></div>
      <div className={styles.landSilhouette}></div>
    </div>
  );
}
