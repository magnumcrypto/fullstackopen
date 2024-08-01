import { useState, useEffect } from 'react'
import personService from './services/persons'
import Note from './components/Note'
import Filter from './components/Filter'
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handlePersonChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    const exists = persons.some(person => person.name === newPerson.name)
    if (exists) {
      const person = persons.find(p => p.name === newName)
      const changedPerson = { ...person, number: newNumber }
      personService
        .update(person.id, changedPerson)
        .then(response => {
          setPersons(persons.map(person => person.name !== newName ? person : response))
        })
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
      setNewName('')
      setNewNumber('')
    }
  }

  const deletePersonById = (id) => {
    const confirm = window.confirm(`Delete person with ${id} ID?`)
    if (confirm) {
      personService
        .deletePerson(id)
        .then(response => {
          console.log('RESPONSE OF DELETE', response)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handlePersonChange={handlePersonChange} filter={filter}></Filter>
      <h2>Add a new person</h2>
      <Form
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}>
      </Form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <Note key={person.id}
            note={person.name}
            number={person.number}
            deletePerson={deletePersonById}
            id={person.id}
          />
        )}
      </ul>
    </div>
  )
}

export default App
