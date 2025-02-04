import axios from 'axios';
import { UserRequestDTO, UserResponseDTO } from '../types/UserTypes';

const API_URL = 'http://localhost:8080/api/users'; // Adjust this URL based on your backend

export const fetchUsers = async (): Promise<UserResponseDTO[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Assuming your backend returns a list of users
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (user: UserRequestDTO): Promise<UserResponseDTO> => {
  try {
    const response = await axios.post(API_URL, user);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (id: string, user: UserRequestDTO): Promise<UserResponseDTO> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, user);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
