





const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const votedAnecdote = state.find(anecdote => anecdote.id === action.data.id)
      const changedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }
      return state.map(anecdote => anecdote.id === action.data.id ? changedAnecdote : anecdote)
    case 'ADD':
      return state.concat(action.data)
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export const addAnecdote = (anecdote) => {
  return {
    type: 'ADD',
    data: {
      content: anecdote.content,
      id: anecdote.id,
      votes: anecdote.votes
    }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes
  }
}

export default reducer