import { ReactNode, createContext, useContext } from "react";
import {
  SmartContract,
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  useMetamask,
} from "@thirdweb-dev/react";
import { IForm } from "../types";
import { ethers } from "ethers";

interface StateContextProps {
  address: string | undefined;
  connect: () => void;
  contract: SmartContract | undefined;
  publishCampaign: ({}: IForm) => void;
  getCampaigns: () => Promise<[SmartContract]>;
}

const StateContext = createContext({} as StateContextProps);

export const StateContextProvider = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const { contract } = useContract(
    "0xC0Bb8C444AA89D5F2212b77F38279c3633E4d21E"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  ) as any;

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form: IForm) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.imageUrl,
        ],
      });

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract?.call("getCampaigns");

    const parsedCampaings = campaigns.map((campaign: any, i: number) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      imageUrl: campaign.image,
      id: i,
    }));

    return parsedCampaings;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        contract,
        publishCampaign,
        getCampaigns,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
