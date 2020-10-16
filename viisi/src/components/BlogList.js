import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'




const BlogList = ({ blogs, user }) => {

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
    
  return (
    <div>
      <div>
        <h2>blogs</h2>

        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog, index) =>
            <Blog key={blog.id} blog={blog} user={user} handler={like} id={index} />
          )
        }
      </div>
    </div>
  )
}

export default BlogList