import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import supabase from "../supabaseClient";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [dimensions, setDimensions] = useState({ width: "", length: "", height: "" });
  const [selectedImage, setSelectedImage] = useState(0);

  // Fetch product data by ID from Supabase
  useEffect(() => {
    const fetchProductDetails = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("name, description, image_url, detail, images")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching product details:", error);
      } else {
        setProduct(data);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleChange = (e) => {
    setDimensions({ ...dimensions, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = () => {
    const phoneNumber = "+542974288934"; // Replace with the specific phone number
    const message = `Buenas tardes, quisiera preguntar por el precio del producto "${product.name}" con las siguientes dimensiones: Profundidad: ${dimensions.width} cm, Largo: ${dimensions.length} cm, Altura: ${dimensions.height} cm`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };    

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold">Product Details</h2>

      {/* Image Gallery */}
      <div className="flex flex-col items-center mt-6">
        <motion.img
          key={selectedImage}
          src={product.images[selectedImage] || "https://via.placeholder.com/600x400?text=No+Image"}
          alt="Product"
          className="w-full max-w-lg rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="flex mt-4 space-x-2">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Thumbnail"
              className={`w-16 h-16 object-cover cursor-pointer mb-2 rounded-lg border-2 ${
                selectedImage === index ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      <p className="text-gray-700 mt-6 text-justify px-5 w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
        {product.detail}
      </p>

      {/* Stylish Bullet Points */}
      <div className="flex flex-col items-center">
        <h3 className="text-2xl font-semibold">Características del producto</h3>
        <ul className="mt-2 space-y-2 text-center">
          {["Realizamos cualquier medida que necesites, somos fabricantes.", "El hierro puede ser en color negro o blanco.", "Podés elegir el color de la madera."].map((point, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-700">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Customization Form */}
      <form className="mt-6 w-4/5 mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4 text-gray-900">Personaliza tu producto</h3>

        <label className="block text-gray-700">Profundidad (cm)</label>
        <input
          type="text"
          name="width"
          value={dimensions.width}
          onChange={handleChange}
          className="border border-gray-400 p-2 text-black w-full mb-4 rounded-md outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
        />

        <label className="block text-gray-700">Largo (cm)</label>
        <input
          type="text"
          name="length"
          value={dimensions.length}
          onChange={handleChange}
          className="border border-gray-400 p-2 w-full text-black mb-4 rounded-md outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
        />

        <label className="block text-gray-700">Altura (cm)</label>
        <input
          type="text"
          name="height"
          value={dimensions.height}
          onChange={handleChange}
          className="border border-gray-400 p-2 w-full mb-4 text-black rounded-md outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
        />

        <button type="button" onClick={handleWhatsApp} className="bg-green-500 text-white p-3 rounded">
          Ir a Whatsapp
        </button>
      </form>
    </div>
  );
};

export default ProductDetail;