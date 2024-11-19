import React from "react";
import {
  LuLayoutDashboard,
  LuLogOut,
  LuPieChart,
  LuSettings,
} from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {
  const location = useLocation();

  // Function to check if the current path matches the link
  const isActive = (path) => {
    if (path === "/projects") {
      return location.pathname === "/projects" ||
        location.pathname.startsWith("/project/")
        ? "bg-kpmgBlue text-white"
        : "bg-[#F0F3F4] text-infoGrey1";
    }
    return location.pathname === path
      ? "bg-kpmgBlue text-white"
      : "bg-[#F0F3F4] text-infoGrey1";
  };

  return (
    <div className="fixed left-0 top-0 bg-[#F0F3F4] w-[20vw] h-[95vh] rounded-3xl my-[2.5vh] mx-[2vw] border-[5px] border-gray-300 px-5 text-infoGrey1 text-lg  flex-col justify-between shadow-lg hidden sm:flex">
      <div>
        <div className="flex justify-center items-center">
          {" "}
          <img className="mt-5 object-cover h-12" src={logo} alt="logo" />
        </div>{" "}
        <div className="border-b-[5px] mt-2 border-grey-300 mb-5"></div>
        {/* Navigation Links with active and hover states */}
        <Link
          to="/dashboard"
          className={`flex gap-5 mt-3 px-5 py-3 rounded-3xl ${isActive(
            "/dashboard"
          )} hover:bg-blue-700 hover:text-white transition-all`}
        >
          <LuLayoutDashboard size={25} />
          <div>Dashboard</div>
        </Link>
        <Link
          to="/projects"
          className={`flex gap-5 mt-3 px-5 py-3 rounded-3xl ${isActive(
            "/projects"
          )} hover:bg-blue-700 hover:text-white transition-all`}
        >
          <LuPieChart size={25} />
          <div>Projects</div>
        </Link>
        <Link
          to="/settings"
          className={`flex gap-5 mt-3 px-5 py-3 rounded-3xl ${isActive(
            "/settings"
          )} hover:bg-blue-700 hover:text-white transition-all`}
        >
          <LuSettings size={25} />
          <div>Settings</div>
        </Link>
        <Link
          to="/"
          className={`flex gap-5 mt-3 px-5 py-3 rounded-3xl hover:bg-blue-700 hover:text-white transition-all`}
        >
          <LuLogOut size={25} />
          <div>Logout</div>
        </Link>
      </div>
      <div className="flex mb-5 items-center gap-3 px-3 py-3 bg-gray-200 rounded-3xl shadow">
        <div className="w-12 h-12 bg-kpmgBlue rounded-full flex items-center justify-center text-white text-xl font-bold">
          J
        </div>
        <div>
          <div className="font-bold text-darkBlue">John Doe</div>
          <div className="text-sm text-gray-600">john.doe@example.com</div>
        </div>
      </div>
    </div>
  );
}
