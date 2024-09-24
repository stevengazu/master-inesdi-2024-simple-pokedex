import type { Pokemon,PokemonUri } from "models";
import { useEffect, useState } from "react";

const cache = new Map<string, Pokemon>();

export function usePokemon(pokemonUri: PokemonUri) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(pokemonUri.url);
        const data = await response.json();
        cache.set(pokemonUri.url, data);
        setPokemon(data);
        
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!pokemonUri) return;

    if (cache.has(pokemonUri.url)) {
      setPokemon(cache.get(pokemonUri.url));
      setIsLoading(false);
    } else {
      fetchPokemonData();
    }
  }, [pokemonUri]);

  return { pokemon, isLoading };
}

/**
 * Hook personalizado para obtener y gestionar las relaciones de daño de Pokémon basadas en las URLs de tipos proporcionadas.
 *
 * @param {string[]} typeUrls - Un array de URLs para obtener datos de tipos de Pokémon.
 * @returns {Object} Un objeto que contiene los datos de daño de Pokémon obtenidos.
 * @returns {any[]} pokemonDamages - Un array de relaciones de daño para los tipos de Pokémon proporcionados.
 *
 * @example
 * const { pokemonDamages } = usePokemonDamages(['https://pokeapi.co/api/v2/type/1/', 'https://pokeapi.co/api/v2/type/2/']);
 */
export function usePokemonDamages(typeUrls: string[]) {
  const [pokemonDamages, setDamageData] = useState<any[]>([]);
  useEffect(() => {
    const fetchDamageData = async () => {
      
      const promises = typeUrls.map(url => fetch(url).then(res => res.json()));
      const results = await Promise.all(promises);

      const damageFromAll = results.map(result => result.damage_relations);
      const damageFromAllw = damageFromAll.map(result => result.double_damage_from);
      setDamageData(damageFromAllw.flat());
    };

    fetchDamageData();
  }, [typeUrls]);
  return { pokemonDamages };
}


