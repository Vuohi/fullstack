import React from 'react'
import {useDispatch} from 'react-redux'
import { addAnecdote} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async (event) => {
        event.preventDefault()
        const anecdote = event.target.newAnecdote.value
        dispatch(addAnecdote(anecdote))       
        dispatch(setNotification(`you created new anecdote '${anecdote}'`, 10))
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

export default AnecdoteForm