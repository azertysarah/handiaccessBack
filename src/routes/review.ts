import express, { RequestHandler } from 'express';
import { updateReview } from '../controllers/review';

const router = express.Router();

router.patch('/:id', updateReview as RequestHandler);

export default router;