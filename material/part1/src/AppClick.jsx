import { useState } from 'react'


// couter increases when user click it
const App = () => {
  const [ counter, setCounter ] = useState(0)
  const resetCounter = () => setCounter(0)

  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>
        plus
      </button>
      <button onClick={resetCounter}>
        zero
      </button>
    </div>
  )

  // onClick must receive a reference of a function, onClick={setCounter(counter + 1)} is wrong, 
  // because setCounter() just call the function and pass what this function returns to onClick 
  // => it will execute without user's click and causes infinite loop
  // arrow function is a definition of function, it returns a reference 

  // if we use traditional function: 
  // function increaseByOne() {setCounter(counter + 1)} 
  // it should be onClick={increaseByOne}, instead of onClick={increaseByOne()}
  
} 

export default App 