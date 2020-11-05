import React from 'react'
import {useDispatch} from 'react-redux'
import { addAnecdote} from '../reducers/anecdoteReducer'
import { hideNotification, showNotification } from '../reducers/notificationReducer'
import { createNew } from '../services/anecdoteService'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async (event) => {
        event.preventDefault()
        const anecdoteToAdd = await createNew(event.target.newAnecdote.value)
        console.log(anecdoteToAdd)
        dispatch(addAnecdote(anecdoteToAdd))
        dispatch(showNotification(`you created new anecdote '${anecdoteToAdd.content}'`))
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