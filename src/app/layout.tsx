import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PokeMart Express",
  description: "A Commerce Layer experimental project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
