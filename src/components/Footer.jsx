import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link for routing
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'; // Import social media icons

const Footer = () => {
  return (
    <footer className="bg-[#7392b7] text-gray-800 static top-0 left-0 w-full py-8 mt-10">
      <div className="top-0 left-0 w-full text-center">
        {/* Logo & Tagline */}
        <motion.div
          className="flex flex-col items-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/public/logo-removebg-preview.png" alt="Logo" className="h-16 mb-2" />
          <p className="text-sm">Muebles industriales de calidad, diseñados para durar.</p>
        </motion.div>

        {/* Quick Links */}
        <nav className="mb-6">
          <ul className="flex justify-center space-x-6 text-sm text-gray-800">
            {["Menú", "Contacto"].map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.1, color: "#ffffff" }}
                className="cursor-pointer hover:text-white transition"
              >
                {/* Add Link component here */}
                <Link 
                  to={item === "Menú" ? "/" : "/Contact"}
                  className="hover:text-white"
                >
                  {item}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 text-lg mb-4">
          {[faFacebook, faInstagram, faTwitter].map((icon, index) => (
            <motion.a
              key={index}
              href="#"
              whileHover={{ scale: 1.2 }}
              className="hover:text-white transition"
            >
              <FontAwesomeIcon icon={icon} className="bg-transparent" />
            </motion.a>
          ))}
        </div>

        {/* Google Map with responsive styles */}
        <div className="flex justify-center space-x-6 mb-4">
          <div className="w-full sm:w-80 md:w-96 lg:w-1/3 border-4 border-gray-800 rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2749.0500274266346!2d-67.51461968935655!3d-46.44770577098657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbde5df972c647efd%3A0xdece8dadc7941fd4!2sEl%20Choique%20622%2C%20Z9011%20Caleta%20Olivia%2C%20Santa%20Cruz!5e0!3m2!1ses!2sar!4v1739824080542!5m2!1ses!2sar"
              width="100%"
              height="250"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs">&copy; {new Date().getFullYear()} Villarroel Ruiz, Rudy. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
