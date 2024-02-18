"use client";

import { useState, useEffect } from "react";
import { Pokemon, PokemonClient } from "pokenode-ts";
import PokemonCard, { PokemonCardProps } from "@/components/PokemonCard";
import Placeholder from "../Placeholder";
import capitalize from "@/utils/capitalize";

interface PokemonGridProps {
  pokemonNames: string[];
  type?: PokemonCardProps["type"];
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemonNames, type }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const api = new PokemonClient();

    const fetchPokemons = async () => {
      const pokemonData = await Promise.all(
        pokemonNames.map((name) => api.getPokemonByName(name)),
      );
      setPokemons(pokemonData);
    };

    fetchPokemons().catch(console.error);
  }, [pokemonNames]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4">
      {pokemons.length === 0
        ? Array.from({ length: pokemonNames.length }, (_, index) => (
            <Placeholder key={`placeholder-${index}`} />
          ))
        : pokemons.map((pokemon, index) => (
            <PokemonCard
              key={index}
              title={capitalize(pokemon.name)}
              subtitle={`#${pokemon.id}`}
              price={(pokemon.id * 3).toFixed(2)} // @todo: connect to Commerce Layer
              types={pokemon.types.map((type) => type.type.name)}
              href={`/pokemons/${pokemon.name}`}
              imageUrl={pokemon.sprites.front_default}
              type={type}
            />
          ))}
    </div>
  );
};

export default PokemonGrid;
