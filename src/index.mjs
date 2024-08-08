import express from "express"
import fs from "node:fs"
import { loggingMiddleware } from './utils/middlewares.mjs'
import routes from "./routes/index.mjs"
import cookieParser from "cookie-parser"
import session from "express-session"
import passport from "passport"

const app = express()

app.use(express.json())
app.use(cookieParser("data_madam"))
app.use(session({
    secret: "some undecodable data",
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }
}))
app.use(routes)

const PORT = process.env.PORT || 3000

const ROOT_URL = "/"

app.get(ROOT_URL, loggingMiddleware, (req, res) => {
    res.setHeader("Content-Type", "text/html")
    let mainHTML = fs.readFileSync("./src/index.html", "utf-8")
    req.session.visited = true;
    let html = `<pre>${JSON.stringify(req.session)}</pre><br><pre>Current Session ID: ${req.session.id}</pre>`
    mainHTML = mainHTML.replace("{{SESSION_DATA}}", html)
    res.cookie("data", "madam", {maxAge: 60000*60*2})
    res.cookie("secret_data", "madam", {maxAge: 60000*60*2, signed: true})
    res.status(200).send(mainHTML)
})

// Console the listening status
app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})