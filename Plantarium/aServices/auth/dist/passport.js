"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
// @ts-ignore
const passport_gitlab2_1 = require("passport-gitlab2");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
passport_1.default.use(new passport_gitlab2_1.Strategy({
    clientID: process.env.GITLAB_CLIENT_ID,
    clientSecret: process.env.GITLAB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    baseURL: "https://imn.gitlab.htwk-leipzig.de",
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0].value;
        const shibboleth_id = profile.id;
        console.log("🚨 GITLAB_CLIENT_ID:", process.env.GITLAB_CLIENT_ID);
        console.log("🚨 CALLBACK_URL:", process.env.CALLBACK_URL);
        let user = await prisma.users.findUnique({
            where: { shibboleth_id }
        });
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
