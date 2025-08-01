import { CELL_STATES } from "../../../contexts/GameContext";
import { useColorCustomization } from "../../../hooks/useColorCustomization";
import styles from "./styles.module.scss";

/**
 * @param {Object} props.game - Game state with board and size
 * @param {Object} props.selectedCell - Currently selected cell {row, col}
 * @param {Function} props.onCellClick - Handler for cell clicks
 * @param {boolean} props.isPlaying - Whether the game is active
 * @param {boolean} props.isSwitchingPlayers - Whether players are switching
 * @param {Object} props.currentPlayer - Current active player
 */
export default function GameBoard({
  game,
  selectedCell,
  onCellClick,
  isPlaying,
  isSwitchingPlayers,
  currentPlayer,
}) {
  const { getCharacterColor } = useColorCustomization();
  const getCellClasses = (row, col, cellValue) => {
    const classes = [styles.cell];

    if (selectedCell.row === row && selectedCell.col === col) {
      classes.push(styles.selected);
    }

    if (cellValue) {
      classes.push(styles.occupied);
    }

    return classes.join(" ");
  };

  const getCellStyle = (row, col, cellValue) => {
    if (selectedCell.row === row && selectedCell.col === col) {
      let characterType;

      if (cellValue) {
        // Célula ocupada: usar cor do dono da célula
        characterType = cellValue === CELL_STATES.RAT ? "rat" : "octopus";
      } else if (currentPlayer) {
        // Célula vazia mas selecionada: usar cor do jogador atual
        characterType = currentPlayer.character;
      }

      if (characterType) {
        return { "--custom-color": getCharacterColor(characterType) };
      }
    }
    return {};
  };

  const getSymbolClasses = (cellValue) => {
    const classes = [styles.symbol];

    if (cellValue === CELL_STATES.RAT) {
      classes.push(styles.ratSymbol);
    } else if (cellValue === CELL_STATES.OCTOPUS) {
      classes.push(styles.octopusSymbol);
    }

    return classes.join(" ");
  };

  const getSymbolEmoji = (cellValue) => {
    return cellValue === CELL_STATES.RAT ? "🐭" : "🐙";
  };

  return (
    <div
      className={styles.board}
      style={{
        gridTemplateColumns: `repeat(${game.boardSize}, 1fr)`,
        gridTemplateRows: `repeat(${game.boardSize}, 1fr)`,
      }}
    >
      {game.board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            className={getCellClasses(rowIndex, colIndex, cell)}
            style={getCellStyle(rowIndex, colIndex, cell)}
            onClick={() => onCellClick(rowIndex, colIndex)}
            disabled={!isPlaying || cell !== null || isSwitchingPlayers}
            aria-label={`Cell ${rowIndex + 1}, ${colIndex + 1}${
              cell
                ? ` - ${cell === CELL_STATES.RAT ? "Rat" : "Octopus"}`
                : " - Empty"
            }`}
          >
            {cell && (
              <span className={getSymbolClasses(cell)}>
                {getSymbolEmoji(cell)}
              </span>
            )}
          </button>
        ))
      )}
    </div>
  );
}
