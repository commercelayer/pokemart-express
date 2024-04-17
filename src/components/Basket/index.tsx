/* eslint-disable @next/next/no-img-element */
import { CartLink } from "@commercelayer/react-components";
import { useMemo } from "react";

export type BasketProps = {
  items?: number;
};

const Basket = ({ items = 0 }: BasketProps) => {
  const imageSource = useMemo(() => {
    return items === 0 ? "/images/basket-empty.png" : "/images/basket-full.png";
  }, [items]);

  return (
    <CartLink
      className="w-7 inline-block"
      label={<img src={imageSource} className="w-full" alt="Basket" />}
    />
  );
};

export default Basket;
