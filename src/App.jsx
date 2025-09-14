import { useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import ResultsModal from "./components/ResultsModal";

const App = () => {
  const [currentResult, setCurrentResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-pink-500 to-purple-700 p-6">
      <div className="max-w-4xl mx-auto">
        <Header />
        <Game onGameEnd={handleGameEnd} />
        <ResultsModal
          result={currentResult}
          isVisible={showResults}
          onClose={() => setShowResults(false)}
          onRetry={() => setShowResults(false)}
        />
      </div>
    </div>
  );
};

export default App;
