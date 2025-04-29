import { useEffect, useState } from "react";
import axios from "axios";

const VoucherList = ({ partnerId, onBack }) => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/partner/partners/${partnerId}/vouchers`, { withCredentials: true }  );
        setVouchers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVouchers();
  }, [partnerId]);

  if (loading) return <div className="text-center p-4">Loading vouchers...</div>;

  return (
    <div>
      <button
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        onClick={onBack}
      >
        ← Back to Partners
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vouchers.map((voucher) => (
          <div key={voucher._id} className="border rounded-lg p-4">
            <h3 className="text-lg font-bold">Code: {voucher.code}</h3>
            <p>Discount: {voucher.discountPercentage}%</p>
            <p>Status: {voucher.isUsed ? "Used" : "Not Used"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoucherList;
