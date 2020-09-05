const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    if (request.body.title === undefined || request.body.url === undefined) {
        response.status(400).end()
    } else {
        const blog = new Blog(request.body)
        const newBlog = await blog.save()
        response.json(newBlog.toJSON())
    }
})

module.exports = blogsRouter