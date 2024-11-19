// Dashboard.js
import React from "react";

import {
  LuAlertCircle,
  LuAlertTriangle,
  LuClipboardCheck,
  LuXCircle,
} from "react-icons/lu";
import AreaChartSection from "../components/AreaChartSection";
import CarouselSection from "../components/CarouselSection";
import MetricCard from "../components/MetricCard";
import PieChartSection from "../components/PieChartSection";

const Dashboard = () => {
  const metricCards = [
    {
      icon: <LuAlertTriangle size={30} />,
      heading: "Total Issues",
      subheading: "Cumulative issues till date",
      value: "5k",
    },
    {
      icon: <LuClipboardCheck size={30} />,
      heading: "Conventions",
      subheading: "Opportunities",
      value: "456",
    },
    {
      icon: <LuAlertCircle size={30} />,
      heading: "Warnings",
      subheading: "Weakness",
      value: "789",
    },
    {
      icon: <LuXCircle size={30} />,
      heading: "Errors",
      subheading: "Threats",
      value: "954",
    },
  ];

  const pieData = [
    { name: "Consistent", value: 100, color: "#F87171" },
    { name: "Intentional", value: 500, color: "#FBBF24" },
    { name: "Adaptable", value: 250, color: "#34D399" },
    { name: "Responsible", value: 550, color: "#34D399" },
  ];
  const pieData2 = [
    { name: "Reliability", value: 200, color: "#F87171" },
    { name: "Maintainability", value: 600, color: "#FBBF24" },
    { name: "Vulnerabilities", value: 450, color: "#34D399" },
  ];

  const chartData = [
    { month: "Jan", value: 50 },
    { month: "Feb", value: 60 },
    { month: "Mar", value: 70 },
    { month: "Apr", value: 85 },
    { month: "May", value: 95 },
    { month: "Jun", value: 120 },
    { month: "Jul", value: 100 },
  ];

  return (
    <div className="w-full min-h-[95vh] my-[2.5vh] mx-[2vw] sm:ml-[24vw] flex flex-col">
      {/* Metric Cards */}
      <div className="w-full text-gray-700 text-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        {metricCards.map((card, index) => (
          <MetricCard
            key={index}
            icon={card.icon}
            heading={card.heading}
            subheading={card.subheading}
            value={card.value}
          />
        ))}
      </div>

      <div className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 w-full h-full">
          <div className="bg-white rounded-3xl border shadow-lg p-4 flex min-h-72">
            <AreaChartSection chartData={chartData} />
          </div>
          <div className="bg-[#8c52ff] rounded-3xl  shadow-lg p-4 flex flex-col min-h-72 overflow-hidden">
            <h2 className="text-center text-white font-semibold">
              Recent Projects
            </h2>
            <CarouselSection />
          </div>
          <div className="bg-white rounded-3xl border shadow-lg p-4 flex min-h-72">
            <PieChartSection
              pieData={pieData}
              title={"Total Types of Issues"}
              totalValue={1400}
            />
          </div>
          <div className="bg-white rounded-3xl border shadow-lg p-4 flex min-h-72">
            <PieChartSection
              pieData={pieData2}
              title={"Total Clean Code Attributes"}
              totalValue={1250}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
