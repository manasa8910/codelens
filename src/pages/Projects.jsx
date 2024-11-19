// Projects.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { LuPlusCircle, LuClipboard, LuStar } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import CreateProjectModal from "../components/CreateProjectModal";

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

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("date");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const filteredProjects = sampleProjects
    .filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "date") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortOrder === "name") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  const handleProjectClick = (id) => {
    navigate(`/project/${id}`);
  };

  return (
    <div className="w-full h-[95vh] my-[2.5vh] mx-3 sm:ml-[24vw]  flex flex-col">
      {/* Top Section */}
      <div className="w-full text-gray-700 text-lg flex justify-between items-center gap-5 mb-5">
        <div className="bg-white flex flex-col sm:flex-row items-center rounded-3xl px-5 sm:py-3 w-full shadow-lg min-h-[10vh] justify-between gap-3 py-6">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg p-2 w-full sm:w-1/3 flex-1 h-10 text-sm sm:text-base"
          />

          {/* Sort Dropdown */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded-lg p-2 w-full sm:w-1/5 text-sm sm:text-base"
          >
            <option value="date" className="text-gray-700">
              📅 Sort by Activity
            </option>
            <option value="name" className="text-gray-700">
              🔤 Sort by Name
            </option>
          </select>

          {/* Create Project Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center bg-kpmgBlue text-white rounded-xl p-2 px-4 h-10 text-sm w-full sm:w-auto sm:text-base "
          >
            <LuPlusCircle className="mr-2" />
            Create Project
          </button>
        </div>
      </div>

      {/* Bottom Section with Project Cards */}
      <div className="flex-grow overflow-y-auto bg-white rounded-3xl text-gray-700 p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                onClick={() => handleProjectClick(project.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg border shadow-lg p-4 flex flex-col cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 8px 15px rgba(0,0,0,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="text-xl sm:text-lg font-semibold">
                  {project.title}
                </h3>
                <div className="mb-3 text-sm sm:text-base">
                  <span>
                    {Math.floor(
                      (new Date() - new Date(project.createdAt)) /
                        (1000 * 3600 * 24)
                    )}{" "}
                    days ago
                  </span>
                </div>

                <div className="w-full h-2 mb-3 rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-green-400"
                    style={{ width: `${project.score * 10}%` }}
                  ></div>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <LuStar size={18} />
                  <span className="text-sm sm:text-base">
                    Total score: {project.score} / 10
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <LuClipboard size={18} />
                  <span className="text-sm sm:text-base">
                    Total issues: {project.totalIssues}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </div>
      </div>

      {/* Modal for Creating Project */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
