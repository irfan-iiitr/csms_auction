import mongoose from 'mongoose';

const matchstatsSchema = new mongoose.Schema({
    teamA: {
        type: String,
        required: true
    },
    teamB: {
        type: String,
        required: true
    },
    pointsA: {
        type: Number,
        required: true
    },
    pointsB: {
        type: Number,
        required: true
    }
});

const MatchStats = mongoose.model('MatchStats', matchstatsSchema);

export default MatchStats;
