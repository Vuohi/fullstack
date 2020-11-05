import React from 'react'
import { useDispatch } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const handleFilterChange = (event) => {
        event.preventDefault()
        dispatch(changeFilter(event.target.value))
    }
    const style = {
        marginBottom: 10
      }


    return (
        <div style={style}>           
            <form>
                filter
                <input onChange={handleFilterChange} />
            </form>
        </div>
    )
}

export default Filter