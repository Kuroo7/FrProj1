import { useState } from "react";
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
  const [productIdInput, setProductIdInput] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleAddProductId = () => {
    if (productIdInput) {
        
        setFormData({ ...formData, assignedProductIds: [...formData.assignedProductIds, productIdInput] });
      
      setProductIdInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/vouchers/create", formData, { withCredentials: true });
      navigate(`/admin/vouchers/${formData.partnerId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Create Vouchers</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input type="text" name="partnerId" value={formData.partnerId} onChange={handleChange} placeholder="Partner ID" className="border p-2 rounded" required />
        <input type="number" name="numberOfVouchers" value={formData.numberOfVouchers} onChange={handleChange} className="border p-2 rounded" />
        <input type="text" value={productIdInput} onChange={(e) => setProductIdInput(e.target.value)} placeholder="Assigned Product ID" className="border p-2 rounded" />
        <button type="button" onClick={handleAddProductId} className="bg-gray-500 text-white px-3 py-1 rounded">
          Add Product ID
        </button>
        <input type="number" name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} className="border p-2 rounded" />
        <input type="number" name="maxUses" value={formData.maxUses} onChange={handleChange} className="border p-2 rounded" />
        <label className="flex gap-2 items-center">
          <input type="checkbox" name="isGeneric" checked={formData.isGeneric} onChange={handleChange} />
          Is Generic Voucher
        </label>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Create Vouchers
        </button>
      </form>
    </div>
  );
}

export default CreateVouchersPage;
