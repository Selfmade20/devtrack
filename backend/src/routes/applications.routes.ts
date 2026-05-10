import { Router } from 'express';
import {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  deleteApplication,
} from '../controllers/applications.controller';
import { protect } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import {
  createApplicationSchema,
  updateApplicationSchema,
} from '../middleware/schemas';

const router = Router();

router.use(protect);

router.post('/', validate(createApplicationSchema), createApplication);
router.get('/', getApplications);
router.get('/:id', getApplication);
router.patch('/:id', validate(updateApplicationSchema), updateApplication);
router.delete('/:id', deleteApplication);

export default router;