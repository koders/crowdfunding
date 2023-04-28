import { FiGrid, FiLogOut, FiPlus, FiSearch } from "react-icons/fi";
import { useStateContext } from "../context";
import { useRouter } from "next/router";
import Image from "next/image";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useState } from "react";

const Navbar = () => {
  const { connect, address, setFilter, filter } = useStateContext();
  const router = useRouter();

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

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
            const isActive = router.pathname === page.link;
            return (
              <div
                className={`flex items-center transition-all px-4 rounded-lg ${
                  isActive
                    ? "bg-white text-black"
                    : "hover:bg-white hover:bg-opacity-10"
                }`}
                key={page.name}
              >
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
        <div className="mr-4 lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-12 rounded-lg border border-gray-500 border-opacity-20">
          <input
            type="text"
            placeholder="Search for campaigns"
            className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[rgba(255,255,255,0.2)] bg-transparent outline-none"
            value={filter}
            onChange={handleFilter}
          />

          <div className="w-12 h-full flex justify-center items-center cursor-pointer transition-all text-[rgba(255,255,255,0.8)] hover:text-white">
            <FiSearch />
          </div>
        </div>

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
