import Header from "@/components/Header";
import CommerceLayerAuth from "@/components/CommerceLayerAuth";

const clientId = process.env.CL_CLIENT_ID;
const market = process.env.CL_MARKET;
const slug = process.env.CL_SLUG;

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!clientId || !market || !slug) {
    throw new Error(
      "You need to set the CL_CLIENT_ID and CL_MARKET environment variables.",
    );
  }

  return (
    <>
      <CommerceLayerAuth clientId={clientId} market={market} slug={slug}>
        <Header />
        {children}
      </CommerceLayerAuth>
    </>
  );
}
