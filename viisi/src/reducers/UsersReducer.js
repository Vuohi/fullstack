const UsersReducer = (state = [], action) => {
  switch (action.type) {
  case 'USERS':
    return action.users
  default:
    return state
  }
}

export const setUsers = (users) => {
  return {
    type: 'USERS',
    users
  }
}

export default UsersReducer