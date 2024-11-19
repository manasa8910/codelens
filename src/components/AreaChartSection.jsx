import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AreaChartSection = ({ chartData }) => {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 20, left: -20, bottom: 10 }}
        >
          {/* Chart Title */}
          <Legend
            verticalAlign="top"
            content={() => (
              <div className="flex items-center justify-center mb-2 text-gray-600 font-semibold">
                Total Issues Over Time
              </div>
            )}
          />
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#510DBC" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#510DBC" stopOpacity={0} />
            </linearGradient>
          </defs>
          {/* X and Y Axes */}
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
          />
          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" stroke="#babdc4" />
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
          {/* Area Chart */}
          <Area
            type="monotone"
            dataKey="value"
            stroke="#510DBC"
            fill="url(#colorValue)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartSection;
