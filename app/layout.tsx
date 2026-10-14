import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Layout/Header";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Portfolio | Somya ",
  description: "Shaping ideas into intuitive experiences with",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="antialiased">
        <Header />
        <main className="md:pt-[120px]">{children}</main>
      </body>
    </html>
  );
}
