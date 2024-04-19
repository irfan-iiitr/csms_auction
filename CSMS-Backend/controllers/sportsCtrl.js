import Sports from '../model/Sport.js';
import asyncHandler from 'express-async-handler';

// @desc    Create a new sport
// @route   POST /api/sports
// @access  Public
export const createSport = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const newSport = await Sports.create({ name });
  res.status(201).json(newSport);
});

// @desc    Get all sports
// @route   GET /api/sports
// @access  Public
export const getAllSports = asyncHandler(async (req, res) => {
  const sports = await Sports.find();
  res.json(sports);
});

// @desc    Get a single sport by ID
// @route   GET /api/sports/:id
// @access  Public
export const getSportById = asyncHandler(async (req, res) => {
  const sport = await Sports.findById(req.params.id);
  if (!sport) {
    res.status(404);
    throw new Error('Sport not found');
  }
  res.json(sport);
});

// @desc    Update a sport by ID
// @route   PUT /api/sports/:id
// @access  Public
export const updateSportById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const updatedSport = await Sports.findByIdAndUpdate(id, { name }, { new: true });
  if (!updatedSport) {
    res.status(404);
    throw new Error('Sport not found');
  }
  res.json(updatedSport);
});

// @desc    Delete a sport by ID
// @route   DELETE /api/sports/:id
// @access  Public
export const deleteSportById = asyncHandler(async (req, res) => {
  const deletedSport = await Sports.findByIdAndDelete(req.params.id);
  if (!deletedSport) {
    res.status(404);
    throw new Error('Sport not found');
  }
  res.json({ message: 'Sport deleted successfully' });
});
