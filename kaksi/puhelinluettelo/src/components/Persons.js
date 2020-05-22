import React from 'react'


const Persons = (props) => (
    props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
      .map(person => <li key={person.id}>{person.name} {person.number} <button onClick={() => props.handleDeleteClick(person)}>delete</button></li>)
  )
  
  export default Persons