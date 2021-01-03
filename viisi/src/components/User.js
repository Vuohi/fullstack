import React from 'react'
import { useSelector } from 'react-redux'


const User = (props) => {
    const user = useSelector(state => state.users.find(user => user.id === props.match.params.id))
    if (!user) {
        return null
    }
    
  return (
    <div>
          <h2>{user.name}</h2>
          Added Blogs:
          <ul>
              {user.blogs.map(blog => 
                  <li>{blog.title}</li>)}
            </ul>
    </div>
  )
}

export default User