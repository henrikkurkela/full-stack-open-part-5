import React, { useState, useEffect } from 'react'
import blogsService from '../services/blogs'

const Blog = ({ blog, update, token }) => {
    const [showInfo, setShowInfo] = useState(false)

    const like = async () => {
        blogsService
            .likeBlog(blog)
            .then(() => {
                update()
            })
    }

    const remove = () => {
        blogsService
            .deleteBlog(blog, token)
            .then(() => {
                update()
            })
    }

    if (showInfo === false) {
        return (
            <div>
                <p onClick={() => setShowInfo(!showInfo)}>{blog.title} {blog.author}</p>
            </div>
        )
    } else if (token.username === blog.user.username) {
        return (
            <div>
                <p onClick={() => setShowInfo(!showInfo)}>{blog.title} {blog.author} {blog.url} {blog.likes} {blog.user.name}</p>
                <button onClick={like}>Like</button>
                <button onClick={remove}>Remove</button>
            </div>
        )
    } else {
        return (
            <div>
                <p onClick={() => setShowInfo(!showInfo)}>{blog.title} {blog.author} {blog.url} {blog.likes} {blog.user.name}</p>
                <button onClick={like}>Like</button>
            </div>
        )
    }
}

const Blogs = ({ token, setError }) => {
    const [blogs, setBlogs] = useState([])
    const [showNewblog, setShowNewblog] = useState(false)

    useEffect(() => {
        blogsService
            .getAll()
            .then(response => {
                let newBlogs = []
                response.data.map(newBlog => {
                    return newBlogs.push(newBlog)
                })
                setBlogs(newBlogs)
            })
    }, [])

    const updateBlogs = () => {
        blogsService
            .getAll()
            .then(response => {
                let newBlogs = []
                response.data.map(newBlog => {
                    return newBlogs.push(newBlog)
                })
                setBlogs(newBlogs)
            })
    }

    return (
        <div>
            <h2>Blogs</h2>
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                <Blog key={blog.id} blog={blog} update={updateBlogs} token={token} />
            )}
            <Togglable display={showNewblog} setDisplay={setShowNewblog} name='new blog'>
                <Newblog token={token} blogs={blogs} setBlogs={setBlogs} setError={setError} setDisplay={setShowNewblog} />
            </Togglable>
        </div>
    )

}

const Newblog = ({ token, blogs, setBlogs, setError, setDisplay }) => {
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    const create = (event) => {
        event.preventDefault()
        blogsService.newBlog({ title, author, url, likes: 0 }, token).then((response) => {
            if (response.status === 201) {
                setError(`${response.data.title} by ${response.data.author} added`)
                setTimeout(() => setError(null), 2000)
                console.log(response.data)
                setBlogs(blogs.concat(response.data))
                setDisplay(false)
            } else {
                setError(`Unable to add ${response.data.title} by ${response.data.author}`)
                setTimeout(() => setError(null), 2000)
            }
        })
        setAuthor('')
        setTitle('')
        setUrl('')
    }

    return (
        <div>
            <h2>Add new blog</h2>
            <form onSubmit={create}>
                <div>
					title: <input value={title} onChange={(event) => { setTitle(event.target.value) }} />
                </div>
                <div>
					author: <input value={author} onChange={(event) => { setAuthor(event.target.value) }} />
                </div>
                <div>
					url: <input value={url} onChange={(event) => { setUrl(event.target.value) }} />
                </div>
                <div>
                    <button type='submit'>Create</button>
                </div>
            </form>
        </div>
    )
}

const Togglable = (props) => {
    if (props.display === false) {
        return (
            <div>
                <button onClick={() => props.setDisplay(true)}>Show {props.name}</button>
            </div>
        )
    } else {
        return (
            <div>
                {props.children}
                <button onClick={() => props.setDisplay(false)}>Hide {props.name}</button>
            </div>
        )
    }
}

export default {
    Blogs: Blogs,
    Blog: Blog
}