import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { IntroScreen } from "../pages/IntroScreen";
import { CharacterSelectionScreen } from "../pages/CharacterSelectionScreen";
import { GameScreen } from "../pages/GameScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <IntroScreen />,
      },
      {
        path: "selection",
        element: <CharacterSelectionScreen />,
      },
      {
        path: "game",
        element: <GameScreen />,
      },
    ],
  },
]);
