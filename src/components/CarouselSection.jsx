import React, { useState } from "react";
import { LuClipboard, LuStar } from "react-icons/lu";

const CarousalSection = () => {
  const [position, setPosition] = useState(1); // Default middle position

  // Function to go to the next item
  const goRight = () => {
    setPosition((prevPosition) =>
      prevPosition === items.length ? 1 : prevPosition + 1
    );
  };

  const items = [
    {
      id: 1,
      title: "Autopilot-software-development",
      createdAt: "2024-10-01",
      totalIssues: 12,
      score: 8,
    },
    {
      id: 2,
      title: "Autonomous-drone",
      createdAt: "2024-10-15",
      totalIssues: 5,
      score: 6,
    },
    {
      id: 3,
      title: "Dronekit-python",
      createdAt: "2024-10-05",
      totalIssues: 8,
      score: 9,
    },
    {
      id: 4,
      title: "Python-robotics",
      createdAt: "2024-09-20",
      totalIssues: 20,
      score: 5,
    },
  ];

  return (
    <div className="settings-container">
      {/* Only Right Arrow */}
      <div className="arrows">
        <button onClick={goRight} className="arrow right">
          →
        </button>
      </div>

      {/* Carousel */}
      <div className="carousel">
        {items.map((item, idx) => {
          const offset = idx + 1;
          const r = position - offset;
          const absR = Math.max(Math.abs(r), r);

          return (
            <div
              key={item.id}
              className="bg-white rounded-lg border shadow-lg p-4 flex flex-col cursor-pointer item"
              style={{
                "--r": r,
                "--abs": absR,
              }}
            >
              <h3 className="text-xl sm:text-lg font-semibold">{item.title}</h3>
              <div className="mb-3 text-sm sm:text-base">
                <span>
                  {Math.floor(
                    (new Date() - new Date(item.createdAt)) / (1000 * 3600 * 24)
                  )}{" "}
                  days ago
                </span>
              </div>

              <div className="w-full h-2 mb-3 rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-green-400"
                  style={{ width: `${item.score * 10}%` }}
                ></div>
              </div>

              <div className="flex items-center gap-2 mb-1">
                <LuStar size={18} />
                <span className="text-sm sm:text-base">
                  Total score: {item.score} / 10
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <LuClipboard size={18} />
                <span className="text-sm sm:text-base">
                  Total issues: {item.totalIssues}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CarousalSection;
