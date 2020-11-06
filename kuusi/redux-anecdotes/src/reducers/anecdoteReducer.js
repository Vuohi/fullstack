import { createNew, getAll, updateVotes } from "../services/anecdoteService"






const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const votedAnecdote = state.find(anecdote => anecdote.id === action.data.id)
      const changedAnecdote = {
        ...votedAnecdote,
        votes: action.data.votes
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
  return async dispatch => {
    const anecdote = await updateVotes(id)
    dispatch({
      type: 'VOTE',
      data: {
        id: anecdote.id,
        votes: anecdote.votes
      }
    })
    
  }
}

export const addAnecdote = (anecdote) => {
  return async dispatch => {
    const addedAnecdote = await createNew(anecdote)
    dispatch({
      type: 'ADD',
      data: {
        content: addedAnecdote.content,
        id: addedAnecdote.id,
        votes: addedAnecdote.votes
      }
    })
    
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default reducer