const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    console.log('**** yritetään hakea blogeja')
    const blogs = await Blog.find({})
    console.log('jotain haettiin, vastaus: ', blogs)
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogsRouter