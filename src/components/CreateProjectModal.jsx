// CreateProjectModal.js
import React from "react";
import { useNavigate } from "react-router-dom";

function CreateProjectModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleCreateProject = (e) => {
    e.preventDefault(); // Prevent default form submission
    const projectName = e.target.projectName.value; // Get project name
    const jsonFile = e.target.jsonFile.files[0]; // Get uploaded file

    if (projectName && jsonFile) {
      // Here you would typically handle the file upload and project creation logic.
      console.log("Creating project:", projectName);

      // Navigate to a specific project page after creation
      navigate("/project/5"); // Navigate to project/5 after creation
      onClose(); // Close the modal
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 w-full max-w-md animate-fadeIn">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Create New Project
        </h2>
        <p className="text-gray-600 mb-3 text-sm">
          Fill in the details below and upload a JSON file to create a new
          project.
        </p>
        <form onSubmit={handleCreateProject}>
          <input
            type="text"
            name="projectName"
            placeholder="Project Name"
            required
            className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <div className="relative mb-5 ">
            <input
              type="file"
              name="jsonFile"
              accept=".json"
              required
              className="border border-gray-300 rounded-lg p-3 w-full bg-white focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
            />
            <p className="absolute top-2 right-2 text-xs text-gray-500">
              JSON only *
            </p>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-300 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-kpmgBlue text-white rounded-lg px-4 py-2 shadow-md hover:from-blue-600 hover:to-green-500 transition duration-300"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectModal;
