import { Outlet } from "react-router-dom";
import { PlayerContextProvider } from "../contexts/PlayerContext";
import { GameContextProvider } from "../contexts/GameContext";
import { DialogueContextProvider } from "../contexts/DialogueContext";
import FloatingThemeButton from "../components/FloatingThemeButton";

export default function Layout() {
  return (
    <PlayerContextProvider>
      <GameContextProvider>
        <DialogueContextProvider>
          <div className="app">
            <Outlet />
            <FloatingThemeButton />
          </div>
        </DialogueContextProvider>
      </GameContextProvider>
    </PlayerContextProvider>
  );
}
