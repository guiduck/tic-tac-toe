import { useCallback } from "react";
import { GAME_STATES } from "../contexts/GameContext";
import { useGame } from "./useGame";
import { useAppNavigation } from "../routes/navigation";

/**
 * Custom hook for intro screen operations and keyboard interactions
 * @param {number} currentStoryIndex - Current story part index
 * @param {Function} setCurrentStoryIndex - Function to update story index
 * @param {boolean} isTyping - Whether text is currently being typed
 * @param {Function} setIsTyping - Function to update typing state
 * @param {Function} setDisplayedText - Function to update displayed text
 * @param {Function} setCanProceed - Function to update proceed state
 * @param {Object} currentStory - Current story part object
 * @param {Array} storyParts - All story parts array
 */
export function useIntroScreenOperations({
  currentStoryIndex,
  setCurrentStoryIndex,
  isTyping,
  setIsTyping,
  setDisplayedText,
  setCanProceed,
  currentStory,
  storyParts,
}) {
  const { setGameState } = useGame();
  const { navigateToCharacterSelection } = useAppNavigation();
  const handleNext = useCallback(() => {
    //completes text immediately
    if (isTyping) {
      setDisplayedText(currentStory.text);
      setIsTyping(false);
      setCanProceed(true);
      return;
    }

    const isLastStory = currentStoryIndex >= storyParts.length - 1;

    if (isLastStory) {
      setGameState(GAME_STATES.CHARACTER_SELECTION);
      navigateToCharacterSelection();
      return;
    }

    setCurrentStoryIndex(currentStoryIndex + 1);
  }, [
    isTyping,
    currentStoryIndex,
    storyParts.length,
    currentStory?.text,
    setDisplayedText,
    setIsTyping,
    setCanProceed,
    setGameState,
    navigateToCharacterSelection,
    setCurrentStoryIndex,
  ]);

  const handleSkip = useCallback(() => {
    setGameState(GAME_STATES.CHARACTER_SELECTION);
    navigateToCharacterSelection();
  }, [setGameState, navigateToCharacterSelection]);

  const handlePrevious = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  }, [currentStoryIndex, setCurrentStoryIndex]);

  const keyboardShortcuts = [
    {
      key: "Enter",
      handler: (event) => {
        event.preventDefault();
        handleNext();
      },
    },
    {
      key: " ",
      handler: (event) => {
        event.preventDefault();
        handleNext();
      },
    },
    {
      key: "Escape",
      handler: (event) => {
        event.preventDefault();
        handleSkip();
      },
      options: {
        debounce: 200,
      },
    },
    {
      key: "ArrowLeft",
      handler: (event) => {
        event.preventDefault();
        handlePrevious();
      },
    },
    {
      key: "ArrowRight",
      handler: (event) => {
        event.preventDefault();
        handleNext();
      },
    },
  ];

  const getNextButtonText = useCallback(() => {
    if (isTyping) {
      return "Clique para completar";
    }

    if (currentStoryIndex === storyParts.length - 1) {
      return "Começar Jogo";
    }

    return "Próximo →";
  }, [isTyping, currentStoryIndex, storyParts.length]);

  const isPreviousDisabled = currentStoryIndex === 0;

  const isNextDisabled = !isTyping && false;

  return {
    handleNext,
    handleSkip,
    handlePrevious,

    getNextButtonText,
    isPreviousDisabled,
    isNextDisabled,

    keyboardShortcuts,
  };
}
