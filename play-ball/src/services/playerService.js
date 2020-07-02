import axios from "axios"
const baseURL = "http://localhost:9001/players"

const getPlayers = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

export default {
    getPlayers
}
