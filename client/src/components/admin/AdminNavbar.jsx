import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/admin/dashboard" className="font-bold text-xl">Admin Panel</Link>
      <div className="space-x-4">
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/vouchers">Vouchers</Link>
        <Link to="/admin/vouchers/create">Create Vouchers</Link>
        <Link to="/admin/orders">Orders</Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
