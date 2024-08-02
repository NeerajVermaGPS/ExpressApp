import express from "express"
import fs from "node:fs"
import { loggingMiddleware } from './utils/middlewares.mjs'
import routes from "./routes/index.mjs"

const app = express()

app.use(express.json())
app.use(routes)

const PORT = process.env.PORT || 3000

const ROOT_URL = "/"

app.get(ROOT_URL, loggingMiddleware, (req, res) => {
    res.setHeader("Content-Type", "text/html")
    const mainHTML = fs.readFileSync("./src/index.html", "utf-8")
    res.cookie("data", "madam", {maxAge: 60000*60*2})
    res.status(200).send(mainHTML)
})

// Console the listening status
app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})