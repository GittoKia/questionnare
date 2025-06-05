import axios from "axios"
const URL = "http://localhost:3000"


axios.defaults.baseURL = URL;

axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("User");        
  if (token) config.headers.Authorization = `Bearer ${token}`;
  else {
    delete config.headers.Authorization;             
  }
  return config;
});



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

export async function getUser(id) {

    const response = await axios.get(`${URL}/users/${id}`)
    return response.data
}

export async function createUser(user) {

    const response = await axios.post(`${URL}/users`, user)
    return response
}

export async function updateUser(id, user) {
    const response = await axios.patch(`${URL}/users/${id}`, user)
    return response
}

export async function deleteUser(id) {
    const response = await axios.delete(`${URL}/users/${id}`)
    return response
}

export async function verifyUser(user) {
    const response = await axios.post(`${URL}/users/login`, user)
    if (response.data.success) {
        return response.data.token
    } else {
        return
    }
}