/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import TypeTag, { isPokemonType } from "../TypeTag";
import { useMemo } from "react";
import { Price, PricesContainer } from "@commercelayer/react-components";

export type PokemonCardProps = {
  title: string;
  subtitle: string;
  types: string[];
  href: string;
  imageUrl: string | null;
  type?: "default" | "compact";
  sku: string;
};

const PokemonCard: React.FC<PokemonCardProps> = ({
  title,
  subtitle,
  types,
  href,
  imageUrl,
  type = "default",
  sku,
}) => {
  const imageNode = useMemo(() => {
    if (!imageUrl) {
      return null;
    }

    if (type === "compact") {
      return (
        <img src={imageUrl} alt={title} className="object-contain h-full" />
      );
    }

    return (
      <div
        style={{
          backgroundImage: `url("/images/card-background.jpg")`,
        }}
        className="bg-center w-full h-48 flex justify-center items-center"
      >
        <img src={imageUrl} alt={title} className="object-contain h-full" />
      </div>
    );
  }, [imageUrl, title, type]);

  return (
    <Link
      href={href}
      className="shadow-lg hover:shadow-xl border-white border-8 overflow-hidden text-gray-600"
    >
      {type === "default" && imageNode}
      <div className="p-4">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
          {type === "compact" && imageNode}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-wrap gap-1">
            {types.map((type, id) => {
              if (!isPokemonType(type)) {
                return null;
              }

              return <TypeTag key={id} type={type} />;
            })}
          </div>
          <span className="text-xl font-bold flex items-center gap-2">
            <PricesContainer>
              <Price skuCode={sku} />
            </PricesContainer>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
