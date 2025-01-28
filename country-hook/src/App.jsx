import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null) // es un objeto por eso esto es null como valor inicial
  const BASE_URL = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
  useEffect(
    (  ) => {
      const country_info = fetch(BASE_URL)
  .then(response => response.json())
  .then(data => data);
 
    country_info.then(countryData=>setCountry(countryData))
  
    },[name])
  
  return country
}

const Country = ({ country }) => {
  console.log("desde country",country)
  if (!country) {
    return null
  }

  if (country.error) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button >find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App