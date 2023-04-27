const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    stateCode: {
        type: String,
        required: true,
        unique: true
    },
    stateName:{
        type: String,
        required: true,
    },
    funfact: {
        type: [String]
    },
    capital: {
        type: String
    },
    nickname: {
        type: String
    },
    population: {
        type: Number
    },
    admission: {
        type: String
    },
    contig: {
        type: Boolean
    }
});

module.exports = mongoose.model('State', stateSchema);