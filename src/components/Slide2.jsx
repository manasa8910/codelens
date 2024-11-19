import { motion } from "framer-motion"; // For animations
import React from "react";
import bank from "../assets/images/icons/bank.png";
import desktop from "../assets/images/icons/desktop.png";
import insurance from "../assets/images/icons/insurance.png";
import smartphone from "../assets/images/icons/smartphone.png";
import lifeline from "../assets/images/icons/life-line.png";
import shopping from "../assets/images/icons/shopping-cart.png";

function Slide2() {
  return (
    <section className="flex items-center bg-gray-100 justify-center min-h-screen w-screen text-gray-700 p-4">
      <div className="text-center px-4 py-8 md:py-12 lg:py-16 max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 lg:mb-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Transforming Code Quality Across Industries
        </motion.h2>
        <motion.p
          className="text-base md:text-lg lg:text-xl mb-8 md:mb-12 lg:mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Tailored solutions that cater to diverse industries, ensuring robust
          and compliant code.
        </motion.p>

        {/* Industry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card Template for Reusability */}
          {[
            {
              src: desktop,
              title: "Technology & Software Development",
              description:
                "Optimize and streamline software development workflows, improving code quality and reducing errors.",
            },
            {
              src: lifeline,
              title: "Healthcare & Biotech",
              description:
                "Ensure strict compliance and high-quality code for healthcare applications, meeting industry regulations.",
            },
            {
              src: bank,
              title: "Finance & Banking",
              description:
                "Secure and robust code for financial services, ensuring data safety and regulatory compliance.",
            },
            {
              src: shopping,
              title: "E-commerce & Retail",
              description:
                "Seamless integration for customer-centric applications, maintaining code efficiency and reliability.",
            },
            {
              src: insurance,
              title: "Aviation",
              description:
                "Enhance flight safety and operational efficiency with high-quality code solutions tailored for aviation systems.",
            },
            {
              src: smartphone,
              title: "Mobile Applications",
              description:
                "Develop user-friendly mobile applications with high-quality code standards.",
            },
          ].map((industry, index) => (
            <motion.div
              key={index}
              className="bg-white border rounded-lg shadow-lg p-4 transition transform flex flex-col items-center hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
            >
              <img
                src={industry.src}
                alt={`${industry.title} Icon`}
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-lg md:text-xl font-semibold text-center">
                {industry.title}
              </h3>
              <p className="text-center text-sm md:text-base mt-2">
                {industry.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Caption for Industry Section */}
        <motion.p
          className="italic text-lg md:text-xl mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Trusted by top companies across these sectors to ensure code
          excellence.
        </motion.p>
      </div>
    </section>
  );
}

export default Slide2;
