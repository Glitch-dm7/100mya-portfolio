import {
  Annie_Use_Your_Telescope,
  Montserrat,
  Nanum_Myeongjo,
  Roboto_Flex,
  Spicy_Rice,
} from "next/font/google";

export const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-roboto-flex",
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-montserrat",
  display: "swap",
});

export const nanumMyeongjo = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-nanum",
  display: "swap",
});

export const annie = Annie_Use_Your_Telescope({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-annie",
  display: "swap",
});

export const spicyRice = Spicy_Rice({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-spicy-rice",
  display: "swap",
});

export const fontVariables = [
  robotoFlex.variable,
  montserrat.variable,
  nanumMyeongjo.variable,
  annie.variable,
  spicyRice.variable,
].join(" ");
