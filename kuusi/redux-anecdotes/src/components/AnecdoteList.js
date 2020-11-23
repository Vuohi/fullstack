import React from 'react'
import {addVote} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes.filter(a => a.content.toLowerCase().includes(props.filter.toLowerCase())).sort(function(a, b) {return b.votes-a.votes})

  const vote = (anecdote) => {
      props.addVote(anecdote.id)
      props.setNotification(`you voted '${anecdote.content}'`, 10)
      
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

const mapDispatchToProps = {
    addVote,
    setNotification
}

const connectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default connectedAnecdoteList