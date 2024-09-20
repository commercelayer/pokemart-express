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
  market: string;
};

type Authorization = AuthenticateReturn<"client_credentials">;

const getStoredAuthorization = (market: string): Authorization | null => {
  const authAsString = localStorage.getItem(`authorization-${market}`);

  if (authAsString != null) {
    const localAuth = JSON.parse(authAsString);
    return {
      ...localAuth,
      expires: new Date(localAuth.expires),
    };
  }

  return null;
};

const hasExpired = (time?: Date): boolean => {
  if (!time) {
    return true;
  }

  return time < new Date(Date.now());
};

const isValid = (auth: Authorization | null): auth is Authorization => {
  if (!auth) {
    return false;
  }

  return !hasExpired(auth.expires);
};

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
    const storedAuthIsValid = isValid(storedAuthorization);

    if (storedAuthIsValid) {
      setAuthorization(storedAuthorization);
      return;
    }

    const fetchAuthorization = async () => {
      const auth = await authenticate("client_credentials", {
        clientId,
        scope: `market:code:${market}`,
      });

      localStorage.setItem(`authorization-${market}`, JSON.stringify(auth));
      setAuthorization(auth);
    };

    fetchAuthorization();
  }, [clientId, market]);

  if (!authorization) {
    return null;
    // return <>{children}</>;
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
