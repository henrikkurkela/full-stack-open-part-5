import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, wait } from '@testing-library/react'
import Blogs from './Blog'

const blog = {
    title: 'Full Stack Open 2020',
    author: 'Au Thori',
    url: 'www.google.fi',
    likes: 2040,
    user: {
        username: 'username',
        name: 'user',
        id: '5eb3ea9085d0521fc47bc828'
    },
    id: '5eb3eac585d0521fc47bc829'
}

const token = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjVlYjQ1MDFlNTEwMjU4MzYwMDNiYTk3MCIsImlhdCI6MTU4ODg3NTM1Nn0.iA5ZT5VqlEMYKD31h-t_Hv0ExXyrciQforQ3gwk0hVM',
    username: 'test',
    name: 'testuser'
}

test('renders content', () => {
    const component = render(
        <Blogs.Blog blog={blog} token={token} />
    )

    expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`)
})

test('clicking the element works', async () => {
    const component = render(
        <Blogs.Blog blog={blog} token={token} />
    )

    const element = component.getByText(`${blog.title} ${blog.author}`)
    fireEvent.click(element)

    expect(component.container).toHaveTextContent(`${blog.title} ${blog.author} ${blog.url} ${blog.likes} ${blog.user.name}`)
})

test('clicking the like button works', async () => {
    const mockHandler = jest.fn()

    const component = render(
        <Blogs.Blog blog={blog} token={token} update={mockHandler} />
    )

    const element = component.getByText(`${blog.title} ${blog.author}`)
    fireEvent.click(element)

    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})