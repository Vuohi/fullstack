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

const Statistics = (props) => {
  if (props.good != 0 || props.neutral != 0 || props.bad != 0) {

    return <div>   
    <Display value = {props.good} text ="good" />
    <Display value = {props.neutral} text="neutral" />
    <Display value = {props.bad} text="bad" />
    <Display value = {props.good + props.neutral + props.bad} text="all" />
    <Display value = {(props.good - props.bad)  / (props.good + props.neutral + props.bad)} text="average" />
    <Display value = {100 * props.good / (props.good + props.neutral + props.bad)} text="all" />
  </div>
  } else {
    return<div>No feedback given</div>
  }
}

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
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)