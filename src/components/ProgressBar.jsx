import { Zap } from "lucide-react";

const ProgressBar = ({ progress }) => (
  <div className="relative w-full bg-gray-200 rounded-full h-3 mb-6">
    <div
      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300 flex items-center justify-end pr-1"
      style={{ width: `${progress}%` }}
    >
      {progress > 50 && <Zap className="text-white" size={12} />}
    </div>
  </div>
);

export default ProgressBar;
