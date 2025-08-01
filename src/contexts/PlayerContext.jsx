import { createContext, useMemo, useState } from "react";
import { Player, CHARACTERS, createPlayer } from "../models/Player";

export const PLAYER_IDS = {
  PLAYER1: "player1",
  PLAYER2: "player2",
};

const initialState = {
  player1: createPlayer(PLAYER_IDS.PLAYER1),
  player2: createPlayer(PLAYER_IDS.PLAYER2),
  currentPlayerId: PLAYER_IDS.PLAYER1,
};

export const PlayerContext = createContext();

/**
 * Provider do contexto de jogadores
 * @param {Object} props - Props do componente
 * @param {React.ReactNode} props.children - Componentes filhos
 */
export function PlayerContextProvider({ children }) {
  const [players, setPlayers] = useState(initialState);

  /**
   * Seleciona personagem para um jogador
   * @param {string} playerId - ID do jogador
   * @param {string} character - Tipo de personagem
   */
  const selectCharacter = (playerId, character) => {
    setPlayers((prevPlayers) => {
      const otherPlayerId =
        playerId === PLAYER_IDS.PLAYER1
          ? PLAYER_IDS.PLAYER2
          : PLAYER_IDS.PLAYER1;
      const otherCharacter =
        character === CHARACTERS.RAT ? CHARACTERS.OCTOPUS : CHARACTERS.RAT;

      return {
        ...prevPlayers,
        [playerId]: prevPlayers[playerId].setCharacter(character),
        [otherPlayerId]:
          prevPlayers[otherPlayerId].setCharacter(otherCharacter),
      };
    });
  };

  /**
   * Define qual jogador está ativo atualmente
   * @param {string} playerId - ID do jogador a ser ativado
   */
  const setCurrentPlayer = (playerId) => {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      currentPlayerId: playerId,
      player1: prevPlayers.player1.setActive(playerId === PLAYER_IDS.PLAYER1),
      player2: prevPlayers.player2.setActive(playerId === PLAYER_IDS.PLAYER2),
    }));
  };

  const switchToNextPlayer = () => {
    const nextPlayerId =
      players.currentPlayerId === PLAYER_IDS.PLAYER1
        ? PLAYER_IDS.PLAYER2
        : PLAYER_IDS.PLAYER1;
    setCurrentPlayer(nextPlayerId);
  };

  /**
   * Atualiza pontuação de um jogador
   * @param {string} playerId - ID do jogador
   * @param {number} increment - Quantidade a adicionar (padrão: 1)
   */
  const updateScore = (playerId, increment = 1) => {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [playerId]: prevPlayers[playerId].updateScore(increment),
    }));
  };

  const resetScores = () => {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      player1: prevPlayers.player1.resetScore(),
      player2: prevPlayers.player2.resetScore(),
    }));
  };

  const resetGame = () => {
    setPlayers((prevPlayers) => ({
      player1: createPlayer(PLAYER_IDS.PLAYER1, prevPlayers.player1.character),
      player2: createPlayer(PLAYER_IDS.PLAYER2, prevPlayers.player2.character),
      currentPlayerId: PLAYER_IDS.PLAYER1,
    }));
  };

  const resetAll = () => {
    setPlayers(initialState);
  };

  /**
   * Obtém o jogador atual ativo
   * @returns {Player} Instância do jogador atual
   */
  const getCurrentPlayer = () => {
    return players[players.currentPlayerId];
  };

  /**
   * Obtém o outro jogador (não ativo)
   * @returns {Player} Instância do outro jogador
   */
  const getOtherPlayer = () => {
    const otherPlayerId =
      players.currentPlayerId === PLAYER_IDS.PLAYER1
        ? PLAYER_IDS.PLAYER2
        : PLAYER_IDS.PLAYER1;
    return players[otherPlayerId];
  };

  /**
   * Verifica se ambos jogadores selecionaram personagens
   * @returns {boolean} Verdadeiro se ambos têm personagens
   */
  const bothPlayersReady = () => {
    return players.player1.hasCharacter() && players.player2.hasCharacter();
  };

  /**
   * Obtém estatísticas dos jogadores
   * @returns {Object} Objeto com estatísticas
   */
  const getPlayerStats = () => {
    return {
      player1: {
        score: players.player1.score,
        character: players.player1.getCharacterName(),
        isActive: players.player1.isActive,
      },
      player2: {
        score: players.player2.score,
        character: players.player2.getCharacterName(),
        isActive: players.player2.isActive,
      },
      totalGames: players.player1.score + players.player2.score,
    };
  };

  const contextValue = useMemo(
    () => ({
      ...players,

      selectCharacter,
      setCurrentPlayer,
      switchToNextPlayer,
      updateScore,
      resetScores,
      resetGame,
      resetAll,
      getCurrentPlayer,
      getOtherPlayer,
      bothPlayersReady,
      getPlayerStats,
    }),
    [players]
  );

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
}
