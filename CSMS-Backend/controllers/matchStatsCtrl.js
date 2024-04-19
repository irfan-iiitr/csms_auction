import MatchStats from '../model/Match.js';
import asyncHandler from 'express-async-handler';

// @desc    Create a new match
// @route   POST /api/matches
// @access  Public
export const createMatch = asyncHandler(async (req, res) => {
  const { teamA, teamB, pointsA,pointsB } = req.body;
  const newMatch = await MatchStats.create({ teamA, teamB, pointsA,pointsB });
  res.status(201).json(newMatch);
});

// @desc    Get all matches
// @route   GET /api/matches
// @access  Public
export const getAllMatches = asyncHandler(async (req, res) => {
  const matches = await MatchStats.find();
  res.json(matches);
});

// @desc    Get a single match by ID
// @route   GET /api/matches/:id
// @access  Public
export const getMatchById = asyncHandler(async (req, res) => {
  const match = await MatchStats.findById(req.params.id);
  if (!match) {
    res.status(404);
    throw new Error('Match not found');
  }
  res.json(match);
});

// @desc    Update a match by ID
// @route   PUT /api/matches/:id
// @access  Public
export const updateMatchById = asyncHandler(async (req, res) => {
  const { teamA, teamB, points } = req.body;
  const updatedMatch = await MatchStats.findByIdAndUpdate(req.params.id, { teamA, teamB, points }, { new: true });
  if (!updatedMatch) {
    res.status(404);
    throw new Error('Match not found');
  }
  res.json(updatedMatch);
});

// @desc    Delete a match by ID
// @route   DELETE /api/matches/:id
// @access  Public
export const deleteMatchById = asyncHandler(async (req, res) => {
  const deletedMatch = await MatchStats.findByIdAndDelete(req.params.id);
  if (!deletedMatch) {
    res.status(404);
    throw new Error('Match not found');
  }
  res.json({ message: 'Match deleted successfully' });
});


