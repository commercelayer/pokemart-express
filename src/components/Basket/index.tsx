/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useMemo } from "react";

export type BasketProps = {
  items?: number;
  href: string;
};

const Basket = ({ items = 0, href }: BasketProps) => {
  const imageSource = useMemo(() => {
    return items === 0 ? "/images/basket-empty.png" : "/images/basket-full.png";
  }, [items]);

  return (
    <Link href={href} className="w-7 inline-block">
      <img src={imageSource} className="w-full" alt="Basket" />
    </Link>
  );
};

export default Basket;
