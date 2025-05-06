import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
