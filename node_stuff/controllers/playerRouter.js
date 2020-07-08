const playerRouter = require("express").Router()
const Player = require("../models/playerModel")
const Team = require("../models/teamModel")

playerRouter.get("/ping", (_request, response) => {
    response.status(200).send("Play ball")
})

playerRouter.get("/", async (_request, response) => {
    try {
        const players = await Player
            .find({})
            .populate("team", {
                name: 1,
                organization: 1
            })
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

        const team = await Team.findOne({name: body.team})
        if (!team) {
            return response.status(400).json({
                error: "Only existing teams may sign new players."
            })
        }
        const playerToAdd = new Player({
            ...body,
            team: team
        })

        const addedPlayer = await playerToAdd.save()
        response.json(addedPlayer.toJSON())
    } catch (error) {
        console.log(`Something went wrong in trying to add the player - ${error}`)
    }
})

playerRouter.put("/:id", async (request, response) => {
    const body = request.body
    const unchangedProperties = await Player.findById(request.params.id)
    const modifiedPlayer = Object.assign(unchangedProperties, body)

    const modifiedAndUpdatedPlayer = await Player.findByIdAndUpdate(
        request.params.id,
        modifiedPlayer,
        {
            new: true
        }
    )

    response.json(modifiedAndUpdatedPlayer.toJSON())
})

module.exports = playerRouter
