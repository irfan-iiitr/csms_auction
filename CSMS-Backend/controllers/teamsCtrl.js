import Team from '../model/Team.js';
import asyncHandler from 'express-async-handler';

// @desc    Create a new team
// @route   POST /api/teams
// @access  Public
export const createTeam = asyncHandler(async (req, res) => {
  const { name, teamLeader,players,purse } = req.body;
  const newTeam = await Team.create({ name, teamLeader, players,purse });
  res.status(201).json(newTeam);
});

// @desc    Get all teams
// @route   GET /api/teams
// @access  Public
export const getAllTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

// @desc    Get a single team by ID
// @route   GET /api/teams/:id
// @access  Public
export const getTeamById = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (!team) {
    res.status(404);
    throw new Error('Team not found');
  }
  res.json(team);
});

// @desc    Update a team by ID
// @route   PUT /api/teams/:id
// @access  Public
export const updateTeamById = asyncHandler(async (req, res) => {
  const { name, players ,teamLeader} = req.body;
  const updatedTeam = await Team.findByIdAndUpdate(
    req.params.id,
    { name, players ,teamLeader},
    { new: true }
  );
  if (!updatedTeam) {
    res.status(404);
    throw new Error('Team not found');
  }
  res.json(updatedTeam);
});

// @desc    Delete a team by ID
// @route   DELETE /api/teams/:id
// @access  Public
export const deleteTeamById = asyncHandler(async (req, res) => {
  const deletedTeam = await Team.findByIdAndDelete(req.params.id);
  if (!deletedTeam) {
    res.status(404);
    throw new Error('Team not found');
  }
  res.json({ message: 'Team deleted successfully' });
});


export const isTeamLeader = asyncHandler(async (req, res) => {
    const response = await Team.findOne({teamLeader:req.params.id});
    if(response){
      res.status(200).json({ isTeamLeader: true });
    }
    else{
      res.status(500).json({ teamLeader:false});
    }
});
