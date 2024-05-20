import express from 'express';
import { countryController } from '../controllers/countryController.js';

const router = express.Router();

router.get('/', countryController)

export default router;