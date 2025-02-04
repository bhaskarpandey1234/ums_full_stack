import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../utils/api'; // Import the fetchUsers function
import { UserResponseDTO } from '../../types/UserTypes'; // Import your types
import { useUserContext } from '../../context/UserContext';

interface UserSidebarProps {
  onHobbyDrop: (userId: string, hobby: string) => void; // Callback to handle the drop event
}

const UserSidebar: React.FC<UserSidebarProps> = ({ onHobbyDrop }) => {
  const [hobbies, setHobbies] = useState<string[]>([]); // State for hobbies
  const [filteredHobbies, setFilteredHobbies] = useState<string[]>([]); // State for filtered hobbies
  const [error, setError] = useState<string | null>(null); // State for error handling
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const { users } = useUserContext();

  useEffect(() => {
    if (!users) {
      setError('Failed to load hobbies');
      return;
    }

    try {
      const allHobbies = users.flatMap((user) => user.hobbies || []);
      const uniqueHobbies = Array.from(new Set(allHobbies));

      setHobbies(uniqueHobbies);
      setFilteredHobbies(uniqueHobbies);
      setError(null);
    } catch (err) {
      console.error('Error processing hobbies:', err);
      setError('Failed to process hobbies');
    }
  }, [users]);// Run when `users` change


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchTerm(searchQuery);
    
    const filtered = hobbies.filter((hobby) =>
      hobby.toLowerCase().includes(searchQuery)
    );
    setFilteredHobbies(filtered);
  };

  const handleDragStart = (e: React.DragEvent, hobby: string) => {
    e.dataTransfer.setData('text/plain', hobby); // Set the hobby as plain text
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent, userId: string) => {
    e.preventDefault();
    const hobby = e.dataTransfer.getData('hobby'); // Get the hobby being dropped
    if (hobby) {
      onHobbyDrop(userId, hobby); // Call the parent function to add the hobby to the user
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Allow the drop to happen
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', height: '500px', overflowY: 'auto' }}>
      <h3>Available Hobbies</h3>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search hobbies..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
          />
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {filteredHobbies.map((hobby) => (
              <li
                key={hobby}
                draggable
                onDragStart={(e) => handleDragStart(e, hobby)}
                style={{
                  margin: '5px 0',
                  padding: '5px 10px',
                  cursor: 'grab',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                {hobby}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default UserSidebar;
