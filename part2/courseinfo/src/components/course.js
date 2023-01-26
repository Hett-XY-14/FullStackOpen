const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
      <Part key={part.id} part={part}/>
    )}      
  </>

const Course = ({course, parts})=> 
  <>
    <Header course={course}/>
    <Content parts={parts}/>
    <Total parts={parts}/>
  </>

const Total = ({ parts }) =>
  <h4>
    Total of {
      parts.reduce((sum, part) => {
        return sum + part.exercises
      }, 0)
    } exercises
  </h4>

export default Course;
