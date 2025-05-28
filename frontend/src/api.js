import axios from "axios"
const URL = "http://localhost:3000"

export async function getTopics() {
    const response = await axios.get(`${URL}/topics`)

    if (response.status == 200) {
        return response.data
    }
    else {
        return
    }
}

export async function getTopic(id) {

    const response = await axios.get(`${URL}/topics/${id}`)
    return response.data
}

export async function createTopic(topic) {

    const response = await axios.post(`${URL}/topics`, topic)
    return response
}

export async function updateTopic(id, topic) {
    const response = await axios.put(`${URL}/topics/${id}`, topic)
    return response
}

export async function deleteTopic(id) {
    const response = await axios.delete(`${URL}/topics/${id}`)
    return response
}