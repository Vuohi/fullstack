import React, {useState} from 'react'
import blogService from '../services/blogs'


const CreateForm = (showNotification, setIsError) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [createFormVisible, setCreateFormVisible] = useState(false)

    const hideWhenVisible = { display: createFormVisible ? 'none' : '' }
    const showWhenVisible = { display: createFormVisible ? '' : 'none' }

      
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
        setCreateFormVisible(false)
    }

    return (
        <div>
        <div style={showWhenVisible}>
            <h2>Create new</h2>
            <form onSubmit={createNew}>
                <div>Title
            <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>Author
            <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>Url
            <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                    <button type="submit">Create</button>
            </form>
            <button onClick={() => setCreateFormVisible(false)}>Cancel</button>
        </div>
        <div style={hideWhenVisible}>
            <button onClick={() => setCreateFormVisible(true)}>Create new</button>
            </div>
            </div>
    )
}
export default CreateForm