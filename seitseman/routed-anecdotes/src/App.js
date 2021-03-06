import React, { useState } from 'react'
import { BrowserRouter as Router, Link, Switch, Route, useParams, Redirect } from 'react-router-dom'
import { useField } from './hooks/index'




const AnecdoteList = ({ anecdotes, setIsSent }) => {
  setIsSent(false)
    return (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
      </div>
    )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = ({ addNew, setIsSent, setNotification }) => {
  const { onResetContent, ...content } = useField('text')
  const { onResetAuthor, ...author } = useField('text')
  const { onResetInfo, ...info } = useField('text')
  

  

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    setNotification(`New anecdote ${content.value} by ${author.value} created`)
    setTimeout(() => setNotification(''), 10000)
    setIsSent(true)
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form >
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={function () { onResetContent(); onResetAuthor(); onResetInfo() } }>reset</button>
      </form>
    </div>
  )

}

const ShowAnecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === id)
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>Voted {anecdote.votes} times</p>
      <p><a href={anecdote.info}>More info</a></p>
    </div>
  )
}

const Notification = ({ notification}) => {
  const style = {
    border: 2,
    borderStyle: "solid",
    borderRadius: 5,
    borderColor: "red",
    padding: 10,
    display: "inline-block"
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  const [isSent, setIsSent] = useState(false)
  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
        </div>
        <div>
        {notification === '' ? <></> : <Notification notification={notification} /> }
        </div>
      <Switch>
        <Route path="/create">
            {isSent ? <Redirect to='/' /> : <CreateNew addNew={addNew} setIsSent={setIsSent} setNotification={setNotification} /> }
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/anecdotes/:id">
          <ShowAnecdote anecdotes={anecdotes} />
        </Route>
        <Route path="/">
            <AnecdoteList anecdotes={anecdotes} setIsSent={setIsSent} />
        </Route>
      </Switch>    
      
        <Footer />
        </Router>
    </div>
      
  )
}

export default App;
