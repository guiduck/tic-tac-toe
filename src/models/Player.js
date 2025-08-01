import { CELL_STATES } from "../contexts/GameContext";

export const CHARACTERS = {
  RAT: "rat",
  OCTOPUS: "octopus",
};

export const DIALOGUE_TYPES = {
  GREETING: "greeting",
  MOVE: "move",
  VICTORY: "victory",
  DEFEAT: "defeat",
  TAUNT: "taunt",
  ERROR: "error",
  TIMEOUT: "timeout",
  DRAW: "draw",
};

export class Player {
  /**
   * @param {string} id - Identificador único do jogador (player1, player2)
   * @param {string} character - Tipo de personagem (rat, octopus)
   * @param {number} score - Pontuação atual do jogador
   * @param {boolean} isActive - Se é a vez deste jogador
   */
  constructor(id, character = null, score = 0, isActive = false) {
    this.id = id;
    this.character = character;
    this.score = score;
    this.isActive = isActive;
    this.dialogues = this._initializeDialogues(character);

    return Object.freeze(this);
  }

  /**
   * @param {string} character - Tipo de personagem
   * @returns {Object} Coleções de diálogos por tipo
   */
  _initializeDialogues(character) {
    const baseDialogues = {
      [CHARACTERS.RAT]: {
        [DIALOGUE_TYPES.GREETING]: [
          "Hora de mostrar para essas criaturas marinhas quem realmente manda!",
          "Os ratos herdarão a Terra!",
          "Pronto para ser mais esperto que alguns tentáculos?",
        ],
        [DIALOGUE_TYPES.MOVE]: [
          "Jogada inteligente, para um habitante da terra...",
          "A gangue dos ratos ataca novamente!",
          "Calculando minha próxima estratégia brilhante...",
        ],
        [DIALOGUE_TYPES.VICTORY]: [
          "A inteligência triunfa sobre os tentáculos!",
          "Os ratos conquistam mais uma vitória!",
          "Supremacia terrestre confirmada!",
        ],
        [DIALOGUE_TYPES.DEFEAT]: [
          "Isso não acabou, lula!",
          "Até o rato mais esperto pode ter um dia ruim...",
          "Voltarei com reforços!",
        ],
        [DIALOGUE_TYPES.TAUNT]: [
          "É isso o melhor que um polvo consegue fazer?",
          "Oito braços e ainda não consegue fazer uma jogada decente!",
          "Talvez seja melhor ficar no oceano, criatura marinha!",
        ],
        [DIALOGUE_TYPES.ERROR]: [
          "Esse lugar já está ocupado, gênio!",
          "Preste atenção no tabuleiro!",
          "Até os ratos sabem que essa jogada não funciona!",
        ],
        [DIALOGUE_TYPES.TIMEOUT]: [
          "Tempo esgotado! Paralisia de decisão?",
          "O relógio não espera por ninguém!",
          "A hesitação é inimiga da vitória!",
        ],
        [DIALOGUE_TYPES.DRAW]: [
          "Um impasse tático... impressionante.",
          "Nem terra nem mar conquistam vitória hoje.",
          "O tabuleiro cresce... a batalha continua!",
        ],
      },
      [CHARACTERS.OCTOPUS]: {
        [DIALOGUE_TYPES.GREETING]: [
          "Prepare-se para ser arrastado pela maré!",
          "A fúria do oceano não conhece limites!",
          "Oito braços, infinitas possibilidades!",
        ],
        [DIALOGUE_TYPES.MOVE]: [
          "As profundezas me ensinaram bem...",
          "Fluindo como a própria corrente!",
          "Observe e aprenda, habitante da superfície!",
        ],
        [DIALOGUE_TYPES.VICTORY]: [
          "O oceano conquista tudo!",
          "Os tentáculos triunfam mais uma vez!",
          "O mar profundo reina supremo!",
        ],
        [DIALOGUE_TYPES.DEFEAT]: [
          "A maré mudará em meu favor...",
          "Esta vitória da superfície é temporária!",
          "O oceano lembra de tudo...",
        ],
        [DIALOGUE_TYPES.TAUNT]: [
          "É assim que vocês jogam em terra?",
          "Quatro membros contra oito... dificilmente justo!",
          "Talvez devesse voltar para seus esgotos!",
        ],
        [DIALOGUE_TYPES.ERROR]: [
          "O mar não comete tais erros!",
          "Concentre-se, criatura terrestre!",
          "Até uma estrela-do-mar faria melhor!",
        ],
        [DIALOGUE_TYPES.TIMEOUT]: [
          "O oceano não espera por ninguém!",
          "Tic-tac faz o relógio da superfície!",
          "A indecisão não é o caminho do mar!",
        ],
        [DIALOGUE_TYPES.DRAW]: [
          "Um impasse oceânico... intrigante.",
          "Nenhum reino reivindica domínio hoje.",
          "O campo de batalha se expande... vamos continuar!",
        ],
      },
    };

    return character ? baseDialogues[character] : {};
  }

