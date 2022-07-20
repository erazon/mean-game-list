const mongoose = require('mongoose');
const gameSchema = mongoose.Schema({
    title: {// path: type
        type: String,
        required: true
    }, 
    year: Number,
    rate: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    price: Number,
    minPlayers: {
        type: Number,
        min: 1,
        max: 11
    },
    maxPlayers: {
        type: Number,
        min: 1,
        max: 11
    },
    minAge: {
        type: Number,
        min: 6,
        max: 99
    },
    designers: [String]
});

// compiling the model
mongoose.model('Game', gameSchema, "games");