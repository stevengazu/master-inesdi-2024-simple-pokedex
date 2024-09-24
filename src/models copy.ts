
export type PokemonTypeUri = {
  name: string;
  url: string;
};

export type PokemonDamageFrom = {
  double_damage_from: {
    name: string;
    url: string;
  };
};


export type PokemonDamageInformation = {
  damage_relations: PokemonDamageFrom[];
};