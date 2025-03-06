import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  // Function to handle the scroll to product gallery
  const scrollToProducts = () => {
    const productSection = document.getElementById("products");
    productSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-white">
      {/* Background Image */}
      <div
        className="absolute w-screen h-screen bg-cover bg-left"
        id="mainimg"
        style={{
          backgroundImage: "url('./public/muebles-comedor-estilo-industrial.png')",
        }}
      />

      {/* Hero Content */}
      <motion.div
        className="relative text-center z-10 px-6 flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo with Animation */}
        <motion.img
          src="/logo-removebg-preview.png"
          alt="Logo"
          className="h-32 w-auto mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.8 }} // Enlarged without affecting other elements
          transition={{ duration: 0.8 }}
        />

        <h1 className="text-2xl font-bold text-gray-950">Muebles Industriales - 440 BIS</h1>
        <p className="text-lg mt-4 max-w-2xl mx-auto text-gray-800">
          Fabricamos muebles de estilo industrial a medida. Ofrecemos diseño y calidad al mejor precio.
        </p>
        <motion.button
          onClick={scrollToProducts} // Call the scroll function when clicked
          className="mt-6 inline-block bg-[#759eb8] text-black px-6 py-3 rounded-lg text-lg shadow-lg hover:bg-gray transition"
          whileHover={{ scale: 1.05 }}
        >
          Ver productos
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
