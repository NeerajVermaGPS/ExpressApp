import passport from "passport";
import { Strategy } from "passport-github2";
import dotenv from "dotenv"

dotenv.config()

passport.use(
    new Strategy({
        clientID: process.env.GITHUB_OAUTH_CLIENT_ID,
        clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_OAUTH_REDIRECTS,
        scope: ["user:email", "read:user"]
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        done(null, profile)
    })
)