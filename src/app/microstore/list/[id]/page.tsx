"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCommerceLayer } from "@commercelayer/react-components";

const MicrostorePage = () => {
  const { id: skuListId } = useParams() || {};
  const { sdkClient } = useCommerceLayer();

  const [skuCodes, setSkuCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const client = sdkClient();
    const fetchSkus = async () => {
      if (!skuListId) {
        console.error("Missing SKU list ID.");
        setLoading(false);
        return;
      }

      try {
        const skuList = await client?.sku_lists.retrieve(
          Array.isArray(skuListId) ? skuListId[0] : skuListId,
          {
            include: ["skus"],
          },
        );

        if (skuList?.skus) {
          setSkuCodes(skuList.skus.map((sku: any) => sku.code)); // Map to an array of SKU codes
        }
      } catch (error) {
        console.error("Error fetching SKU list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkus();
  }, [skuListId, sdkClient]);

  if (loading) {
    return <p>Loading SKUs...</p>;
  }

  return <code>{JSON.stringify(skuCodes)}</code>;

  if (skuCodes.length === 0) {
    return <p>No SKUs found for this list.</p>;
  }

  return (
    <div className="microstore-container">
      <h1>Pokémon Microstore</h1>
      {/* <SkusContainer skus={skuCodes}>
        <Skus>
          {(sku) => (
            <div key={sku.code} className="sku-item">
              <h2>{sku.name}</h2>
              <img
                src={sku.image_url || "/default-pokemon.png"}
                alt={sku.name}
              />
              <p>Price: {sku.formatted_price}</p>
            </div>
          )}
        </Skus>
      </SkusContainer> */}
    </div>
  );
};

export default MicrostorePage;
