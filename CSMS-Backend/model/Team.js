import mongoose from "mongoose";

// Define the team schema
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teamLeader:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],
  purse:{
    type: Number,
     default: 0
  }
  
},{
    timestamps:true
});

const Team = mongoose.model('Team', teamSchema);

export default Team;
