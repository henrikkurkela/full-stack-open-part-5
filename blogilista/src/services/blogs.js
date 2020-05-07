import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

const getAll = () => {
    return axios.get(baseUrl)
}

const newBlog = (blog, token) => {
    const config = { headers: { 'Authorization': `bearer ${token.token}` } }
    return axios.post(baseUrl, blog, config)
}

const likeBlog = (blog) => {
    const likedBlog = blog
    likedBlog.likes = blog.likes + 1
    return axios.put(`${baseUrl}/${blog.id}`, likedBlog)
}

const deleteBlog = (blog, token) => {
    const config = { headers: { 'Authorization': `bearer ${token.token}` } }
    return axios.delete(`${baseUrl}/${blog.id}`, config)
}

export default {
    getAll: getAll,
    newBlog: newBlog,
    likeBlog: likeBlog,
    deleteBlog: deleteBlog
}
