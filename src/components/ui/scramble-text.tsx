import { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  revealSpeed?: number; // How many characters are revealed per scramble step
  chars?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export function ScrambleText({
  text,
  className,
  scrambleSpeed = 30,
  revealSpeed = 0.33,
  chars = DEFAULT_CHARS,
  as: Component = "span",
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const iterationRef = useRef(0);
  const intervalRef = useRef<any>(null);

  const startScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    iterationRef.current = 0;
    const targetText = text;
    
    intervalRef.current = setInterval(() => {
      setDisplayText((prev) => {
        const newText = targetText
          .split("")
          .map((char, index) => {
            if (index < iterationRef.current) {
              return targetText[index];
            }
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
          
        return newText;
      });

      iterationRef.current += revealSpeed;

      if (iterationRef.current >= targetText.length) {
        clearInterval(intervalRef.current!);
        setDisplayText(targetText);
      }
    }, scrambleSpeed);
  }, [text, scrambleSpeed, revealSpeed, chars]);

  useEffect(() => {
    startScramble();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, startScramble]);

  return <Component className={cn("inline-block", className)}>{displayText}</Component>;
}
