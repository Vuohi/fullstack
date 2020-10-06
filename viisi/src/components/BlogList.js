import React from 'react'
import Blog from './Blog'





const BlogList = ({ blogs, user }) => {

  return (
    <div>
      <div>
        <h2>blogs</h2>

        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} user={user}/>
          )
        }
      </div>
    </div>
  )
}

export default BlogList