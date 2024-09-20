import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import CommerceLayerAuth from "@/components/CommerceLayerAuth";

export const metadata: Metadata = {
  title: "PokeMart Express",
  description: "A Commerce Layer experimental project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clientId = process.env.CL_CLIENT_ID;
  const market = process.env.CL_MARKET;
  const slug = process.env.CL_SLUG;

  if (!clientId || !market || !slug) {
    throw new Error(
      "You need to set the CL_CLIENT_ID and CL_MARKET environment variables.",
    );
  }

  return (
    <html lang="en">
      <body>
        <CommerceLayerAuth clientId={clientId} market={market} slug={slug}>
          <Header />
          {children}
        </CommerceLayerAuth>
      </body>
    </html>
  );
}
