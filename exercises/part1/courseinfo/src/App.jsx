const Header = ({name}) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Part = ({name, number}) => {
  return(
    <p>
      {name} {number}
    </p>
  )
}

const Content = ({contents}) => {
  return(
    <div>
      <Part name={contents[0].part} number={contents[0].exercise} />
      <Part name={contents[1].part} number={contents[1].exercise} />
      <Part name={contents[2].part} number={contents[2].exercise} />
    </div>
  )
}

const Total = ({number}) => {
  return(
    <p>Number of exercises {number}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {part:'Fundamentals of React', exercise:10},
    {part:'Using props to pass data', exercise:7},
    {part:'State of a component', exercise:14}
  ]

  return (
    <div>
      <Header name={course} />
      <Content contents={parts} />
      <Total number={parts[0].exercise + parts[1].exercise + parts[2].exercise} />
    </div> 
  )
}

export default App
