import { useState } from 'react'


/* couter increasing by seconds
const App = () => {

  const [ counter, setCounter ] = useState(0)
  // useState(0) return a two-elements array, the first one is counter: current state value(start with 0); 
  // the second one is the function that set new value to counter, every time setCounter is called, react will re-call the component that define this state

  setTimeout(
    () => setCounter(counter + 1),  
    1000
  )
  // register a function that will execute after 1000ms(1s)
  // when setCounter is called, React engine will store the new counter and mark the component that nneds to be re-rendered
  // when App() component is re-rendered, engine will pass the new counter to useState => counter is updated

  console.log('rendering...', counter)

  return (
    <div>{counter}</div> // return current counter
  )
}
*/

/* 
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
*/


// reusable component
const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter}/>

      <Button
        onClick={increaseByOne}
        text='plus'
      />
      <Button
        onClick={setToZero}
        text='zero'
      />     
      <Button
        onClick={decreaseByOne}
        text='minus'
      />           
    </div>
  )
}


export default App   //export this component so that other file can import it