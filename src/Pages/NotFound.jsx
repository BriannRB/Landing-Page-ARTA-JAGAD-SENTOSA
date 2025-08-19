import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import "../App.css";

function NotFound() {
  return (
    <div className="relative w-full h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4 text-primary-color">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-500 mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-[#DEB06B] text-white font-semibold rounded-lg hover:bg-[#C99A5A] transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
