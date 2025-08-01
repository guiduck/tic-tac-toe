import { createContext, useState, useCallback, useMemo } from "react";

export const DIALOGUE_STATES = {
  HIDDEN: "hidden",
  SHOWING: "showing",
  TYPING: "typing",
  COMPLETE: "complete",
};

export const CHARACTER_POSITIONS = {
  LEFT: "left",
  RIGHT: "right",
  CENTER: "center",
};

const initialState = {
  isVisible: false,
  currentText: "",
  speakerName: "",
  speakerImage: null,
  characterPosition: CHARACTER_POSITIONS.LEFT,
  dialogueState: DIALOGUE_STATES.HIDDEN,
  autoClose: true,
  autoCloseDelay: 3000,
  typingSpeed: 50,
  queue: [],
};

export const DialogueContext = createContext();

/**
 * @param {Object} props - Props do componente
 * @param {React.ReactNode} props.children - Componentes filhos
 */
export function DialogueContextProvider({ children }) {
  const [dialogue, setDialogue] = useState(initialState);

  /**
   * Mostra um diálogo na tela
   * @param {Object} dialogueData - Dados do diálogo
   * @param {string} dialogueData.text - Texto a ser exibido
   * @param {string} dialogueData.speakerName - Nome do personagem
   * @param {string} dialogueData.speakerImage - Caminho da imagem do personagem
   * @param {string} dialogueData.position - Posição do personagem
   * @param {boolean} dialogueData.autoClose - Se deve fechar automaticamente
   * @param {number} dialogueData.autoCloseDelay - Delay para fechar automaticamente
   */
  const showDialogue = useCallback((dialogueData) => {
    const {
      text,
      speakerName = "",
      speakerImage = null,
      position = CHARACTER_POSITIONS.LEFT,
      autoClose = true,
      autoCloseDelay = 3000,
    } = dialogueData;

    setDialogue((prev) => ({
      ...prev,
      isVisible: true,
      currentText: text,
      speakerName,
      speakerImage,
      characterPosition: position,
      dialogueState: DIALOGUE_STATES.SHOWING,
      autoClose,
      autoCloseDelay,
    }));

    if (!autoClose) return;

    setTimeout(() => {
      hideDialogue();
    }, autoCloseDelay);
  }, []);

  const hideDialogue = useCallback(() => {
    setDialogue((prev) => ({
      ...prev,
      isVisible: false,
      dialogueState: DIALOGUE_STATES.HIDDEN,
    }));

    setTimeout(() => {
      nextDialogue();
    }, 100);
  }, []);

  /**
   * Adiciona diálogo à fila
   * @param {Object} dialogueData - Dados do diálogo
   */
  const queueDialogue = useCallback(
    (dialogueData) => {
      setDialogue((prev) => ({
        ...prev,
        queue: [...prev.queue, dialogueData],
      }));

      if (dialogue.isVisible) return;

      nextDialogue();
    },
    [dialogue.isVisible]
  );

  const nextDialogue = useCallback(() => {
    setDialogue((prev) => {
      if (prev.queue.length === 0) return prev;

      const nextDialogue = prev.queue[0];
      const remainingQueue = prev.queue.slice(1);

      showDialogue(nextDialogue);

      return {
        ...prev,
        queue: remainingQueue,
      };
    });
  }, [showDialogue]);

  const clearQueue = useCallback(() => {
    setDialogue((prev) => ({
      ...prev,
      queue: [],
    }));
  }, []);

  const forceClose = useCallback(() => {
    setDialogue((prev) => ({
      ...prev,
      isVisible: false,
      dialogueState: DIALOGUE_STATES.HIDDEN,
      queue: [],
    }));
  }, []);

  /**
   * Configura velocidade de digitação para efeito de typing
   * @param {number} speed - Velocidade em millisegundos
   */
  const setTypingSpeed = useCallback((speed) => {
    setDialogue((prev) => ({
      ...prev,
      typingSpeed: speed,
    }));
  }, []);

  /**
   * Mostra diálogo de um jogador usando dados da classe Player
   * @param {Player} player - Instância do jogador
   * @param {string} dialogueType - Tipo de diálogo do DIALOGUE_TYPES
   * @param {Object} options - Opções adicionais
   */
  const showPlayerDialogue = useCallback(
    (player, dialogueType, options = {}) => {
      const text = player.getDialogue(dialogueType);

      if (!text) return;

      const dialogueData = {
        text,
        speakerName: player.getCharacterName(),
        speakerImage: player.getCharacterImage(),
        position: player.isRat()
          ? CHARACTER_POSITIONS.LEFT
          : CHARACTER_POSITIONS.RIGHT,
        ...options,
      };

      if (!options.queue) {
        showDialogue(dialogueData);
      }

      queueDialogue(dialogueData);
    },
    [showDialogue, queueDialogue]
  );

  /**
   * Mostra múltiplos diálogos em sequência
   * @param {Array} dialogues - Array de dados de diálogos
   */
  const showSequence = useCallback(
    (dialogues) => {
      dialogues.forEach((dialogueData) => {
        queueDialogue(dialogueData);
      });
    },
    [queueDialogue]
  );

  /**
   * Verifica se há diálogos na fila
   * @returns {boolean} Verdadeiro se há diálogos esperando
   */
  const hasQueuedDialogues = useCallback(() => {
    return dialogue.queue.length > 0;
  }, [dialogue.queue.length]);

  /**
   * Obtém informações do diálogo atual
   * @returns {Object} Dados do diálogo atual
   */
  const getCurrentDialogue = useCallback(() => {
    return {
      text: dialogue.currentText,
      speaker: dialogue.speakerName,
      image: dialogue.speakerImage,
      position: dialogue.characterPosition,
      isVisible: dialogue.isVisible,
      state: dialogue.dialogueState,
    };
  }, [dialogue]);

  const contextValue = useMemo(
    () => ({
      ...dialogue,

      showDialogue,
      hideDialogue,
      queueDialogue,
      clearQueue,
      forceClose,
      setTypingSpeed,
      showPlayerDialogue,
      showSequence,
      hasQueuedDialogues,
      getCurrentDialogue,
      nextDialogue,
    }),
    [dialogue]
  );

  return (
    <DialogueContext.Provider value={contextValue}>
      {children}
    </DialogueContext.Provider>
  );
}
