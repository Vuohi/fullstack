import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ key, blog }) => {
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
    blog.likes +=1
    blogService.upDate(blog)
  }

  return (
    <div>
    <div style={hideWhenVisible}>
      {blog.title} {blog.author} <button onClick={() => setIsExpanded(true)}>View</button>
    </div>
    <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setIsExpanded(false)}>Hide</button>
      <br /> {blog.url}
      <br /> likes {blog.likes} <button onClick={(e) => like(blog, e)}>Like</button><br /> 
    </div>
    </div>
  )
}

export default Blog
