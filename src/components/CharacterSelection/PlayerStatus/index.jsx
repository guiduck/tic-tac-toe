import styles from "./styles.module.scss";

/**
 * @param {Object} props.player1 - Player 1 object
 * @param {Object} props.player2 - Player 2 object
 */
export default function PlayerStatus({ player1, player2 }) {
  return (
    <div className={styles.playerStatus}>
      <div className={styles.statusCard}>
        <h3>Jogador 1</h3>
        <div
          className={`${styles.statusIndicator} ${
            player1.hasCharacter() ? styles.ready : styles.waiting
          }`}
        >
          {player1.hasCharacter()
            ? `${player1.getCharacterName()} Selecionado`
            : "Aguardando seleção..."}
        </div>
      </div>

      <div className={styles.statusCard}>
        <h3>Jogador 2</h3>
        <div
          className={`${styles.statusIndicator} ${
            player2.hasCharacter() ? styles.ready : styles.waiting
          }`}
        >
          {player2.hasCharacter()
            ? `${player2.getCharacterName()} Selecionado`
            : "Aguardando seleção..."}
        </div>
      </div>
    </div>
  );
}
