import { useEffect, useRef } from "react";

const TypingInput = ({ value, onChange, onKeyDown, disabled, placeholder }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      disabled={disabled}
      placeholder={placeholder}
      className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg outline-none font-mono bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
    />
  );
};

export default TypingInput;
