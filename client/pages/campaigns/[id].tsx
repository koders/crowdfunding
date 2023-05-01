import { NextPage } from "next";
import { useRouter } from "next/router";
import { useStateContext } from "../../context";
import { useEffect, useState } from "react";
import { useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { calculateBarPercentage, daysLeft } from "../../utils";
import CountBox from "../../components/CountBox";
import { ethers } from "ethers";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

interface Props {}

const Campaign: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  const { contract, address } = useStateContext();
  const { data: campaign, isLoading: isLoadingCampaign } = useContractRead(
    contract,
    "campaigns",
    [id]
  );
  const { data: donations, isLoading: isLoadingDonations } = useContractRead(
    contract,
    "getDonators",
    [id]
  );

  const [amount, setAmount] = useState("");

  const { mutateAsync: donateToCampaign, isLoading: isLoadingDonate } =
    useContractWrite(contract, "donateToCampaign");

  const handleDonate = async () => {
    try {
      const data = await donateToCampaign({
        args: [id],
        overrides: { value: ethers.utils.parseEther(amount) },
      });
      console.info("contract call successs", data);
      toast.success("Thank you for donating!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      router.push("/");
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  if (!campaign)
    return (
      <>
        <div className="flex items-center absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 z-20">
          <Spinner /> Loading...
        </div>
      </>
    );

  const remainingDays = daysLeft(campaign?.deadline.toNumber());

  const donators = donations[0].map((address: string, i: number) => ({
    address,
    amount: donations[1][i],
  }));

  return (
    <div>
      {isLoadingDonate && (
        <>
          <div className="flex items-center absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 z-20">
            <Spinner /> Transaction in progress...
          </div>
          <div className="fixed left-0 top-0 w-full h-full backdrop-blur-sm bg-black/30 z-10"></div>
        </>
      )}
      <div>
        <h1 className="text-3xl font-bold text-center">{campaign.title}</h1>
        <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
          <div className="flex-1 flex-col">
            <img
              src={campaign.image}
              alt="campaign"
              className="w-full h-[410px] object-cover rounded-xl"
            />
            <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
              <div
                className="absolute h-full bg-[#4acd8d]"
                style={{
                  width: `${calculateBarPercentage(
                    campaign.target,
                    campaign.amountCollected
                  )}%`,
                  maxWidth: "100%",
                }}
              ></div>
            </div>
          </div>

          <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
            <CountBox title="Days Left" value={remainingDays} />
            <CountBox
              title={`Raised of ${ethers.utils.formatEther(
                campaign.target.toString()
              )}`}
              value={ethers.utils.formatEther(
                campaign.amountCollected.toString()
              )}
            />
            <CountBox title="Total Backers" value={donators.length} />
          </div>
        </div>

        <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
          <div className="flex-[2] flex flex-col gap-[40px]">
            <div>
              <h4 className="font-semibold text-[18px] text-white uppercase">
                Creator
              </h4>

              <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                  <img
                    src="https://cdn.hashnode.com/res/hashnode/image/upload/v1649094600998/OTyYSo19z.png"
                    alt="user"
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-[14px] text-white break-all">
                    {campaign.owner}
                  </h4>
                  <p className="mt-[4px] font-normal text-[12px] text-[#808191]">
                    10 Campaigns
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[18px] text-white uppercase">
                Story
              </h4>

              <div className="mt-[20px]">
                <p className="font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  {campaign.description}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[18px] text-white uppercase">
                Donators
              </h4>

              <div className="mt-[20px] flex flex-col gap-4">
                {donators.length > 0 ? (
                  donators.map((item: any, index: any) => (
                    <div
                      key={`${item.donator}-${index}`}
                      className="flex justify-between items-center gap-4"
                    >
                      <p className="font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">
                        {index + 1}. {item.address}
                      </p>
                      <p className="font-normal text-[16px] text-[#808191] leading-[26px] break-ll">
                        {ethers.utils.formatEther(item.amount.toString())}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    No donators yet. Be the first one!
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-[18px] text-white uppercase">
              Fund
            </h4>

            <div className="mt-[20px] flex flex-col p-4 bg-box rounded-[10px]">
              <p className="fount-medium text-[20px] leading-[30px] text-center">
                Fund the campaign
              </p>
              <div className="mt-[30px]">
                <input
                  type="number"
                  placeholder="FTM 0.1"
                  step="0.01"
                  className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border border-gray-500 bg-transparent text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <div className="my-[20px] p-4 bg-box rounded-[10px]">
                  <h4 className="font-semibold text-[14px] leading-[22px] text-white">
                    Back it because you believe in it.
                  </h4>
                  <p className="mt-[20px] leading-[22px] text-gray-400">
                    Support the project for no reward, just because it speaks to
                    you.
                  </p>
                </div>

                <Button
                  theme="purple"
                  className="w-full"
                  onClick={handleDonate}
                >
                  Fund Campaign
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaign;
