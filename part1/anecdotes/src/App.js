import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const handleVote =() => {
    const pointsCopy = [...points]
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
  }

  const handleNext = () => {
    const next = getRandomNumber(anecdotes.length);
    setSelected(next);
  }
  
  const getRandomNumber = (upperLimit) => {
    return( Math.floor( Math.random()*upperLimit ));
  }

  const getMostVoted = () => {
    return (points.indexOf(Math.max(...points)))
  }

  return(
    <div>
      <Anecdote title={"Anecdote of the day!"} 
                anecdote={anecdotes[selected]}
                points={points[selected]}
                handleVote={handleVote}
                handleNext={handleNext}
                />
      <Anecdote title={"Most voted anecdote: "} 
                anecdote={anecdotes[getMostVoted()]}
                points={points[getMostVoted()]}
                handleVote={handleVote}
                handleNext={handleNext}
                />
    </div>
  )
}

const Anecdote = ({title, anecdote, points, handleVote, handleNext}) => {
  const votes = "(" + points +" votes)"
  console.log(title)
  console.log(anecdote)
  console.log(points)
  console.log(votes)
  return(
    <div>
      <DisplayTitle text={title}/>
      <DisplayText text={anecdote}/>
      <DisplayText text={votes}/>
      <Button onClick={handleVote} text={"Vote"}/>
      <Button onClick={handleNext} text={"Next anecdote"}/>
    </div>
  )
}

const Button = (props) => {
  return(
  <button onClick={props.onClick}><p>{props.text}</p></button>
  )
}

const DisplayTitle = (props) => {
  return(
    <h1>{props.text}</h1>
  )
}

const DisplayText = (props) => {
  return(
    <p>{props.text}</p>
  )
}

export default App;
