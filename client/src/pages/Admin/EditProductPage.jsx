import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrls: "",
    category: "",
    stock: "",
    tags: "",
    available: true,
    isBestSeller:false,
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        const product = res.data;
        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          imageUrls: (product.imageUrls || []).join(", "),
          category: product.category || "",
          stock: product.stock || "",
          tags: (product.tags || []).join(", "),
          available: product.available ?? true,
          isBestSeller: product.isBestSeller ?? false,
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        imageUrls: formData.imageUrls.split(",").map((url) => url.trim()),
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      };

      await axios.put(`http://localhost:5000/api/products/${id}`, payload, {
        withCredentials: true,
      });
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 rounded"
          required
        />
        <input
          name="imageUrls"
          value={formData.imageUrls}
          onChange={handleChange}
          placeholder="Image URLs (comma separated)"
          className="border p-2 rounded"
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="border p-2 rounded"
        />
        <input
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="border p-2 rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span className="text-sm">Available</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isBestSeller"
            checked={formData.isBestSeller}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span className="text-sm">BestSeller</span>
        </label>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditProductPage;
