import type { NextPage } from "next";
import { useStateContext } from "../context";
import { useEffect, useState } from "react";
import FundCard from "../components/FundCard";
import LoadingFundCard from "../components/LoadingFundCard";
import { Router, useRouter } from "next/router";

const DEFAULT_COUNT = 0;

const Home: NextPage = () => {
  const { contract, filteredCampaigns, isLoadingCampaigns } = useStateContext();
  const [lastCount, setLastCount] = useState(DEFAULT_COUNT);
  const router = useRouter();

  useEffect(() => {
    const newLastCount = localStorage.getItem("campaignCount");

    setLastCount(newLastCount ? +newLastCount : DEFAULT_COUNT);
  }, []);

  const handleNavigate = (campaign: any) => {
    router.push(`/campaigns/${campaign.id}`);
  };

  return (
    <div>
      <div>
        <h1 className="font-semibold text-[18px] text-white text-left">
          All Campaigns ({filteredCampaigns.length})
        </h1>

        <div className={`flex flex-wrap mt-[20px] gap-[26px]`}>
          {isLoadingCampaigns && (
            <>
              {Array(lastCount)
                .fill("")
                .map((_, i) => (
                  <LoadingFundCard key={i} />
                ))}
            </>
          )}

          {!isLoadingCampaigns && filteredCampaigns.length === 0 && (
            <p className="font-semibold text-[14px] leading-[30px] text-[#818183]">
              You have not created any campigns yet
            </p>
          )}

          {!isLoadingCampaigns &&
            filteredCampaigns.length > 0 &&
            filteredCampaigns.map((campaign: any) => (
              <FundCard
                key={campaign.id}
                {...campaign}
                onClick={() => handleNavigate(campaign)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
