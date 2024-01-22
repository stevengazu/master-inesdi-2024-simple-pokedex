import c from "classnames";
import { useState } from "react";
import { useTheme } from "../contexts/theme-context";
import { usePokemonList } from "../hooks/use-pokemon";
import { Button } from "./button";
import { LedDisplay } from "./led-display";

import type { Pokemon } from "models";

import "./pokedex.css";

export function Pokedex() {
  const { theme } = useTheme();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();
  const { isLoading, pokemonList } = usePokemonList();

  return (
    <div className={c("pokedex", `pokedex-${theme}`)}>
      <div className="panel left-panel">
        <div className="screen main-screen"></div>
      </div>
      <div className="panel right-panel">
        <div className="controls leds">
          <LedDisplay color="blue" />
          <LedDisplay color="red" />
          <LedDisplay color="yellow" />
        </div>
        <div className="screen second-screen"></div>
        <div className="controls">
          <Button label="prev" />
          <Button label="next" />
        </div>
      </div>
    </div>
  );
}
