import axios from 'axios'
const loginUrl = 'http://localhost:3001/api/login'

const login = (username, password) => {
    return axios
        .post(loginUrl, { username: username, password: password })
        .then(response => response.data)
        .catch(error => console.log(error))
}

export default {
    login: login
}
