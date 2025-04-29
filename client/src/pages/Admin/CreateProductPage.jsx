import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrls: "",
    stock: "",
    category: "",
    tags: "",
    available: true,
    isBestSeller:false,
    variants: "",
    options: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        imageUrls: formData.imageUrls.split(",").map((url) => url.trim()),
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        variants: formData.variants ? JSON.parse(formData.variants) : [],
        options: formData.options ? JSON.parse(formData.options) : [],
      };

      await axios.post("https://frproj1.onrender.com/api/products", payload, {
        withCredentials: true,
      });
      navigate("/admin/products");
    } catch (error) {
      console.error("Error creating product:", error.message);
      alert("Failed to create product. Please check your data.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Product</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-3 rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-3 rounded"
          rows={4}
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-3 rounded"
          required
        />
        <input
          type="text"
          name="imageUrls"
          value={formData.imageUrls}
          onChange={handleChange}
          placeholder="Image URLs (comma-separated)"
          className="border p-3 rounded"
        />
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="border p-3 rounded"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-3 rounded"
        />
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Tags (comma-separated)"
          className="border p-3 rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span>Available</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isBestSeller"
            checked={formData.isBestSeller}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span>BestSeller</span>
        </label>
        <textarea
          name="variants"
          value={formData.variants}
          onChange={handleChange}
          placeholder='Variants (JSON array: [{"title":"Small","price":100}])'
          className="border p-3 rounded"
          rows={4}
        />
        <textarea
          name="options"
          value={formData.options}
          onChange={handleChange}
          placeholder='Options (JSON array: [{"name":"Size","values":["S","M","L"]}])'
          className="border p-3 rounded"
          rows={4}
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          type="submit"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}

export default CreateProductPage;
