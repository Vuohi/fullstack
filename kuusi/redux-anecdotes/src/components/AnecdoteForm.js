import React from 'react'
import { addAnecdote} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import {connect} from 'react-redux'


const AnecdoteForm = (props) => {

    const create = async (event) => {
        event.preventDefault()
        const anecdote = event.target.newAnecdote.value
        props.addAnecdote(anecdote)   
        props.setNotification(`you created new anecdote '${anecdote}'`, 10)
      }



    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={create}>
             <div><input name="newAnecdote" /></div>
                <button type="submit" >create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    addAnecdote,
    setNotification
}


export default connect(null, mapDispatchToProps)(AnecdoteForm)