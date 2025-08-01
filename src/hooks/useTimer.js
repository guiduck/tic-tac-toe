import { useState, useCallback, useEffect, useRef } from "react";

/**
 * @param {Object} options - Opções de configuração
 * @param {number} options.duration - Duração do timer em segundos (padrão: 5)
 * @param {function} options.onTimeout - Callback chamado quando o timer chega a 0
 * @param {number} options.warningTime - Tempo em segundos para ativar estilos de aviso (padrão: 2)
 * @returns {Object} Estado e controles do timer
 */
export function useTimer({
  duration = 5,
  onTimeout = () => {},
  warningTime = 2,
} = {}) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isRunning) {
      clearTimer();
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [isRunning, onTimeout, clearTimer]);

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  const start = useCallback(() => {
    setTimeLeft(duration);
    setIsRunning(true);
  }, [duration]);

  const stop = useCallback(() => {
    setIsRunning(false);
    clearTimer();
  }, [clearTimer]);

  const restart = useCallback(() => {
    setTimeLeft(duration);
    setIsRunning(true);
  }, [duration]);

  const reset = useCallback(() => {
    setTimeLeft(duration);
    setIsRunning(false);
    clearTimer();
  }, [duration, clearTimer]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    setIsRunning(true);
  }, []);

  const percentage = duration > 0 ? (timeLeft / duration) * 100 : 0;
  const formattedTime = timeLeft.toFixed(1);
  const formattedTimeInteger = Math.ceil(timeLeft);
  const isInWarningZone = timeLeft <= warningTime && timeLeft > 0;
  const isCritical = timeLeft <= 1 && timeLeft > 0;

  return {
    timeLeft,
    isRunning,

    percentage,
    formattedTime,
    formattedTimeInteger,
    isInWarningZone,
    isCritical,

    start,
    stop,
    restart,
    reset,
    pause,
    resume,
  };
}
