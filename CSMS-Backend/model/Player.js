import mongoose from "mongoose";

// Define the player schema
const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  SportName: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sports',
    required: true
  }],
  description: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  socialMedia: {
    twitter: {
      type: String
    },
    instagram: {
      type: String
    }
    // Add more social media platforms as needed
  },
  achievements: [{
    sport:{
        tyoe:String
    },
    text: {
      type: String
    }
  }],
  basePrice: {
    type: Number,
    required: true
  },
  teamLeader:{
    type: Boolean,
    default: false
  }
},{
    timestamps:true
});

const Player = mongoose.model('Player', playerSchema);

export default Player;
