export const ROUTES = {
  INTRO: "/",
  CHARACTER_SELECTION: "/selection",
  GAME: "/game",
};

export const GAME_STATE_TO_ROUTE = {
  intro: ROUTES.INTRO,
  "character-selection": ROUTES.CHARACTER_SELECTION,
  playing: ROUTES.GAME,
};

import { useNavigate, useLocation } from "react-router-dom";

export function useAppNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToIntro = () => navigate(ROUTES.INTRO);
  const navigateToCharacterSelection = () =>
    navigate(ROUTES.CHARACTER_SELECTION);
  const navigateToGame = () => navigate(ROUTES.GAME);

  const getCurrentRoute = () => location.pathname;

  return {
    navigateToIntro,
    navigateToCharacterSelection,
    navigateToGame,
    getCurrentRoute,
    ROUTES,
  };
}
