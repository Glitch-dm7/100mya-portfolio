import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Layout/Header";
import { fontVariables } from "@/lib/fonts";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn(fontVariables, "font-sans", geist.variable)}>
      <body className="antialiased">
        <Header />
        <main className="md:pt-[120px]">{children}</main>
      </body>
    </html>
  );
}
