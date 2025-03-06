import "dotenv/config";
import express from "express";
import multer from "multer";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Uses service role to bypass RLS (use carefully)
);

// Multer Storage (Temporary Memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Image Upload Route (For Single Image)
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const uploadStream = cloudinary.uploader.upload_stream(
    { folder: "products" },
    (error, result) => {
      if (error) {
        console.error("Upload Error:", error);
        return res.status(500).json({ error: error.message });
      }
      res.json({ url: result.secure_url });
    }
  );

  uploadStream.end(req.file.buffer);
});

// Image Upload Route (For Multiple Images)
app.post("/upload-multiple", upload.array("images", 10), (req, res) => { // Limit to 10 images
  if (!req.files || req.files.length === 0) return res.status(400).json({ error: "No files uploaded" });

  const uploadPromises = req.files.map((file) =>
    new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          resolve(result.secure_url);
        }
      );
      uploadStream.end(file.buffer);
    })
  );

  Promise.all(uploadPromises)
    .then((urls) => {
      res.json({ urls });
    })
    .catch((error) => {
      console.error("Upload Error:", error);
      res.status(500).json({ error: error.message });
    });
});

// Route to Add Product to Supabase
app.post("/add-product", async (req, res) => {
  const { name, description, detail, imageUrl, images } = req.body;

  if (!name || !description || !detail || !imageUrl || !images) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .insert([{ name, description, detail, image_url: imageUrl, images }])
      .select("*");

    if (error) throw error;

    res.json({ message: "Product added successfully!", product: data[0] });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route to Fetch All Products
app.get("/products", async (req, res) => {
  try {
    const { data, error } = await supabase.from("products").select("*");

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
