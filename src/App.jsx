import { useState, useRef } from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import ResultsModal from "./components/ResultsModal";

const App = () => {
  const [currentResult, setCurrentResult] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const gameRef = useRef(null);

  const handleGameEnd = (result) => {
    setCurrentResult(result);
    setShowResults(true);

    // Save result in localStorage
    const savedResults = JSON.parse(
      localStorage.getItem("typingResults") || "[]"
    );
    localStorage.setItem(
      "typingResults",
      JSON.stringify([result, ...savedResults])
    );
  };

  const handleRetry = () => {
    setShowResults(false);
    setCurrentResult(null);
    gameRef.current?.resetGame();
    window.location.reload();
  };

  const handleClose = () => {
    setShowResults(false);
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundImage: `linear-gradient(to bottom right,
          rgb(var(--bg-gradient-from)),
          rgb(var(--bg-gradient-via)),
          rgb(var(--bg-gradient-to)))`,
      }}
    >
      <div className="max-w-4xl mx-auto">
        <Header />
        <Game ref={gameRef} onGameEnd={handleGameEnd} />
        <ResultsModal
          result={currentResult}
          isVisible={showResults}
          onClose={handleClose}
          onRetry={handleRetry}
        />
      </div>
    </div>
  );
};

export default App;
