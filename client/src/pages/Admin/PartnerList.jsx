import { useEffect, useState } from "react";
import axios from "axios";

const PartnerList = ({ onPartnerClick }) => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/admin/partners", { withCredentials: true });
        setPartners(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  if (loading) return <div className="text-center p-4">Loading partners...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {partners.map((partner) => (
        <div
          key={partner._id}
          className="border rounded-lg p-4 cursor-pointer hover:shadow-lg"
          onClick={() => onPartnerClick(partner._id)}
        >
          <h2 className="text-xl font-semibold">{partner.name}</h2>
          <p>Email: {partner.email}</p>
          <p>Total Vouchers: {partner.totalVouchers}</p>
          <p>Vouchers Used: {partner.usedVouchers}</p>
        </div>
      ))}
    </div>
  );
};

export default PartnerList;
