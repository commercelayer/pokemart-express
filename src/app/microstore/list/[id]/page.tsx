"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Pokemon, PokemonClient } from "pokenode-ts";
import ChoiceTable from "@/components/ChoiceTable";
import ChoicePokeball from "@/components/ChoicePokeball";
import { useCommerceLayer } from "@commercelayer/react-components";

const MicrostorePage = () => {
  const { id: skuListId } = useParams() || {};
  const { sdkClient } = useCommerceLayer();
  const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const client = sdkClient();
    const fetchSkus = async () => {
      if (!skuListId) {
        console.error("Missing SKU list ID.");
        setLoading(false);
        return;
      }

      try {
        const skuList = await client?.sku_lists.retrieve(
          Array.isArray(skuListId) ? skuListId[0] : skuListId,
          {
            include: ["skus"],
          },
        );

        if (skuList?.skus) {
          const api = new PokemonClient();
          const pokemonData = await Promise.all(
            skuList.skus.map((sku) => api.getPokemonByName(sku.code)),
          );
          setPokemons(pokemonData);
        }
      } catch (error) {
        console.error("Error fetching SKU list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skuListId]);

  return (
    <div className="flex flex-col h-screen justify-end">
      <ChoiceTable>
        {loading
          ? "Loading starters..."
          : pokemons.map((pokemon) => {
              return (
                <ChoicePokeball
                  pokemon={pokemon}
                  key={pokemon.id}
                  onClick={() => setSelectedPokemon(pokemon)}
                />
              );
            })}
      </ChoiceTable>
      <Lab />
    </div>
  );
};

const Lab = () => {
  return (
    <div
      className="h-screen w-screen flex-col fixed top-0 left-0"
      style={{
        backgroundImage: "url('/images/lab.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(5px)",
      }}
    />
  );
};

export default MicrostorePage;
