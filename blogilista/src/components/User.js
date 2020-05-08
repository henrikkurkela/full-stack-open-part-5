
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import usersService from '../services/users'

const User = ({ token, setToken }) => {
    const logout = () => {
        window.localStorage.clear()
        setToken(null)
    }

    return (
        <div>
            <h2>Welcome</h2>
            <p>Hello {token.username}!</p>
            <button onClick={logout}>Log out</button>
        </div>
    )
}

User.propTypes = {
    token: PropTypes.object.isRequired,
    setToken: PropTypes.func.isRequired
}

const Login = ({ setToken, setError, display }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const style = { display: display }

    const login = (event) => {
        event.preventDefault()
        let newToken = {}
        usersService
            .login(username, password)
            .then(response => {
                newToken = response
                if (newToken !== null && typeof newToken !== 'undefined') {
                    window.localStorage.setItem('user', JSON.stringify(newToken))
                    setToken(newToken)
                } else {
                    setError('Unable to log in, check credentials')
                    setTimeout(() => setError(null), 2000)
                }
            })
    }

    return (
        <div style={style}>
            <h2>Login</h2>
            <form onSubmit={login}>
                <div>
					username: <input id='username' value={username} onChange={(event) => { setUsername(event.target.value) }} />
                </div>
                <div>
					password: <input id='password' type='password' value={password} onChange={(event) => { setPassword(event.target.value) }} />
                </div>
                <div>
                    <button id='login-button' type='submit'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default {
    User: User,
    Login: Login
}