const Header = ({course}) => {
  return (
    <div>
      <h1>{course.name}</h1>
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

const Content = ({course}) => {
  return(
    <div>
      <Part name={course.parts[0].name} number={course.parts[0].exercise} />
      <Part name={course.parts[1].name} number={course.parts[1].exercise} />
      <Part name={course.parts[2].name} number={course.parts[2].exercise} />
    </div>
  )
}

const Total = ({course}) => {
  return(
    <p>Number of exercises {course.parts[0].exercise + course.parts[1].exercise + course.parts[2].exercise}</p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {name:'Fundamentals of React', exercise:10},
      {name:'Using props to pass data', exercise:7},
      {name:'State of a component', exercise:14}
    ]
  }
  
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div> 
  )
}

export default App
