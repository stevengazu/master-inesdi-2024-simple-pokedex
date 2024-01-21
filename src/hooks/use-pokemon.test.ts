import { renderHook, waitFor } from "@testing-library/react";
import { usePokemonList } from "./use-pokemon";
import { default as apiResponse } from "./mocks/pokemon-list.json";

describe("usePokemonList()", () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(apiResponse),
    });
  });

  test("should return a list of Pokemon", async () => {
    const { result } = renderHook(() => usePokemonList());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.pokemonList).toEqual([
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
      { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
      { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
      { name: "charmeleon", url: "https://pokeapi.co/api/v2/pokemon/5/" },
      { name: "charizard", url: "https://pokeapi.co/api/v2/pokemon/6/" },
      { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
      { name: "wartortle", url: "https://pokeapi.co/api/v2/pokemon/8/" },
      { name: "blastoise", url: "https://pokeapi.co/api/v2/pokemon/9/" },
      { name: "caterpie", url: "https://pokeapi.co/api/v2/pokemon/10/" },
    ]);
  });
});
