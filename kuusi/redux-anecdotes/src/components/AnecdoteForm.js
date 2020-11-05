import React from 'react'
import {useDispatch} from 'react-redux'
import { addAnecdote} from '../reducers/anecdoteReducer'
import { hideNotification, showNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        dispatch(addAnecdote(content))
        dispatch(showNotification(`you created new anecdote '${content}'`))
        setTimeout(() => dispatch(hideNotification()), 5000)
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