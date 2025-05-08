import { useEffect, useState } from 'react'
import './App.css'

type User = {
  id: number;
  shibboleth_id: string;
  beds: string[];
};

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => setUsers(data.data))
      .catch(err => console.error('Fehler beim Laden der Nutzer:', err));
  }, []);

  return (
    <>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.shibboleth_id} – Betten
          </li>
        ))}
      </ul>
      <h1>Vite + React</h1>
    </>
  )
}

export default App
