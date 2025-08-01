import { useState, useEffect } from "react";
import { useIntroScreenOperations } from "../hooks/useIntroScreenOperations";
import { useShortcut } from "../hooks/useShortcut";
import styles from "./IntroScreen.module.scss";
import Background from "../components/Intro/Background";
import GameTitle from "../components/Intro/GameTitle";
import StorySection from "../components/Intro/StorySection";
import NavigationControls from "../components/Intro/NavigationControls";

const TYPING_SPEED = 50;

const STORY_PARTS = [
  {
    id: 1,
    text: "Há muito tempo, os polvos dominaram os oceanos...",
    subtitle: "Uma era de supremacia aquática",
  },
  {
    id: 2,
    text: "Cansados de viver apenas nas profundezas, eles planejaram conquistar a Terra.",
    subtitle: "Ambições além das águas",
  },
  {
    id: 3,
    text: "Para isso, liberaram um vírus mortal que varreu a humanidade...",
    subtitle: "O fim da civilização humana",
  },
  {
    id: 4,
    text: "Mas algo inesperado aconteceu. O vírus afetou os ratos de forma diferente.",
    subtitle: "Uma consequência imprevista",
  },
  {
    id: 5,
    text: "Em vez de morrer, os ratos se tornaram extremamente inteligentes!",
    subtitle: "A evolução forçada",
  },
  {
    id: 6,
    text: "Agora, ratos super inteligentes conquistam a Terra abandonada...",
    subtitle: "Novos senhores da superfície",
  },
  {
    id: 7,
    text: "A batalha final pela dominação mundial está prestes a começar!",
    subtitle: "Terra vs Oceano",
  },
  {
    id: 8,
    text: "Quem será o verdadeiro dominador do planeta?",
    subtitle: "Escolha seu lado na guerra!",
  },
];

export function IntroScreen() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [canProceed, setCanProceed] = useState(false);

  const currentStory = STORY_PARTS[currentStoryIndex];

  const {
    handleNext,
    handleSkip,
    handlePrevious,
    getNextButtonText,
    isPreviousDisabled,
    keyboardShortcuts,
  } = useIntroScreenOperations({
    currentStoryIndex,
    setCurrentStoryIndex,
    isTyping,
    setIsTyping,
    setDisplayedText,
    setCanProceed,
    currentStory,
    storyParts: STORY_PARTS,
  });

  useShortcut(keyboardShortcuts);

  useEffect(() => {
    if (!currentStory) return;

    setIsTyping(true);
    setDisplayedText("");
    setCanProceed(false);

    const text = currentStory.text;
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index >= text.length) {
        setIsTyping(false);
        setCanProceed(true);
        clearInterval(typeInterval);
      }
      setDisplayedText(text.slice(0, index + 1));
      index++;
    }, TYPING_SPEED);

    return () => clearInterval(typeInterval);
  }, [currentStory]);

  return (
    <div className={styles.introScreen}>
      <Background />

      <div className={styles.content}>
        <GameTitle />

        <StorySection
          currentStory={currentStory}
          displayedText={displayedText}
          isTyping={isTyping}
          currentStoryIndex={currentStoryIndex}
          totalStoryParts={STORY_PARTS.length}
        />

        <NavigationControls
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSkip={handleSkip}
          isPreviousDisabled={isPreviousDisabled}
          isNextDisabled={!canProceed && isTyping}
          nextButtonText={getNextButtonText()}
        />
      </div>
    </div>
  );
}
