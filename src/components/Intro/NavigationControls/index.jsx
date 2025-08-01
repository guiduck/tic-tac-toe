import styles from "./styles.module.scss";

/**
 * @param {Function} props.onPrevious - Handler for previous button
 * @param {Function} props.onNext - Handler for next button
 * @param {Function} props.onSkip - Handler for skip button
 * @param {boolean} props.isPreviousDisabled - Whether previous button is disabled
 * @param {boolean} props.isNextDisabled - Whether next button is disabled
 * @param {string} props.nextButtonText - Text for the next button
 */
export default function NavigationControls({
  onPrevious,
  onNext,
  onSkip,
  isPreviousDisabled,
  isNextDisabled,
  nextButtonText,
}) {
  return (
    <div className={styles.navigationContainer}>
      <div className={styles.controls}>
        <button
          className="btn secondary"
          onClick={onPrevious}
          disabled={isPreviousDisabled}
        >
          ← Anterior
        </button>

        <button
          className="btn primary"
          onClick={onNext}
          disabled={isNextDisabled}
        >
          {nextButtonText}
        </button>

        <button className="btn secondary" onClick={onSkip}>
          Pular Introdução
        </button>
      </div>

      <div className={styles.hints}>
        <p>
          <kbd>Enter</kbd> ou <kbd>Espaço</kbd> para avançar • <kbd>←</kbd>{" "}
          <kbd>→</kbd> para navegar • <kbd>Esc</kbd> para pular
        </p>
      </div>
    </div>
  );
}
