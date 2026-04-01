"use client";

import { useEffect, useState } from "react";
import { FiTrash2, FiUser, FiShield, FiMail, FiCalendar } from "react-icons/fi";
import { Modal } from "app/components/ui/Modal";
import { toastError, toastSuccess } from "lib/toast";

const RoleBadge = ({ role }) => {
  if (role === 'ADMIN') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-50 text-purple-700 border border-purple-100">
        <FiShield size={10} /> Admin
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-100">
      <FiUser size={10} /> User
    </span>
  );
};

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

    const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
        const res = await fetch("/api/users", {
        method: "DELETE",
        body: JSON.stringify({ id: userToDelete.id }),
        headers: { "Content-Type": "application/json" },
        });

        const result = await res.json();

        if (res.ok) {
        toastSuccess("User deleted successfully!");
        setUsers(users.filter((u) => u.id !== userToDelete.id));
        setUserToDelete(null);
        } else {
        toastError(result.error || "Failed to delete user");
        }
    } catch (error) {
        toastError("An error occurred while deleting the user.");
    }
    };

  if (loading) return <div className="p-8 text-gray-500 animate-pulse">Loading users...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#212c4a]">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage system access and roles</p>
        </div>
        <span className="bg-[#f35d36]/10 text-[#f35d36] px-4 py-1.5 rounded-full text-xs font-bold border border-[#f35d36]/20">
          {users.length} Total Accounts
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-100 bg-white">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-50/50 text-gray-500 font-semibold border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">User Details</th>
              <th className="px-6 py-4">Email Address</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Joined Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="bg-white hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200 flex items-center justify-center text-gray-400">
                      {user.image ? (
                        <img src={user.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <FiUser size={20} />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-[#212c4a] line-clamp-1">
                        {user.name || "Guest User"}
                      </div>
                      <div className="text-[10px] text-gray-400 font-mono tracking-tight uppercase">ID: {user.id.slice(-6)}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiMail size={14} className="text-gray-400" />
                    {user.email}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <RoleBadge role={user.role} />
                </td>

                <td className="px-6 py-4 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <FiCalendar size={12} />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => setUserToDelete(user)}
                      className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                      title="Delete User"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={!!userToDelete} onClose={() => setUserToDelete(null)} title="Delete User">
        <div>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete <span className="font-bold text-[#212c4a]">{userToDelete?.email}</span>? This account will be permanently removed.
          </p>
          <div className="flex justify-end gap-3">
            <button 
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg" 
              onClick={() => setUserToDelete(null)}
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm" 
              onClick={confirmDelete}
            >
              Delete User
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}