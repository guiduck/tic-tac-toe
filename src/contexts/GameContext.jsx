import { createContext, useState, useCallback, useMemo } from "react";

export const GAME_STATES = {
  INTRO: "intro",
  CHARACTER_SELECTION: "character_selection",
  PLAYING: "playing",
  PAUSED: "paused",
  VICTORY: "victory",
  DRAW: "draw",
  MATCH_VICTORY: "match_victory",
};

export const CELL_STATES = {
  EMPTY: null,
  RAT: "R",
  OCTOPUS: "O",
};

export const BOARD_SIZES = {
  SMALL: 3,
  MEDIUM: 5,
  LARGE: 7,
  XLARGE: 9,
};

export const GAME_CONSTANTS = {
  DEFAULT_WIN_CONDITION: 3,
};

/**
 * @param {number} size - Tamanho do tabuleiro (ex: 3 para 3x3)
 * @returns {Array} Array bidimensional representando o tabuleiro
 */
const createEmptyBoard = (size) => {
  return Array(size)
    .fill()
    .map(() => Array(size).fill(CELL_STATES.EMPTY));
};

/**
 * @param {Array} board - Tabuleiro atual
 * @param {string} symbol - Símbolo do jogador (R ou O)
 * @param {number} winLength - Comprimento necessário para vitória
 * @returns {boolean} Verdadeiro se há vitória
 */
export const checkWinCondition = (
  board,
  symbol,
  winLength = GAME_CONSTANTS.DEFAULT_WIN_CONDITION
) => {
  const size = board.length;

  // Verificar linhas
  for (let row = 0; row < size; row++) {
    for (let col = 0; col <= size - winLength; col++) {
      let consecutive = true;
      for (let i = 0; i < winLength; i++) {
        if (board[row][col + i] !== symbol) {
          consecutive = false;
          break;
        }
      }
      if (consecutive) return true;
    }
  }

  // Verificar colunas
  for (let col = 0; col < size; col++) {
    for (let row = 0; row <= size - winLength; row++) {
      let consecutive = true;
      for (let i = 0; i < winLength; i++) {
        if (board[row + i][col] !== symbol) {
          consecutive = false;
          break;
        }
      }
      if (consecutive) return true;
    }
  }

  // Verificar diagonal (superior esquerda - inferior direita)
  for (let row = 0; row <= size - winLength; row++) {
    for (let col = 0; col <= size - winLength; col++) {
      let consecutive = true;
      for (let i = 0; i < winLength; i++) {
        if (board[row + i][col + i] !== symbol) {
          consecutive = false;
          break;
        }
      }
      if (consecutive) return true;
    }
  }

  // Verificar diagonal (superior direita - inferior esquerda)
  for (let row = 0; row <= size - winLength; row++) {
    for (let col = winLength - 1; col < size; col++) {
      let consecutive = true;
      for (let i = 0; i < winLength; i++) {
        if (board[row + i][col - i] !== symbol) {
          consecutive = false;
          break;
        }
      }
      if (consecutive) return true;
    }
  }

  return false;
};

/**
 * @param {Array} board - Tabuleiro atual
 * @returns {boolean} Verdadeiro se está cheio
 */
const isBoardFull = (board) => {
  return board.every((row) => row.every((cell) => cell !== CELL_STATES.EMPTY));
};

const initialState = {
  gameState: GAME_STATES.INTRO,
  board: createEmptyBoard(BOARD_SIZES.SMALL),
  boardSize: BOARD_SIZES.SMALL,
  winConditionLength: GAME_CONSTANTS.DEFAULT_WIN_CONDITION,
  moveHistory: [],
  currentMove: 0,
  winner: null,
  isGameActive: false,
  canExpandBoard: true,
  totalMoves: 0,
};

export const GameContext = createContext();

/**
 * @param {Object} props - Props do componente
 * @param {React.ReactNode} props.children - Componentes filhos
 */
