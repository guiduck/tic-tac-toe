import { BOARD_SIZES, GAME_STATES } from "../../../contexts/GameContext";
import ExpandButton from "./expandButton";

import MatchVictoryScreen from "./matchVictoryScreen";
import PauseState from "./pauseState";
import SingleVictoryScreen from "./singleVictoryScreen";
import styles from "./styles.module.scss";

export default function GameStatus({
  game,
  players,
  isMatchOver,
  expandBoardAfterDraw,
  restartMatch,
  backToCharacterSelection,
}) {
  const getWinnerInfo = () => {
    if (!game.winner) return null;

    const isPlayer1Winner = players.player1.getSymbol() === game.winner;
    const winnerPlayer = isPlayer1Winner ? players.player1 : players.player2;

    return {
      name: winnerPlayer.getCharacterName(),
      isPlayer1: isPlayer1Winner,
    };
  };

  const canExpandBoard =
    game.canExpandBoard && game.gameState === GAME_STATES.DRAW;
  const showExpandButton =
    canExpandBoard && game.boardSize < BOARD_SIZES.XLARGE;

  return (
    <div className={styles.gameStatus}>
      {isMatchOver && (
        <MatchVictoryScreen
          players={players}
          restartMatch={restartMatch}
          backToCharacterSelection={backToCharacterSelection}
        />
      )}

      {!isMatchOver && game.gameState === GAME_STATES.VICTORY && (
        <SingleVictoryScreen name={getWinnerInfo()?.name} />
      )}

      {!isMatchOver &&
        game.gameState === GAME_STATES.DRAW &&
        showExpandButton && (
          <ExpandButton expandBoardAfterDraw={expandBoardAfterDraw} />
        )}

      {!isMatchOver && game.gameState === GAME_STATES.PAUSED && <PauseState />}
    </div>
  );
}
