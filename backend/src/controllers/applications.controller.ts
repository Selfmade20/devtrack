import { Response } from 'express';
import prisma from '../config/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

// Create a new application
export const createApplication = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { company, role, salary, status, appliedDate } = req.body;

    if (!company || !role) {
      res.status(400).json({ message: 'Company and role are required' });
      return;
    }

    const application = await prisma.application.create({
      data: {
        company,
        role,
        salary,
        status: status || 'applied',
        appliedDate: appliedDate ? new Date(appliedDate) : new Date(),
        userId: req.userId as string,
      },
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all applications for logged in user
export const getApplications = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const applications = await prisma.application.findMany({
      where: { userId: req.userId as string },
      include: { notes: true },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single application
export const getApplication = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;

    const application = await prisma.application.findFirst({
      where: {
        id,
        userId: req.userId as string,
      },
      include: { notes: true },
    });

    if (!application) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an application
export const updateApplication = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { company, role, salary, status, appliedDate } = req.body;

    // Check application exists and belongs to user
    const existing = await prisma.application.findFirst({
      where: {
        id,
        userId: req.userId as string,
      },
    });

    if (!existing) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    const updated = await prisma.application.update({
      where: { id },
      data: {
        company,
        role,
        salary,
        status,
        appliedDate: appliedDate ? new Date(appliedDate) : undefined,
      },
    });

    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
  
};

// Delete an application
export const deleteApplication = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;

    // Check application exists and belongs to user
    const existing = await prisma.application.findFirst({
      where: {
        id,
        userId: req.userId as string,
      },
    });

    if (!existing) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    await prisma.application.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};