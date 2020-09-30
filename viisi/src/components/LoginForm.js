import React, {useState} from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'



const LoginForm = ({setUser, showNotification, setIsError}) => {
    
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 

    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
          const user = await loginService.login({
            username, password,
          })
          window.localStorage.setItem('loggedUser', JSON.stringify(user))
          blogService.setToken(user.token)
          setUser(user)
          setUsername('')
          setPassword('')
        } catch (exception) {
            setIsError(true)
            showNotification('wrong credentials')
            
        }
    }
    
    return (
    <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({target}) => setUsername(target.value)}/>
      </div>
      <div>password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>
      </div>
    )
  }
  export default LoginForm