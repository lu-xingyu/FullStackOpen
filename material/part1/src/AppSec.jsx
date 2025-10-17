import { useState } from 'react'


// couter increasing by seconds
const App = () => {

  const [ counter, setCounter ] = useState(0)
  // useState(0) return a two-elements array, the first one is counter: current state value(start with 0); 
  // the second one is the function that set new value to counter, every time setCounter is called, react will re-call the component that define this state

  setTimeout(
    () => setCounter(counter + 1),  
    1000
  )
  // register a function that will execute after 1000ms(1s)
  // when setCounter is called, React engine will store the new counter and mark the component that needs to be re-rendered
  // when App() component is re-rendered, engine will pass the new counter to useState => counter is updated

  console.log('rendering...', counter)

  return (
    <div>{counter}</div> // return current counter
  )
}

export default App