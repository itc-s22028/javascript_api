import { useState } from 'react'

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY
const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

export default function Weather () {
  const [city, setCity] = useState('')
  const [lang, setLang] = useState('en')
  const [weather, setWeather] = useState(null)

  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const handleLangChange = (event) => {
    setLang(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&lang=${lang}`)
    const data = await response.json()
    console.log(city, lang)
    setWeather(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label class='label-top'>
          City:
          <input class='text-in' type='text' value={city} onChange={handleCityChange} />
        </label>
        <br />
        <label class='label-top'>
          Language:
          <select value={lang} onChange={handleLangChange}>
            <option value='ja'>Japanese</option>
            <option value='en'>English</option>
            <option value='fr'>French</option>
            <option value='de'>German</option>
            <option value='it'>Italian</option>
            <option value='es'>Spanish</option>
            <option value='ja'>Japanese</option>
            <option value='ko'>Korean</option>
            <option value='ru'>Russian</option>
            <option value='zh_cn'>Chinese Simplified</option>
            <option value='zh_tw'>Chinese Traditional</option>
          </select>
        </label>
        <br />
        <button type='submit'>Get Weather</button>
      </form>
      {weather && (
        <div>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <div class='text-top'>
            <p class='text'>Temperature<p class='text-small'>温度</p>: {weather.main.temp} K</p>
            <p class='text'>Humidity<p class='text-small'>湿度</p>: {weather.main.humidity} %</p>
            <p class='text'>Wind Speed<p class='text-small'>風速</p>: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  )
}
