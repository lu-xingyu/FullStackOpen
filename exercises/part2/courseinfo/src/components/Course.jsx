const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Part = ({name, number}) => {
  return (
    <p>{name} {number}</p>
  )
  
}

const Content = ({parts}) => {
  return(
    parts.map(part => 
      <Part key={part.id} name={part.name} number={part.exercises} />
    )
  )
}

const Total = ({parts}) => {
  const total = parts.reduce(((acc, cur) => acc + cur.exercises), 0)
  return (
    <p><b>total of {total} exercises</b></p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  ) 
}

export default Course