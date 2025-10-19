import { useState } from 'react'

const Button = ({onClick, text}) => (
  <button onClick = {onClick}>{text}</button>
)

const StatisticsLine = ({text, value}) => (
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad, all}) => {
  return(
    <table>
      <tbody>
        <StatisticsLine text='good' value={good} />
        <StatisticsLine text='neutral' value={neutral} />
        <StatisticsLine text='bad' value={bad} />
        <StatisticsLine text='all' value={all} />
        <StatisticsLine text='average' value={(good * 1 + neutral * 0 + bad * (-1)) / all} />
        <StatisticsLine text='positive' value={(good / all) * 100 + ' %'} />
      </tbody>
    </table>
  )
}

const Cons = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  } 
  return (
    <Statistics good={good} neutral={neutral} bad={bad} all={all} />
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const reviewHandler = ({review, reviewCounter}) => {
    reviewCounter(review + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => reviewHandler({review:good, reviewCounter:setGood})} text='good'/>
      <Button onClick={() => reviewHandler({review:neutral, reviewCounter:setNeutral})} text='neutral'/>
      <Button onClick={() => reviewHandler({review:bad, reviewCounter:setBad})} text='bad'/>
      <h1>statistics</h1>
      <Cons good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
