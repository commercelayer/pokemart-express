"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Pokemon, PokemonClient } from "pokenode-ts";
import classnames from "classnames";
import ChoiceTable from "@/components/ChoiceTable";
import ChoicePokeball from "@/components/ChoicePokeball";
import {
  LineItemsContainer,
  useCommerceLayer,
  useOrderContainer,
} from "@commercelayer/react-components";
import DialogBox from "@/components/DialogBox";
import capitalize from "@/utils/capitalize";
import { getApplicationLink } from "@/utils/getApplicationLink";

const MicrostorePage = () => {
  const { id: skuListId } = useParams() || {};
  const { sdkClient, accessToken } = useCommerceLayer();
  const { current: client } = useRef(sdkClient());
  const { order, addToCart } = useOrderContainer();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
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
      } catch (error: unknown) {
        if (
          typeof error === "object" &&
          error !== null &&
          "code" in error &&
          error.code === "401"
        ) {
          setError("Unauthorized");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSkus();
  }, [skuListId, client]);

  const handlePokemonSelection = useCallback(async () => {
    try {
      if (!(accessToken && client && order && selectedPokemon)) {
        throw new Error("Missing access token, client, order, or pokemon");
      }

      await Promise.all(
        (order.line_items || []).map((lineItem) => {
          return client.line_items.delete(lineItem.id);
        }),
      );

      await addToCart({
        skuCode: selectedPokemon.name,
        quantity: 1,
      });

      setSelectedPokemon(null);

      const href = getApplicationLink({
        orderId: order.id,
        accessToken,
        applicationType: "checkout",
      });

      window.location.href = href;
    } catch (error) {
      console.error(error);
    }
  }, [accessToken, order, selectedPokemon, addToCart, client]);

  if (error) {
    return (
      <div className="flex flex-col h-screen justify-between">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold mb-4">Error fetching Link data.</h1>
          <p className="text-gray-600 mb-4">
            The token used for this link has expired, please follow the link
            again.
          </p>
          <p className="text-gray-600 mb-4">
            If the problem persists, please contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <LineItemsContainer>
      <div className="flex flex-col h-screen justify-between">
        {selectedPokemon !== null ? (
          <>
            <DialogBox
              className="relative z-40 m-10 max-w-[600px] mx-auto"
              actions={[
                {
                  content: "YES",
                  onClick: handlePokemonSelection,
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
                      selectedPokemon?.id === pokemon.id
                        ? "selected"
                        : "default"
                    }
                    onClick={() => setSelectedPokemon(pokemon)}
                  />
                );
              })}
          <Lab />
        </ChoiceTable>
      </div>
    </LineItemsContainer>
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
