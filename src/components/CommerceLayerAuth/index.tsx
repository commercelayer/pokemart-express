"use client";

import { ReactNode, useEffect, useState } from "react";
import { authenticate, AuthenticateReturn } from "@commercelayer/js-auth";
import {
  CommerceLayer,
  OrderContainer,
  OrderStorage,
} from "@commercelayer/react-components";

export type CommerceLayerAuthProps = {
  children: ReactNode;
  clientId: string;
  slug: string;
  market: number;
};

type Authorization = AuthenticateReturn<"client_credentials">;

const getStoredAuthorization = (market: number): Authorization | null => {
  const authAsString = localStorage.getItem(`authorization-${market}`);

  if (authAsString != null) {
    return JSON.parse(authAsString);
  }

  return null;
};

const hasExpired = (time?: Date): boolean =>
  time === undefined || time < new Date(Date.now());

const isValid = (auth: Authorization | null): auth is Authorization =>
  auth != null ? !hasExpired(auth.expires) : false;

const CommerceLayerAuth = ({
  children,
  clientId,
  slug,
  market,
}: CommerceLayerAuthProps) => {
  const [authorization, setAuthorization] = useState<Authorization | null>(
    null,
  );

  useEffect(() => {
    const storedAuthorization = getStoredAuthorization(market);

    if (isValid(storedAuthorization)) {
      setAuthorization(storedAuthorization);
      return;
    }

    const fetchAuthorization = async () => {
      const auth = await authenticate("client_credentials", {
        clientId,
        scope: `market:${market}`,
      });

      localStorage.setItem(`authorization-${market}`, JSON.stringify(auth));
      setAuthorization(auth);
    };

    fetchAuthorization();
  }, [clientId, market]);

  if (!authorization) {
    return <>{children}</>;
  }

  return (
    <CommerceLayer
      accessToken={authorization.accessToken}
      endpoint={`https://${slug}.commercelayer.io`}
    >
      <OrderStorage persistKey={`order-${market}`}>
        {/* @ts-expect-error: OrderContainer children do not align to ReactNode type. */}
        <OrderContainer>{children}</OrderContainer>
      </OrderStorage>
    </CommerceLayer>
  );
};

export default CommerceLayerAuth;
