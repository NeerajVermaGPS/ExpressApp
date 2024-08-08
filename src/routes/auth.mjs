import { userArr } from "../utils/dataMimic.mjs";
import { Router } from "express";
import { validatAuthSchema, validateCartSchema } from "../utils/validateSchema.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { errorHTML } from "../utils/middlewares.mjs";
import '../strategies/local-strategy.mjs'
import passport from "passport";

const router = Router()
const AUTH_PATH = "/api/auth"

router.post(`${AUTH_PATH}`, passport.authenticate("local"), (req, res) => {
    res.status(200).send(`Hii ${req.user.displayname}! Welcome back!`)
})

// router.post(`${AUTH_PATH}`, checkSchema(validatAuthSchema), (req, res) => {
//     const result = validationResult(req)
//     const errors = result.errors.map(error => `'${error.msg}'`)
//     if(result.isEmpty()) {
//         const {username, password} = matchedData(req)
//         let getUser = userArr.findIndex(user => user.username === username)
//         if(getUser === -1) {
//             errorHTML(res, "'User not found! Check username again!'", "POST", 401)
//             return;
//         }

//         req.session.user = {...userArr[getUser], session_id: req.session.id}
//         return userArr[getUser].password === password ? res.status(200).send(`Hii ${userArr[getUser].displayname}, you are logged in!<br/><pre>${JSON.stringify(req.session)}</pre>`) : errorHTML(res, "'Wrong password!'", "POST", 404)
//     }

//     errorHTML(res, errors, "POST", 400)
// })

router.get(`${AUTH_PATH}/status`, (req, res) => {
    req.user ? res.status(200).send(`${req.user.displayname} logged in!`) : res.sendStatus(401)
    // res.status(200).send(req.session.user ? req.session.user : "Not logged in!")
})

router.post(`${AUTH_PATH}/logout`, (req, res) =>{
    if(!req.user) return res.status(401).send("No user logged in!")
    const { displayname } = req.user
    req.logout((err)=>{
        return err ? res.sendStatus(400) : res.status(200).send(`Logged out ${displayname}!`)
    })
})

export default router