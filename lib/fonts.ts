import localFont from "next/font/local";

export const aloeveraSans = localFont({
  src: [
    {
      path: "../public/fonts/Aloevera Sans Font/Aloevera-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
