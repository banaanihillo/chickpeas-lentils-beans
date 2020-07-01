const teamRouter = require("express").Router()
const Team = require("../models/teamModel")

teamRouter.get("/ping", (_request, response) => {
    response.send("Pimpeli pom")
})

teamRouter.get("/", async (_request, response) => {
    const teams = await Team.find({})
    response.json(teams.map(team => team.toJSON()))
})

teamRouter.post("/", async (request, response) => {
    try {
        const body = request.body
        if (!body.name || !body.abbreviation || !body.organization) {
            return response.status(400).json({
                error: "Make sure the expansion team includes all the required input fields."
            })
        }
        const teamToAdd = new Team({...body})
        const expansionTeam = await teamToAdd.save()
        response.json(expansionTeam.toJSON())
    } catch (error) {
        console.log(`Some kind of legal issue on trying to add an expansion team: ${error}`)
    }
})

module.exports = teamRouter
