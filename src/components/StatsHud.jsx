import { Zap, Target, Clock } from "lucide-react";

const StatsHud = ({ stats }) => (
  <div className="bg-[rgb(var(--color-primary))] text-white p-6 rounded-xl mb-6 shadow-lg">
    <div className="flex justify-around">
      <div className="text-center">
        <div className="text-3xl font-bold flex items-center justify-center">
          <Zap className="mr-2" size={24} />
          {stats.wpm}
        </div>
        <div className="text-sm opacity-90 uppercase tracking-wide">WPM</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold flex items-center justify-center">
          <Target className="mr-2" size={24} />
          {stats.accuracy}
        </div>
        <div className="text-sm opacity-90 uppercase tracking-wide">
          Accuracy %
        </div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold flex items-center justify-center">
          <Clock className="mr-2" size={24} />
          {stats.timeLeft}
        </div>
        <div className="text-sm opacity-90 uppercase tracking-wide">
          Time Left
        </div>
      </div>
    </div>
  </div>
);

export default StatsHud;
