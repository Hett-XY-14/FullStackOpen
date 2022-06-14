import axios from "axios";
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const promise = axios.get(baseURL)
    console.log(promise)
    return (
        promise.then((response) => {
            console.log(response.data)
            return (response.data)
    })
    )
}

const create = (personObject) => {
    const promise = axios.post(baseURL, personObject)
    return (
        promise.then((response) => {
        return (response.data)
        })
    )
}

const update = (id, personObject) => {
    const promise = axios.put(`${baseURL}/${id}`, personObject)
    return (
        promise.then((response) => {
        return(response.data)
        })
    )
}

const deletePerson = (id) => {
    const promise = axios.delete(`${baseURL}/${id}`)
    return (
        promise.then((response) => {
        return (response.data)
        })
    )
}

export default { getAll, create, update, deletePerson }