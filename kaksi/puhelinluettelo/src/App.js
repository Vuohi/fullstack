import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })

  },[])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    if (!persons.some(person => person.name === newName)) { 
      
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
         
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
        const person = persons.filter(person => person.name === newName)[0]
        
        personService
          .update(person.id, personObject)
          .then(response => {
            if (response.status === 200) {
              setPersons(persons.map(currentPerson => currentPerson.id !== person.id ? currentPerson : response.data))
            }
          }
          )
        }
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDeleteClick = (object) => {
    if (window.confirm('Delete ' + object.name + '?' )) {
      
      personService
        .remove(object.id)
        .then(response => {
          if (response.status === 200) {
            setPersons(persons.filter(person => person.id !== object.id))
          }
        })
    }
             
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ul>
        <Persons persons={persons} filter={filter} handleDeleteClick={handleDeleteClick} />
      </ul>
    </div>
  )

}

export default App


