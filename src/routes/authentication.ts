import { Router, RequestHandler } from 'express';
import { authenticate, login } from '../controllers/authentication';
import { checkFields } from '../middleware/authentication-verification';

const router = Router();

router.post('/signup', checkFields as RequestHandler, authenticate as RequestHandler);
router.post('/login', login as RequestHandler);

export default router;

