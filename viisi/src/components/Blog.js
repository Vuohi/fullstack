import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {Button} from 'react-bootstrap'
import blogService from '../services/blogs'
import { remove } from '../reducers/BlogReducer'

const Blog = ({ blog, id }) => {

  const dispatch = useDispatch()

  const removeBlog = (blog, event) => {
    event.preventDefault()
    if (window.confirm(`Do you really want to remove blog ${blog.title}?`)) {
      blogService.deleteById(blog.id)
      dispatch(remove(blog.id))
    }
  }

  console.log(blog)

  return (
    <div id={id}>
      <Link to={`/blogs/${id}`}>{blog.title} by {blog.author}</Link>
      <Button id='remove' onClick={(e) => removeBlog(blog, e)}>Remove</Button>
    </div>
  )
}

export default Blog
