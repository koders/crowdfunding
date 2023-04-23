import type { NextPage } from "next";
import App from "./_app";
import { useStateContext } from "../context";
import { useEffect, useState } from "react";
import FundCard from "../components/FundCard";

const Home: NextPage = () => {
  const { contract, getCampaigns } = useStateContext();
  const [campaigns, setCampaigns] = useState<any>([]);
  const isLoading = false;
  useEffect(() => {
    if (!contract) {
      return;
    }
    const fetch = async () => {
      setCampaigns(await getCampaigns());
    };

    fetch();
  }, [contract]);
  return (
    <div>
      <div>
        <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
          All Campaigns ({campaigns.length})
        </h1>

        <div className="flex flex-wrap mt-[20px] gap-[26px]">
          {isLoading && (
            <img
              // src={loader}
              alt="loader"
              className="w-[100px] h-[100px] object-contain"
            />
          )}

          {!isLoading && campaigns.length === 0 && (
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
              You have not created any campigns yet
            </p>
          )}

          {!isLoading &&
            campaigns.length > 0 &&
            campaigns.map((campaign: any) => (
              <FundCard
                key={campaign.id}
                {...campaign}
                // handleClick={() => handleNavigate(campaign)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
