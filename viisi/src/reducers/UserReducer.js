

const UserReducer = (state = [], action) => {
  switch (action.type) {
  case 'USER':
    return action.user
  default:
    return state
  }
}

export const setUser = (user) => {
  return {
    type: 'USER',
    user
  }
}

export default UserReducer