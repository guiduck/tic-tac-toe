import styles from "./styles.module.scss";

/**
 * @param {Object} props.player - Player object with character info
 * @param {Object} props.currentPlayer - Currently active player
 * @param {boolean} props.isPlaying - Whether the game is active
 * @param {string} props.position - 'left' or 'right' for styling
 */
export default function PlayerDisplay({
  player,
  currentPlayer,
  isPlaying,
  position = "left",
}) {
  const isActive = currentPlayer.id === player.id && isPlaying;

  const getDisplayClasses = () => {
    const classes = [styles.characterDisplay];

    if (isActive) classes.push(styles.active);
    if (position === "right") classes.push(styles.rightPlayer);

    return classes.join(" ");
  };

  return (
    <aside className={`${styles.playerContainer} ${styles[position]}`}>
      <div className={getDisplayClasses()}>
        <div className={styles.characterImageContainer}>
          <img
            src={player.getCharacterImage()}
            alt={player.getCharacterName()}
            className={styles.characterImage}
          />
          {isActive && <div className={styles.activeRing} />}
        </div>

        <h3 className={styles.characterName}>{player.getCharacterName()}</h3>

        <div className={styles.playerIndicator}>
          {isActive && (
            <span className={styles.activeIndicator}>🎯 Sua vez!</span>
          )}
        </div>
      </div>
    </aside>
  );
}
