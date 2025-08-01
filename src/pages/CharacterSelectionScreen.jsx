import { useState } from "react";
import { PLAYER_IDS } from "../contexts/PlayerContext";
import { useShortcut } from "../hooks/useShortcut";
import { useCharacterSelectionOperations } from "../hooks/useCharacterSelectionOperations";
import styles from "./CharacterSelectionScreen.module.scss";
import Background from "../components/CharacterSelection/Background";
import Header from "../components/CharacterSelection/Header";
import PlayerStatus from "../components/CharacterSelection/PlayerStatus";
import CurrentPlayerIndicator from "../components/CharacterSelection/CurrentPlayerIndicator";
import CharacterGrid from "../components/CharacterSelection/CharacterGrid";
import Controls from "../components/CharacterSelection/Controls";
import KeyboardHints from "../components/CharacterSelection/KeyboardHints";

export function CharacterSelectionScreen() {
  const [selectedPlayer, setSelectedPlayer] = useState(PLAYER_IDS.PLAYER1);

  const {
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
  } = useCharacterSelectionOperations({
    selectedPlayer,
    setSelectedPlayer,
  });

  useShortcut(keyboardShortcuts);

  return (
    <div className={styles.characterSelection}>
      <Background />

      <Header />

      <PlayerStatus player1={player1} player2={player2} />

      <CurrentPlayerIndicator currentPlayerName={getCurrentPlayerName()} />

      <CharacterGrid
        onCharacterSelect={handleCharacterSelect}
        isRatSelected={isRatSelected()}
        isOctopusSelected={isOctopusSelected()}
      />

      <Controls
        onBackToIntro={handleBackToIntro}
        onSwitchPlayer={handleSwitchPlayer}
        onStartGame={handleStartGame}
        bothPlayersReady={bothPlayersReady()}
      />

      <KeyboardHints />
    </div>
  );
}
