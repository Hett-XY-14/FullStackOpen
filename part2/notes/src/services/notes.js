import axios from 'axios'

//const baseURL = 'https://guarded-spire-41764.herokuapp.com/api/notes'
const baseURL = '/api/notes'
let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = async (newObject) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const request = await axios.post(baseURL, newObject, config)
    return request.data
}

const update = async (id, newObject) => {
    const request = await axios.put(`${baseURL}/${id}`, newObject)
    return request.data
}

export default { getAll, create, update, setToken }