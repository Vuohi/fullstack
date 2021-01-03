import React from 'react'
import { useSelector } from 'react-redux'
import {Alert} from 'react-bootstrap'


const Notification = () => {
  const notification = useSelector(state => state.notification)
  switch (notification.type) {
  case 'NOTIFICATION':
    return (
      <Alert variant="success">
        {notification.message}
      </Alert>
    )
  case 'ERROR':
    return (
      <Alert variant="danger">
        {notification.message}
      </Alert>
    )
  case 'EMPTY':
    return null
  default:
    return null
  }
}

export default Notification