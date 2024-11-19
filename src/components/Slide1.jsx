import React from "react";
import { motion } from "framer-motion";
import heroImg from "../assets/images/heroImg.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { LuCheckCircle, LuCode, LuLineChart } from "react-icons/lu";

function Slide1({ setIsLoginOpen }) {
  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
  };

  return (
    <div className="flex flex-col min-h-screen w-screen relative bg-gray-100">
      {/* Header Section */}
      <header className="flex justify-between items-center p-4 md:p-6 shadow-md bg-white">
        <img src={logo} alt="Logo" className="h-8 md:h-10" />
        <button
          onClick={() => setIsLoginOpen(true)} // Open login popup
          className="px-4 py-2 text-sm md:text-base font-bold text-white bg-kpmgBlue rounded-lg hover:bg-black transition-colors"
        >
          Login
        </button>
      </header>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row flex-grow w-full max-w-[1200px] mx-auto p-4">
        <motion.div
          className="flex-1 flex items-center justify-center z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-6 py-8 w-full max-w-md mx-auto rounded-lg shadow-lg border bg-white">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center text-gray-700">
                Review, Refactor, Repeat
              </h1>

              <ul className="text-base md:text-lg text-left mb-4 list-disc list-inside text-gray-700">
                <motion.li
                  className="flex items-start mb-2"
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                >
                  <LuCheckCircle size={28} className="text-green-700 mr-3" />
                  Unlock the full potential of your projects with our
                  comprehensive code analysis tools.
                </motion.li>
                <motion.li
                  className="flex items-start mb-2"
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  <LuCode size={28} className="text-[#ed2bc3] mr-3" />
                  Identify errors, enhance conventions, and optimize your code
                  effortlessly.
                </motion.li>
                <motion.li
                  className="flex items-start mb-2"
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  <LuLineChart size={28} className="text-yellow-600 mr-3" />
                  Stay ahead of the game with real-time insights and actionable
                  reports.
                </motion.li>
              </ul>

              <motion.button
                className="px-6 py-2 font-bold bg-kpmgBlue text-white rounded-lg hover:bg-black transition-colors mt-4"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Book Your Demo Now
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 z-10 flex justify-center items-center p-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={heroImg}
            alt="Right Side Visual"
            className="h-auto md:h-[80vh] object-cover rounded-lg "
          />
        </motion.div>
      </div>
    </div>
  );
}

export default Slide1;
