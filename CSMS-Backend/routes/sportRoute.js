import express from 'express';
import {
    createSport,
    getAllSports,
    getSportById,
    updateSportById,
    deleteSportById
  } from '../controllers/sportsCtrl.js';
  
  const SportsRoutes = express.Router();
  
  SportsRoutes.post('/', createSport);
  SportsRoutes.get('/', getAllSports);
  SportsRoutes.get('/:id', getSportById);
  SportsRoutes.patch('/:id', updateSportById);
  SportsRoutes.delete('/:id', deleteSportById);

  
  export default SportsRoutes;