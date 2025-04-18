import { useEffect, useState } from 'react'
import './App.css'

type User = {
  id: number;
  shibboleth_id: string;
  beds: string[];
};

function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => setUsers(data.data))
      .catch(err => console.error('Fehler beim Laden der Nutzer:', err));
  }, []);

  return (
    <>
      <div>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.shibboleth_id} – {user.beds.length} Betten
          </li>
        ))}
      </ul>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
