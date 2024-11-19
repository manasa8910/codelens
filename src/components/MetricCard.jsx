import React from "react";

const MetricCard = ({ icon, heading, subheading, value }) => {
  return (
    <div className="bg-white flex flex-col xs:flex-row ms:flex-col md:flex-row items-center rounded-3xl p-3 xs:p-4 ms:p-5 shadow-lg min-h-[12vh] justify-around w-full text-base md:text-lg lg:text-xl">
      {/* Icon on the left */}
      <div className="bg-gray-100 h-10 w-10 xs:h-12 xs:w-12 ms:h-14 ms:w-14 flex items-center justify-center rounded-full p-2">
        <div className="text-[#510DBC]">{icon}</div>
      </div>

      {/* Heading and subheading */}
      <div className="text-center ms:text-center md:text-left mt-3 xs:mt-4 ms:mt-2 md:mt-0 xs:ml-3 ms:ml-0 md:ml-4">
        <p className="font-bold text-sm xs:text-base md:text-lg">{heading}</p>
        <p className="text-xs xs:text-sm ms:text-base text-gray-600">
          {subheading}
        </p>
      </div>

      {/* Metric value */}
      <div className="text-xl xs:text-2xl ms:text-3xl font-semibold mt-3 xs:mt-4 ms:mt-2 md:mt-0 text-[#510DBC]">
        {value}
      </div>
    </div>
  );
};

export default MetricCard;
