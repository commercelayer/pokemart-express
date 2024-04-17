import { cache } from "react";
import { NextPage } from "next";
import { PokemonClient, Pokemon } from "pokenode-ts";
import PokemonEncounter from "@/components/PokemonEncounter";

const LOCALE = "en";

type PageProps = {
  params?: {
    slug?: string | string[];
  };
};

const Page: NextPage<PageProps> = async ({ params }) => {
  const pokemon = await getData(params?.slug);

  if (pokemon === null) {
    return <p>Pokemon not found.</p>;
  }

  return (
    <div className="bg-gray-800 min-h-screen px-5 py-10">
      <div
        className="mx-auto"
        style={{
          maxWidth: "700px",
        }}
      >
        <PokemonEncounter pokemon={pokemon} />
        <div className="text-white">
          <p>{pokemon.description}</p>
          <p>
            <strong>weight: </strong>
            {pokemon.weight} kg
          </p>
        </div>
      </div>
    </div>
  );
};

const getData = cache(
  async (
    paramSlug?: string | string[],
  ): Promise<(Pokemon & { description: string | undefined }) | null> => {
    if (!paramSlug) {
      return null;
    }

    const slug = Array.isArray(paramSlug) ? paramSlug[0] : paramSlug;
    const api = new PokemonClient();

    try {
      const pokemonData = await api.getPokemonByName(slug);
      const species = await api.getPokemonSpeciesById(pokemonData.id);

      // Extract the English description from the species data
      const localizedDescription = species.flavor_text_entries.find(
        (entry) => entry.language.name === LOCALE,
      )?.flavor_text;

      return Object.assign({}, pokemonData, {
        description: localizedDescription,
      });
    } catch (error) {
      console.error(error);

      return null;
    }
  },
);

export default Page;
