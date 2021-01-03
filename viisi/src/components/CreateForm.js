import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import blogService from '../services/blogs'
import { setNotification, setError, removeNotification } from '../reducers/NotificationReducer'
import { add } from '../reducers/BlogReducer'

const CreateForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [createFormVisible, setCreateFormVisible] = useState(false)

  const dispatch = useDispatch()

  const hideWhenVisible = { display: createFormVisible ? 'none' : '' }
  const showWhenVisible = { display: createFormVisible ? '' : 'none' }


  const createNew = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    try {
      const createdBlog = await blogService.create(newBlog)
      dispatch(add(createdBlog))
      dispatch(setNotification(`a new blog ${title} by ${author} was created`))
    } catch(error) {
      dispatch(setError('could not create a blog'))
    }
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
    setCreateFormVisible(false)
  }

  return (
    <div>
      <div style={showWhenVisible}>
        <h2>Create new</h2>
        <Form onSubmit={createNew}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              value={title}
              id="Title"
              onChange={({ target }) => setTitle(target.value)}
            />

            <Form.Label>Author:</Form.Label>
            <Form.Control
              type="text"
              value={author}
              id="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />

            <Form.Label>Url:</Form.Label>
            <Form.Control
              placeholder="www.example.com"
              type="url"
              value={url}
              id="Url"
              onChange={({ target }) => setUrl(target.value)}
            />

            <Button variant="primary" id="send" type="submit">Create</Button>
          </Form.Group>
        </Form>
        <Button variant="secondary" onClick={() => setCreateFormVisible(false)}>Cancel</Button>
      </div>
      <div style={hideWhenVisible}>
        <Button variant="primary" id="openForm" onClick={() => setCreateFormVisible(true)}>Create new</Button>
      </div>
    </div>
  )
}
export default CreateForm