import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AnnouncementSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    // Add any additional fields as needed
}, {
    timestamps: true, 
});

// Compile the schema into a model
const Announcement = mongoose.model('Announcement', AnnouncementSchema);

// Export the model
export default Announcement;
