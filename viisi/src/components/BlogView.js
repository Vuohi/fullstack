import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ExternalLink } from 'react-external-link'


const BlogView = (props) => {
    const [comment, setComment] = useState('')

    const blog = useSelector(state => state.blogs.find(blog => blog.id === props.match.params.id))
    
    if (!blog) {
        return null
    }
    console.log(blog)
    return (
        <>
        <div>
        <h2>{blog.title}</h2>
        <h4>{blog.author}</h4>
        <div><ExternalLink href={blog.url} /></div>
        <div>likes {blog.likes} <button id='like' onClick={(e) => props.like(blog, e)}>Like</button></div>
        <div>Added by {blog.user?.username}</div>
            </div>
            <div>
                <h4>Comment</h4>
                <form onSubmit={(e) => props.handleComment(blog, comment, e)}>
                    <input
                        type="text"
                        value={comment}
                        id="comment"
                        onChange={({ target }) => setComment(target.value)} />
                    <button type="comment">Leave comment</button>                 
                </form>
            </div>
      <div>
                <h4>Comments</h4>
                <ul>
                    {blog.comments.map(comment => 
                        <li>{comment}</li>)}
                </ul>
        </div>
        </>
  )

}

export default BlogView