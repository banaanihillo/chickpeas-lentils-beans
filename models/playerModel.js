const mongoose = require("mongoose")







const playerSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    alternate: {
        type: String,
        required: false
    },
    anglicized: {
        type: String,
        required: false
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    },
    positions: {
        type: [String],
        required: true
    },
    preferredPosition: {
        required: false,
        type: String
    },
    role: {
        type: String,
        required: false
    },
    bats: {
        type: String,

        required: false
    },
    throws: {
        type: String,

        required: true
    }
})

module.exports = mongoose.model("Player", playerSchema)
