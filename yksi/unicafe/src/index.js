import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = (props) => (
  <div>{props.text} {props.value}
  </div>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h2>statistics</h2>
      <Display value = {good} text ="good" />
      <Display value = {neutral} text="neutral" />
      <Display value = {bad} text="bad" />
      <Display value = {good + neutral + bad} text="all" />
      <Display value = {(good - bad)  / (good + neutral + bad)} text="average" />
      <Display value = {100 * good / (good + neutral + bad)} text="all" />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)