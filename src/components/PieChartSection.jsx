import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PieChartSection = ({ pieData, title, totalValue }) => {
  const [centerText, setCenterText] = useState({
    name: "Total",
    value: totalValue,
  });

  // Define shades of blue/purple for the chart
  const colorShades = [
    "#5A67D8", // Blue
    "#4C51BF", // Dark Blue
    "#6B46C1", // Purple
    "#7F4FB0", // Light Purple
    "#9F7AEA", // Soft Purple
  ];

  return (
    <>
      {/* Chart Section */}
      <div className="flex-1 flex items-center justify-center relative w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Heading Inside Chart */}
            <Legend
              verticalAlign="top"
              content={() => (
                <div className="flex items-center justify-center  text-gray-600 font-semibold">
                  {title}
                </div>
              )}
            />

            {/* Donut Chart */}
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              fill="#8884d8"
              paddingAngle={5}
              cornerRadius={10} // Rounded corners
              onMouseEnter={(data) => setCenterText(data)}
              onMouseLeave={() =>
                setCenterText({ name: "Total", value: totalValue })
              }
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colorShades[index % colorShades.length]} // Apply shades of blue/purple
                />
              ))}
            </Pie>

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                border: "1px solid #babdc4",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
              labelStyle={{ fontSize: "14px", color: "#6B7280" }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div
          className="absolute"
          style={{
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <p className="text-lg font-semibold text-gray-700">
            {centerText.name}
          </p>
          <p className="text-xl font-bold text-[#510DBC]">{centerText.value}</p>
        </div>
      </div>

      {/* Legends with values */}
      <div className="w-full sm:w-1/3 flex flex-col justify-center items-center sm:items-start ">
        {pieData.map((entry, index) => (
          <div
            key={index}
            className="flex items-center gap-2 mb-2 text-gray-600"
          >
            <div
              className="h-4 w-4 rounded-full"
              style={{
                backgroundColor: colorShades[index % colorShades.length],
              }}
            ></div>
            <p className="text-sm">
              {entry.name}: {entry.value}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default PieChartSection;
