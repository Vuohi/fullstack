import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import Blog from './Blog'




const BlogList = ({ like }) => {

  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <Table striped>
          <tbody>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) =>
                <tr key={blog.id}>
                  <td>
                    <Blog blog={blog} handler={like} id={blog.id} />
                  </td>
                </tr>
              )
            }

          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default BlogList