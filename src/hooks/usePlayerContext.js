import { useContext } from "react";
import { PlayerContext } from "../contexts/PlayerContext";

export function usePlayerContext() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error(
      "usePlayerContext deve ser usado dentro de PlayerContextProvider"
    );
  }
  return context;
}
