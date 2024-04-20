import express from 'express';
import {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById,
  isTeamLeader,
  getTeamByTeamLeaderId
} from '../controllers/teamsCtrl.js';

const TeamRoutes = express.Router();

TeamRoutes.post('/', createTeam);
TeamRoutes.post('/isTeamLeader/:id', isTeamLeader);
TeamRoutes.get('/',  getAllTeams);
TeamRoutes.get('/:id', getTeamById);
TeamRoutes.get('/team/:id', getTeamByTeamLeaderId);
TeamRoutes.patch('/:id', updateTeamById);
TeamRoutes.delete('/:id',deleteTeamById);

export default TeamRoutes;
