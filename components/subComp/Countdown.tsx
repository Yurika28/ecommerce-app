'use client'
import React from "react";
import { useCountdown } from "./UseCountDown";

type Props = {
  targetDate: number;
};

const timeStyle  = "text-xs md:text-2xl font-bold bg-white px-3 sm:px-4 py-2 rounded-full shadow-sm"
const labelStyle = "text-[10px] sm:text-xs md:text-sm text-gray-500 mt-1 sm:mt-2 text-center"

const Countdown: React.FC<Props> = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  const units = [
    { value: days,    label: 'Day'  },
    { value: hours,   label: 'Hour' },
    { value: minutes, label: 'Min'  },
    { value: seconds, label: 'Sec'  },
  ]

  return (
    <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center mt-1 md:mt-4">
      {units.map(({ value, label }) => (
        <div key={label} className="flex flex-col items-center">
          <p className={timeStyle}>{String(value).padStart(2, '0')}</p>
          <p className={labelStyle}>{label}</p>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
