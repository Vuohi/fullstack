const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        if (returnedObject.likes === undefined) {
            returnedObject.likes = 0
        }
    }
})

module.exports = mongoose.model('Blog', blogSchema)


