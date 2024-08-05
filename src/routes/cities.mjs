import { Router } from "express";
import { cityArr } from "../utils/dataMimic.mjs";

const router = Router()

const CITY_URL = "/api/cities"

router.get(CITY_URL, (req, res) => {
    console.log(req.headers.cookie)
    console.log(req.cookies)
    console.log(req.signedCookies)
    req.sessionStore.get(req.session.id, (err, sessionData) => {
        err ? console.log(err) : console.log(sessionData)
    })
    if(req.cookies.data === "madam"){
        return res.status(200).send(cityArr)
    }

    return res.setHeader("Content-Type", "text/html").status(403).send("<h2>403 Forbidden: Invalid cookies!</h2>")
})

export default router