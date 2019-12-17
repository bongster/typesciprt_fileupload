import { Router } from 'express';
import UserRouter from './Users';
import AuthRouter from './Auth';
import UploadRouter from './Upload';
import RegisterRouter from './Register';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/auth', AuthRouter);
router.use('/upload', UploadRouter);
router.use('/register', RegisterRouter);

// Export the base-router
export default router;
