import express, { RequestHandler } from 'express';
import { getAllPlaces, getPlace } from '../controllers/place';

const router = express.Router();

router.get('', getAllPlaces as RequestHandler);
router.get('/:id', getPlace as RequestHandler);

export default router;