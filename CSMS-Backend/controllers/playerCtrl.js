import Player from '../model/Player.js';
import Sports from '../model/Sport.js';
import asyncHandler from 'express-async-handler';


// @desc    Create a new player
// @route   POST /api/players
// @access  Public
export const createPlayer = asyncHandler(async (req, res) => {
  const { name, year, SportName, description, phoneNumber, socialMedia, achievements, basePrice,teamLeader } = req.body;

  const isTeamLeader = teamLeader === true;

  const newPlayer = await Player.create({ name, year, SportName, description, phoneNumber, socialMedia, achievements, basePrice ,teamLeader: isTeamLeader });
  res.status(201).json(newPlayer);
});

// @desc    Get all players
// @route   GET /api/players
// @access  Public
export const getAllPlayers = asyncHandler(async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

// @desc    Get a single player by ID
// @route   GET /api/players/:id
// @access  Public
export const getPlayerById = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (!player) {
    res.status(404);
    throw new Error('Player not found');
  }
  res.json(player);
});

// @desc    Update a player by ID
// @route   PUT /api/players/:id
// @access  Public
export const updatePlayerById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    
    const updatedPlayer = await Player.findByIdAndUpdate(id,data,{ new: true }).lean().exec();
    
    if (!updatedPlayer) {
      res.status(404);
      throw new Error('Player not found');
    }
    
    res.json(updatedPlayer);
  });
  

// @desc    Delete a player by ID
// @route   DELETE /api/players/:id
// @access  Public
export const deletePlayerById = asyncHandler(async (req, res) => {
  const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
  if (!deletedPlayer) {
    res.status(404);
    throw new Error('Player not found');
  }
  res.json({ message: 'Player deleted successfully' });
});


// @desc    Get players by sports name
// @route   GET /api/players/sports
// @access  Public
export const getPlayersBySportsName = asyncHandler(async (req, res) => {
  // console.log(req.body.sportName);
 
   const sport = await Sports.findOne({ name: req.body.sportName });
   if (!sport) {
     res.status(404);
     throw new Error('Sport not found');
   }
 
   const players = await Player.find({ SportName: sport._id });
   if (!players) {
     res.status(404);
     throw new Error('Players not found');
   }
 
   res.json(players);
 });