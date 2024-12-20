"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Pokemon, PokemonClient } from "pokenode-ts";
import classnames from "classnames";
import ChoiceTable from "@/components/ChoiceTable";
import ChoicePokeball from "@/components/ChoicePokeball";
import { useCommerceLayer } from "@commercelayer/react-components";
import DialogBox from "@/components/DialogBox";
import capitalize from "@/utils/capitalize";

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
        // @todo: Handle unauthorized.
        console.log(error);
        console.error("Error fetching SKU list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skuListId]);

  return (
    <div className="flex flex-col h-screen justify-between">
      {selectedPokemon !== null ? (
        <>
          <DialogBox
            className="relative z-40 m-10 max-w-[600px] mx-auto"
            actions={[
              {
                content: "YES",
                onClick: () => {
                  // Add line item and proceed to checkout.
                  console.log("Yes");
                },
              },
              {
                content: "NO",
                onClick: () => {
                  setSelectedPokemon(null);
                },
              },
            ]}
          >
            Are you sure you want {capitalize(selectedPokemon.name)}?
          </DialogBox>
          <div className="bg-black opacity-60 fixed top-0 right-0 bottom-0 left-0 z-30"></div>
        </>
      ) : null}
      <ChoiceTable className="mb-0 mt-auto justify-self-end">
        {loading
          ? "Loading starters..."
          : pokemons.map((pokemon) => {
              return (
                <ChoicePokeball
                  pokemon={pokemon}
                  key={pokemon.id}
                  className={classnames({
                    "z-30": selectedPokemon?.id === pokemon.id,
                  })}
                  state={
                    selectedPokemon?.id === pokemon.id ? "selected" : "default"
                  }
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
