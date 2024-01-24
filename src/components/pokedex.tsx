import c from "classnames";
import { useState } from "react";
import { useTheme } from "../contexts/theme-context";
import { usePokemonList } from "../hooks/use-pokemon";
import { Button } from "./button";
import { LedDisplay } from "./led-display";
import { default as pokemonMock } from "../hooks/mocks/pokemon.json";
import { useTextTransition } from "../hooks/use-text-transition";

import "./pokedex.css";
import type { Pokemon } from "models";

export function Pokedex() {
  const { theme } = useTheme();
  const [transition] = useTextTransition();

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>(pokemonMock);
  const [nextPokemon, setNextPokemon] = useState<Pokemon>(pokemonMock);

  const { isLoading, pokemonList } = usePokemonList();

  return (
    <div className={c("pokedex", `pokedex-${theme}`)}>
      <div className="panel left-panel">
        <div className="a">a</div>
        <div className="screen main-screen">
          <img
            className={c("sprite", transition && "obfuscated")}
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
          />
        </div>
        <div className="screen name-display">
          <div className={c("name", transition && "obfuscated")}>
            {selectedPokemon.name}
          </div>
        </div>
      </div>
      <div className="panel right-panel">
        <div className="controls leds">
          <LedDisplay color="blue" />
          <LedDisplay color="red" />
          <LedDisplay color="yellow" />
        </div>
        <div className="screen second-screen">
          <img
            className={c("sprite", transition && "obfuscated")}
            src={nextPokemon.sprites.front_default}
            alt={nextPokemon.name}
          />
        </div>
        <div className="controls">
          <Button label="prev" onClick={() => {}} />
          <Button label="next" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}
