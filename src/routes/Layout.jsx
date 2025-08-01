import { Outlet } from "react-router-dom";
import { PlayerContextProvider } from "../contexts/PlayerContext";
import { GameContextProvider } from "../contexts/GameContext";
import { DialogueContextProvider } from "../contexts/DialogueContext";
import { ColorCustomizationProvider } from "../contexts/ColorCustomizationContext";
import FloatingThemeButton from "../components/FloatingThemeButton";

export default function Layout() {
  return (
    <ColorCustomizationProvider>
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
    </ColorCustomizationProvider>
  );
}
