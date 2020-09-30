import React from 'react'


const LoggedInBar = ({user, setUser}) => {


    const logout = () => {
        console.log("loggin out")
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }
    return (
        <div>
            <p>{user.name} logged in <button type="submit" onClick={() => logout()}>logout</button></p>
            </div>
    )
}
export default LoggedInBar
  