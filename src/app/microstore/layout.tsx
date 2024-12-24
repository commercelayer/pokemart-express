"use client";

import { useSearchParams } from "next/navigation";
import {
  CommerceLayer,
  OrderContainer,
  OrderStorage,
} from "@commercelayer/react-components";

const slug = process.env.NEXT_PUBLIC_CL_SLUG;
const market = process.env.NEXT_PUBLIC_CL_MARKET;

export default function MicrostoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();
  const accessToken = searchParams?.get("accessToken");

  if (!accessToken || !slug || !market) {
    throw new Error(
      "Missing accessToken, slug, or market in the URL/environment.",
      {
        cause: `accessToken: ${Boolean(accessToken)}, slug: ${Boolean(
          slug,
        )}, market: ${Boolean(market)}`,
      },
    );
  }

  const persistKey = `order-${market}`;

  return (
    <CommerceLayer
      accessToken={accessToken}
      endpoint={`https://${slug}.commercelayer.io`}
    >
      <OrderStorage persistKey={persistKey}>
        {/* @ts-expect-error: OrderContainer children do not align to ReactNode type. */}
        <OrderContainer>{children}</OrderContainer>
      </OrderStorage>
    </CommerceLayer>
  );
}
