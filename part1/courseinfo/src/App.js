import React from "react";
import { render } from "react-dom";

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts : [
      {part: 1, name: 'Fundamentals of React', exercises: 10},
      {part: 2, name: 'Using props to pass data', exercises: 7},
      {part: 3, name: 'State of a component', exercises: 14}
    ]
  }
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )

}

const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part part={props.parts[0]}/>
      <Part part={props.parts[1]}/>
      <Part part={props.parts[2]}/>
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return(
    <p>Part {props.part.part}{'. '}{props.part.name}{': '}{props.part.exercises}{' exercises.'}</p>
  )

}

const Total = (props) => {
    const part1 = props.parts[0].exercises
    const part2 = props.parts[1].exercises
    const part3 = props.parts[2].exercises
    const total = part1 + part2 + part3
    
    return (
      <p style={{fontSize:"2em"}}>Total number of exercises: {total}</p>
    )

}


export default App