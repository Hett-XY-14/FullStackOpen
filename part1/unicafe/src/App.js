import { useState } from "react"

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedBack = () => { setGood(good + 1) }
  const handleNeutral = () => { setNeutral(neutral + 1) }
  const handleBad = () => { setBad(bad + 1) }

  return (
    <div>
      <Display title={"Give Feedback"}/>
      <div>
        <Button onClick={handleGoodFeedBack} text={"Good! :)"}/>
        <Button onClick={handleNeutral} text={"Neutral :|"}/>
        <Button onClick={handleBad} text={"Bad! :("}/>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>

  )
}

const Display = (props) => {
  return(
    <>
      <h1>{props.title}</h1>
    </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      <p>{props.text}</p> 
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.field} </td> 
      <td>{props.value}</td>  
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good-bad)/total
  const positive = good / total *100

  if(good!==0 || neutral!==0 || bad!==0) {
    return(
      <>
        <Display title={"Statistics"}/>
        <table>
          <tbody>
            <StatisticLine field={"Good: "} value={good}/>
            <StatisticLine field={"Neutral: "} value={neutral}/>
            <StatisticLine field={"Bad: "} value={bad}/>
            <StatisticLine field={"Total: "} value={total}/>
            <StatisticLine field={"Average: "} value={average}/>
            <StatisticLine field={"Positive: "} value={positive + "%"}/>
          </tbody>
        </table>
      </>
    )
  }
  return (
    <div>
      <Display title={"Statistics"}/>
      <p>{"No given feedback"}</p>
    </div>
  )
  
}

export default App;
