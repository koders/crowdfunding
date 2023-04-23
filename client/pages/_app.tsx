import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";

import { Sidebar, Navbar } from "../components";
import { AppProps } from "next/app";
import { StateContextProvider } from "../context";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const ACTIVE_CHAIN = "fantom-testnet";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={ACTIVE_CHAIN}>
      <StateContextProvider>
        <div className="flex h-screen p-4 w-full bg-gradient-to-br from-[rgb(19, 20, 23)] to-[rgb(29, 30, 33)]">
          {/* <Sidebar /> */}
          <div className="w-full">
            <Navbar />
            <div className="p-8 pt-12">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </StateContextProvider>
    </ThirdwebProvider>
  );
}

export default App;
