import { useEffect } from "react";
import styles from "./styles.module.scss";

/**
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @param {Object} props.timer - Timer object to show current timer duration
 */
export default function InstructionsModal({ isOpen, onClose, timer }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>📋 Instruções do Jogo</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar instruções"
          >
            ✕
          </button>
        </div>

        <div className={styles.modalContent}>
          <section className={styles.instructionSection}>
            <h3 className={styles.sectionTitle}>🎯 Objetivo</h3>
            <p className={styles.instructionText}>
              Forme uma linha (horizontal, vertical ou diagonal) com seus
              símbolos antes do adversário.
            </p>
          </section>

          <section className={styles.instructionSection}>
            <h3 className={styles.sectionTitle}>⏱️ Regras de Tempo</h3>
            <ul className={styles.instructionList}>
              <li>
                Cada jogador tem {timer?.timeLeft || 5} segundos para fazer sua
                jogada
              </li>
              <li>Se o tempo esgotar, o turno passa automaticamente</li>
              <li>O timer fica amarelo nos últimos 2 segundos</li>
              <li>O timer fica vermelho no último segundo</li>
            </ul>
          </section>

          <section className={styles.instructionSection}>
            <h3 className={styles.sectionTitle}>🎮 Controles</h3>
            <div className={styles.controlsGrid}>
              <div className={styles.controlItem}>
                <kbd className={styles.key}>↑↓←→</kbd>
                <span>Navegar pelo tabuleiro</span>
              </div>
              <div className={styles.controlItem}>
                <kbd className={styles.key}>Enter</kbd>
                <span>Fazer jogada na célula selecionada</span>
              </div>
              <div className={styles.controlItem}>
                <kbd className={styles.key}>P</kbd>
                <span>Pausar/Continuar jogo</span>
              </div>
              <div className={styles.controlItem}>
                <kbd className={styles.key}>R</kbd>
                <span>Reiniciar jogo atual</span>
              </div>
              <div className={styles.controlItem}>
                <kbd className={styles.key}>E</kbd>
                <span>Expandir tabuleiro (em empate)</span>
              </div>
              <div className={styles.controlItem}>
                <kbd className={styles.key}>H</kbd>
                <span>Mostrar/Ocultar instruções</span>
              </div>
              <div className={styles.controlItem}>
                <kbd className={styles.key}>Esc</kbd>
                <span>Voltar à seleção de personagens</span>
              </div>
            </div>
          </section>

          <section className={styles.instructionSection}>
            <h3 className={styles.sectionTitle}>📐 Expansão do Tabuleiro</h3>
            <ul className={styles.instructionList}>
              <li>Em caso de empate, o tabuleiro pode ser expandido</li>
              <li>A condição de vitória aumenta com o tamanho do tabuleiro</li>
              <li>Progressão: 3×3 → 5×5 → 7×7 → 9×9 → volta ao 3×3</li>
              <li>Vence quem conseguir formar uma linha primeiro</li>
            </ul>
          </section>

          <section className={styles.instructionSection}>
            <h3 className={styles.sectionTitle}>🏆 Sistema de Pontuação</h3>
            <ul className={styles.instructionList}>
              <li>Cada vitória individual vale 1 ponto</li>
              <li>O primeiro a chegar a 6 pontos vence a partida</li>
              <li>Empates não contam pontos para ninguém</li>
            </ul>
          </section>
        </div>

        <div className={styles.modalFooter}>
          <button className="btn primary" onClick={onClose}>
            Entendi! Vamos jogar! 🎮
          </button>
        </div>
      </div>
    </div>
  );
}
