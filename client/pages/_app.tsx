import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Navbar } from "../components";
import { AppProps } from "next/app";
import { StateContextProvider } from "../context";
import { ToastContainer } from "react-toastify";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const ACTIVE_CHAIN = "fantom-testnet";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={ACTIVE_CHAIN}>
      <StateContextProvider>
        <div className="flex justify-center h-screen p-4 bg-gradient-to-br from-[rgb(19, 20, 23)] to-[rgb(29, 30, 33)]">
          <div className="md:max-w-[1080px]">
            <Navbar />
            <div className="w-full p-4 md:p-8 pb-32">
              <ToastContainer />
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </StateContextProvider>
    </ThirdwebProvider>
  );
}

export default App;
