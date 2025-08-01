import styles from "./styles.module.scss";

/**
 * @param {Object} props.character - Character data object
 * @param {string} props.character.type - Character type ('rat' or 'octopus')
 * @param {string} props.character.name - Character display name
 * @param {string} props.character.description - Character description
 * @param {Array<string>} props.character.traits - Character traits array
 * @param {string} props.character.imageSrc - Character image source
 * @param {string} props.character.imageAlt - Character image alt text
 * @param {string} props.character.keyboardKey - Keyboard shortcut key
 * @param {boolean} props.isSelected - Whether this character is selected
 * @param {Function} props.onSelect - Selection handler function
 */
export default function CharacterCard({ character, isSelected, onSelect }) {
  const cardClassName = `${styles.characterCard} ${
    styles[`${character.type}Card`]
  } ${isSelected ? styles.selected : ""}`;

  return (
    <div className={cardClassName} onClick={onSelect}>
      <div className={styles.characterImage}>
        <img src={character.imageSrc} alt={character.imageAlt} />
      </div>
      <div className={styles.characterInfo}>
        <h3>{character.name}</h3>
        <p className={styles.characterDescription}>{character.description}</p>
        <div className={styles.characterTraits}>
          {character.traits.map((trait, index) => (
            <span key={index} className={styles.trait}>
              {trait}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.selectionHint}>
        <kbd>{character.keyboardKey}</kbd> para selecionar
      </div>
    </div>
  );
}
