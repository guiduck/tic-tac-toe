import styles from "./styles.module.scss";

/**
 * @param {Function} props.onBackToIntro - Handler for back to intro
 * @param {Function} props.onSwitchPlayer - Handler for switching player
 * @param {Function} props.onStartGame - Handler for starting game
 * @param {boolean} props.bothPlayersReady - Whether both players are ready
 */
export default function Controls({
  onBackToIntro,
  onSwitchPlayer,
  onStartGame,
  bothPlayersReady,
}) {
  return (
    <div className={styles.controls}>
      <button className="btn secondary" onClick={onBackToIntro}>
        ← Voltar
      </button>

      <button
        className="btn secondary"
        onClick={onSwitchPlayer}
        disabled={bothPlayersReady}
      >
        Trocar Jogador (Tab)
      </button>

      <button
        className="btn primary"
        onClick={onStartGame}
        disabled={!bothPlayersReady}
      >
        Começar Batalha!
      </button>
    </div>
  );
}
