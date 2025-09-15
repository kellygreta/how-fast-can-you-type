import { Timer } from "lucide-react";

const ModeSelector = ({ selectedDuration, onDurationChange, disabled }) => {
  const modes = [
    { duration: 15, label: "15s" },
    { duration: 30, label: "30s" },
    { duration: 60, label: "60s" },
    { duration: 120, label: "2min" },
  ];

  return (
    <div className="flex gap-4 justify-center mb-8 flex-wrap">
      {modes.map(({ duration, label }) => (
        <button
          key={duration}
          onClick={() => onDurationChange(duration)}
          disabled={disabled}
          className={`px-6 py-3 border-2 rounded-full font-semibold transition-all duration-300 ${
            selectedDuration === duration
              ? "bg-[rgb(var(--color-primary))] text-white border-[rgb(var(--color-primary))] shadow-lg transform -translate-y-1"
              : "bg-white text-[rgb(var(--color-primary))] border-[rgb(var(--color-primary))] hover:[rgb(var(--color-primary))] hover:text-white hover:transform hover:-translate-y-1"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"}`}
        >
          <Timer className="inline-block mr-2" size={16} />
          {label}
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;
