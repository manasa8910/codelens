// LoginPopup.js
import React, { useState } from "react";
import { motion } from "framer-motion";

const LoginPopup = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (username === "user" && password === "User@123") {
      onLoginSuccess();
      onClose();
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-[1000]">
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-xl w-96"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          Welcome Back
        </h2>
        {errorMessage && (
          <p className="text-sm text-red-500 text-center mb-2">
            {errorMessage}
          </p>
        )}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-kpmgBlue focus:border-transparent"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-kpmgBlue focus:border-transparent"
            placeholder="Enter your password"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-kpmgBlue text-white rounded-lg py-1 text-lg font-medium hover:bg-black transition"
        >
          Login
        </button>
        <button
          onClick={onClose}
          className="w-full mt-3 text-gray-700 hover:text-gray-800 transition text-sm"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
};

export default LoginPopup;
``;
