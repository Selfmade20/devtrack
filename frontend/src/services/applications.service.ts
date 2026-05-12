import api from './api';
import type { Application } from '../types';

export const getApplications = async (): Promise<Application[]> => {
  const response = await api.get('/applications');
  return response.data;
};

export const createApplication = async (data: {
  company: string;
  role: string;
  salary?: string;
  status: string;
}): Promise<Application> => {
  const response = await api.post('/applications', data);
  return response.data;
};

export const updateApplication = async (
  id: string,
  data: Partial<{
    company: string;
    role: string;
    salary: string;
    status: string;
  }>
): Promise<Application> => {
  const response = await api.patch(`/applications/${id}`, data);
  return response.data;
};

export const deleteApplication = async (id: string): Promise<void> => {
  await api.delete(`/applications/${id}`);
};