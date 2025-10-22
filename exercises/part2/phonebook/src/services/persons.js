import axios from 'axios'
const baseUrl = 'https://didactic-halibut-q7pxpr6qv64g346j7-3001.app.github.dev/persons'

const getAll = () => {
  const allData = axios.get(baseUrl).then((response) => response.data)
  return allData
}

const add = (newPerson) => {
  const newData = axios.post(baseUrl, newPerson)
  return newData.then((response) => response.data)
}

const remove = (removeId) => {
  const deletedData = axios.delete(`${baseUrl}/${removeId}`)
  return deletedData.then((response => response.data))
}

const update = (updatedPerson) => {
  const updatedData = axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson)
  return updatedData
}

export default { 
  getAll,
  add,
  remove,
  update
}