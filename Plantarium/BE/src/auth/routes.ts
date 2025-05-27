import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Einstieg: /auth/google
router.get('/google', (_req, _res, next) => {
  console.log('🚀 [GET] /auth/google aufgerufen');
  next();
}, passport.authenticate('google', { scope: ['email', 'profile'] }));

// Callback: /auth/google/callback
router.get('/google/callback', (_req, _res, next) => {
  console.log('🔁 [GET] /auth/google/callback erreicht');
  next();
}, passport.authenticate('google', { session: false, failureRedirect: '/' }),
(req, res) => {
  console.log('✅ Google-Login erfolgreich, erstelle JWT');

  const user = req.user as any;

  const token = jwt.sign(
    { id: user.id, shibboleth_id: user.shibboleth_id },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  console.log('🎟️ JWT erstellt:', token);

   res.cookie("jwt", token, {
      httpOnly: true,
      secure: false, // lokal lieber false, sonst wird's nicht gesetzt!
      //sameSite: 'Lax', FÜR HTTPS
      maxAge: 3600000
    });

    res.redirect("http://localhost:3000/dashboard"); //DEPL 
  });

export default router;
