import { useCallback } from "react";
import { PLAYER_IDS } from "../contexts/PlayerContext";
import { GAME_STATES } from "../contexts/GameContext";
import { CHARACTERS } from "../models/Player";
import { useGame } from "./useGame";
import { usePlayerContext } from "./usePlayerContext";
import { useAppNavigation } from "../routes/navigation";

/**
 * @param {string} selectedPlayer - Currently selected player (PLAYER1 or PLAYER2)
 * @param {Function} setSelectedPlayer - Function to update selected player
 */
export function useCharacterSelectionOperations({
  selectedPlayer,
  setSelectedPlayer,
}) {
  const { setGameState } = useGame();
  const { player1, player2, selectCharacter, bothPlayersReady } =
    usePlayerContext();
  const { navigateToGame, navigateToIntro } = useAppNavigation();

  /**
   * @param {string} character - Character type (rat or octopus)
   */
  const handleCharacterSelect = useCallback(
    (character) => {
      selectCharacter(selectedPlayer, character);

      if (bothPlayersReady()) return;

      if (selectedPlayer === PLAYER_IDS.PLAYER1 && !player2.hasCharacter()) {
        setSelectedPlayer(PLAYER_IDS.PLAYER2);
      }
    },
    [
      selectedPlayer,
      selectCharacter,
      bothPlayersReady,
      player2,
      setSelectedPlayer,
    ]
  );

  const handleBackToIntro = useCallback(() => {
    setGameState(GAME_STATES.INTRO);
    navigateToIntro();
  }, [setGameState, navigateToIntro]);

  const handleStartGame = useCallback(() => {
    if (bothPlayersReady()) {
      setGameState(GAME_STATES.PLAYING);
      navigateToGame();
    }
  }, [bothPlayersReady, setGameState, navigateToGame]);

  const handleSwitchPlayer = useCallback(() => {
    const nextPlayer =
      selectedPlayer === PLAYER_IDS.PLAYER1
        ? PLAYER_IDS.PLAYER2
        : PLAYER_IDS.PLAYER1;
    setSelectedPlayer(nextPlayer);
  }, [selectedPlayer, setSelectedPlayer]);

  const isRatSelected = useCallback(() => {
    return (
      (selectedPlayer === PLAYER_IDS.PLAYER1 && player1.isRat()) ||
      (selectedPlayer === PLAYER_IDS.PLAYER2 && player2.isRat())
    );
  }, [selectedPlayer, player1, player2]);

  const isOctopusSelected = useCallback(() => {
    return (
      (selectedPlayer === PLAYER_IDS.PLAYER1 && player1.isOctopus()) ||
      (selectedPlayer === PLAYER_IDS.PLAYER2 && player2.isOctopus())
    );
  }, [selectedPlayer, player1, player2]);

  const getCurrentPlayerName = useCallback(() => {
    return selectedPlayer === PLAYER_IDS.PLAYER1 ? "Jogador 1" : "Jogador 2";
  }, [selectedPlayer]);

  const keyboardShortcuts = [
    {
      key: "1",
      handler: (event) => {
        event.preventDefault();
        handleCharacterSelect(CHARACTERS.RAT);
      },
      options: { debounce: 200 },
    },
    {
      key: "2",
      handler: (event) => {
        event.preventDefault();
        handleCharacterSelect(CHARACTERS.OCTOPUS);
      },
      options: { debounce: 200 },
    },
    {
      key: "Tab",
      handler: (event) => {
        event.preventDefault();
        handleSwitchPlayer();
      },
      options: { debounce: 150 },
    },
    {
      key: "Enter",
      handler: (event) => {
        event.preventDefault();
        if (bothPlayersReady()) {
          handleStartGame();
        }
      },
      options: { debounce: 200 },
    },
    {
      key: "Escape",
      handler: (event) => {
        event.preventDefault();
        handleBackToIntro();
      },
      options: { debounce: 200 },
    },
  ];

  return {
    handleCharacterSelect,
    handleBackToIntro,
    handleStartGame,
    handleSwitchPlayer,

    isRatSelected,
    isOctopusSelected,
    getCurrentPlayerName,

    player1,
    player2,
    bothPlayersReady,

    keyboardShortcuts,
  };
}
