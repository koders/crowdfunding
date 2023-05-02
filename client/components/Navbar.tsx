import { FiSearch } from "react-icons/fi";
import { useStateContext } from "../context";
import { useRouter } from "next/router";
import Image from "next/image";
import { ConnectWallet } from "@thirdweb-dev/react";
import { PAGES } from "../utils";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="flex w-full content-center items-center z-50">
      <div className="flex items-center">
        {/* LOGO */}
        <div className="w-12 md:w-20">
          <Image
            style={{ cursor: "pointer" }}
            src="/images/logo1.png"
            alt="logo"
            width="100"
            height="100"
            onClick={() => router.push("/")}
          />
        </div>
      </div>
      <div className="flex justify-between w-full">
        <Navigation />
        <div className="flex items-center w-full">
          <Search />
          <div className="min-w-[180px]">
            <ConnectWallet />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Navigation = () => {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-br from-[#212121] to-[#151515] md:bg-none w-full fixed bottom-0 left-0 md:relative flex justify-center md:justify-start z-50">
      <div className="flex p-2 md:py-4 md:mr-4 gap-8 md:ml-8">
        {PAGES.map((page) => {
          const isActive = router.pathname === page.link;
          return (
            <button
              className={`flex flex-col md:flex-row items-center transition-all p-1 md:p-0 px-2 md:px-4 rounded-md md:rounded-lg ${
                isActive
                  ? "md:bg-white md:text-black bg-white/30"
                  : "hover:bg-white hover:bg-opacity-10"
              }`}
              key={page.name}
              onClick={() => {
                router.push(page.link);
              }}
            >
              <page.icon size="20" />
              <div className="md:p-2 whitespace-nowrap text-[8px] md:text-base">
                {page.name}
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex items-center align-baseline"></div>
    </div>
  );
};

const Search = () => {
  const { setFilter, filter } = useStateContext();
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  return (
    <div className="mr-4 md:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-12 rounded-lg border border-gray-500 border-opacity-20">
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
  );
};

export default Navbar;
