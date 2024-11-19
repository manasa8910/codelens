import React from "react";

export default function CardWithProgress({ heading, score }) {
  // Softer gradient colors with reduced opacity
  const progressGradient = `linear-gradient(to right, rgba(248,113,113), rgba(251,191,36), rgba(52,211,153))`;

  return (
    <div className=" border rounded-2xl shadow-md px-4 py-2 flex flex-col w-full">
      {/* Card Heading */}
      <h3 className="text-gray-800 text-lg font-semibold mb-2">{heading}</h3>

      {/* Progress Bar */}
      <div className="relative w-full h-3 border bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r  from-purple-600  via-blue-500 to-green-400"
          style={{
            width: `${score * 10}%`,
          }}
        ></div>
      </div>

      {/* Score */}
      <p className="text-sm text-gray-600 mt-2">Score: {score} /10</p>
    </div>
  );
}
