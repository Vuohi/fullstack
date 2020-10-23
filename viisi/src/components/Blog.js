import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, handler, id }) => {
  const [isExpanded, setIsExpanded] = useState(false)


  const hideWhenVisible = {
    display: isExpanded ? 'none' : ''
  }
  const showWhenVisible = {
    display: isExpanded ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }



  const removeBlog = (blog, event) => {
    event.preventDefault()
    if (window.confirm(`Do you really want to remove blog ${blog.title}?`)) {
      blogService.deleteById(blog.id)
    }

  }

  return (
    <div id={id}>
      <div style={hideWhenVisible} className='hideWhenVisible'>
        {blog.title} {blog.author} <button id='view' onClick={() => setIsExpanded(true)}>View</button>
      </div>
      <div style={showWhenVisible} className='showWhenVisible'>
        <div>{blog.title} {blog.author} <button onClick={() => setIsExpanded(false)}>Hide</button></div>

        <div> {blog.url} </div>
        <div>likes {blog.likes} <button id='like' onClick={(e) => handler(blog, e)}>Like</button></div>
        <div>{blog.user && user.username === blog.user.username ? <button id='remove' onClick={(e) => removeBlog(blog, e)}>Remove</button> : '' }</div>
        {}
      </div>
    </div>
  )
}

export default Blog
