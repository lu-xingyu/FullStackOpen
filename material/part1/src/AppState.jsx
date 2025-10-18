import { useState } from 'react'

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    console.log('left before', left)
    setLeft(left + 1) 
    console.log('left after', left)  // the same as before
    setTotal(left + right) 
  }
  /* Reason: 
  React maintains a event listener at root of DOM. 
  If there are event happens in DOM(e.g. click), it will bubbles out to the root listener 
  React finds thhe fibre where the event happens, if this fiber have event handler to execute, 
  Synthetic Event System of React will integrate a event object, 
  then React call batchedEventUpdates() on this event, which will ensure that all setState in the event handler will not re-render the component immediately. 
  Instead, after the function is finished, it will only render once to update all the states cahnged in this function
  */

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
    setTotal(left + right)
  }

    

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(' ')}</p>
      <p>total {total}</p>
    </div>
  )
}

export default App

/* Using single object for multiple states
const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  const handleLeftClick = () => {
    const newClicks = { 
      left: clicks.left + 1,  
      right: clicks.right 
    }
    setClicks(newClicks)
  } 

    //Object Spread Syntax:
    const newClicks = {
      ...clicks,
      left: clicks.left + 1,  
    } // copy clicks and set left to left + 1
    


  const handleRightClick = () => {
    const newClicks = { 
      left: clicks.left, 
      right: clicks.right + 1 
    }
    setClicks(newClicks)
  }

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </div>
  )
}
*/

