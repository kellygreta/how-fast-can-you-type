import { Award, RotateCcw, Share2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ResultsModal = ({ result, isVisible, onClose, onRetry }) => {
  const { theme } = useTheme(); // get current theme

  if (!isVisible || !result) return null;

  const shareResults = () => {
    const shareText = `I just achieved ${result.wpm} WPM with ${result.accuracy}% accuracy on TypeSprint! 🚀⌨️`;

    if (navigator.share) {
      navigator.share({
        title: "TypeSprint Results",
        text: shareText,
        url: window.location.href,
      });
    } else if (navigator.clipboard) {
      navigator.clipboard
        .writeText(shareText + " " + window.location.href)
        .then(() => alert("Results copied to clipboard!"));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="rounded-2xl p-8 max-w-md w-full animate-in zoom-in duration-300"
        style={{ backgroundColor: "rgb(var(--bg-primary))" }}
      >
        <div className="text-center mb-6">
          <Award
            className={`mx-auto mb-4 ${
              theme === "light" ? "text-yellow-500" : "text-yellow-400"
            }`}
            size={48}
          />
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "rgb(var(--color-primary))" }}
          >
            Test Complete!
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div
            className="p-4 rounded-xl text-center"
            style={{ backgroundColor: "rgb(var(--bg-secondary))" }}
          >
            <div
              className="text-3xl font-bold"
              style={{ color: "rgb(var(--color-primary))" }}
            >
              {result.wpm}
            </div>
            <div
              className="text-sm uppercase tracking-wide"
              style={{ color: "rgb(var(--text-secondary))" }}
            >
              WPM
            </div>
          </div>

          <div
            className="p-4 rounded-xl text-center"
            style={{ backgroundColor: "rgb(var(--bg-secondary))" }}
          >
            <div className="text-3xl font-bold text-green-500">
              {result.accuracy}
            </div>
            <div
              className="text-sm uppercase tracking-wide"
              style={{ color: "rgb(var(--text-secondary))" }}
            >
              Accuracy %
            </div>
          </div>

          <div
            className="p-4 rounded-xl text-center"
            style={{ backgroundColor: "rgb(var(--bg-secondary))" }}
          >
            <div className="text-3xl font-bold text-purple-500">
              {result.characters}
            </div>
            <div
              className="text-sm uppercase tracking-wide"
              style={{ color: "rgb(var(--text-secondary))" }}
            >
              Characters
            </div>
          </div>

          <div
            className="p-4 rounded-xl text-center"
            style={{ backgroundColor: "rgb(var(--bg-secondary))" }}
          >
            <div className="text-3xl font-bold text-red-500">
              {result.errors}
            </div>
            <div
              className="text-sm uppercase tracking-wide"
              style={{ color: "rgb(var(--text-secondary))" }}
            >
              Errors
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onRetry}
            className="flex items-center px-6 py-3 rounded-full font-semibold transition-colors"
            style={{
              backgroundColor: "rgb(var(--color-primary))",
              color: "white",
            }}
          >
            <RotateCcw className="mr-2" size={16} />
            Try Again
          </button>

          <button
            onClick={shareResults}
            className="flex items-center px-6 py-3 rounded-full font-semibold border-2 transition-colors"
            style={{
              borderColor: "rgb(var(--color-primary))",
              color: "rgb(var(--color-primary))",
            }}
          >
            <Share2 className="mr-2" size={16} />
            Share
          </button>

          <button
            onClick={onClose}
            className="flex items-center px-6 py-3 rounded-full font-semibold border-2 transition-colors"
            style={{
              borderColor: "rgb(var(--color-secondary))",
              color: "rgb(var(--text-primary))",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;