  /**
   * @param {string} character - Tipo de personagem (rat, octopus)
   * @returns {Player} Nova instância de Player
   */
  setCharacter(character) {
    return new Player(this.id, character, this.score, this.isActive);
  }

  /**
   * @param {number} increment - Quantidade a adicionar na pontuação (padrão: 1)
   * @returns {Player} Nova instância de Player
   */
  updateScore(increment = 1) {
    return new Player(
      this.id,
      this.character,
      this.score + increment,
      this.isActive
    );
  }

  /**
   * @param {boolean} isActive - Se o jogador está atualmente ativo
   * @returns {Player} Nova instância de Player
   */
  setActive(isActive) {
    return new Player(this.id, this.character, this.score, isActive);
  }

  /**
   * @returns {Player} Nova instância de Player
   */
  resetScore() {
    return new Player(this.id, this.character, 0, this.isActive);
  }

  /**
   * @param {string} type - Tipo de diálogo do DIALOGUE_TYPES
   * @returns {string|null} Diálogo aleatório ou null se não disponível
   */
  getDialogue(type) {
    if (!this.character || !this.dialogues[type]) {
      return null;
    }

    const dialogues = this.dialogues[type];
    const randomIndex = Math.floor(Math.random() * dialogues.length);
    return dialogues[randomIndex];
  }

  /**
   * @returns {string|null} Caminho da imagem ou null se sem personagem
   */
  getCharacterImage() {
    if (!this.character) return null;
    return `/${this.character}.png`;
  }

  /**
   * @returns {string} Nome formatado do personagem
   */
  getCharacterName() {
    if (!this.character) return "Nenhum Personagem";

    const names = {
      [CHARACTERS.RAT]: "Rato",
      [CHARACTERS.OCTOPUS]: "Polvo",
    };

    return names[this.character] || this.character;
  }

  /**
   * @returns {Object} Valores de cores para variáveis CSS
   */
  getCharacterColors() {
    if (!this.character) return null;

    const colorMap = {
      [CHARACTERS.RAT]: {
        primary: "var(--rat-primary)",
        secondary: "var(--rat-secondary)",
        dark: "var(--rat-dark)",
        light: "var(--rat-light)",
        background: "var(--rat-bg)",
      },
      [CHARACTERS.OCTOPUS]: {
        primary: "var(--octopus-primary)",
        secondary: "var(--octopus-secondary)",
        dark: "var(--octopus-dark)",
        light: "var(--octopus-light)",
        background: "var(--octopus-bg)",
      },
    };

    return colorMap[this.character];
  }

  /**
   * @returns {boolean} Verdadeiro se personagem está definido
   */
  hasCharacter() {
    return this.character !== null;
  }

  /**
   * @returns {boolean} Verdadeiro se personagem é rato
   */
  isRat() {
    return this.character === CHARACTERS.RAT;
  }

  /**
   * @returns {boolean} Verdadeiro se personagem é polvo
   */
  isOctopus() {
    return this.character === CHARACTERS.OCTOPUS;
  }

  /**
   * @returns {string} 'R' para rato, 'O' para polvo, ou id do jogador
   */
  getSymbol() {
    if (this.isRat()) return CELL_STATES.RAT;
    if (this.isOctopus()) return CELL_STATES.OCTOPUS;
    return this.id.charAt(this.id.length - 1); // fallback to player number
  }

  /**
   * @returns {Object} Objeto simples com dados do jogador
   */
  toJSON() {
    return {
      id: this.id,
      character: this.character,
      score: this.score,
      isActive: this.isActive,
      characterName: this.getCharacterName(),
      symbol: this.getSymbol(),
    };
  }
}

/**
 * @param {string} id - Identificador do jogador
 * @param {string} character - Tipo de personagem (opcional)
 * @returns {Player} Nova instância de Player
 */
export function createPlayer(id, character = null) {
  return new Player(id, character);
}
