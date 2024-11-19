import React, { useEffect, useState } from "react";
import {
  LuAlertCircle,
  LuAlertTriangle,
  LuClipboardCheck,
  LuXCircle,
} from "react-icons/lu";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import data from "../assets/data/sonarqube_issues1.json";

import rules from "../assets/data/rules.json";
import CardWithProgress from "../components/CardWithProgress";
import MetricCard from "../components/MetricCard";
import PieChartSection from "../components/PieChartSection";
import { formatValue } from "../utils/formatValue";
import jsPDF from "jspdf";
import { FiChevronDown, FiChevronRight } from "react-icons/fi"; // Import arrow icons

import html2canvas from "html2canvas";

function Project() {
  const [issues] = useState(data.issues);
  const [selectedSeverity, setSelectedSeverity] = useState("ALL");
  const [categoryScores, setCategoryScores] = useState({});
  const [categorizedIssues, setCategorizedIssues] = useState({});
  const [complianceIssues, setComplianceIssues] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    // Parse the rules into categories
    const rulesCategories = {};
    const ruleIdToCategory = {};

    rules.rules.forEach((categoryData) => {
      const category = categoryData.category;
      categoryData.rules.forEach((rule) => {
        const ruleId = rule.id;
        if (!rulesCategories[category]) {
          rulesCategories[category] = [];
        }
        rulesCategories[category].push(ruleId);
        ruleIdToCategory[ruleId] = category;
      });
    });

    // Parse issues and categorize them
    const issuesCategories = {};
    const otherCategory = "Others";
    const complianceCategory = "Compliance"; // Defined here to avoid reference error
    const complianceIssuesSet = new Set();

    data.issues.forEach((issue) => {
      const ruleId = issue.rule.split(":").pop();
      const category = ruleIdToCategory[ruleId] || otherCategory;
      if (!issuesCategories[category]) {
        issuesCategories[category] = new Set();
      }
      issuesCategories[category].add(issue.message);

      // Track issues not in defined categories under Compliance
      if (!ruleIdToCategory[ruleId]) {
        complianceIssuesSet.add(issue.message);
      }
    });

    // Calculate scores for each category
    const scores = {};
    Object.keys(rulesCategories).forEach((category) => {
      const totalRules = rulesCategories[category].length;
      const totalIssues = issuesCategories[category]
        ? issuesCategories[category].size
        : 0;
      const score =
        totalRules > 0 ? ((totalRules - totalIssues) / totalRules) * 10 : 0;
      scores[category] = Math.round(score);
    });

    // Set calculated values to state
    setCategoryScores(scores);
    setCategorizedIssues(issuesCategories);
    setComplianceIssues([...complianceIssuesSet]);
  }, []);

  // Calculate severity counts
  const severityCounts = {};
  issues.forEach((issue) => {
    const severity = issue.severity;
    severityCounts[severity] = (severityCounts[severity] || 0) + 1;
  });

  const metricCards = [
    {
      icon: <LuAlertTriangle size={30} />,
      heading: "Total Issues",
      subheading: "Cumulative issues",
      value: formatValue(
        Object.values(severityCounts).reduce((sum, count) => sum + count, 0) ||
          0
      ),
    },
    {
      icon: <LuClipboardCheck size={30} />,
      heading: "Conventions",
      subheading: "Opportunities",
      value: formatValue(severityCounts["CONVENTION"] || 0),
    },
    {
      icon: <LuAlertCircle size={30} />,
      heading: "Warnings",
      subheading: "Weakness",
      value: formatValue(
        severityCounts["MINOR"] +
          severityCounts["CRITICAL"] +
          severityCounts["WARNING"] || 0
      ),
    },
    {
      icon: <LuXCircle size={30} />,
      heading: "Errors",
      subheading: "Threats",
      value: formatValue(
        severityCounts["ERROR"] + severityCounts["MAJOR"] || 0
      ),
    },
  ];

  // Filter issues based on selected severity
  const filteredIssues =
    selectedSeverity === "ALL"
      ? issues
      : issues.filter((issue) => issue.severity === selectedSeverity);

  // Prepare data for dual scale graph
  const moduleIssues = {};
  filteredIssues.forEach((issue) => {
    const module = issue.component.split("\\").pop();
    if (!moduleIssues[module]) {
      moduleIssues[module] = { total: 0, messages: new Set() };
    }
    moduleIssues[module].total += 1;
    moduleIssues[module].messages.add(issue.message);
  });

  const dualScaleData = Object.keys(moduleIssues).map((module) => ({
    name: module,
    totalIssues: moduleIssues[module].total,
    uniqieIssues: moduleIssues[module].messages.size,
  }));

  const chartData = dualScaleData;

  const typeCounts = {};
  const cleanCodeCategoryCounts = {};

  // Loop through the issues to count occurrences of 'type' and 'cleanCodeAttributeCategory'
  issues.forEach((issue) => {
    // Counting for 'type'
    const type = issue.type;
    typeCounts[type] = (typeCounts[type] || 0) + 1;

    // Counting for 'cleanCodeAttributeCategory'
    const cleanCodeCategory = issue.cleanCodeAttributeCategory;
    cleanCodeCategoryCounts[cleanCodeCategory] =
      (cleanCodeCategoryCounts[cleanCodeCategory] || 0) + 1;
  });

  // Prepare the data for Pie Chart 1 (counts of 'type')
  const typePieData = Object.keys(typeCounts).map((key) => ({
    name: key,
    value: typeCounts[key],
    color: "#F87171", // Add your preferred color for each segment
  }));

  // Prepare the data for Pie Chart 2 (counts of 'cleanCodeAttributeCategory')
  const cleanCodeCategoryPieData = Object.keys(cleanCodeCategoryCounts).map(
    (key) => ({
      name: key,
      value: cleanCodeCategoryCounts[key],
      color: "#34D399", // Add your preferred color for each segment
    })
  );

  const uniqueRiskMessages = new Set();

  filteredIssues.forEach((issue) => {
    uniqueRiskMessages.add(issue.message); // Add each message to the set for uniqueness
  });

  const handleDownload = () => {
    const input = document.getElementById("download-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 190; // Width of the image in PDF
      const pageHeight = pdf.internal.pageSize.height; // Height of PDF page
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate height based on width
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("project_report.pdf"); // Save the PDF
    });
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category], // Toggle the category state
    }));
  };

  return (
    <div className="w-full h-[95vh] my-[2.5vh] mx-3 sm:ml-[24vw]  flex flex-col">
      {/* Card with total score and download button */}
      <div className="bg-white rounded-3xl border shadow-lg px-6 py-4 mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-xl font-semibold text-gray-700 text-center">
            Python-robotics
          </h2>
        </div>
        <button
          onClick={handleDownload}
          className="bg-kpmgBlue text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Download Report
        </button>
      </div>

      <div id="download-content">
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

        {/* Chart with Filter */}
        <div className="bg-white w-full h-96 rounded-3xl border shadow-lg py-4 sm:px-2 flex flex-col mb-5">
          <div className="w-full flex items-center px-4 justify-end">
            <label
              htmlFor="severity-filter"
              className="block text-sm font-medium text-gray-700 mr-4"
            >
              Filter by Severity:
            </label>
            <select
              id="severity-filter"
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="mt-1 block min-w-40 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            >
              <option value="ALL">All</option>
              {Object.keys(severityCounts).map((severity) => (
                <option key={severity} value={severity}>
                  {severity}
                </option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              // margin={{ top: 0, right: 10, left: 10, bottom: 10 }}
            >
              <Legend
                verticalAlign="top"
                content={() => (
                  <div className="flex items-center justify-center mb-2 text-gray-600 font-semibold">
                    Module Issues Overview
                  </div>
                )}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={false}>
                <Label
                  value="Modules"
                  position="bottom"
                  style={{
                    textAnchor: "middle",
                    fontWeight: "bold",
                    fontSize: "14px",
                    transform: "translateY(-20px)", // Move label up closer to the graph
                  }}
                />
              </XAxis>
              <YAxis yAxisId="left" orientation="left" stroke="#7213EA">
                <Label
                  value="Total Issues"
                  angle={-90}
                  position="left"
                  style={{
                    textAnchor: "middle",
                    fontWeight: "bold",
                    fontSize: "14px",
                    // transform: "translateY(-10px)",  // Move label up closer to the graph
                  }}
                  dx={20} // Adjust X-axis label position (move it horizontally closer to the graph)
                  dy={0}
                />
              </YAxis>
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d">
                <Label
                  value="Unique Issues"
                  angle={90}
                  position="right"
                  style={{
                    textAnchor: "middle",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                  dx={-20} // Adjust X-axis label position (move it horizontally closer to the graph)
                  dy={0}
                />
              </YAxis>

              <Tooltip />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="totalIssues"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="uniqieIssues"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Charts */}
        <div className="flex flex-col md:flex-row gap-5 mb-5 min-h-72">
          <div className="bg-white rounded-3xl border shadow-lg p-4 flex flex-col  sm:flex-row w-full md:w-1/2">
            <PieChartSection
              pieData={typePieData}
              title="Type of Issue"
              totalValue={Object.values(typeCounts).reduce(
                (sum, value) => sum + value,
                0
              )}
            />
          </div>
          <div className="bg-white rounded-3xl border shadow-lg p-4 flex flex-col  sm:flex-row w-full md:w-1/2">
            <PieChartSection
              pieData={cleanCodeCategoryPieData}
              title="Clean Code Attribute"
              totalValue={Object.values(cleanCodeCategoryCounts).reduce(
                (sum, value) => sum + value,
                0
              )}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 mb-5 min-h-72 ">
          {/* Top Modules with Most Issues */}
          <div className="bg-white rounded-3xl border shadow-lg p-6 px-10 ">
            <div className="flex text-xl items-center justify-center mb-2 text-gray-600 font-semibold">
              Top Modules with Most Issues
            </div>
            <ul className="list-none ml-5 space-y-3">
              {Object.entries(moduleIssues)
                .sort(([, a], [, b]) => b.total - a.total)
                .slice(0, 5)
                .map(([module], index) => (
                  <li key={module} className="flex items-center gap-3">
                    {/* Colorful Gradient Bullet */}
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        background: `linear-gradient(45deg, 
                  ${index % 2 === 0 ? "#6B46C1" : "#5A67D8"} 30%, 
                  ${index % 2 === 0 ? "#9F7AEA" : "#4C51BF"} 70%)`,
                      }}
                    ></div>
                    <span className="text-md text-gray-700">{module}</span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Top Unique Risks */}
          <div className="bg-white rounded-3xl border shadow-lg p-6 flex-1 ">
            <div className="flex text-xl items-center justify-center mb-2 text-gray-600 font-semibold">
              Top Unique Risks
            </div>
            <ul className="list-none ml-5 space-y-3">
              {[...uniqueRiskMessages].slice(0, 5).map((message, index) => (
                <li key={index} className="flex items-center gap-3">
                  {/* Colorful Gradient Bullet */}
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      background: `linear-gradient(45deg, 
                  ${index % 2 === 0 ? "#6B46C1" : "#5A67D8"} 30%, 
                  ${index % 2 === 0 ? "#9F7AEA" : "#4C51BF"} 70%)`,
                    }}
                  ></div>
                  <span className="text-md text-gray-700 ">{message}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="gap-5 mb-5 min-h-72 w-full">
          <div id="issues-container">
            <div className="bg-white rounded-3xl border shadow-lg p-1 sm:p-4 w-full mb-5">
              {/* Title */}
              <div className="flex text-xl items-center justify-center text-gray-600 font-semibold mb-2 sm:mb-4">
                Categorical Score
              </div>

              {/* Responsive Progress Overview */}
              <div
                className="grid gap-4 mb-4 w-full px-4"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // Flexible layout
                }}
              >
                {/* Iterate over each category */}
                {Object.keys(categoryScores).map((category) => (
                  <div key={category} className="w-full">
                    <CardWithProgress
                      heading={category}
                      score={categoryScores[category]} // Calculate the percentage score
                    />
                  </div>
                ))}

                {/* Compliance Section */}
                <div className="w-full">
                  <CardWithProgress heading="Compliance" score={NaN} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* unique issues */}
      <div className=" gap-5 mb-5 min-h-72 w-full">
        <div className="bg-white rounded-3xl border shadow-lg py-2 px-6 w-full">
          <div className="flex text-xl items-center justify-center text-gray-600 font-semibold my-4">
            Unique Issues
          </div>
          <div className="issues-container mb-6 ">
            {Object.keys(categorizedIssues).map((category) => (
              <div key={category} className="mb-4">
                <div
                  className="flex items-center justify-between cursor-pointer border  py-2 px-6 rounded-lg shadow-md"
                  onClick={() => toggleCategory(category)}
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {category}
                  </h3>
                  {expandedCategories[category] ? (
                    <FiChevronDown size={20} />
                  ) : (
                    <FiChevronRight size={20} />
                  )}
                </div>
                {expandedCategories[category] && (
                  <div className="issues-list mt-2">
                    {Array.from(categorizedIssues[category]).map(
                      (issue, index) => (
                        <div
                          key={index}
                          className="issue-item mb-2 px-3 py-1 bg-gray-100 rounded"
                        >
                          {issue}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
            <div className="mb-4">
              <div
                className="flex items-center justify-between cursor-pointer border  py-2 px-6 rounded-lg shadow-md"
                onClick={() => toggleCategory("Compliance Issues")}
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  Compliance Issues
                </h3>
                {expandedCategories["Compliance Issues"] ? (
                  <FiChevronDown size={20} />
                ) : (
                  <FiChevronRight size={20} />
                )}
              </div>
              {expandedCategories["Compliance Issues"] && (
                <div className="issues-list mt-2">
                  {complianceIssues.length > 0 ? (
                    complianceIssues.map((issue, index) => (
                      <div
                        key={index}
                        className="issue-item mb-2 px-3 py-1 bg-gray-100 rounded"
                      >
                        {issue}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No compliance issues found.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        ;
      </div>
    </div>
  );
}

export default Project;
