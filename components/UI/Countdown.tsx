'use client'
import React from "react";
import { useCountdown } from "../UI/UseCountDown";

type Props = {
  targetDate: number;
};

const Countdown: React.FC<Props> = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  const timeStyle =
  "text-xs md:text-2xl font-bold bg-white px-3 sm:px-4 py-2 rounded-full shadow-sm";
  const labelStyle =
  "text-[10px] sm:text-xs md:text-sm text-gray-500 mt-1 sm:mt-2 text-center";

  return (
    <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center mt-1 md:mt-4">
      <div className="flex flex-col items-center">
        <p className={timeStyle}>{String(days).padStart(2, "0")}</p>
        <p className={labelStyle}>Day</p>
      </div>
      <div className="flex flex-col items-center">
        <p className={timeStyle}>{String(hours).padStart(2, "0")}</p>
        <p className={labelStyle}>Hour</p>
      </div>
      <div className="flex flex-col items-center">
        <p className={timeStyle}>{String(minutes).padStart(2, "0")}</p>
        <p className={labelStyle}>Min</p>
      </div>
      <div className="flex flex-col items-center">
        <p className={timeStyle}>{String(seconds).padStart(2, "0")}</p>
        <p className={labelStyle}>Sec</p>
      </div>
    </div>
  );

};

export default Countdown;
