import styles from "./styles.module.scss";

/**
 * @param {Object} props.timer - Objeto de estado do timer com porcentagem, tempo, avisos
 * @param {Object} props.currentPlayer - Objeto do jogador atual
 * @param {Object} props.players - Todos os jogadores para identificação
 * @param {boolean} props.isSwitchingPlayers - Se os jogadores estão trocando atualmente
 */
export default function Timer({
  timer,
  currentPlayer,
  players,
  isSwitchingPlayers,
}) {
  // Debug
  // console.log("🎨 TIMER COMPONENT: Rendering with values:", {
  //   timeLeft: timer.timeLeft,
  //   formattedTimeInteger: timer.formattedTimeInteger,
  //   isRunning: timer.isRunning,
  //   percentage: timer.percentage,
  //   isSwitchingPlayers,
  //   currentPlayerName: currentPlayer?.getCharacterName?.(),
  // });
  const getTimerClasses = () => {
    const classes = [styles.timer];

    if (timer.isInWarningZone) classes.push(styles.warning);
    if (timer.isCritical) classes.push(styles.critical);
    if (isSwitchingPlayers) classes.push(styles.switching);

    return classes.join(" ");
  };

  const getCurrentPlayerInfo = () => {
    if (isSwitchingPlayers) {
      return "Trocando jogadores...";
    }

    const playerNumber =
      currentPlayer.id === players.player1.id ? "Jogador 1" : "Jogador 2";
    return `${currentPlayer.getCharacterName()} - ${playerNumber}`;
  };

  return (
    <div className={styles.timerSection}>
      <div className={getTimerClasses()}>
        <div className={styles.timerBar}>
          <div
            className={styles.timerFill}
            style={{
              width: `${isSwitchingPlayers ? 100 : timer.percentage}%`,
            }}
          />
        </div>
        <span className={styles.timerText}>
          {isSwitchingPlayers ? "🔄" : `${timer.formattedTimeInteger}s`}
        </span>
      </div>
      <p className={styles.currentPlayerName}>{getCurrentPlayerInfo()}</p>
    </div>
  );
}
