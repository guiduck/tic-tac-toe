import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame deve ser usado dentro de GameContextProvider");
  }
  return context;
}
