import { useEffect, useState } from "react";
import CustomReactMarkdown from "./CustomReactMarkdown";

const TypewriterEffect = ({ text, typingSpeed = 30, onComplete }) => {
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    if (visibleLength >= text.length) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setVisibleLength((prev) => Math.min(prev + 1, text.length));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [visibleLength, text, typingSpeed, onComplete]);

  return (
    <div className="break-words overflow-hidden">
      <CustomReactMarkdown content={text.substring(0, visibleLength)} />
      {visibleLength < text.length && (
        <span className="ml-1 inline-block w-2 h-4 bg-cyan-400 animate-blink" />
      )}
    </div>
  );
};

export default TypewriterEffect;
