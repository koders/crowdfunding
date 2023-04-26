import React from "react";

// import { tagType, thirdweb } from '../assets';
import { daysLeft } from "../utils";

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  imageUrl,
  handleClick,
}: any) => {
  const remainingDays = daysLeft(deadline);

  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer overflow-hidden transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
      onClick={handleClick}
    >
      <img
        src={imageUrl}
        alt="fund"
        className="w-full h-[158px] object-cover"
      />

      <div className="flex flex-col p-4">
        <div className="block">
          <h3 className="font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="text-xs mt-[5px] font-normal text-[#808191] text-left leading-[18px]">
            {description.substring(0, 200)} {description.length > 200 && "..."}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {amountCollected}
            </h4>
            <p className="mt-[3px] font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Raised of {target} FTM
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Days Left
            </p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img
              src="https://cdn.hashnode.com/res/hashnode/image/upload/v1649094600998/OTyYSo19z.png"
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="flex-1 font-normal text-[12px] text-[#808191] truncate">
            by <span className="text-[#b2b3bd]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
