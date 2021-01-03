import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Button, Navbar} from 'react-bootstrap'
import { setUser } from '../reducers/UserReducer'


const LoggedInBar = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const logout = () => {
    console.log('loggin out')
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
  }
  return (
    <>
      <Navbar.Text>
        {user.name} logged in
      </Navbar.Text>
      <Button variant="outline-light" style={{ marginLeft: "10px" }} type="submit" onClick={() => logout()}>logout</Button>
    </>
  )
}
export default LoggedInBar
