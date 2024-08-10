import passport from "passport";
import { Strategy } from "passport-github2";
import dotenv from "dotenv"
import GithubUser from "../mongoose/schemas/github-oauth.mjs";

dotenv.config()

passport.serializeUser((user, done) => {
    console.log(`Serializing user:`)
    console.log(user.id)
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const getUser = await GithubUser.findById(id)
        if(!getUser) throw new Error("User not found!")
        done(null, getUser)
    } catch (error) {
        console.log(error.message)
        done(error, null)
    }
})

passport.use(
    new Strategy({
        clientID: process.env.GITHUB_OAUTH_CLIENT_ID,
        clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_OAUTH_REDIRECTS,
        scope: ["user:email", "read:user"]
    }, async (accessToken, refreshToken, profile, done) => {
        let getUser;
        try {
            getUser = await GithubUser.findOne({ githubID : profile.id })
        } catch (error) {
            console.log("Error while getting user:\n", error)
            done(error, null)
        }
        try {
            if(!getUser) {
                const newUser = new GithubUser({
                    githubID: profile.id,
                    username: profile.username,
                    displayName: profile.displayName
                })
                const savedUser = await newUser.save()
                console.log(savedUser)
                done(null, savedUser)
            }
            done(null, getUser)
        } catch (error) {
            console.log("Error while saving user:\n", error)
            done(error, null)
        }
    })
)