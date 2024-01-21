import type { PokemonUri } from "models";
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

export function usePokemon(pokemonUri: PokemonUri) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(pokemonUri.url);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonUri]);

  return { pokemon, isLoading };
}
