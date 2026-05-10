import api from './api';
import type { AuthResponse } from '../types';

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};