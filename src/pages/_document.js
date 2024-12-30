import { Html, Head, Main, NextScript } from "next/document";
import Navbar from "@/components/UI/Navbar";
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased \">
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}