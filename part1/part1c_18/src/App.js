import { useState } from "react"

const App = () => {
  
  const [clicks, setClicks] = useState(
    { 
      left:0, 
      right:0 
    }
  )
  
  const [allClicks, setAllClicks] = useState([])
  
  const handleRightClick = ()=>{
    setClicks({...clicks, right: clicks.right+1})
    setAllClicks(allClicks.concat('R'))
  }
  
  const handleLeftClick = ()=>{
    setClicks({...clicks, left: clicks.left+1})
    setAllClicks(allClicks.concat('L'))
  }

  return (
    <>
      <div>
        <h1><Display counter={clicks.left}/></h1>
        <h1><Display counter={clicks.right}/></h1>
      </div>
      <div>
        <Button text={"Left"} onClick={handleLeftClick}/>
        <Button text={"Right"} onClick={handleRightClick}/>
      </div>
      <div>
        <History allClicks={allClicks}/>
      </div>
    </>
  )
}

const Display = ({counter}) => <>{counter}</>
const Button = ({onClick, text}) => ( <button onClick={onClick}> {text} </button> )

const History = ({allClicks}) => {
  if(allClicks.length === 0) {
    return(
      <div><p>The app is used by pressing the buttons</p></div>
    )
  }
  return (
    <div><p>Button pressed history: {allClicks.join("-")}</p></div>
  )
}
export default App