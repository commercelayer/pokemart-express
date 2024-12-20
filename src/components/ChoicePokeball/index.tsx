import Image from "next/image";
import classnames from "classnames";
import { Pokemon } from "pokenode-ts";
import { Price, PricesContainer } from "@commercelayer/react-components";
import capitalize from "@/utils/capitalize";

const ChoicePokeball = ({
  onClick,
  pokemon,
  state = "default",
  className,
}: {
  onClick?: () => void;
  pokemon: Pokemon;
  state?: "default" | "selected";
  className?: string;
}) => {
  return (
    <div
      className={classnames(
        "flex flex-col items-center gap-5 group relative z-20",
        className,
      )}
    >
      <div
        className={classnames(
          "absolute text-black bottom-full transition-all bg-white mb-5 flex flex-col justify-center items-center opacity-0 duration-700 p-3 shadow-pixel",
          {
            "opacity-100 -translate-y-10": state === "selected",
          },
        )}
      >
        <span className="text-2xl max-md:text-sm">
          {capitalize(pokemon.name)}
        </span>
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
          className={classnames(
            "relative z-20 group-hover:animate-[shake_1s_ease-in-out] duration-700",
            {
              "-translate-y-10 !animate-none": state === "selected",
            },
          )}
        />
        {/* shadow */}
        <span
          className={classnames(
            "w-1/2 transition-[width] opacity-40 h-4 z-10 rounded-[50%] bg-black blur-sm absolute -bottom-1 left-1/2 translate-x-[-50%]",
            {
              "w-2/3": state === "selected",
            },
          )}
        ></span>
        {/* Reveal pokemon here */}
        <span
          className={classnames(
            "absolute overflow-hidden transition-transform duration-700 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-0 h-0 group-hover:w-[80%] group-hover:h-[80%] rounded-full bg-white",
            {
              "w-[80%] h-[80%] -mt-10": state === "selected",
            },
          )}
        >
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
