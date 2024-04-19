import mongoose from "mongoose";

// Define the team schema
const SportsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },  
},{
    timestamps:true
});

const Sports = mongoose.model('Sports', SportsSchema);

export default Sports;
