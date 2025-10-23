import React, { useState, useEffect } from 'react'
import ShowCountries from './components/ShowCountries'
import countryService from './services/countryService'

const App = () => {
  const [value, setValue] = useState('')
  const [country, setCountry] =useState([])
  let allCountries = []
  
  useEffect(() => {
    const fetchllAllCountries = async () => {
      const data = await countryService.getAll()
      allCountries = data
      const result = allCountries.filter(element => element.toLowerCase().includes(value.toLowerCase()))
      setCountry(result)
    } 
    fetchllAllCountries()
  }, [value])


 const changeHandler = (event) => {
    setValue(event.target.value)
 }


  return (
    <>
      <div>
        find: <input value={value} onChange={changeHandler} />
      </div>
      <div>
        <ShowCountries input={country} />
      </div>
    </>
  )
}

export default App
