import type { PokemonDamageInformation, PokemonTypeUri } from "models copy";
import { useEffect, useState } from "react";

//const cacheType = new Map<string, PokemonDamageInformation>();

export function useDamagePokemon(pokemonTypeUri: PokemonTypeUri) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonDamage, setPokemonDamage] = useState<PokemonDamageInformation>();

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(pokemonTypeUri.url);
        const data = await response.json();
        //cacheType.set(pokemonTypeUri.url, data);
        setPokemonDamage(data.results);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!pokemonTypeUri) return;

    //if (cacheType.has(pokemonTypeUri.url)) {
    //    setPokemonDamage(cacheType.get(pokemonTypeUri.url));
    //  setIsLoading(false);
   // } else {
   //   fetchPokemonData();
   // }
   fetchPokemonData();
  }, [pokemonTypeUri]);

  return { pokemonDamage, isLoading };
}
