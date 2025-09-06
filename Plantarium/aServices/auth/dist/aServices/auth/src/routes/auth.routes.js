"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.get('/gitlab', (_req, _res, next) => {
    console.log('🚀 [GET] /auth/gitlab aufgerufen');
    next();
}, passport_1.default.authenticate('gitlab', { scope: ['read_user'] }));
router.get('/gitlab/callback', (_req, _res, next) => {
    console.log('🔁 [GET] /auth/gitlab/callback erreicht');
    next();
}, passport_1.default.authenticate('gitlab', { session: false, failureRedirect: '/' }), (req, res) => {
    console.log('✅ GitLab-Login erfolgreich, erstelle JWT');
    const user = req.user;
    const token = jsonwebtoken_1.default.sign({ id: user.id, shibboleth_id: user.shibboleth_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('🎟️ JWT erstellt:', token);
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: false, // lokal lieber false, sonst wird's nicht gesetzt! bei deployment auf true
        //sameSite: 'Lax', FÜR HTTPS
        maxAge: 3600000
    });
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
    console.log("Redirecting to dashboard with token:", token);
});
exports.default = router;
