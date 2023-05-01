import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  SmartContract,
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  useMetamask,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

interface StateContextProps {
  address: string | undefined;
  connect: () => void;
  contract: SmartContract | undefined;
  filter: string;
  setFilter: (text: string) => void;
  filteredCampaigns: any;
  isLoadingCampaigns: boolean;
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
  const [filter, setFilter] = useState("");
  const [allCampaigns, setAllCampaigns] = useState([] as any);

  const { data: rawCampaigns, isLoading: isLoadingCampaigns } = useContractRead(
    contract,
    "getCampaigns"
  );

  useEffect(() => {
    if (!rawCampaigns) return;
    const parsedCampaings = rawCampaigns.map((campaign: any, i: number) => ({
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

    setAllCampaigns(parsedCampaings);

    localStorage.setItem("campaignCount", String(rawCampaigns.length));
  }, [rawCampaigns]);

  const filteredCampaigns = allCampaigns.filter((campaign: any) => {
    return (
      campaign.title.toLowerCase().includes(filter.toLowerCase()) ||
      campaign.description.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        contract,
        filteredCampaigns,
        setFilter,
        filter,
        isLoadingCampaigns,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
