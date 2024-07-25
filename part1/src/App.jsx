import { useState } from "react"
import Button from "./Button"
import Statistics from "./Statistics"



const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [totalFeedbacks, setTotalFeedbacks] = useState(0)
  const [average, setAverage] = useState(0)
  const [percent, setPercent] = useState(0)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const updateAverage = (updatedGood, updatedNeutral, updatedBad, total) => {
    const sum = updatedGood - updatedBad; // good = +1, bad = -1, neutral = 0
    const avg = total === 0 ? 0 : sum / total;
    setAverage(avg);
  }

  const updatePercent = (updatedGood, total) => {
    const percent = (updatedGood / total) * 100;
    setPercent(percent);
  }

  const updateVotes = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  }

  const handleGood = () => {
    const updatedGood = good + 1
    const total = updatedGood + neutral + bad
    setGood(updatedGood)
    setTotalFeedbacks(total)
    updateAverage(updatedGood, neutral, bad, total)
    updatePercent(updatedGood, total)
  }
  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    const total = updatedNeutral + good + bad
    setNeutral(updatedNeutral)
    setTotalFeedbacks(total)
    updateAverage(good, updatedNeutral, bad, total)
    updatePercent(good, total)
  }
  const handleBad = () => {
    const updatedBad = bad + 1
    const total = updatedBad + good + neutral
    setBad(updatedBad)
    setTotalFeedbacks(total)
    updateAverage(good, neutral, updatedBad, total)
    updatePercent(good, total)
  }

  const showAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGood} text={'good'}></Button>
      <Button onClick={handleNeutral} text={'neutral'}></Button>
      <Button onClick={handleBad} text={'bad'}></Button>
      <Statistics
        good={good} neutral={neutral}
        bad={bad} totalFeedbacks={totalFeedbacks}
        average={average} percent={percent}>
      </Statistics>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={showAnecdote} text={'next anecdote'}></Button>
      <Button onClick={updateVotes} text={'vote'}></Button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
    </div>
  )
}

export default App