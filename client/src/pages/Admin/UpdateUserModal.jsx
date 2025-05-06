import { useState } from "react";
import axios from "axios";
import { prodUri } from "../../constant";

const UpdateUserModal = ({ user, onClose, refreshUsers }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${prodUri}api/admin/user/${user._id}`,
        { name, email, role },
        { withCredentials: true }
      );
      refreshUsers();
      onClose();
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded shadow-lg w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">X</button>

        <h2 className="text-xl font-bold mb-4">Update User</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="partner">Partner</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-600">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;
