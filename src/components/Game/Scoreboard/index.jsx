import { useColorCustomization } from "../../../hooks/useColorCustomization";
import styles from "./styles.module.scss";

/**
 * @param {Object} props.players - Player objects with scores and character info
 */
export default function Scoreboard({ players }) {
  const { getCharacterColor } = useColorCustomization();
  const totalGames = players.player1.score + players.player2.score + 1;

  return (
    <header className={styles.header}>
      <div className={styles.scoreboard}>
        <div
          className={`${styles.playerScore} ${styles.player1}`}
          style={{
            "--custom-color": getCharacterColor(players.player1.character),
          }}
        >
          <div className={styles.playerInfo}>
            <img
              src={players.player1.getCharacterImage()}
              alt={players.player1.getCharacterName()}
              className={styles.playerAvatar}
            />
            <span className={styles.playerName}>
              {players.player1.getCharacterName()}
            </span>
          </div>
          <div className={styles.score}>{players.player1.score}</div>
        </div>

        <div className={styles.vsIndicator}>
          <span className={styles.vsText}>VS</span>
          <div className={styles.gameInfo}>Jogo {totalGames}</div>
        </div>

        <div
          className={`${styles.playerScore} ${styles.player2}`}
          style={{
            "--custom-color": getCharacterColor(players.player2.character),
          }}
        >
          <div className={styles.score}>{players.player2.score}</div>
          <div className={styles.playerInfo}>
            <span className={styles.playerName}>
              {players.player2.getCharacterName()}
            </span>
            <img
              src={players.player2.getCharacterImage()}
              alt={players.player2.getCharacterName()}
              className={styles.playerAvatar}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
