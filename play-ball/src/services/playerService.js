import axios from "axios"
const baseURL = "http://localhost:9001/players"

const getPlayers = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

const addPlayer = async (playerInput) => {
    console.log(playerInput)
    const response = await axios.post(baseURL, playerInput)
    console.log(response)
    return response.data
}

export default {
    getPlayers,
    addPlayer
}
