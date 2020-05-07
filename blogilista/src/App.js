import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import User from './components/User'

const Error = ({ error = null }) => {
    if (error === null) {
        return null
    } else {
        return <p>{error}</p>
    }
}

function App() {
    const [token, setToken] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('user')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setToken(user)
        }
    }, [])

    if (token === null || typeof token === 'undefined') {
        return (
            <div>
                <Error error={error} />
                <User.Login setToken={setToken} setError={setError} />
            </div>
        )
    } else {
        return (
            <div>
                <Error error={error} />
                <User.User token={token} setToken={setToken} />
                <Blog.Blogs token={token} setError={setError} />
            </div>
        )
    }
}

export default App