import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const createApplicationSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  role: z.string().min(1, 'Role is required'),
  salary: z.string().optional(),
  status: z
    .enum(['applied', 'interview', 'offer', 'rejected'])
    .default('applied'),
  appliedDate: z.string().optional(),
});

export const updateApplicationSchema = z.object({
  company: z.string().min(1).optional(),
  role: z.string().min(1).optional(),
  salary: z.string().optional(),
  status: z.enum(['applied', 'interview', 'offer', 'rejected']).optional(),
  appliedDate: z.string().optional(),
});