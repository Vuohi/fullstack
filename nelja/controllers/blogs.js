const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({})
    console.log('jotain haettiin, vastaus: ', blogs)
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {

    const blog = new Blog(request.body)
    const newBlog = await blog.save()
    response.json(newBlog.toJSON())
})

module.exports = blogsRouter