import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://frproj1.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`https://frproj1.onrender.com/api/products/${id}`, {
        withCredentials: true,
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link
          to="/admin/products/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white border rounded shadow p-4">
              {product.imageUrls?.length > 0 && (
                <img
                  src={product.imageUrls[0]}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600 line-clamp-2">{product.description}</p>
              <p className="text-gray-800 font-semibold mt-1">₹{product.price}</p>
              <p className="text-sm text-gray-500">Category: {product.category || "N/A"}</p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              <p className="text-sm text-gray-500">Stock: {product.isBestSeller}</p>
              <p className={`text-sm mt-1 ${product.available ? "text-green-600" : "text-red-600"}`}>
                {product.available ? "Available" : "Out of Stock"}
              </p>
              {product.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {product.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <Link
                  to={`/admin/products/${product._id}/edit`}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
