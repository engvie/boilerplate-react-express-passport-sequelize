import apiClient from './apiClient';

export const getUser = async () => {
  try {
    return await apiClient(`/auth/user`);
  } catch (error) {
    console.error('Failed to fetch user:', error.message);
  }
}