export function GameContextProvider({ children }) {
  const [game, setGame] = useState(initialState);

  /**
   * @param {string} newState - Novo estado do jogo
   */
  const setGameState = useCallback(
    (newState) => {
      setGame((prev) => ({
        ...prev,
        gameState: newState,
      }));
    },
    [game.gameState]
  );

  /**
   * @param {number} boardSize - Tamanho inicial do tabuleiro (padrão: 3)
   */
  const startNewGame = useCallback(
    (boardSize = BOARD_SIZES.SMALL) => {
      setGame((prev) => ({
        ...prev,
        gameState: GAME_STATES.PLAYING,
        board: createEmptyBoard(boardSize),
        boardSize,
        winConditionLength: GAME_CONSTANTS.DEFAULT_WIN_CONDITION,
        moveHistory: [],
        currentMove: 0,
        winner: null,
        isGameActive: true,
        totalMoves: 0,
        canExpandBoard: true,
      }));
    },
    [game.gameState]
  );

  /**
   * @param {number} row - Linha da jogada
   * @param {number} col - Coluna da jogada
   * @param {string} playerSymbol - Símbolo do jogador
   * @param {number} moveNumber - Número da jogada
   * @returns {Object} Registro da jogada
   */
  const createMoveRecord = useCallback(
    (row, col, playerSymbol, moveNumber) => ({
      row,
      col,
      player: playerSymbol,
      moveNumber,
      timestamp: Date.now(),
    }),
    []
  );

  /**
   * @param {Array} board - Tabuleiro atual
   * @param {number} row - Linha da jogada
   * @param {number} col - Coluna da jogada
   * @param {string} playerSymbol - Símbolo do jogador
   * @returns {Array} Novo tabuleiro atualizado
   */
  const updateBoardWithMove = useCallback((board, row, col, playerSymbol) => {
    return board.map((boardRow, rowIndex) =>
      boardRow.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return playerSymbol;
        }
        return cell;
      })
    );
  }, []);

  /**
   * @param {boolean} hasWinner - Se há vencedor
   * @param {boolean} isBoardFull - Se o tabuleiro está cheio
   * @param {string} playerSymbol - Símbolo do jogador
   * @returns {Object} Estado do jogo e vencedor
   */
  const determineGameState = useCallback(
    (hasWinner, isBoardFull, playerSymbol) => {
      if (hasWinner) {
        return { gameState: GAME_STATES.VICTORY, winner: playerSymbol };
      }
      if (isBoardFull) {
        return { gameState: GAME_STATES.DRAW, winner: null };
      }
      return { gameState: game.gameState, winner: null };
    },
    [game.gameState]
  );

  /**
   * @param {number} row - Linha da jogada
   * @param {number} col - Coluna da jogada
   * @param {string} playerSymbol - Símbolo do jogador (R ou O)
   * @returns {boolean} Verdadeiro se a jogada foi válida
   */
  const makeMove = useCallback(
    (row, col, playerSymbol) => {
      if (!game.isGameActive) return false;
      if (game.board[row][col] !== CELL_STATES.EMPTY) return false;

      setGame((prev) => {
        const newBoard = updateBoardWithMove(
          prev.board,
          row,
          col,
          playerSymbol
        );
        const newMove = createMoveRecord(
          row,
          col,
          playerSymbol,
          prev.totalMoves + 1
        );
        const newMoveHistory = [...prev.moveHistory, newMove];

        const hasWinner = checkWinCondition(
          newBoard,
          playerSymbol,
          prev.winConditionLength
        );
        const isFull = isBoardFull(newBoard);
        const { gameState: newGameState, winner } = determineGameState(
          hasWinner,
          isFull,
          playerSymbol
        );

        return {
          ...prev,
          board: newBoard,
          moveHistory: newMoveHistory,
          currentMove: newMoveHistory.length,
          totalMoves: prev.totalMoves + 1,
          winner,
          gameState: newGameState,
          isGameActive: !hasWinner && !isFull,
        };
      });

      return true;
    },
    [
      game.isGameActive,
      game.board,
      updateBoardWithMove,
      createMoveRecord,
      determineGameState,
    ]
  );

  /**
   * @returns {boolean} Verdadeiro se conseguiu expandir ou reiniciar
   */
  const expandBoard = useCallback(() => {
    const boardSizes = [
      BOARD_SIZES.SMALL,
      BOARD_SIZES.MEDIUM,
      BOARD_SIZES.LARGE,
      BOARD_SIZES.XLARGE,
    ];
    const currentSizeIndex = boardSizes.indexOf(game.boardSize);

    const shouldReset =
      currentSizeIndex === -1 || currentSizeIndex >= boardSizes.length - 1;
    if (shouldReset) {
      setGame({
        ...initialState,
        gameState: GAME_STATES.PLAYING,
        board: createEmptyBoard(BOARD_SIZES.SMALL),
        boardSize: BOARD_SIZES.SMALL,
        winConditionLength: GAME_CONSTANTS.DEFAULT_WIN_CONDITION,
        isGameActive: true,
        canExpandBoard: true,
      });

      return true;
    }

    if (!game.canExpandBoard) {
      return false;
    }

    const nextSize = boardSizes[currentSizeIndex + 1];
    const nextWinCondition = game.winConditionLength + 1;

    setGame((prev) => {
      const newBoard = createEmptyBoard(nextSize);
      const offset = Math.floor((nextSize - prev.boardSize) / 2);

      // Copiar tabuleiro para o meio do novo tabuleiro
      for (let row = 0; row < prev.boardSize; row++) {
        for (let col = 0; col < prev.boardSize; col++) {
          newBoard[row + offset][col + offset] = prev.board[row][col];
        }
      }

      const nextSizeIndex = boardSizes.indexOf(nextSize);
      const canExpandNext = nextSizeIndex < boardSizes.length - 1;

      const newState = {
        ...prev,
        board: newBoard,
        boardSize: nextSize,
        winConditionLength: nextWinCondition,
        gameState: GAME_STATES.PLAYING,
        isGameActive: true,
        winner: null,
        canExpandBoard: canExpandNext,
      };

      return newState;
    });

    return true;
  }, [game.canExpandBoard, game.boardSize, game.winConditionLength]);

  /**
   * @returns {void}
   */
  const togglePause = useCallback(() => {
    setGame((prev) => ({
      ...prev,
      gameState:
        prev.gameState === GAME_STATES.PAUSED
          ? GAME_STATES.PLAYING
          : GAME_STATES.PAUSED,
      isGameActive: prev.gameState === GAME_STATES.PAUSED,
    }));
  }, []);

  /**
   * @returns {void}
   */
  const resetGame = useCallback(() => {
    setGame((prev) => ({
      ...initialState,
      boardSize: prev.boardSize,
      winConditionLength: prev.winConditionLength,
      board: createEmptyBoard(prev.boardSize),
      gameState: GAME_STATES.PLAYING,
      isGameActive: true,
    }));
  }, []);

  /**
   * @returns {void}
   */
  const resetToIntro = useCallback(() => {
    setGame(initialState);
  }, []);

  /**
   * @returns {boolean} Verdadeiro se conseguiu desfazer
   */
  const undoLastMove = useCallback(() => {
    if (game.moveHistory.length === 0) return false;

    setGame((prev) => {
      const newMoveHistory = prev.moveHistory.slice(0, -1);
      const newBoard = createEmptyBoard(prev.boardSize);

      newMoveHistory.forEach((move) => {
        newBoard[move.row][move.col] = move.player;
      });

      return {
        ...prev,
        board: newBoard,
        moveHistory: newMoveHistory,
        currentMove: newMoveHistory.length,
        totalMoves: Math.max(0, prev.totalMoves - 1),
        winner: null,
        gameState: GAME_STATES.PLAYING,
        isGameActive: true,
      };
    });

    return true;
  }, [game.moveHistory.length, game.boardSize]);

  /**
   * @returns {Object} Informações do jogo
   */
  const getGameInfo = useCallback(() => {
    const emptyCells = game.board
      .flat()
      .filter((cell) => cell === CELL_STATES.EMPTY).length;
    const totalCells = game.boardSize * game.boardSize;

    return {
      boardSize: game.boardSize,
      totalMoves: game.totalMoves,
      emptyCells,
      totalCells,
      boardFull: emptyCells === 0,
      canUndo: game.moveHistory.length > 0,
      canExpand: game.canExpandBoard && game.gameState === GAME_STATES.DRAW,
      lastMove: game.moveHistory[game.moveHistory.length - 1] || null,
    };
  }, [game]);

  /**
   * @param {number} row - Linha
   * @param {number} col - Coluna
   * @returns {boolean} Verdadeiro se é válida
   */
  const isValidMove = useCallback(
    (row, col) => {
      if (row < 0 || row >= game.boardSize) return false;
      if (col < 0 || col >= game.boardSize) return false;
      if (!game.isGameActive) return false;

      return game.board[row][col] === CELL_STATES.EMPTY;
    },
    [game.board, game.boardSize, game.isGameActive]
  );

  const contextValue = useMemo(
    () => ({
      ...game,

      setGameState,
      startNewGame,
      makeMove,
      expandBoard,
      togglePause,
      resetGame,
      resetToIntro,
      undoLastMove,
      getGameInfo,
      isValidMove,
    }),
    [
      game,
      setGameState,
      startNewGame,
      makeMove,
      expandBoard,
      togglePause,
      resetGame,
      resetToIntro,
      undoLastMove,
      getGameInfo,
      isValidMove,
    ]
  );

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
}
