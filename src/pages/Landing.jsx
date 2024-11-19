import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPopup from "../components/LoginPopup"; // Import your LoginPopup component
import Slide1 from "../components/Slide1";
import Slide2 from "../components/Slide2";
import Slide3 from "../components/Slide3";

export default function Landing() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/dashboard");
    // You can use react-router's useNavigate here if needed
  };

  return (
    <>
      {/* Overlay for disabling interaction */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[999] flex items-center justify-center">
          {/* You can also add a loading spinner or message here if desired */}
        </div>
      )}

      <Slide1
        setIsLoginOpen={setIsLoginOpen} // Pass down the function to open the login
      />
      <Slide2 />
      <Slide3 />

      {/* Render Login Popup */}
      {isLoginOpen && (
        <LoginPopup
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}
