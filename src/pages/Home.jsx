import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  from-indigo-600 via-purple-600  flex items-center justify-center px-4 shadow-2xl">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-10 text-center">
        
       
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
           Pulse Video Platform
        </h1>

       
        <p className="text-gray-600 text-lg mb-8">
          Empowering creators, protecting viewers, and delivering safe content  all in real time.
        </p>

       
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 rounded-lg border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition">
            Sign Up
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-8">
          Built for secure, role-based video content management
        </p>
      </div>
    </div>
  );
}

export default Home;
