import Image from "next/image";
import { useRouter } from "next/router";
import { FiGrid, FiLogOut, FiPlus } from "react-icons/fi";

export const PAGES = [
  {
    name: "dashboard",
    icon: FiGrid,
    link: "/",
  },
  {
    name: "campaign",
    icon: FiPlus,
    link: "/create-campaign",
  },
  // {
  //   name: "payment",
  //   imgUrl: "/images/payment.png",
  //   link: "/",
  //   disabled: true,
  // },
  // {
  //   name: "withdraw",
  //   imgUrl: "/images/withdraw.png",
  //   link: "/",
  //   disabled: true,
  // },
  // {
  //   name: "profile",
  //   imgUrl: "/images/profile.png",
  //   link: "/profile",
  // },
];

interface IconProps {
  styles: string;
  name: string;
  imgUrl: string;
  isActive: boolean;
  disabled: boolean;
  onClick: () => void;
}

const SidebarIcon = ({
  styles,
  name,
  imgUrl,
  isActive,
  disabled,
  onClick,
}: IconProps) => (
  <div
    className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer border border-gray-600 hover:border-gray-500 ${
      isActive && ""
    } ${styles}`}
  >
    <Image src={imgUrl} alt="logo" width="144" height="144" />
  </div>
);

const Sidebar = () => {
  const router = useRouter();
  return (
    <div>
      <div className="sticky">
        <Image
          src="/images/logo1.png"
          alt="logo"
          width="100"
          height="100"
          onClick={() => router.push("/")}
        />
      </div>
      <div className="rounded-lg bg-gray-800">
        {PAGES.map((page) => {
          return (
            <div
              key={page.name}
              className="w-16 h-16 rounded-lg overflow-hidden cursor-pointer border border-gray-600 hover:border-gray-500"
              onClick={() => {
                router.push(page.link);
              }}
            >
              {<page.icon size="2rem" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
