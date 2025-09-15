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
    // Simply reload the page to completely reset everything
    window.location.reload();
  };

  const handleClose = () => {
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-pink-500 to-purple-700 p-6">
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
