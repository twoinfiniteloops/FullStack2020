import { 
  useMutation, 
  useSubscription, 
  ApolloClient, 
  useApolloClient 
} from '@apollo/client'
import React, { useState } from 'react'
import { CREATE_BOOK, ALL_BOOKS } from '../Queries'
import { BOOK_ADDED } from '../Queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS }]
  })

  const client = useApolloClient()
  /*
  const updateCache = (addedBook) => {
    const includeIn = (set, object) => {
      return set.map(b => b.id).includes(object.id)
    }
    const dataInStore = client.readQuery({query: ALL_BOOKS})
    if(!includeIn(dataInStore.allBooks, addedBook)){
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          allBooks: dataInStore.allBooks.concat(addedBook)
        }
      })
    }
  }
  
  
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: (subscriptionData) => {
      window.alert(subscriptionData.data.bookAdded)
      updateCache(subscriptionData.data.bookAdded)
    }
  })
  */
  

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    try {
      await createBook( { 
        variables: { 
          title,
          author,
          published: Number(published),
          genres,
        },
        headers: {
          Authorization: window.localStorage.getItem("userToken")
        }
      })
    } catch(error) {
      console.log("hıyarrr")
      console.log(error.message)
    }
    
    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook

/*
TODO: Anlık update etmiyor
ve
8.16 implement edilmedi.
*/