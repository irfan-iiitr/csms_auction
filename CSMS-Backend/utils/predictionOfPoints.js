import * as tf from '@tensorflow/tfjs';
import asyncHandler from 'express-async-handler';
import axios from 'axios';

// Define the team indices
const teamIndices = {
  'CSK': 0,
  'RCB': 1,
  'MI': 2
};

// Global variable to store the trained model
let trainedModel;

// Function to train the model if it's not already trained
async function getTrainedModel() {
  if (!trainedModel) {
    try {
      // Fetch data from the endpoint
      const response = await axios.get('http://localhost:2030/api/v1/matches/');
      const matchDataJSON = response.data;

      // Define a neural network model
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 4, inputShape: [2], activation: 'relu' }));
      model.add(tf.layers.dense({ units: 4, activation: 'relu' }));
      model.add(tf.layers.dense({ units: 2, activation: 'relu' }));
      model.add(tf.layers.dense({ units: 2 }));

      // Compile the model with an optimizer and a loss function
      model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

      // Convert features and labels into tensors
      const features = matchDataJSON.map(match => [teamIndices[match.teamA], teamIndices[match.teamB]]);
      const labels = matchDataJSON.map(match => [match.pointsA, match.pointsB]);
      const xs = tf.tensor2d(features);
      const ys = tf.tensor2d(labels);

      // Train the model
      await model.fit(xs, ys, { epochs: 1000 });

      // Store the trained model
      trainedModel = model;
    } catch (error) {
      console.error('Error during model training:', error);
      throw error;
    }
  }

  return trainedModel;
}

// Function to predict match points
async function predictMatchPoints(teamAName, teamBName) {
  try {
    // Get the trained model
    const model = await getTrainedModel();

    // Predict points for the specified teams
    const prediction = await model.predict(tf.tensor2d([[teamIndices[teamAName], teamIndices[teamBName]]]));
    const [pointsA, pointsB] = prediction.dataSync();

    // Round off the predicted points to the nearest integer
    const roundedPointsA = Math.round(pointsA) + 1;
    const roundedPointsB = Math.round(pointsB) + 1;

    console.log(`Predicted points for ${teamAName}: ${roundedPointsA}, for ${teamBName}: ${roundedPointsB}`);

    // Return an object with rounded pointsA and pointsB
    return { roundedPointsA, roundedPointsB };
  } catch (error) {
    console.error('Error during prediction:', error);
    throw error;
  }
}

// Handler for predicting scores
const predictScores = asyncHandler(async (req, res) => {
  try {
    // Extract team names from request body
    const { teamA, teamB } = req.body;

    // Predict points for specified teams
    let { roundedPointsA, roundedPointsB } = await predictMatchPoints(teamA, teamB);

    roundedPointsA=roundedPointsA |0 ;
    roundedPointsB=roundedPointsB | 0;

    // Respond with predicted points
    res.json({ roundedPointsA, roundedPointsB });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default predictScores;
