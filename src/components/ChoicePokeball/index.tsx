import Image from "next/image";
import { Pokemon } from "pokenode-ts";
import { Price, PricesContainer } from "@commercelayer/react-components";

const ChoicePokeball = ({
  onClick,
  pokemon,
}: {
  onClick?: () => void;
  pokemon: Pokemon;
}) => {
  return (
    <div className="flex flex-col items-center gap-5 group">
      <div className="absolute bottom-full bg-white mb-5 flex flex-col justify-center items-center opacity-0 transition-opacity group-hover:opacity-100 p-3 shadow-pixel text-lg">
        <span className="text-2xl">{pokemon.name}</span>
        <PricesContainer>
          <Price skuCode={pokemon.name} />
        </PricesContainer>
      </div>
      <button className="relative" onClick={() => onClick && onClick()}>
        <Image
          src="/images/pokeball-big.png"
          alt="Pokeball"
          width={200}
          height={200}
          className="relative z-20 group-hover:animate-[shake_1s_ease-in-out]"
        />
        {/* bg */}
        <span className="w-1/2 transition-[width] opacity-40 h-4 z-10 rounded-[50%] bg-black blur-sm absolute -bottom-1 left-1/2 translate-x-[-50%]"></span>
        {/* Reveal pokemon here */}
        <span className="absolute overflow-hidden transition-all duration-700 group-hover:delay-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-0 h-0 group-hover:w-[90%] group-hover:h-[90%] rounded-full bg-white">
          {pokemon.sprites.front_default && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="absolute scale-150 block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
            </>
          )}
        </span>
      </button>
    </div>
  );
};

export default ChoicePokeball;
