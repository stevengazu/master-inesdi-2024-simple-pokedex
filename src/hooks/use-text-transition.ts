import { useState, useEffect } from "react";

export function useTextTransition(initialState = false, duration = 1000) {
  const [ready, setReady] = useState(initialState);

  const resetTransition = () => setReady(initialState);

  useEffect(() => {
    if (!ready) {
      const timeout = setTimeout(() => {
        setReady(true);
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [duration, ready]);

  return { ready, resetTransition };
}
