import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from '../Queries'
import Select from 'react-select'

const Authors = (props) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [ editBirthYear ] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  if (!props.show) {
    return null
  }
  
  let authors = []
  let options = []
  if(props.authors){
    authors = props.authors
    console.log(authors)
    options = authors.map((author) => ({value: author.name, label: author.name}))
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log("name", selectedOption)
    const value = event.target.born.value
    event.target.born.value = ''
    try{
      await editBirthYear( {
        variables: {
          name: selectedOption.value,
          setBornTo: Number(value)
        }
      })
    } catch(error) {
      console.log(error.message)
    }
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          born
          <input name='born'/>
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
