import React, { useState } from "react";

const Settings = () => {
  const [position, setPosition] = useState(1); // Default middle position
  const items = [
    {
      id: 1,
      name: "Sally Sharpe",
      occupation: "Marketing Admin",
      testimonial:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, suscipit?",
    },
    {
      id: 2,
      name: "Michael John",
      occupation: "Cybersecurity Engineer",
      testimonial:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, dolore.",
    },
    {
      id: 3,
      name: "Mikayla Eddie",
      occupation: "Software Engineer",
      testimonial:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, temporibus?",
    },
    {
      id: 4,
      name: "Eve Smith",
      occupation: "UI/UX Designer",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, beatae?",
    },
    {
      id: 5,
      name: "Luke Maxwell",
      occupation: "System Architect",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, tempore.",
    },
  ];

  // Function to go to the next item
  const goRight = () => {
    setPosition((prevPosition) =>
      prevPosition === items.length ? 1 : prevPosition + 1
    );
  };

  const sampleProjects = [
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
              className="item"
              style={{
                "--r": r,
                "--abs": absR,
              }}
            >
              <div />
              {item.id}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Settings;
