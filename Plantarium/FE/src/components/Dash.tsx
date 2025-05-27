/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import CreateGarden from "./CreateGarden";

function Dash() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //Daten des aktuell eingeloggten Users holen
    fetch("http://localhost:3001/users/me", {
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Unbekannter Fehler");
        }
        return res.json();
      })
      //Antwort als JSON auslesen it id, shibboleth_id
      .then((data) => setUser(data.data))
      .catch((err) => {
        console.error("Fehler beim Laden:", err);
        setError(err.message);
      });
  }, []);

  if (error) return <p className="text-red-600">Fehler: {error}</p>;
  if (!user) return <p>Lade...</p>;

  return (
    <div className="p-6">
      <p>Willkommen!</p>
      <p>Deine interne ID: <code>{user.id}</code></p>
      <p>Dein Shibboleth ID: <code>{user.shibboleth_id}</code></p>
      <CreateGarden />
    </div>
  );
}

export default Dash;
