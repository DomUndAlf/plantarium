"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
// Einstieg: /auth/google
router.get('/google', (_req, _res, next) => {
    console.log('🚀 [GET] /auth/google aufgerufen');
    next();
}, passport_1.default.authenticate('google', { scope: ['email', 'profile'] }));
// Callback: /auth/google/callback
router.get('/google/callback', (_req, _res, next) => {
    console.log('🔁 [GET] /auth/google/callback erreicht');
    next();
}, passport_1.default.authenticate('google', { session: false, failureRedirect: '/' }), (req, res) => {
    console.log('✅ Google-Login erfolgreich, erstelle JWT');
    const user = req.user;
    const token = jsonwebtoken_1.default.sign({ id: user.id, shibboleth_id: user.shibboleth_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('🎟️ JWT erstellt:', token);
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: false, // lokal lieber false, sonst wird's nicht gesetzt!
        //sameSite: 'Lax', FÜR HTTPS
        maxAge: 3600000
    });
    res.redirect("http://localhost:3000/dashboard"); //DEPL 
});
exports.default = router;
