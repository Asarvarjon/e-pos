// src/routes/index.ts
import express from 'express';
import { getLargestPopulation } from '../controllers/population.controller';

const router = express.Router();

// Combine all routes
router.get('/largest-population', getLargestPopulation);

export default router;
