"use client";

import { useState, useMemo, useEffect } from "react";
import { Pokemon } from "pokenode-ts";
import classNames from "classnames";
import DialogBox from "@/components/DialogBox";
// import pokeballImage from "@/assets/pokeball.png";
import Image from "next/image";

/* eslint-disable @next/next/no-img-element */
export type PokemonEncounterProps = {
  pokemon: Pokemon;
};

const CATCHING_DURATION = 3000;

const PokemonEncounter = ({ pokemon }: PokemonEncounterProps) => {
  const [catchingStatus, setCatchingStatus] = useState<
    "none" | "catching" | "cought"
  >("none");
  const { front_default: mainImage } = pokemon.sprites;
  const statusToDialogBoxMap = useMemo(() => {
    return {
      none: `A wild ${pokemon.name.toUpperCase()} has appeard!`,
      catching: "",
      cought: `${pokemon.name.toUpperCase()} has been added to your cart!`,
    };
  }, [pokemon]);

  useEffect(() => {
    if (catchingStatus === "catching") {
      setTimeout(() => {
        setCatchingStatus("cought");
      }, CATCHING_DURATION);
    }

    if (catchingStatus === "cought") {
      setTimeout(() => {
        setCatchingStatus("none");
      }, CATCHING_DURATION);
    }
  }, [catchingStatus]);

  return (
    <div className="w-full p-4 bg-white rounded-lg mb-4 border border-gray-900 flex flex-col items-end relative">
      <div className="absolute top-4 left-4 min-w-32">
        <h2 className="text-lg">
          {pokemon.name.toUpperCase()} #{pokemon.id}
        </h2>
        <div className="pokemon-data font-bold">${pokemon.id * 3}.00</div>
      </div>
      <div
        className="w-1/2 flex justify-center relative"
        style={{
          backgroundImage: `url("/images/grass.png")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "50%",
          backgroundPosition: "center bottom",
        }}
      >
        {mainImage && (
          <img
            className={classNames("transition-opacity delay-1000 w-1/2", {
              "opacity-0": catchingStatus !== "none",
            })}
            src={mainImage}
            alt={pokemon.name}
          />
        )}
        <Image
          className={classNames("pokeball", {
            "pokeball--thrown": catchingStatus !== "none",
          })}
          width={20}
          height={20}
          src="/images/pokeball.png"
          alt="Pokeball"
        />
      </div>
      <div
        className={classNames("w-full transition-opacity", {
          "opacity-0": catchingStatus === "catching",
        })}
      >
        <DialogBox
          onClick={() => setCatchingStatus("catching")}
          actionContent={catchingStatus === "none" ? "Catch it!" : undefined}
        >
          {statusToDialogBoxMap[catchingStatus]}
        </DialogBox>
      </div>
    </div>
  );
};

export default PokemonEncounter;
