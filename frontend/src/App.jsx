// import React from "react";
// import Navbar from "../src/components/Navbar";
// import Home from "../src/components/Home";
// import Footer from "../src/components/Footer";
// import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// import Blogs from "../src/pages/Blogs";
// import About from "../src/pages/About";
// import Contact from "../src/pages/Contact";
// import Login from "../src/pages/Login";
// import Register from "../src/pages/Register";
// import Dashboard from "../src/pages/Dashboard";
// import Creators from "./pages/Creators";
// import { useAuth } from "./context/AuthProvider";
// import { Toaster } from "react-hot-toast";
// import UpdateBlog from "./dashboard/UpdateBlog";
// import Detail from "./pages/Detail";
// import NotFound from "./pages/NotFound";
// function App() {
//   const location = useLocation();
//   const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(
//     location.pathname
//   );
//   const { blogs, isAuthenticated } = useAuth();
//   let token = localStorage.getItem("jwt"); // Retrieve the token directly from the localStorage to maininting the routes protect (Go to login.jsx)
//   console.log(blogs);
//   console.log(isAuthenticated); // it is not using because every page refresh it was redirected to /login

//   return (
//     <div>
//       {!hideNavbarFooter && <Navbar />}
//       <Routes>
//         <Route
//           exact
//           path="/"
//           element={token ? <Home /> : <Navigate to={"/login"} />}
//         />
//         <Route exact path="/blogs" element={<Blogs />} />
//         <Route exact path="/about" element={<About />} />
//         <Route exact path="/contact" element={<Contact />} />
//         <Route exact path="/creators" element={<Creators />} />
//         <Route exact path="/login" element={<Login />} />
//         <Route exact path="/register" element={<Register />} />
//         <Route exact path="/dashboard" element={<Dashboard />} />

//         {/* Single page route */}
//         <Route exact path="/blog/:id" element={<Detail />} />

//         {/* Update page route */}
//         <Route exact path="/blog/update/:id" element={<UpdateBlog />} />

//         {/* Universal route */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//       <Toaster />
//       {!hideNavbarFooter && <Footer />}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import Navbar from "../src/components/Navbar";
import Home from "../src/components/Home";
import Footer from "../src/components/Footer";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Blogs from "../src/pages/Blogs";
import About from "../src/pages/About";
import Contact from "../src/pages/Contact";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Dashboard from "../src/pages/Dashboard";
import Creators from "./pages/Creators";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import UpdateBlog from "./dashboard/UpdateBlog";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(location.pathname);

  const { blogs, isAuthenticated } = useAuth();
  let token = localStorage.getItem("jwt"); // Retrieve the token directly from the localStorage to maintain the routes protection (Go to login.jsx)
  console.log(blogs);
  console.log(isAuthenticated); // It is not using because every page refresh it redirects to /login

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Persist dark mode preference
  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode) {
      setIsDarkMode(savedMode === "dark");
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div>
      {/* Navbar */}
      {!hideNavbarFooter && <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />}
      
      <Routes>
        <Route exact path="/" element={token ? <Home /> : <Navigate to={"/login"} />} />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/creators" element={<Creators />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />

        {/* Single page route */}
        <Route exact path="/blog/:id" element={<Detail />} />

        {/* Update page route */}
        <Route exact path="/blog/update/:id" element={<UpdateBlog />} />

        {/* Universal route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster />
      
      {/* Footer */}
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
