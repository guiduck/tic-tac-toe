import styles from "./styles.module.scss";

export default function KeyboardHints() {
  return (
    <div className={styles.hints}>
      <p>
        <kbd>1</kbd> Rato • <kbd>2</kbd> Polvo • <kbd>Tab</kbd> Trocar jogador •{" "}
        <kbd>Enter</kbd> Iniciar • <kbd>Esc</kbd> Voltar
      </p>
    </div>
  );
}
