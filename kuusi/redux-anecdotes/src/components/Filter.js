import React from 'react'
import { connect } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'


const Filter = (props) => {
    const handleFilterChange = (event) => {
        event.preventDefault()
        props.changeFilter(event.target.value)
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

const mapDispatchToProps = {
    changeFilter
}

export default connect(null, mapDispatchToProps)(Filter)