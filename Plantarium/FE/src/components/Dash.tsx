import React, { useEffect, useState } from "react";

function Dash() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/me", {
      credentials: "include", // Cookie mitsenden
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user) return <p>Lade Daten...</p>;

  return (
    <div className="p-6">
      <p>Hallo! You made it 🎉</p>
      <p>Deine User-ID: <strong>{user.id}</strong></p>
    </div>
  );
}

export default Dash;
