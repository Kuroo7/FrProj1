import { useEffect, useState } from "react";
import axios from "axios";

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("https://frproj1.onrender.com/api/admin/dashboard", { withCredentials: true });
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading Dashboard...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Total Users" value={stats.totalUsers} />
        <DashboardCard title="Total Products" value={stats.totalProducts} />
        <DashboardCard title="Total Vouchers" value={stats.totalVouchers} />
        <DashboardCard title="Total Orders" value={stats.totalOrders} />
        <DashboardCard title="Revenue" value={`₹ ${stats.totalRevenue}`} />
      </div>
    </div>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-2xl">{value}</p>
    </div>
  );
}

export default DashboardPage;
