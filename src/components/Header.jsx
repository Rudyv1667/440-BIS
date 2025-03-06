import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link for routing

const Header = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolling ? "bg-blue-100 shadow-md" : "bg-white shadow-md"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl relative mx-auto h-16 flex justify-between items-center py-4 px-6">
        <motion.img
          src="/public/logo-removebg-preview.png"
          alt="Logo"
          className="relative left-0 transform h-15 w-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div
          className="text-l font-bold text-gray-900"
          whileHover={{ scale: 1.1 }}
        >
          Mueblería Industrial
        </motion.div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-6">
            <motion.li
              whileHover={{ scale: 1.1 }}
              className="text-gray-800 hover:text-gray-300 cursor-pointer transition"
            >
              {/* Add Link for Menú */}
              <Link to="/" className="hover:text-gray-300">
                Menú
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              className="text-gray-700 hover:text-gray-300 cursor-pointer transition"
            >
              {/* Add Link for Contact */}
              <Link to="/Contact" className="hover:text-gray-300">
                Contacto
              </Link>
            </motion.li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
