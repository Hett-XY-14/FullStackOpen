import React, {useState} from "react";

const App = () => {
  const [counter, setCounter] = useState(0)
  const [clicks, setClicks] = useState({left: 0, right:0})
  const [allClicks, setAll] = useState([])

  const addClick = (whichButton) => {
    setAll(allClicks.concat(whichButton))
  }

  const incrementByOne = () => {
    setCounter(counter + 1)
    addClick('C')
  }
  const decrementByOne = () => {
    setCounter(counter - 1)
    addClick('C')
  }
  const resetCounter = () => {
    setCounter(0)
  }

  console.log(allClicks)
  // Modifying the state through event handlers without Spread Syntax
  const handleLeftIncrement = () => {
    const newClicks = {
      left: clicks.left + 1,
      right: clicks.right
    }
    setClicks(newClicks)
    addClick('L')
  }
  const handleLeftDecrement = () => {
    const newClicks = {
      left: clicks.left - 1,
      right: clicks.right
    }
    setClicks(newClicks)
    addClick('L')
  }
  const resetLeftCounter = () => {
    const newClicks = {
      left: 0,
      right: clicks.right
    }
    setClicks(newClicks)
  }
  
  // Modifying the state through event handlers using Spread Syntax (just three linee :D)
  const handleRightIncrement = ()=> {
    setClicks({...clicks, right: clicks.right +1})
    addClick('R')
  }
  const handleRightDecrement = ()=> {
    setClicks({...clicks, right: clicks.right - 1})
    addClick('R')
  }
  const resetRightCounter = ()=> {
    setClicks({...clicks, right:0})
  }

  return (
    <div>
      <div>
        <Display counter={clicks.left}/>
        <Display counter={counter}/>
        <Display counter={clicks.right}/><br/>
      </div>

      <div style={{border: '2px solid black', display:'inline-block', width:'30%'}}>
        <Button title={'Left +1!'} onClick={handleLeftIncrement}/>
        <Button title={'Left -1!'} onClick={handleLeftDecrement}/>
        <Button title={'Reset!'} onClick={resetLeftCounter}/>
      </div>
      
      <div style={{border: '2px solid black', display:'inline-block', width:'30%'}}>
        <Button title={'Center +1!'} onClick={incrementByOne}/>
        <Button title={'Center -1!'} onClick={decrementByOne}/>
        <Button title={'Reset!'} onClick={resetCounter}/>
      </div>
      
      <div style={{border: '2px solid black', display:'inline-block', width:'30%'}}>
        <Button title={'Right +1!'} onClick={handleRightIncrement}/>
        <Button title={'Right -1!'} onClick={handleRightDecrement}/>
        <Button title={'Reset!'} onClick={resetRightCounter}/>
      </div>

      <div style={{border: '2px solid gray', margin:'10px 0 0 0', width:'91%'}}>
        <h3>Click history: </h3>
        <h4 style={{width: '70%'}}>{allClicks.join(' ')}</h4>
      </div>
    </div>
  )
  
  
} 

const Display = ({counter}) => {
  return (
    <div style={{border: '2px solid black', display:'inline-block', width:'30%'}}>
    <h1 style={{textAlign:'center', display:'block'}}>{counter}</h1>
    </div>

)
}

const Button = (props) => {
  const {title, onClick} = props
  return(
    <button onClick={onClick}>{title}</button>
  )
}
export default App