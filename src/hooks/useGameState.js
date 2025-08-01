import { useCallback, useEffect, useRef, useState } from "react";
import { usePlayerContext } from "./usePlayerContext";
import { useGame } from "./useGame";
import { useDialogue } from "./useDialogue";
import { useAppNavigation } from "../routes/navigation";
import { useTimer } from "./useTimer";
import { DIALOGUE_TYPES } from "../models/Player";
import {
  BOARD_SIZES,
  GAME_CONSTANTS,
  GAME_STATES,
  checkWinCondition,
} from "../contexts/GameContext";

const DIALOGUE_AUTO_CLOSE_DELAY = 1500;
const DIALOGUE_DRAW_DELAY = 2000;
const GREETING_DELAY = 3000;
const SWITCH_TIMEOUT = 300;
const RESTART_DELAY = 5000;
const RESTART_QUICK_DELAY = 500;

const DEFAULT_TURN_DURATION = 5;
const MATCH_VICTORY_SCORE = 5;
const DEFAULT_WIN_CONDITION = GAME_CONSTANTS.DEFAULT_WIN_CONDITION;

/**
 * @param {number} options.turnDuration - Duração do turno em segundos (padrão: 5)
 * @param {boolean} options.showTimeoutDialogue - Se deve mostrar diálogo ao esgotar tempo (padrão: true)
 * @returns {Object} Estado unificado do jogo e ações
 */
export function useGameState({
  turnDuration = DEFAULT_TURN_DURATION,
  showTimeoutDialogue = true,
} = {}) {
  const playerContext = usePlayerContext();
  const gameContext = useGame();
  const dialogueContext = useDialogue();
  const [isSwitchingPlayers, setIsSwitchingPlayers] = useState(false);

  // Usa ref para evitar dependência circular
  const timerRef = useRef(null);

  const handleTimeout = useCallback(() => {
    timerRef.current?.stop();

    if (!gameContext.isGameActive || isSwitchingPlayers) {
      return;
    }

    const currentPlayer = playerContext.getCurrentPlayer();

    if (showTimeoutDialogue && currentPlayer.hasCharacter()) {
      dialogueContext.showPlayerDialogue(
        currentPlayer,
        DIALOGUE_TYPES.TIMEOUT,
        {
          autoClose: true,
          autoCloseDelay: DIALOGUE_DRAW_DELAY,
        }
      );
    }

    setIsSwitchingPlayers(true);

    setTimeout(() => {
      playerContext.switchToNextPlayer();
      setIsSwitchingPlayers(false);
      timerRef.current?.start(); // Inicia novo timer para o próximo jogador
    }, SWITCH_TIMEOUT);
  }, [
    gameContext.isGameActive,
    isSwitchingPlayers,
    playerContext,
    dialogueContext,
    showTimeoutDialogue,
  ]);

  const timer = useTimer({
    duration: turnDuration,
    onTimeout: handleTimeout,
  });

  timerRef.current = timer;

  useEffect(() => {
    if (!gameContext.isGameActive && timer.isRunning) {
      timerRef.current?.stop();
    }
  }, [gameContext.isGameActive, timer.isRunning]); // Observa apenas isRunning, não todo o objeto timer

  /**
   * @param {number} row - Linha da jogada
   * @param {number} col - Coluna da jogada
   * @returns {boolean} Verdadeiro se a jogada foi válida
   */
  const makeMove = useCallback(
    (row, col) => {
      if (isSwitchingPlayers) {
        return false;
      }

      if (!gameContext.isValidMove(row, col)) {
        const currentPlayer = playerContext.getCurrentPlayer();
        dialogueContext.showPlayerDialogue(
          currentPlayer,
          DIALOGUE_TYPES.ERROR,
          {
            autoClose: true,
            autoCloseDelay: DIALOGUE_AUTO_CLOSE_DELAY,
          }
        );
        return false;
      }

      const currentPlayer = playerContext.getCurrentPlayer();
      const playerSymbol = currentPlayer.getSymbol();

      const currentBoard = gameContext.board;
      const newBoard = currentBoard.map((boardRow, rowIndex) =>
        boardRow.map((cell, colIndex) => {
          if (rowIndex === row && colIndex === col) {
            return playerSymbol;
          }
          return cell;
        })
      );

      const hasWinner = checkWinCondition(
        newBoard,
        playerSymbol,
        gameContext.winConditionLength
      );
      const isBoardFull = newBoard.every((row) =>
        row.every((cell) => cell !== null)
      );

      const moveSuccess = gameContext.makeMove(row, col, playerSymbol);

      if (!moveSuccess) return false;

      dialogueContext.showPlayerDialogue(currentPlayer, DIALOGUE_TYPES.MOVE, {
        autoClose: true,
        autoCloseDelay: DIALOGUE_AUTO_CLOSE_DELAY,
      });

      if (hasWinner) {
        handleGameVictory(currentPlayer);
      } else if (isBoardFull) {
        handleGameDraw();
      } else {
        timerRef.current?.stop();
        setIsSwitchingPlayers(true);

        setTimeout(() => {
          playerContext.switchToNextPlayer();
          setIsSwitchingPlayers(false);
          timerRef.current?.start();
        }, SWITCH_TIMEOUT);
      }

      return true;
    },
    [gameContext, playerContext, dialogueContext, isSwitchingPlayers]
  );

  const handleGameVictory = useCallback(
    (winner) => {
      playerContext.updateScore(winner.id, 1);

      setTimeout(() => {
        const player1Score = playerContext.player1.score;
        const player2Score = playerContext.player2.score;

        if (player1Score >= MATCH_VICTORY_SCORE) {
          handleOverallVictory(playerContext.player1);
          return;
        }

        if (player2Score >= MATCH_VICTORY_SCORE) {
          handleOverallVictory(playerContext.player2);
          return;
        }

        showMatchVictoryDialogue(winner);
      }, 200);
    },
    [playerContext, dialogueContext]
  );

  const handleOverallVictory = useCallback(
    (overallWinner) => {
      gameContext.setGameState(GAME_STATES.MATCH_VICTORY);

      const overallLoser =
        overallWinner.id === playerContext.player1.id
          ? playerContext.player2
          : playerContext.player1;

      dialogueContext.queueDialogue({
        text: `🏆 VITÓRIA TOTAL! ${overallWinner.getCharacterName()} conquistou a supremacia com ${
          overallWinner.score + 1
        } vitórias!`,
        speakerName: overallWinner.getCharacterName(),
        speakerImage: overallWinner.getCharacterImage(),
        position: overallWinner.isRat() ? "left" : "right",
        autoClose: false,
      });

      dialogueContext.queueDialogue({
        text: `Que batalha épica! ${overallLoser.getCharacterName()} lutou bravamente, mas a vitória pertence ao rival!`,
        speakerName: overallLoser.getCharacterName(),
        speakerImage: overallLoser.getCharacterImage(),
        position: overallLoser.isRat() ? "left" : "right",
        autoClose: false,
      });
    },
    [gameContext, playerContext, dialogueContext]
  );

  const showMatchVictoryDialogue = useCallback(
    (winner) => {
      const loser = playerContext.getOtherPlayer();

      dialogueContext.queueDialogue({
        text: winner.getDialogue(DIALOGUE_TYPES.VICTORY),
        speakerName: winner.getCharacterName(),
        speakerImage: winner.getCharacterImage(),
        position: winner.isRat() ? "left" : "right",
        autoClose: true,
        autoCloseDelay: DIALOGUE_DRAW_DELAY,
      });

      dialogueContext.queueDialogue({
        text: loser.getDialogue(DIALOGUE_TYPES.DEFEAT),
        speakerName: loser.getCharacterName(),
        speakerImage: loser.getCharacterImage(),
        position: loser.isRat() ? "left" : "right",
        autoClose: true,
        autoCloseDelay: DIALOGUE_DRAW_DELAY,
      });

      setTimeout(() => {
        gameContext.startNewGame();
      }, RESTART_DELAY);
    },
    [playerContext, dialogueContext, gameContext]
  );

  const showDrawDialogues = useCallback(
    (autoClose = false, autoCloseDelay = 0) => {
      const player1 = playerContext.player1;
      const player2 = playerContext.player2;

      dialogueContext.queueDialogue({
        text: player1.getDialogue(DIALOGUE_TYPES.DRAW),
        speakerName: player1.getCharacterName(),
        speakerImage: player1.getCharacterImage(),
        position: "left",
        autoClose,
        autoCloseDelay,
      });

      dialogueContext.queueDialogue({
        text: player2.getDialogue(DIALOGUE_TYPES.DRAW),
        speakerName: player2.getCharacterName(),
        speakerImage: player2.getCharacterImage(),
        position: "right",
        autoClose,
        autoCloseDelay,
      });
    },
    [playerContext, dialogueContext]
  );

  const handleGameDraw = useCallback(() => {
    const isMaxSize = gameContext.boardSize >= BOARD_SIZES.XLARGE;

    if (isMaxSize) {
      showDrawDialogues(true, DIALOGUE_DRAW_DELAY);

      setTimeout(() => {
        gameContext.startNewGame(DEFAULT_WIN_CONDITION);
      }, RESTART_DELAY);

      return;
    }

    gameContext.setGameState(GAME_STATES.DRAW);

    showDrawDialogues(false);
  }, [playerContext, dialogueContext, gameContext, showDrawDialogues]);

  const startGame = useCallback(() => {
    if (!playerContext.bothPlayersReady()) {
      return false;
    }

    gameContext.startNewGame();

    playerContext.setCurrentPlayer("player1");

    const player1 = playerContext.player1;
    const player2 = playerContext.player2;

    dialogueContext.queueDialogue({
      text: player1.getDialogue(DIALOGUE_TYPES.GREETING),
      speakerName: player1.getCharacterName(),
      speakerImage: player1.getCharacterImage(),
      position: "left",
      autoClose: true,
      autoCloseDelay: GREETING_DELAY,
    });

    dialogueContext.queueDialogue({
      text: player2.getDialogue(DIALOGUE_TYPES.GREETING),
      speakerName: player2.getCharacterName(),
      speakerImage: player2.getCharacterImage(),
      position: "right",
      autoClose: true,
      autoCloseDelay: GREETING_DELAY,
    });

    setTimeout(() => {
      timerRef.current?.start();
    }, 6000);

    return true;
  }, [playerContext, gameContext, dialogueContext]);

  const expandBoardAfterDraw = useCallback(() => {
    const expanded = gameContext.expandBoard();

    if (!expanded) {
      return false;
    }

    dialogueContext.forceClose();
    timerRef.current?.restart();

    return true;
  }, [gameContext, dialogueContext]);

  const toggleGamePause = useCallback(() => {
    const wasPaused = gameContext.gameState === GAME_STATES.PAUSED;

    gameContext.togglePause();

    if (wasPaused) {
      timerRef.current?.resume();
    } else {
      timerRef.current?.pause();
    }
  }, [gameContext]);

  const restartGame = useCallback(() => {
    gameContext.resetGame();
    dialogueContext.forceClose();
    timerRef.current?.reset();
    playerContext.setCurrentPlayer("player1");

    setTimeout(startGame, RESTART_QUICK_DELAY);
  }, [gameContext, dialogueContext, playerContext, startGame]);

  const restartMatch = useCallback(() => {
    gameContext.resetToIntro();
    playerContext.resetScores();
    dialogueContext.forceClose();
    timerRef.current?.reset();
    playerContext.setCurrentPlayer("player1");

    setTimeout(startGame, RESTART_QUICK_DELAY);
  }, [gameContext, playerContext, dialogueContext, startGame]);

  const { navigateToCharacterSelection } = useAppNavigation();

  const backToCharacterSelection = useCallback(() => {
    gameContext.resetToIntro();
    dialogueContext.forceClose();
    timerRef.current?.reset();
    playerContext.resetAll();
    navigateToCharacterSelection();
  }, [
    gameContext,
    dialogueContext,
    playerContext,
    navigateToCharacterSelection,
  ]);

  /**
   * @returns {Object} Estado completo do jogo
   */
  const getFullGameState = useCallback(() => {
    return {
      players: {
        player1: playerContext.player1.toJSON(),
        player2: playerContext.player2.toJSON(),
        currentPlayerId: playerContext.currentPlayerId,
        bothReady: playerContext.bothPlayersReady(),
        stats: playerContext.getPlayerStats(),
      },

      game: {
        state: gameContext.gameState,
        board: gameContext.board,
        boardSize: gameContext.boardSize,
        isActive: gameContext.isGameActive,
        winner: gameContext.winner,
        info: gameContext.getGameInfo(),
      },

      timer: {
        timeLeft: timer.timeLeft,
        isRunning: timer.isRunning,
        percentage: timer.percentage,
        formattedTime: timer.formattedTime,
        formattedTimeInteger: timer.formattedTimeInteger,
        isInWarningZone: timer.isInWarningZone,
        isCritical: timer.isCritical,
      },

      dialogue: {
        isVisible: dialogueContext.isVisible,
        current: dialogueContext.getCurrentDialogue(),
        hasQueue: dialogueContext.hasQueuedDialogues(),
      },
    };
  }, [playerContext, gameContext, timer, dialogueContext]);

  return {
    players: playerContext,
    game: gameContext,
    dialogue: dialogueContext,
    timer,

    makeMove,
    startGame,
    expandBoardAfterDraw,
    toggleGamePause,
    restartGame,
    restartMatch,
    backToCharacterSelection,

    getFullGameState,

    isPlaying: gameContext.gameState === GAME_STATES.PLAYING,
    isGameOver:
      gameContext.gameState === GAME_STATES.VICTORY ||
      gameContext.gameState === GAME_STATES.DRAW,
    isMatchOver: gameContext.gameState === GAME_STATES.MATCH_VICTORY,
    currentPlayer: playerContext.getCurrentPlayer(),
    canPlay:
      gameContext.isGameActive &&
      playerContext.bothPlayersReady() &&
      !isSwitchingPlayers,
    needsCharacterSelection: !playerContext.bothPlayersReady(),
    isSwitchingPlayers,
  };
}
