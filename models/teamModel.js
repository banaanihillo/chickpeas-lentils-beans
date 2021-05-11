const mongoose = require("mongoose")

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    abbreviation: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    league: {
        type: String,
        required: false
    },
    division: {
        type: String,
        required: false
    },
    alternate: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model("Team", teamSchema)
