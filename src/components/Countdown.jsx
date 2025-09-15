import { useTheme } from "../context/ThemeContext";

const Countdown = ({ count, visible }) => {
  const { theme } = useTheme();

  if (!visible) return null;

  // Scegli il colore dell'overlay in base al tema
  const overlayColor =
    theme === "dark" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)";

  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-xl">
      {/* Overlay semi-trasparente adattato al tema */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{ backgroundColor: overlayColor }}
      ></div>

      {/* Numero del countdown */}
      <div className="relative text-6xl font-bold text-[rgb(var(--color-primary))] animate-bounce">
        {count > 0 ? count : "GO!"}
      </div>
    </div>
  );
};

export default Countdown;
