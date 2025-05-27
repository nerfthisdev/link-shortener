import { useState } from "react";

function App() {
  const [url, setUrl] = useState('');
  const [short, setShort] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:8080/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setShort(data.short_url);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h2>URL Shortener</h2>
      <input
        type="text"
        placeholder="Enter URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button onClick={handleSubmit} style={{ padding: '0.5rem 1rem' }}>
        Shorten
      </button>

      {short && (
        <p>
          Short URL: <a href={short}>{short}</a>
        </p>
      )}
    </div>
  );
}

export default App;
