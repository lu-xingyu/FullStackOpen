import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState({
    now: 0,
    votes: [0, 0, 0, 0, 0, 0, 0, 0]
  })

  const nextHandler = () => {
    const max = anecdotes.length - 1
    const random = Math.floor(Math.random() * (max + 1))
    const newState = {...selected, now:random}
    return (
      setSelected(newState)
    )
  }

  const voteHandler = (now) => {
    const copy = [...selected.votes]
    copy[now] += 1
    const newState = {...selected, votes:copy}
    return (
      setSelected(newState)
    )
  }

  const getMaxIndex = (array) =>{
    const largest = Math.max(...array)
    const maxIndex = array.indexOf(largest)
    return (
      maxIndex
    )
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected.now]}</p>
      <p>has {selected.votes[selected.now]} votes</p>
      <button onClick={nextHandler}>next anecdote</button>
      <button onClick={() => voteHandler(selected.now)}>vote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[getMaxIndex(selected.votes)]}</p>
      <p>has {Math.max(...selected.votes)} votes</p>
    </div>
  )
}

export default App