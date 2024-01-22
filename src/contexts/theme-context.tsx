import { PokedexTheme } from "models";
import { createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const ThemeContext = createContext<{
  theme: PokedexTheme;
  setTheme: React.Dispatch<React.SetStateAction<PokedexTheme>>;
}>({
  theme: "red",
  setTheme: () => {},
});

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<PokedexTheme>("red");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
