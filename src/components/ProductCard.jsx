import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const ProductCard = ({ id, image_url, name, description }) => {
  const [zoomed, setZoomed] = useState(false);

  // ✅ Fallback image in case there's no image_url
  const fallbackImage = "https://via.placeholder.com/500?text=No+Image";
  const optimizedImage = image_url
    ? image_url.includes("cloudinary.com")
      ? image_url.replace("/upload/", "/upload/w_500,h_500,c_fill/") // Optimize Cloudinary images
      : image_url
    : fallbackImage;

  return (
    <>
      {/* Product Card */}
      <motion.div
        className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={optimizedImage}
          alt={name || "Product Image"}
          className="w-full h-48 object-cover"
          onMouseEnter={() => setZoomed(true)}
          onMouseLeave={() => setZoomed(false)}
        />
        <div className="p-6">
          <h2 className="text-xl text-gray-800 font-semibold mb-2">{name || "Product Name"}</h2>
          <p className="text-gray-600 text-sm mb-4">{description || "No description available."}</p>
          {/* Redirecting Button */}
          <Link
            to={`/product/${id}`}
            className="bg-[#c5d5ea] text-white px-4 py-2 rounded hover:bg-blue-600 transition block text-center"
          >
            Ver detalles
          </Link>
        </div>
      </motion.div>

      {/* Fullscreen Zoomed Image */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-md flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={optimizedImage}
              alt={name}
              className="max-w-3xl max-h-3/4 rounded-lg shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;