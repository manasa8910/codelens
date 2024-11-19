import { motion } from "framer-motion"; // For animations
import React from "react";
import ImgTech from "../assets/images/ImgTech.png";
import desktop from "../assets/images/icons/desktop.png";
import scale from "../assets/images/icons/scale.png";
import security from "../assets/images/icons/security.png";

function Slide3() {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800">
      {/* Content Overlay */}
      <div className="relative flex flex-col md:flex-row w-full max-w-5xl mx-auto">
        {/* Left Section */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center text-center p-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
            Our Cutting Edge Technology
          </h1>

          {/* Technology Highlights */}
          <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
            {/* Tech Stack Item Template */}
            {[
              {
                src: scale,
                title: "Real-Time Reporting",
                description:
                  "Get real-time feedback as you code with detailed reports on the fly.",
              },
              {
                src: desktop,
                title: "Multi-Language Support",
                description:
                  "Compatible with a wide range of programming languages for seamless integration.",
              },
              {
                src: security,
                title: "Security Compliance Checks",
                description:
                  "Built-in compliance checks to meet industry-specific regulations and standards.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white border rounded-lg shadow-md px-4 py-6 flex flex-col items-center transition transform hover:scale-105"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
              >
                <img
                  src={item.src}
                  alt={`${item.title} Icon`}
                  className="w-12 h-12 mb-2"
                />
                <h3 className="text-lg md:text-xl font-semibold text-center mb-1">
                  {item.title}
                </h3>
                <p className="text-center text-sm md:text-base">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Section: Image */}
        <motion.div
          className="flex-1 flex justify-center items-center mt-8 md:mt-0 p-4"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <img
            src={ImgTech}
            alt="Technology Visual"
            className="w-full max-w-md h-auto md:h-[70vh] object-cover rounded-lg"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default Slide3;
