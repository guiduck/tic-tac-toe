import styles from "./styles.module.scss";

/**
 * @param {Object} props.dialogue - Dialogue state object with visibility, text, speaker info
 */
export default function DialogueSystem({ dialogue }) {
  if (!dialogue.isVisible) return null;

  return (
    <div className={styles.dialogueSystem}>
      <div className={styles.dialogueBox}>
        <div className={styles.speakerInfo}>
          {dialogue.speakerImage && (
            <img
              src={dialogue.speakerImage}
              alt={dialogue.speakerName}
              className={styles.speakerAvatar}
            />
          )}
          <span className={styles.speakerName}>{dialogue.speakerName}</span>
        </div>
        <p className={styles.dialogueText}>{dialogue.currentText}</p>
      </div>
    </div>
  );
}
