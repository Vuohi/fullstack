import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <h2>Users</h2>
          User          Blogs created
      {
        users.map(user =>
          <div>
            <Link key={user.id} to={`/users/${user.id}`}>{user.name}</Link> {user.blogs.length}
          </div>
        )
      }

    </div >

  )
}

export default Users