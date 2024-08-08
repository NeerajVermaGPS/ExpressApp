import passport from "passport";
import { Strategy } from "passport-local";
import { userArr } from "../utils/dataMimic.mjs";
import User from "../mongoose/schemas/user.mjs";

passport.serializeUser((user, done) => {
    console.log(`Serializing user:`)
    console.log(user)
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    console.log(`Deserializing user with ID: ${id}`)
    try {
        // const getUser = userArr.find(user => user.id === id)
        const getUser = User.findById(id)
        if(!getUser) throw new Error("User not found!")
        done(null, getUser)
    } catch (error) {
        done(error, null)
    }
})

export default passport.use(
    new Strategy({usernameField: "username"}, async (username, password, done) => {
        console.log(username, password)
        try {
            // const findUser = userArr.find(user => user.username === username)
            // if(!findUser) throw new Error("User not found!")
            // if(findUser.password !== password) throw new Error("Wrong password!")
            // console.log(username, "is logged in!")
            // done(null, findUser)
            const findUser = await User.findOne({username})
            if(!findUser) throw new Error("User not find!")
            if(findUser.password !== password) throw new Error("Wrong password!")
            done(null, findUser)
        } catch (error) {
            console.log(error.message)
            done(error.message, null)
        }
    })
)