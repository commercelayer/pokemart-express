import { cache } from "react";
import { NextPage } from "next";
import { PokemonClient, Pokemon } from "pokenode-ts";
import Gallery from "@/components/Gallery";
import TypeTag, { isPokemonType, typeColorMap } from "@/components/TypeTag";

const LOCALE = "en";

type PageProps = {
  params?: {
    slug?: string | string[];
  };
};

type Theme = {
  text: string;
  bg: string;
  hover: string;
};

const getMainTheme = (pokemonType: string) => {
  if (!isPokemonType(pokemonType)) {
    return {
      text: "text-black",
      bg: "bg-white",
      hover: "bg-",
    };
  }
};

const Page: NextPage<PageProps> = async ({ params }) => {
  const pokemon = await getData(params?.slug);

  if (pokemon === null) {
    return <p>Pokemon not found.</p>;
  }

  const { front_default: mainImage, ...images } = pokemon.sprites;
  const galleryImages: string[] = Object.values(images).filter(
    (url): url is string => typeof url === "string",
  );

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col-reverse md:flex-row justify-center items-start">
      <div className="max-w-xl md:w-1/3 lg:w-1/2 p-8 flex flex-col justify-center items-center lg:items-start">
        <Gallery images={[mainImage as string, ...galleryImages]} />
      </div>
      <div className="max-w-xl md:w-2/3 lg:w-1/2 bg-gray-900 p-8 m-8 rounded-lg shadow-lg">
        <h1 className="text-3xl text-yellow-400 font-bold mb-2">
          {pokemon.name}
        </h1>
        <p className="text-gray-300 mb-4">#{pokemon.id}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-yellow-400">$10.00</span>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
            Add to Cart
          </button>
        </div>
        {pokemon.description && (
          <p className="text-gray-300 mb-4">{pokemon.description}</p>
        )}
        <div className="flex flex-wrap gap-2">
          {pokemon.types.map(({ type: { name } }, id) => {
            if (!isPokemonType(name)) {
              return null;
            }

            return <TypeTag key={id} type={name} />;
          })}
        </div>
      </div>
    </div>
  );
};

export const getData = cache(
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
