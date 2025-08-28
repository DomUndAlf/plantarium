"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0].value;
        const shibboleth_id = profile.id;
        console.log("🚨 GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
        console.log("🚨 CALLBACK_URL:", process.env.GOOGLE_CALLBACK_URL);
        // Nutzer in DB suchen
        let user = await prisma.users.findUnique({
            where: { shibboleth_id }
        });
        // Wenn nicht vorhanden, neuen Nutzer anlegen
        if (!user) {
            user = await prisma.users.create({
                data: { shibboleth_id }
            });
        }
        done(null, user);
    }
    catch (err) {
        done(err, undefined);
    }
}));
