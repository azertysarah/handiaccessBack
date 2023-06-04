import express, { RequestHandler } from 'express';
import { getAllPlaces, getPlace, updatePlace } from '../controllers/place';

const router = express.Router();

router.get('', getAllPlaces as RequestHandler);
router.get('/:id', getPlace as RequestHandler);
router.patch('/:id', updatePlace as RequestHandler);

export default router;