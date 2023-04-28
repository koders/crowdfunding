import React, { ReactNode } from "react";

const CountBox = ({ title, value }: { title: string; value: ReactNode }) => {
  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4 className="font-bold text-[30px] text-white p-3 bg-box rounded-t-[10px] w-full text-center truncate">
        {value}
      </h4>
      <p className="font-normal text-[16px] text-gray-400 bg-[rgba(255,255,255,0.1)] px-3 py-2 w-full rouned-b-[10px] text-center">
        {title}
      </p>
    </div>
  );
};

export default CountBox;
