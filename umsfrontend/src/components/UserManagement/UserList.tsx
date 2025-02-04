import React, { useState, useEffect, useRef } from 'react';
import { useUserContext } from '../../context/UserContext';
import UserForm from './UserForm';
import { toast } from 'react-toastify';

const UserList: React.FC = () => {
  const { users, removeUser, error } = useUserContext();
  const [editingUserId, setEditingUserId] = useState<string | undefined>(undefined);
  const formRef = useRef<HTMLDivElement>(null);

  const handleEdit = (userId: string) => {
    setEditingUserId((prev) => (prev === userId ? undefined : userId)); // Toggle form visibility
  };

  useEffect(() => {
    if (editingUserId && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      formRef.current.querySelector('input')?.focus();
    }
  }, [editingUserId]);

  const handleDelete = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      removeUser(userId);
      toast.success('User deleted successfully!');
    } else {
      toast.info('User deletion canceled');
    }
  };

  const handleUpdateSuccess = () => {
    setEditingUserId(undefined);
    toast.success('User updated successfully!');
  };

  if (error) {
    toast.error(`Error: ${error}`);
  }

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">User List</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No users available.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center bg-white shadow rounded-md p-4"
            >
              <span>
                <strong>{user.username}</strong> (Age: {user.age}) - Hobbies:{' '}
                {user.hobbies.join(', ')}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(user.id)}
                  className={`px-3 py-1 ${editingUserId === user.id ? 'bg-gray-500' : 'bg-blue-500'} text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                >
                  {editingUserId === user.id ? 'Cancel' : 'Update'}
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {editingUserId && (
        <div ref={formRef} className="mt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Edit User</h2>
          <UserForm userId={editingUserId} onSuccess={handleUpdateSuccess} />
        </div>
      )}
    </div>
  );
};

export default UserList;
