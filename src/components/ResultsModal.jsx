import { Award, RotateCcw, Share2 } from "lucide-react";

const ResultsModal = ({ result, isVisible, onClose, onRetry }) => {
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
      <div className="bg-white rounded-2xl p-8 max-w-md w-full animate-in zoom-in duration-300">
        <div className="text-center mb-6">
          <Award className="mx-auto text-yellow-500 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-blue-500 mb-2">
            Test Complete!
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-xl text-center">
            <div className="text-3xl font-bold text-blue-500">{result.wpm}</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">
              WPM
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl text-center">
            <div className="text-3xl font-bold text-green-500">
              {result.accuracy}
            </div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">
              Accuracy %
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl text-center">
            <div className="text-3xl font-bold text-purple-500">
              {result.characters}
            </div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">
              Characters
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl text-center">
            <div className="text-3xl font-bold text-red-500">
              {result.errors}
            </div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">
              Errors
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onRetry}
            className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors"
          >
            <RotateCcw className="mr-2" size={16} />
            Try Again
          </button>
          <button
            onClick={shareResults}
            className="flex items-center px-6 py-3 border-2 border-blue-500 text-blue-500 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-colors"
          >
            <Share2 className="mr-2" size={16} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;
