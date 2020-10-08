import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import LoggedInBar from './components/LoggedInBar'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message) => {
    console.log(message)
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  

  return (
    <div>
      <Notification message={errorMessage} isError={isError} />
      {user === null ? <LoginForm setUser={setUser} showNotification={showNotification} setIsError={setIsError} />
        :
        <div>
          <LoggedInBar user={user} setUser={setUser} />
          <BlogList  blogs={blogs} user={user} />
          <CreateForm showNotification={showNotification} setIsError={setIsError} />
        </div>}
    </div>
  )
}

export default App