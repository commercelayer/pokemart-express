import AlertBox from "@/components/AlertBox";
import Hero from "@/components/Hero";
import PokemonGrid from "@/components/PokemonGrid";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Hero
        title="PokéMart Express"
        subtitle="Explore the Ultimate Collection of Pokémon - Catch 'Em All Here!"
        backgroundImage="/images/hero.webp"
      />
      <div className="max-w-screen-xl mx-auto p-10">
        <AlertBox
          type="info"
          title="Welcome to PokéMart Express!"
          body={
            <>
              <p>
                Welcome to PokéMart Express, where we are pushing the boundaries
                of e-commerce by demonstrating that you can commercify anything
                – even Pokémon! In this experimental project, we are showcasing
                the versatility of Commerce Layer, proving that you can build a
                fully functional online store without the need for a traditional
                CMS. Dive into our digital playground, where every pixel is a
                testament to the endless possibilities of headless commerce.
              </p>
              <p>
                Please note that PokéMart Express is a test environment, and no
                actual purchases can be made. So feel free to explore, collect,
                and interact with our Pokémon-themed products, all while
                discovering the power of headless commerce. Join us on this
                exciting journey as we redefine the future of online shopping,
                one Poké Ball at a time!
              </p>
              <div className="text-right">
                <Link
                  href="https://github.com"
                  className="button align-self-end"
                >
                  Checkout the repo on GitHub
                </Link>
              </div>
            </>
          }
        />

        <PokemonGrid
          type="compact"
          pokemonNames={[
            "pikachu",
            "charmander",
            "squirtle",
            "bulbasaur",
            "eevee",
            "onix",
          ]}
        />
      </div>
    </main>
  );
}
