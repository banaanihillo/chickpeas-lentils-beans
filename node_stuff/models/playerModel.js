const mongoose = require("mongoose")

const positionsEnum = ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"]
//should probably be a checkbox in the frontend to allow for multiple position input
const handednessEnum = ["L", "R", "S"]

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
        type: String,
        required: true
    },
    positions: {
        type: [String],
        required: true
    },
    preferredPosition: {
        type: String,
        enum: positionsEnum,
        required: false
    },
    role: {
        type: String,
        required: false
    },
    bats: {
        type: String,
        enum: handednessEnum,
        required: false
    },
    throws: {
        type: String,
        enum: handednessEnum,
        required: true
    }
})

module.exports = mongoose.model("Player", playerSchema)
