import { useEffect, useState } from "react";
import axios from "axios";
import UpdateUserModal from "./UpdateUserModal";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("https://frproj1.onrender.com/api/admin/users", { withCredentials: true }); // assuming cookie auth
      setUsers(data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`https://frproj1.onrender.com/api/admin/user/${id}`, { withCredentials: true });
      fetchUsers();
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4 capitalize">{user.role}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleUpdate(user)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <UpdateUserModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
          refreshUsers={fetchUsers}
        />
      )}
    </div>
  );
};

export default AdminUsersPage;
