import { Router, Response } from 'express';
import { protect, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

// Protected route — requires valid JWT
router.get('/me', protect, async (req: AuthRequest, res: Response) => {
  res.json({
    message: 'You are authenticated!',
    userId: req.userId,
  });
});

export default router;