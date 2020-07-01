const playerRouter = require("express").Router()
const Player = require("../models/playerModel")

playerRouter.get("/ping", (_request, response) => {
    response.status(200).send("Play ball")
})

playerRouter.get("/", async (_request, response) => {
    try {
        const players = await Player.find({})
        response.json(players.map(player => player.toJSON()))
    } catch (error) {
        console.log(`Could not find any players: ${error}.`)
    }
})

playerRouter.post("/", async (request, response) => {
    try {
        const body = request.body
        console.log(body)
        if (!body.number || !body.name || !body.team || !body.positions || !body.throws) {
            console.log("Make sure all the required properties are filled in.")
            return response.status(400).end()
        }
        const playerToAdd = new Player({...body})
        const addedPlayer = await playerToAdd.save()
        response.json(addedPlayer.toJSON())
    } catch (error) {
        console.log(`Something went wrong in trying to add the player - ${error}`)
    }
})

module.exports = playerRouter
