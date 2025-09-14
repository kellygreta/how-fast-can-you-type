const TextDisplay = ({ text, currentIndex, typedText }) => (
  <div className="break-words overflow-wrap-anywhere text-lg sm:text-xl leading-relaxed sm:leading-8 mb-6 font-mono tracking-wide select-none">
    {text.split("").map((char, index) => {
      let className = "relative ";

      if (index === currentIndex) {
        className += "bg-blue-500 text-white animate-pulse rounded px-0.5";
      } else if (index < typedText.length) {
        if (typedText[index] === char) {
          className += "bg-green-100 text-green-800";
        } else {
          className += "bg-red-100 text-red-800";
        }
      }

      return (
        <span key={index} className={className}>
          {char === " " ? "\u00A0" : char}
        </span>
      );
    })}
  </div>
);

export default TextDisplay;
