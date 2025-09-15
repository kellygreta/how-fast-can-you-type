import {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import { RotateCcw } from "lucide-react";
import { SAMPLE_TEXTS } from "../constants";
import ModeSelector from "./ModeSelector";
import StatsHud from "./StatsHud";
import ProgressBar from "./ProgressBar";
import TextDisplay from "./TextDisplay";
import TypingInput from "./TypingInput";
import Countdown from "./Countdown";

const Game = forwardRef(({ onGameEnd }, ref) => {
  const [gameState, setGameState] = useState({
    isPlaying: false,
    isCountingDown: false,
    duration: 15,
    timeLeft: 15,
    currentText: SAMPLE_TEXTS[0],
    typedChars: 0,
    correctChars: 0,
    errors: 0,
    startTime: null,
    currentIndex: 0,
  });

  const [typedText, setTypedText] = useState("");
  const [countdown, setCountdown] = useState(3);
  const timerRef = useRef(null);
  const countdownRef = useRef(null);

  const selectRandomText = useCallback(() => {
    const randomText =
      SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setGameState((prev) => ({ ...prev, currentText: randomText }));
  }, []);

  const updateStats = useCallback(() => {
    if (!gameState.startTime) return { wpm: 0, accuracy: 100 };

    const elapsedMinutes = (Date.now() - gameState.startTime) / 60000;
    const wpm =
      elapsedMinutes > 0
        ? Math.round(gameState.correctChars / 5 / elapsedMinutes)
        : 0;
    const accuracy =
      gameState.typedChars > 0
        ? Math.round((gameState.correctChars / gameState.typedChars) * 100)
        : 100;

    return { wpm, accuracy };
  }, [gameState]);

  const handleTyping = (value) => {
    if (!gameState.isPlaying) return;

    setTypedText(value);

    let correctChars = 0;
    let errors = 0;

    for (let i = 0; i < value.length; i++) {
      if (
        i < gameState.currentText.length &&
        value[i] === gameState.currentText[i]
      ) {
        correctChars++;
      } else {
        errors++;
      }
    }

    setGameState((prev) => ({
      ...prev,
      typedChars: value.length,
      correctChars,
      errors,
      currentIndex: value.length,
    }));

    if (value.length >= gameState.currentText.length) {
      endTest();
    }
  };

  const startTest = () => {
    setGameState((prev) => ({ ...prev, isCountingDown: true }));
    setCountdown(3);

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          setTimeout(beginTyping, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const beginTyping = () => {
    const startTime = Date.now();
    setGameState((prev) => ({
      ...prev,
      isPlaying: true,
      isCountingDown: false,
      startTime,
      timeLeft: prev.duration,
    }));

    timerRef.current = setInterval(() => {
      setGameState((prev) => {
        const newTimeLeft = prev.timeLeft - 1;
        if (newTimeLeft <= 0) {
          endTest();
          return prev;
        }
        return { ...prev, timeLeft: newTimeLeft };
      });
    }, 1000);
  };

  const endTest = useCallback(() => {
    clearInterval(timerRef.current);
    clearInterval(countdownRef.current);

    setGameState((prev) => ({
      ...prev,
      isPlaying: false,
      isCountingDown: false,
    }));

    const stats = updateStats();
    const result = {
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      duration: gameState.duration,
      characters: gameState.typedChars,
      errors: gameState.errors,
      timestamp: new Date().toISOString(),
    };

    onGameEnd(result);
  }, [gameState, updateStats, onGameEnd]);

  const resetGame = useCallback(() => {
    // Clear all intervals first
    clearInterval(timerRef.current);
    clearInterval(countdownRef.current);

    // Clear the refs to prevent any lingering interval references
    timerRef.current = null;
    countdownRef.current = null;

    // Reset all state to initial values
    setGameState((prev) => ({
      isPlaying: false,
      isCountingDown: false,
      duration: prev.duration, // Keep the selected duration
      timeLeft: prev.duration, // Reset timeLeft to match duration
      currentText: prev.currentText, // Keep current text or will be updated by selectRandomText
      typedChars: 0,
      correctChars: 0,
      errors: 0,
      startTime: null,
      currentIndex: 0,
    }));

    // Reset other state variables
    setTypedText("");
    setCountdown(3);

    // Select a new random text
    selectRandomText();
  }, [selectRandomText]);

  useImperativeHandle(
    ref,
    () => ({
      resetGame: resetGame,
    }),
    [resetGame]
  );

  const handleDurationChange = (duration) => {
    if (!gameState.isPlaying && !gameState.isCountingDown) {
      setGameState((prev) => ({ ...prev, duration, timeLeft: duration }));
    }
  };

  const stats = useMemo(() => updateStats(), [updateStats]);
  const progress =
    ((gameState.duration - gameState.timeLeft) / gameState.duration) * 100;

  useEffect(() => {
    selectRandomText();
    return () => {
      clearInterval(timerRef.current);
      clearInterval(countdownRef.current);
    };
  }, [selectRandomText]);

  return (
    <div
      className="rounded-2xl shadow-xl p-8"
      style={{ backgroundColor: "rgb(var(--bg-primary))" }}
    >
      <ModeSelector
        selectedDuration={gameState.duration}
        onDurationChange={handleDurationChange}
        disabled={gameState.isPlaying || gameState.isCountingDown}
      />

      <StatsHud stats={{ ...stats, timeLeft: gameState.timeLeft, progress }} />

      <ProgressBar progress={progress} />

      <div
        className="rounded-xl p-8 mb-6 relative min-h-48"
        style={{ backgroundColor: "rgb(var(--bg-secondary))" }}
      >
        <TextDisplay
          text={gameState.currentText}
          currentIndex={gameState.currentIndex}
          typedText={typedText}
        />

        <TypingInput
          value={typedText}
          onChange={handleTyping}
          onKeyDown={(e) => {
            if (e.key === "Backspace" || e.key === "Tab") {
              e.preventDefault();
            }
          }}
          disabled={!gameState.isPlaying}
          placeholder={
            gameState.isPlaying
              ? "Start typing..."
              : "Click 'Start Test' to begin typing..."
          }
        />

        <Countdown count={countdown} visible={gameState.isCountingDown} />
      </div>

      {!gameState.isPlaying && !gameState.isCountingDown && (
        <div className="text-center">
          <button
            onClick={startTest}
            className="px-8 py-4 rounded-full text-lg font-semibold text-white hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300"
            style={{
              backgroundImage: `linear-gradient(to right,
              rgb(var(--color-primary)),
              rgb(var(--color-primary-hover)))`,
            }}
          >
            Start Test
          </button>
        </div>
      )}

      {(gameState.isPlaying || gameState.isCountingDown) && (
        <div className="text-center">
          <button
            onClick={resetGame}
            className="px-6 py-3 rounded-full font-semibold text-white transition-all duration-300"
            style={{
              backgroundColor: "rgb(var(--color-secondary))",
            }}
          >
            <RotateCcw className="inline-block mr-2" size={16} />
            Reset
          </button>
        </div>
      )}
    </div>
  );
});

Game.displayName = "Game";
export default Game;
