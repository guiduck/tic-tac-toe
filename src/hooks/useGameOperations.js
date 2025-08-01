import { useCallback } from "react";
import { GAME_STATES } from "../contexts/GameContext";

/**
 * @param {Object} selectedCell - Célula atualmente selecionada {row, col}
 * @param {Function} setSelectedCell - Função para atualizar a célula selecionada
 * @param {boolean} showInstructions - Se o modal de instruções está aberto
 * @param {Function} setShowInstructions - Função para alternar o modal de instruções
 * @param {Object} game - Estado do jogo passado do componente pai
 * @param {Function} makeMove - Função para fazer uma jogada
 * @param {Function} toggleGamePause - Função para pausar/despausar o jogo
 * @param {Function} restartGame - Função para reiniciar o jogo
 * @param {Function} expandBoardAfterDraw - Função para expandir o tabuleiro após empate
 * @param {Function} backToCharacterSelection - Função para voltar à seleção de personagens
 * @param {boolean} isPlaying - Se o jogo está ativo
 */
export function useGameOperations({
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
}) {
  const handleCellClick = useCallback(
    (row, col) => {
      setSelectedCell({ row, col });
      makeMove(row, col);
    },
    [setSelectedCell, makeMove]
  );

  const moveSelection = useCallback(
    (direction) => {
      const { row, col } = selectedCell;
      const maxIndex = game.boardSize - 1;

      switch (direction) {
        case "up":
          setSelectedCell({ row: Math.max(0, row - 1), col });
          break;
        case "down":
          setSelectedCell({ row: Math.min(maxIndex, row + 1), col });
          break;
        case "left":
          setSelectedCell({ row, col: Math.max(0, col - 1) });
          break;
        case "right":
          setSelectedCell({ row, col: Math.min(maxIndex, col + 1) });
          break;
      }
    },
    [selectedCell, game.boardSize, setSelectedCell]
  );

  const playSelectedCell = useCallback(() => {
    makeMove(selectedCell.row, selectedCell.col);
  }, [makeMove, selectedCell]);

  const toggleInstructions = useCallback(() => {
    setShowInstructions(!showInstructions);
  }, [showInstructions, setShowInstructions]);

  const handleEscape = useCallback(() => {
    if (showInstructions) {
      setShowInstructions(false);
    } else {
      backToCharacterSelection();
    }
  }, [showInstructions, setShowInstructions, backToCharacterSelection]);

  const handleExpandBoard = useCallback(() => {
    if (game.gameState === GAME_STATES.DRAW) {
      expandBoardAfterDraw();
    }
  }, [game.gameState, expandBoardAfterDraw]);

  const keyboardShortcuts = [
    {
      key: "ArrowUp",
      handler: (event) => {
        event.preventDefault();
        moveSelection("up");
      },
      options: { debounce: 100 },
    },
    {
      key: "ArrowDown",
      handler: (event) => {
        event.preventDefault();
        moveSelection("down");
      },
      options: { debounce: 100 },
    },
    {
      key: "ArrowLeft",
      handler: (event) => {
        event.preventDefault();
        moveSelection("left");
      },
      options: { debounce: 100 },
    },
    {
      key: "ArrowRight",
      handler: (event) => {
        event.preventDefault();
        moveSelection("right");
      },
      options: { debounce: 100 },
    },
    {
      key: "Enter",
      handler: (event) => {
        event.preventDefault();
        if (isPlaying) {
          playSelectedCell();
        }
      },
      options: { debounce: 200 },
    },
    {
      key: " ",
      handler: (event) => {
        event.preventDefault();
        if (isPlaying) {
          playSelectedCell();
        }
      },
      options: { debounce: 200 },
    },
    {
      key: "p",
      handler: (event) => {
        event.preventDefault();
        toggleGamePause();
      },
      options: { debounce: 300 },
    },
    {
      key: "r",
      handler: (event) => {
        event.preventDefault();
        restartGame();
      },
      options: { debounce: 500 },
    },
    {
      key: "h",
      handler: (event) => {
        event.preventDefault();
        toggleInstructions();
      },
      options: { debounce: 200 },
    },
    {
      key: "Escape",
      handler: (event) => {
        event.preventDefault();
        handleEscape();
      },
      options: { debounce: 200 },
    },
    {
      key: "e",
      handler: (event) => {
        event.preventDefault();
        handleExpandBoard();
      },
      options: { debounce: 300 },
    },
  ];

  return {
    handleCellClick,
    moveSelection,
    playSelectedCell,
    toggleInstructions,
    handleEscape,
    handleExpandBoard,

    keyboardShortcuts,
  };
}
