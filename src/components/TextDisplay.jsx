const TextDisplay = ({ text, currentIndex, typedText }) => (
  <div
    className="break-words overflow-wrap-anywhere text-lg sm:text-xl leading-relaxed sm:leading-8 mb-6 font-mono tracking-wide select-none"
    style={{ color: "rgb(var(--text-primary))" }}
  >
    {text.split("").map((char, index) => {
      let className = "relative ";

      if (index === currentIndex) {
        // Evidenzia il carattere corrente usando primary color
        className += "animate-pulse rounded px-0.5";
        return (
          <span
            key={index}
            className={className}
            style={{
              backgroundColor: "rgb(var(--color-primary))",
              color: "rgb(var(--text-primary))",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      } else if (index < typedText.length) {
        // Corretto o errore
        const isCorrect = typedText[index] === char;
        return (
          <span
            key={index}
            className={className}
            style={{
              backgroundColor: isCorrect
                ? "rgba(34,197,94,0.2)" // green-light
                : "rgba(239,68,68,0.2)", // red-light
              color: isCorrect
                ? "rgb(22,163,74)" // green-dark
                : "rgb(185,28,28)", // red-dark
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
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
