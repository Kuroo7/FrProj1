import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateVouchersPage() {
  const [formData, setFormData] = useState({
    partnerId: "",
    numberOfVouchers: 1,
    assignedProductIds: [],
    discountPercentage: 10,
    maxUses: 1,
    isGeneric: true,
  });
  const [partners, setPartners] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, partnersRes] = await Promise.all([
          axios.get("https://frproj1.onrender.com/api/products"),
          axios.get("https://frproj1.onrender.com/api/admin/users", { withCredentials: true })
        ]);
        // console.log(partnersRes.data);
        
        // Filter partners and format data
        const filteredPartners = partnersRes.data
          .filter(user => user.role === "partner")
          .map(partner => ({
            id: partner._id,
            name: partner.name,
            email: partner.email
          }));
        // console.log(filteredPartners);
        
        // Format products data
        const formattedProducts = productsRes.data.map(product => ({
          id: product._id,
          name: product.name,
          price: product.price
        }));

        setPartners(filteredPartners);
        setProducts(formattedProducts);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(partners);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handlePartnerSelect = (e) => {
    const partnerId = e.target.value;
    setFormData(prev => ({
      ...prev,
      partnerId
    }));
  };

  const handleProductSelect = (e) => {
    const productId = e.target.value;
    if (!productId || formData.assignedProductIds.includes(productId)) return;
    
    setFormData(prev => ({
      ...prev,
      assignedProductIds: [...prev.assignedProductIds, productId]
    }));
  };

  const removeProduct = (productId) => {
    setFormData(prev => ({
      ...prev,
      assignedProductIds: prev.assignedProductIds.filter(id => id !== productId)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://frproj1.onrender.com/api/vouchers/create", 
        formData, 
        { withCredentials: true }
      );
      navigate(`/admin/vouchers/${formData.partnerId}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Vouchers</h1>
      <form onSubmit={handleSubmit} className="grid gap-6">
        {/* Partner Selection */}
        <div className="space-y-2">
          <label className="block font-medium">Select Partner</label>
          <select
            value={formData.partnerId}
            onChange={handlePartnerSelect}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select a Partner</option>
            {partners.map(partner => (
              <option key={partner.id} value={partner.id}>
                {partner.name} ({partner.email})
              </option>
            ))}
          </select>
        </div>

        {/* Product Selection */}
        <div className="space-y-2">
          <label className="block font-medium">Assign Products</label>
          <select
            onChange={handleProductSelect}
            className="border p-2 rounded w-full"
            defaultValue=""
          >
            <option value="">Select Products</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} (Rs. {product.price})
              </option>
            ))}
          </select>
          
          {/* Selected Products */}
          <div className="mt-3">
            {formData.assignedProductIds.map(productId => {
              const product = products.find(p => p.id === productId);
              return (
                <div key={productId} className="flex items-center justify-between bg-gray-100 p-2 rounded mb-2">
                  <span>{product?.name || "Unknown Product"}</span>
                  <button
                    type="button"
                    onClick={() => removeProduct(productId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Other Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block font-medium">Number of Vouchers</label>
            <input
              type="number"
              name="numberOfVouchers"
              min="1"
              value={formData.numberOfVouchers}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Discount Percentage (%)</label>
            <input
              type="number"
              name="discountPercentage"
              min="1"
              max="100"
              value={formData.discountPercentage}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Max Uses per Voucher</label>
            <input
              type="number"
              name="maxUses"
              min="1"
              value={formData.maxUses}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="space-y-2 flex items-center">
            <input
              type="checkbox"
              name="isGeneric"
              checked={formData.isGeneric}
              onChange={handleChange}
              className="mr-2"
              id="isGeneric"
            />
            <label htmlFor="isGeneric">Generic Voucher</label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium"
        >
          Create Vouchers
        </button>
      </form>
    </div>
  );
}

export default CreateVouchersPage;