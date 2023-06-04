import { Router, RequestHandler } from 'express';
import { authenticate } from '../controllers/authentication';

const router = Router();

router.post('/signup', authenticate as RequestHandler);

export default router;
