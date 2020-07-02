import axios from "axios"
const baseURL = "http://localhost:9001/teams"

const getTeams = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

export default {
    getTeams
}
