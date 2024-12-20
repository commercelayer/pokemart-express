"use client";

import { useSearchParams } from "next/navigation";
import {
  CommerceLayer,
  OrderContainer,
  OrderStorage,
} from "@commercelayer/react-components";

export default function MicrostoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();
  const accessToken = searchParams?.get("accessToken");
  const slug = process.env.NEXT_PUBLIC_CL_SLUG;
  const market = process.env.NEXT_PUBLIC_CL_MARKET;

  if (!accessToken || !slug || !market) {
    throw new Error(
      "Missing access token, slug, or market in the URL/environment.",
    );
  }

  // @note: I don't think I should keep this??
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
