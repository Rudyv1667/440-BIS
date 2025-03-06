import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard"; // ✅ Import ProductCard
import { motion } from "framer-motion";
import supabase from "../supabaseClient"; // ✅ Import Supabase client

const ProductGallery = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from("products").select("*"); // ✅ Fetch all products
        if (error) throw error;
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="w-full text-center py-10 text-lg">Loading products...</div>;
  }

  return (
    <motion.div
      className="w-full flex justify-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 max-w-7xl w-full">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image_url={product.image_url} // ✅ Use actual image URL from the database
              name={product.name}
              description={product.description}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products available.</p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductGallery;
