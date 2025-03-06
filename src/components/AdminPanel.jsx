import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import PWAInstallButton from "./PWAInstallButton"; // Import Install Button Component

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:5000/products");
      const productsData = await response.json();
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      return result.url; // Assuming the backend returns an object with a `url` key
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  // Handle when a product is added or updated
  const handleProductChange = (updatedProduct) => {
    if (updatedProduct.id) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    } else {
      setProducts((prevProducts) => [...prevProducts, updatedProduct]);
    }
    setEditingProduct(null); // Reset editing mode
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>

      {/* PWA Install Button (Only appears when installable) */}
      <div className="flex justify-center mb-4">
        <PWAInstallButton />
      </div>

      <div className="mb-6 p-4 text-gray-800 border rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-4">
          {editingProduct ? "Edite el producto" : "Panel de administrador"}
        </h2>
        <ProductForm
          setProducts={handleProductChange}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          uploadImageToCloudinary={uploadImageToCloudinary}
        />
      </div>

      <div className="p-4 border rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Lista de Productos
        </h2>
        <div>
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-lg mb-4 shadow-md bg-white text-gray-700"
              >
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-700">{product.description}</p>
                <p className="text-gray-500 italic">{product.detail}</p>

                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded mt-2"
                  />
                )}

                {product.images && product.images.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-lg font-semibold">
                      Imágenes adicionales:
                    </h4>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {product.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Product Image ${index + 1}`}
                          className="w-full h-32 object-cover rounded"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-2 flex space-x-2 justify-center">
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-white p-2 rounded"
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
      </div>
    </div>
  );
};

export default AdminPanel;
