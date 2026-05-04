import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "retailOS · Lumen & Co. · Orchard Flagship",
  description:
    "retailOS booth demo by devx labs — AI-native operating system for omnichannel retail.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
