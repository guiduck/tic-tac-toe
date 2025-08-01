import { MATCH_VICTORY_SCORE } from "../../../hooks/useGameState";
import styles from "./styles.module.scss";

export default function MatchVictoryScreen({
  players,
  restartMatch,
  backToCharacterSelection,
}) {
  return (
    <div className={styles.matchVictoryScreen}>
      <h2 className={styles.matchVictoryTitle}>🎊 VITÓRIA TOTAL! 🎊</h2>
      <div className={styles.matchWinnerAnnouncement}>
        <img
          src={
            players.player1.score >= MATCH_VICTORY_SCORE
              ? players.player1.getCharacterImage()
              : players.player2.getCharacterImage()
          }
          alt="Winner"
          className={styles.winnerImage}
        />
        <h3 className={styles.winnerName}>
          {players.player1.score >= MATCH_VICTORY_SCORE
            ? players.player1.getCharacterName()
            : players.player2.getCharacterName()}{" "}
          Conquistou a Supremacia!
        </h3>
        <div className={styles.finalScore}>
          Placar Final: {players.player1.score} - {players.player2.score}
        </div>
      </div>
      <div className={styles.matchVictoryActions}>
        <button className="btn primary" onClick={restartMatch}>
          🔄 Nova Partida
        </button>
        <button className="btn secondary" onClick={backToCharacterSelection}>
          🎭 Trocar Personagens
        </button>
      </div>
    </div>
  );
}
