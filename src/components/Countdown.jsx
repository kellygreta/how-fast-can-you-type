const Countdown = ({ count, visible }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95 rounded-xl">
      <div className="text-6xl font-bold text-blue-500 animate-bounce">
        {count > 0 ? count : "GO!"}
      </div>
    </div>
  );
};

export default Countdown;
