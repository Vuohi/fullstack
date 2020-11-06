import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addVote} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase())).sort(function(a, b) {return b.votes-a.votes}))
    const dispatch = useDispatch()

  const vote = (anecdote) => {
      dispatch(addVote(anecdote.id))
      dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  }
    
    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                     <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList