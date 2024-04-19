import express from 'express';
import {
  createPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayerById,
  deletePlayerById,
  getPlayersBySportsName
} from '../controllers/playerCtrl.js';

const PlayerRoutes = express.Router();

PlayerRoutes.post('/', createPlayer);
PlayerRoutes.post('/sport', getPlayersBySportsName);
PlayerRoutes.get('/', getAllPlayers);
PlayerRoutes.get('/:id', getPlayerById);
PlayerRoutes.patch('/:id', updatePlayerById);
PlayerRoutes.delete('/:id', deletePlayerById);

export default PlayerRoutes;
