import React from 'react'

const Persons = ({persons, filter}) => (
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <li key={person.name}>{person.name} {person.number}</li>)
  )
  
  export default Persons