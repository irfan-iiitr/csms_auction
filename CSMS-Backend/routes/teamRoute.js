import express from 'express';
import {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById,
  isTeamLeader
} from '../controllers/teamsCtrl.js';

const TeamRoutes = express.Router();

TeamRoutes.post('/', createTeam);
TeamRoutes.post('/isTeamLeader/:id', isTeamLeader);
TeamRoutes.get('/',  getAllTeams);
TeamRoutes.get('/:id', getTeamById);
TeamRoutes.patch('/:id', updateTeamById);
TeamRoutes.delete('/:id',deleteTeamById);

export default TeamRoutes;
