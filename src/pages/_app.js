import Navbar from "@/components/UI/Navbar";
import { UserContextProvider } from "@/context/userContext";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </UserContextProvider>
  );;
}
