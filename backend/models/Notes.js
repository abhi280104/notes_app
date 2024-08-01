const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Ensure this matches the name of your user model
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "general"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('notes', NoteSchema);
