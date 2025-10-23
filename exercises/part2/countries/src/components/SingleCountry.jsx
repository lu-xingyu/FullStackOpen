import countryService from '../services/countryService'
import React, { useState, useEffect } from 'react'

const Languages = ({lans}) => {
    const pureLans = Object.values(lans)
    return (
        pureLans.map((lan) => (
            <li key={lan}>{lan}</li>
        ))
    )
}


const SingleCountry = ({name}) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        countryService.getSingle(name)
        .then(response=> setData(response))
    }, [name])

    if(data === null) {
        return null
    }

    return (
        <div>
            <h1>{name}</h1>
                <p>Capital {data.capital[0]}</p>
                <p>Area {data.area}</p>
            <h1>Languages</h1>
                <ul>
                    <Languages lans={data.languages} />
                </ul>
            <img src={data.flags.png} alt={data.flags.alt} />
        </div>
    )

}

export default SingleCountry