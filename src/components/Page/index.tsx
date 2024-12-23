import Header from "@/components/Header";
import CommerceLayerAuth from "@/components/CommerceLayerAuth";

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clientId = process.env.NEXT_PUBLIC_CL_CLIENT_ID;
  const market = process.env.NEXT_PUBLIC_CL_MARKET;
  const slug = process.env.NEXT_PUBLIC_CL_SLUG;

  if (!clientId || !market || !slug) {
    throw new Error(
      "You need to set the NEXT_PUBLIC_CL_CLIENT_ID and NEXT_PUBLIC_CL_MARKET environment variables.",
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
