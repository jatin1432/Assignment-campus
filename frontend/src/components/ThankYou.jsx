import React from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../utils/api";

export default function ThankYou() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear JWT
    setAuthToken(null);
    // Redirect to signup
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          You have successfully signed up / logged in.
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
