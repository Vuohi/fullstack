import React, {useState} from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'




const BlogList = ({showNotification, blogs, setIsError}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

      
    const createNew = (event) => {
        event.preventDefault()
        const newBlog = {
          title,
          author,
          url
        }
        try {
            blogService.create(newBlog)
            setIsError(false)
            showNotification(`a new blog ${title} by ${author} was created`)
        } catch (error) {
            setIsError(true)
            showNotification('could not create a blog')       
        }
        setTitle('')
        setAuthor('')
        setUrl('')
    }

      
    return (
      <div>
      <div>
        <h2>blogs</h2>
        
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
    )
        }
      </div>
      <div>
        <h2>Create new</h2>
        <form onSubmit={createNew}>
          <div>Title
            <input
              type="text"
              value={title}
                name="Title"
                onChange={({target}) => setTitle(target.value)}
            />
          </div>
          <div>Author
            <input
              type="text"
              value={author}
                name="Author"
                onChange={({target}) => setAuthor(target.value)}
            />
          </div>
          <div>Url
            <input
              type="text"
              value={url}
                name="Url"
                onChange={({target}) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
         
        </div>
        </div>
    )
}

  export default BlogList