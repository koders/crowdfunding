import React from "react";

// import { tagType, thirdweb } from '../assets';
import { daysLeft } from "../utils";

const LoadingFundCard = ({
}: any) => {
  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] overflow-hidden"
    >
      <div className="animate-pulse">

      <div className="h-40 bg-slate-700"></div>

      <div className="flex flex-col p-4">
        <div className="h-2 bg-slate-700 rounded"></div>
        <div className="h-2 bg-slate-700 rounded mt-6"></div>
        <div className="h-2 bg-slate-700 rounded mt-3"></div>
        <div className="h-2 bg-slate-700 rounded mt-3"></div>
        <div className="flex gap-4">
          <div className="h-2 bg-slate-700 rounded mt-6 w-1/2"></div>
          <div className="h-2 bg-slate-700 rounded mt-6 w-1/2"></div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <div className="rounded-full bg-slate-700 h-8 w-8 shrink-0"></div>
          <div className="h-2 bg-slate-700 rounded w-full"></div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default LoadingFundCard;
