import { useState } from 'react'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getWeather = async () => {
    if (!city.trim()) return
    setLoading(true)
    setError(null)
    setWeather(null)

    try {
      const res = await fetch(`${API_URL}/api/weather?city=${city}`)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Kota tidak ditemukan')
      } else {
        setWeather(data)
      }
    } catch (err) {
      setError('Tidak bisa konek ke server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '40px',
        width: '100%',
        maxWidth: '450px',
        color: 'white',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '28px' }}>
          🌤️ Weather App
        </h1>

        {/* Search */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && getWeather()}
            placeholder="Masukkan nama kota..."
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '16px',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              outline: 'none',
            }}
          />
          <button
            onClick={getWeather}
            style={{
              padding: '12px 20px',
              borderRadius: '10px',
              border: 'none',
              background: '#4CAF50',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Cari
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p style={{ textAlign: 'center' }}>⏳ Loading...</p>
        )}

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(255,0,0,0.3)',
            padding: '12px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            ❌ {error}
          </div>
        )}

        {/* Weather Result */}
        {weather && (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '5px' }}>
              {weather.city}, {weather.country}
            </h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
              style={{ width: '100px' }}
            />

            <p style={{ fontSize: '64px', fontWeight: 'bold', margin: '0' }}>
              {weather.temperature}°C
            </p>

            <p style={{ fontSize: '18px', textTransform: 'capitalize', marginBottom: '20px' }}>
              {weather.description}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginTop: '20px'
            }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '10px' }}>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Terasa seperti</p>
                <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>{weather.feels_like}°C</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '10px' }}>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Kelembaban</p>
                <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>{weather.humidity}%</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '10px' }}>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Angin</p>
                <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>{weather.wind_speed} m/s</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '10px' }}>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Min / Max</p>
                <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>{weather.min_temp}° / {weather.max_temp}°</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
