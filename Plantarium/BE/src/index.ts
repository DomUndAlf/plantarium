import app from './app.js';

const PORT = process.env.VITE_BEPORT || 4000;

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});


//von hier startet alles
//importiert express von app.js
//startet server und lauscht auf verbindungen
//innitialisiert prisma