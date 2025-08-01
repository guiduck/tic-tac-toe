import { useEffect, useState } from "react";
import { useGameState } from "../hooks/useGameState";
import { useGameOperations } from "../hooks/useGameOperations";
import { useShortcut } from "../hooks/useShortcut";
import { GAME_STATES } from "../contexts/GameContext";
import styles from "./GameScreen.module.scss";
import Footer from "../components/Footer";
import Scoreboard from "../components/Game/Scoreboard";
import Timer from "../components/Game/Timer";
import GameBoard from "../components/Game/GameBoard";
import PlayerDisplay from "../components/Game/PlayerDisplay";
import GameStatus from "../components/Game/GameStatus";
import InstructionsModal from "../components/Game/InstructionsModal";
import DialogueSystem from "../components/Game/DialogueSystem";

export function GameScreen() {
  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });

  const {
    game,
    players,
    timer,
    dialogue,
    makeMove,
    toggleGamePause,
    restartGame,
    restartMatch,
    startGame,
    expandBoardAfterDraw,
    backToCharacterSelection,
    currentPlayer,
    isPlaying,
    isSwitchingPlayers,
    isMatchOver,
  } = useGameState();

  const { handleCellClick, toggleInstructions, keyboardShortcuts } =
    useGameOperations({
      selectedCell,
      setSelectedCell,
      showInstructions,
      setShowInstructions,

      game,
      makeMove,
      toggleGamePause,
      restartGame,
      expandBoardAfterDraw,
      backToCharacterSelection,
      isPlaying,
    });

  useShortcut(keyboardShortcuts);

  useEffect(() => {
    if (!players.player1.hasCharacter() || !players.player2.hasCharacter()) {
      backToCharacterSelection();
      return;
    }

    if (game.isGameActive) {
      return;
    }

    const cantStartGameStates = [
      GAME_STATES.DRAW,
      GAME_STATES.PAUSED,
      GAME_STATES.VICTORY,
      GAME_STATES.MATCH_VICTORY,
    ];

    if (cantStartGameStates.includes(game.gameState)) {
      return;
    }

    startGame();
  }, [
    players.player1,
    players.player2,
    game.isGameActive,
    game.gameState,
    backToCharacterSelection,
    startGame,
  ]);

  return (
    <div className={styles.gameScreen}>
      <Scoreboard players={players} />

      <main className={styles.gameArea}>
        <PlayerDisplay
          player={players.player1}
          currentPlayer={currentPlayer}
          isPlaying={isPlaying}
          position="left"
        />

        <section className={styles.gameBoardSection}>
          <Timer
            timer={timer}
            currentPlayer={currentPlayer}
            players={players}
            isSwitchingPlayers={isSwitchingPlayers}
          />

          <GameBoard
            game={game}
            selectedCell={selectedCell}
            onCellClick={handleCellClick}
            isPlaying={isPlaying}
            isSwitchingPlayers={isSwitchingPlayers}
          />

          <GameStatus
            game={game}
            players={players}
            isMatchOver={isMatchOver}
            expandBoardAfterDraw={expandBoardAfterDraw}
            restartMatch={restartMatch}
            backToCharacterSelection={backToCharacterSelection}
          />
        </section>

        <PlayerDisplay
          player={players.player2}
          currentPlayer={currentPlayer}
          isPlaying={isPlaying}
          position="right"
        />
      </main>

      <Footer
        game={game}
        backToCharacterSelection={backToCharacterSelection}
        toggleGamePause={toggleGamePause}
        restartGame={restartGame}
        toggleInstructions={toggleInstructions}
      />

      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        timer={timer}
      />

      <DialogueSystem dialogue={dialogue} />
    </div>
  );
}
