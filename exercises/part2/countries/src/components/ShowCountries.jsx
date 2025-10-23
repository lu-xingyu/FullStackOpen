import SingleCountry from './SingleCountry'
import React, { useState, useEffect } from 'react'

const ShowCountries = ({input}) => {
    const [selectedCountry, setSelectedCountry] = useState(null)
    useEffect(() => {
        setSelectedCountry(null)
    }, [input])

    if(!input || input.length === 0) {
        return null
    }
    

    if (selectedCountry) {
        return (
            <SingleCountry name={selectedCountry} />
        )
    }

    if (input.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (input.length > 1) {
        return (
            <div>
                {input.map(name => (
                    <p key={name}>
                        {name} 
                        <button type="button" onClick={() => setSelectedCountry(name)}>
                            Show
                        </button>
                    </p>
                ))}
            </div>
        )
    } else if (input.length === 1){
        return (
            <SingleCountry name={input[0]} />
        )
    } 
    return null
}

export default ShowCountries