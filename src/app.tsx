import { ThemeProvider } from "contexts/theme-context";
import { Pokedex } from "components/pokedex";

export function App() {
  return (
    <main>
      <ThemeProvider>
        <Pokedex />
      </ThemeProvider>
    </main>
  );
}
