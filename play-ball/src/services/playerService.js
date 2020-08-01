import axios from "axios"
const baseURL = "http://localhost:9001/players"

const getPlayers = async () => {
    const response = await axios.get(baseURL)
    
    return response.data
}

const addPlayer = async (playerInput) => {

    const response = await axios.post(baseURL, playerInput)
    
    return response.data
}

const modifyPlayer = async (playerInput) => {
    const response = await axios.put(`${baseURL}/${playerInput._id}`, playerInput)
    return response.data
}

export default {
    getPlayers,
    addPlayer,
    modifyPlayer
}
