import { useState } from "react";
import { usePokemonList } from "../hooks/use-pokemon";
import { Button } from "./button";

import type { Pokemon } from "models";

import "./pokedex.css";
import { LedDisplay } from "./led-display";

export function Pokedex() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();
  const { isLoading, pokemonList } = usePokemonList();

  return (
    <div className="pokedex">
      <div className="column first-column">
        <div className="screen main-screen"></div>
      </div>
      <div className="column second-column">
        <div className="controls lights">
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
