import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import LoggedInBar from './components/LoggedInBar'
import Notification from './components/Notification'

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
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
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
          <BlogList showNotification={showNotification} blogs={blogs} setIsError={setIsError} />
        </div>}
      
    </div>
  )
}

export default App