import React, { useEffect, useState } from "react";

const ProductList = ({ products = [], setEditingProduct }) => {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const productsData = await response.json();
        setProductsData(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (products.length === 0) {
      fetchProducts();
    } else {
      setProductsData(products); // If products are passed as props, use them directly
    }
  }, [products]);

  return (
    <div>
      {productsData.length > 0 ? (
        productsData.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg mb-4 shadow-md bg-white text-gray-700"
          >
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-gray-500 italic">{product.detail}</p> {/* Displaying the new 'detail' field */}

            {/* Displaying the product images */}
            {product.images && product.images.length > 0 ? (
              <div className="flex space-x-2 mt-2">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} image ${index + 1}`}
                    className="w-32 h-32 object-cover rounded"
                  />
                ))}
              </div>
            ) : (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded mt-2"
              />
            )}

            <div className="mt-2 flex space-x-2 justify-center">
              <button
                onClick={() => {
                  setEditingProduct(product);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-yellow-500 text-white p-2 rounded"
              >
                Editar producto
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default ProductList;