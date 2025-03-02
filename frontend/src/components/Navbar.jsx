import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/constant"; // Import BACKEND_URL

function Navbar({ toggleDarkMode, isDarkMode }) {
  const [show, setShow] = useState(false);

  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/users/logout`,
        { withCredentials: true }
      );
      localStorage.removeItem("jwt");
      toast.success(data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="shadow-lg px-4 py-2 bg-white dark:bg-gray-800 fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between container mx-auto">
        <div className="font-semibold text-xl text-gray-700 dark:text-gray-300">
          Cilli<span className="text-blue-500 dark:text-yellow-400">Blog</span>
        </div>

        {/* Desktop Navigation */}
        <div className="mx-6">
          <ul className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400">
              HOME
            </Link>
            <Link to="/blogs" className="text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400">
              BLOGS
            </Link>
            <Link to="/creators" className="text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400">
              CREATORS
            </Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400">
              ABOUT
            </Link>
            <Link to="/contact" className="text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400">
              CONTACT
            </Link>
          </ul>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden" onClick={() => setShow(!show)}>
            {show ? <IoCloseSharp size={24} className="text-gray-700 dark:text-gray-300" /> : <AiOutlineMenu size={24} className="text-gray-700 dark:text-gray-300" />}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-all"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {isAuthenticated && profile?.user?.role === "admin" ? (
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded"
            >
              DASHBOARD
            </Link>
          ) : null}

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
            >
              LOGIN
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
            >
              LOGOUT
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {show && (
        <div className="bg-white dark:bg-gray-800">
          <ul className="flex flex-col h-screen items-center justify-center space-y-3 md:hidden text-xl">
            <Link
              to="/"
              onClick={() => setShow(!show)}
              className="text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400"
            >
              HOME
            </Link>
            <Link
              to="/blogs"
              onClick={() => setShow(!show)}
              className="text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400"
            >
              BLOGS
            </Link>
            <Link
              to="/creators"
              onClick={() => setShow(!show)}
              className="text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400"
            >
              CREATORS
            </Link>
            <Link
              to="/about"
              onClick={() => setShow(!show)}
              className="text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400"
            >
              ABOUT
            </Link>
            <Link
              to="/contact"
              onClick={() => setShow(!show)}
              className="text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400"
            >
              CONTACT
            </Link>

            {/* Dark Mode Toggle Button for Mobile */}
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-all"
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>

            {/* Admin Dashboard Link for Mobile */}
            {isAuthenticated && profile?.user?.role === "admin" && (
              <Link
                to="/dashboard"
                onClick={() => setShow(!show)}
                className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded"
              >
                DASHBOARD
              </Link>
            )}

            {/* Login/Logout Button for Mobile */}
            {!isAuthenticated ? (
              <Link
                to="/login"
                onClick={() => setShow(!show)}
                className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
              >
                LOGIN
              </Link>
            ) : (
              <button
                onClick={(e) => {
                  handleLogout(e);
                  setShow(!show);
                }}
                className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
              >
                LOGOUT
              </button>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
