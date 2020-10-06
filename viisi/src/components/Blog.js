import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user}) => {
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

  const like = (blog, event) => {
    event.preventDefault()
    const modifiedBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes += 1,
      url: blog.url,
      user: blog.user?.id
    }
    
    blogService.upDate(blog.id, modifiedBlog)
  }

  const removeBlog = (blog, event) => {
    event.preventDefault()
    if (window.confirm(`Do you really want to remove blog ${blog.title}?`)) {
      blogService.deleteById(blog.id)
    }
    
  }

  return (
    <div>
    <div style={hideWhenVisible}>
      {blog.title} {blog.author} <button onClick={() => setIsExpanded(true)}>View</button>
    </div>
      <div style={showWhenVisible}>
        <div>{blog.title} {blog.author} <button onClick={() => setIsExpanded(false)}>Hide</button></div>
        
        <div> {blog.url} </div>
        <div>likes {blog.likes} <button onClick={(e) => like(blog, e)}>Like</button></div>
        <div>{blog.user && user.username === blog.user.username ? <button onClick={(e) => removeBlog(blog, e)}>Remove</button> : '' }</div>
        {}
    </div>
    </div>
  )
}

export default Blog
