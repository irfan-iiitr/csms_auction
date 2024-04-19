import express from 'express';
import {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatchById,
  deleteMatchById
} from '../controllers/matchStatsCtrl.js';

const MatchRoutes = express.Router();

MatchRoutes.post('/', createMatch);
MatchRoutes.get('/', getAllMatches);
MatchRoutes.get('/:id', getMatchById);
MatchRoutes.patch('/:id', updateMatchById);
MatchRoutes.delete('/:id', deleteMatchById);

export default MatchRoutes;
