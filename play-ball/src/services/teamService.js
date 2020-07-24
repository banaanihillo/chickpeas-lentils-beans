import axios from "axios"
const baseURL = "http://localhost:9001/teams"

const getTeams = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

const addTeam = async (teamInput) => {
    const response = await axios.post(baseURL, teamInput)
    return response.data
}

const modifyTeam = async (teamInput) => {
    const response = await axios.put(`${baseURL}/${teamInput._id}`, teamInput)
    return response.data
}

export default {
    getTeams,
    addTeam,
    modifyTeam
}
