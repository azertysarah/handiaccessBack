import { Router, RequestHandler } from 'express';
import { authenticate, login } from '../controllers/authentication';

const router = Router();

router.post('/signup', authenticate as RequestHandler);
router.post('/login', login as RequestHandler);

export default router;

