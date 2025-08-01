import styles from "./styles.module.scss";

/**
 * @param {Object} props.currentStory - Current story part object
 * @param {string} props.displayedText - Currently displayed text
 * @param {boolean} props.isTyping - Whether text is currently being typed
 * @param {number} props.currentStoryIndex - Current story index
 * @param {number} props.totalStoryParts - Total number of story parts
 */
export default function StorySection({
  currentStory,
  displayedText,
  isTyping,
  currentStoryIndex,
  totalStoryParts,
}) {
  const progressPercentage = ((currentStoryIndex + 1) / totalStoryParts) * 100;

  return (
    <div className={styles.storyContainer}>
      <div className={styles.storyProgress}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span className={styles.progressText}>
          {currentStoryIndex + 1} / {totalStoryParts}
        </span>
      </div>

      <div className={styles.storyBox}>
        <h2 className={styles.storySubtitle}>{currentStory.subtitle}</h2>
        <p className={styles.storyText}>
          {displayedText}
          {isTyping && <span className={styles.cursor}>|</span>}
        </p>
      </div>
    </div>
  );
}
