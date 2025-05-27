import app from './app';
import passport from 'passport';
import './auth/passport'; // Initialisiert Google-Strategie
import authRoutes from './auth/routes';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Auth-Routen registrieren (z. B. /auth/google)
app.use('/auth', authRoutes);

// Port aus .env (z. B. VITE_BEPORT=4000)
const PORT = process.env.VITE_BEPORT || 4000;

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
