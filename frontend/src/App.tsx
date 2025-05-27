import { useState } from 'react'

function App() {
  const [url, setUrl] = useState('')
  const [short, setShort] = useState('')

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:8080/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })
    const data = await res.json()
    setShort(data.short_url)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base px-4">
      <div className="bg-surface0 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-cpink mb-4 text-center">
          URL Shortener
        </h1>
        <input
          type="text"
          placeholder="Вставьте длинную ссылку..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 rounded-lg bg-crust text-main-text placeholder-mognolia mb-4 border border-mognolia focus:outline-none focus:ring-2 focus:ring-cpink"
        />
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-lg bg-cpink text-crust font-semibold hover:opacity-90 transition"
        >
          Сократить
        </button>

        {short && (
          <div className="mt-6 text-center">
            <p className="text-mognolia mb-2">Короткая ссылка:</p>
            <a
              href={short}
              className="text-cpink underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {short}
            </a>
          </div>
        )}
      </div>

      
    </div>
  )
}

export default App

