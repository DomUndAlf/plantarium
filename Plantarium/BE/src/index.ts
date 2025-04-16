import app from './app.js';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});


//von hier startet alles
//importiert express von app.js
//startet server und lauscht auf verbindungen
//innitialisiert prisma