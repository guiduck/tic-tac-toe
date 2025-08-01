import { CHARACTERS } from "../../../models/Player";
import CharacterCard from "../CharacterCard";
import styles from "./styles.module.scss";

const CHARACTER_DATA = {
  [CHARACTERS.RAT]: {
    type: "rat",
    name: "Ratos",
    description:
      "Criaturas terrestres super inteligentes que conquistaram a Terra após a queda da humanidade.",
    traits: ["🧠 Inteligência Superior", "🏃 Agilidade", "🔧 Estratégia"],
    imageSrc: "/rat.png",
    imageAlt: "Rato",
    keyboardKey: "1",
  },
  [CHARACTERS.OCTOPUS]: {
    type: "octopus",
    name: "Polvos",
    description:
      "Dominadores dos oceanos com tentáculos poderosos, planejando a conquista total do planeta.",
    traits: ["🌊 Poder Oceânico", "🐙 Oito Braços", "💪 Força"],
    imageSrc: "/octopus.png",
    imageAlt: "Polvo",
    keyboardKey: "2",
  },
};

/**
 * @param {Function} props.onCharacterSelect - Handler for character selection
 * @param {boolean} props.isRatSelected - Whether rat is selected by current player
 * @param {boolean} props.isOctopusSelected - Whether octopus is selected by current player
 */
export default function CharacterGrid({
  onCharacterSelect,
  isRatSelected,
  isOctopusSelected,
}) {
  return (
    <div className={styles.characterGrid}>
      <CharacterCard
        character={CHARACTER_DATA[CHARACTERS.RAT]}
        isSelected={isRatSelected}
        onSelect={() => onCharacterSelect(CHARACTERS.RAT)}
      />

      <CharacterCard
        character={CHARACTER_DATA[CHARACTERS.OCTOPUS]}
        isSelected={isOctopusSelected}
        onSelect={() => onCharacterSelect(CHARACTERS.OCTOPUS)}
      />
    </div>
  );
}
