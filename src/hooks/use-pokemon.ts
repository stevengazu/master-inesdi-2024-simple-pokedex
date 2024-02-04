import type { Pokemon, PokemonUri } from "models";
import { useEffect, useState } from "react";

const API_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";

type UsePokemonOpts = {
  limit?: number;
};

export function usePokemonList({ limit }: UsePokemonOpts = { limit: 10 }) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState<PokemonUri[]>([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}?limit=${limit}`);
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error("Error fetching Pokemon list:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonList();
  }, [limit]);

  return { pokemonList, isLoading };
}

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
