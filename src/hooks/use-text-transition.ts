import { useState, useEffect } from "react";

export function useTextTransition(initialState = true, duration = 1000) {
  const [obfuscate, setObfuscate] = useState(initialState);

  useEffect(() => {
    if (obfuscate) {
      const timeout = setTimeout(() => {
        setObfuscate(false);
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [obfuscate, duration]);

  return [obfuscate];
}
