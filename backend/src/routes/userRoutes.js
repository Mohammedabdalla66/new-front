import { Router } from 'express';
import { getMe, updateMe } from '../controllers/userController.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';

const router = Router();
router.get('/me', requireAuth, requireRole('client', 'admin'), getMe);
router.patch('/me', requireAuth, requireRole('client', 'admin'), updateMe);
export default router;


