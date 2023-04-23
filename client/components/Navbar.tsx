import { FiGrid, FiLogOut, FiPlus } from "react-icons/fi";
import { useStateContext } from "../context";
import { useRouter } from "next/router";
import Image from "next/image";
import { ConnectWallet } from "@thirdweb-dev/react";

const Navbar = () => {
  const { connect, address } = useStateContext();
  const router = useRouter();

  return (
    <div className="w-full flex content-center justify-between items-center">
      <div className="flex items-center">
        {/* LOGO */}
        <div className="">
          <Image
            style={{ cursor: "pointer" }}
            src="/images/logo1.png"
            alt="logo"
            width="100"
            height="100"
            onClick={() => router.push("/")}
          />
        </div>
        <div className="flex gap-8 ml-8">
          {PAGES.map((page) => {
            return (
              <div className="flex items-center" key={page.name}>
                <page.icon size="20" />
                <button
                  className="p-2 rounded-lg"
                  onClick={() => {
                    router.push(page.link);
                  }}
                >
                  {page.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center align-baseline">
        <ConnectWallet />
      </div>
    </div>
  );
};

export const PAGES = [
  {
    name: "Dashboard",
    icon: FiGrid,
    link: "/",
  },
  {
    name: "New Campaign",
    icon: FiPlus,
    link: "/create-campaign",
  },
];

export default Navbar;
