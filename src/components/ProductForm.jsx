import React, { useState, useEffect } from "react";
import axios from "axios";
import supabase from "../supabaseClient";
import scrollToTop from "./ScrollToTop"; // Import scroll function

const ProductForm = ({ editingProduct, setEditingProduct }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setDescription(editingProduct.description || "");
      setDetail(editingProduct.detail || "");
      setPreview(editingProduct.image_url);
      setImages(editingProduct.images || []);
    } else {
      setName("");
      setDescription("");
      setImage(null);
      setImages([]);
      setPreview(null);
      setDetail("");
    }
  }, [editingProduct]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const deleteMainImage = () => {
    setImage(null);
    setPreview(null);
  };

  const deleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!name || !description || !detail) {
      alert("Por favor complete todos los campos!");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = preview;
      if (image) {
        imageUrl = await uploadImageToCloudinary(image);
        if (!imageUrl) throw new Error("Image upload failed");
      }

      const imageUrls = await Promise.all(
        images.map(async (img) => (img instanceof File ? await uploadImageToCloudinary(img) : img))
      );

      const productData = { name, description, image_url: imageUrl, images: imageUrls, detail };

      if (editingProduct) {
        const { error } = await supabase.from("products").update(productData).eq("id", editingProduct.id);
        if (error) throw error;
        alert("El producto fue editado exitosamente!");
      } else {
        const { error } = await supabase.from("products").insert([productData]);
        if (error) throw error;
        alert("El producto fue agregado exitosamente!");
      }

      setName("");
      setDescription("");
      setImage(null);
      setImages([]);
      setPreview(null);
      setDetail("");
      setEditingProduct(null);
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
    window.location.reload();
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center">{editingProduct ? "Edite un producto" : "Agregue un producto"}</h2>

      <input type="text" placeholder="Nombre del producto" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full rounded" />
      <textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 w-full rounded" />
      <textarea placeholder="Detalle del producto" value={detail} onChange={(e) => setDetail(e.target.value)} className="border p-2 w-full rounded" />

      <label className="block font-semibold mt-2">Imagen principal</label>
      <input type="file" onChange={handleMainImageChange} className="border p-2 w-full rounded" />
      {preview && (
        <div className="relative">
          <img src={preview} alt="Preview" className="mt-2 w-full h-48 object-cover rounded-lg border" />
          <button onClick={deleteMainImage} className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">X</button>
        </div>
      )}

      <label className="block font-semibold mt-2">Imágenes adicionales</label>
      <input type="file" multiple onChange={handleImageChange} className="border p-2 w-full rounded" />
      <div className="flex space-x-2 mt-2">
        {images.map((img, index) => (
          <div key={index} className="relative">
            <img src={img instanceof File ? URL.createObjectURL(img) : img} alt={`Preview ${index + 1}`} className="w-32 h-32 object-cover rounded" />
            <button onClick={() => deleteImage(index)} className="absolute top-1 right-1 bg-red-500 text-white px-1 rounded">X</button>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} className={`p-2 rounded w-full ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"}`} disabled={loading}>
        {loading ? "Guardando..." : editingProduct ? "Editar producto" : "Agregar producto"}
      </button>

      {editingProduct && (
        <button onClick={() => { setEditingProduct(null); ScrollToTop(); }} className="mt-2 bg-gray-500 text-white p-2 rounded w-full">
          Cancelar Edición
        </button>
      )}
    </div>
  );
};

export default ProductForm;
