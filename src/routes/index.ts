import { Router } from 'express';
import UserRouter from './Users';
import AuthRouter from './Auth';
import UploadRouter from './Upload';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/auth', AuthRouter);
router.use('/upload', UploadRouter);

// Export the base-router
export default router;
