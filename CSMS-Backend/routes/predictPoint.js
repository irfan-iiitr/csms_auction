import predictScores from '../utils/predictionOfPoints.js';
import express from 'express';

const predictionRoutes = express.Router();

predictionRoutes.post('/', predictScores);

export default predictionRoutes;