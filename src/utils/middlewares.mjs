import fs from "node:fs"
import { userArr } from '../utils/dataMimic.mjs'

// Middlewares: Following line will apply the middleware to all the methods after this line. Many middlewares can be applied in one method and they all will be executed sequentially. 
export const loggingMiddleware = (req, res, next) => {
    console.log(req.method + " - " + req.url)
    next()
}

export const validateUserIndex = (req, res, next) => {
    const { params: {id} } = req;
    const parseId = parseInt(id);
    if(isNaN(parseId)){ return res.sendStatus(400) }
    const userIndex = userArr.findIndex(user => user.id === parseId)
    if(userIndex === -1){ return res.sendStatus(404) }
    req.userIndex = userIndex;
    next()
}

export const errorHTML = (res, errors, method, statusCode) => {
    res.setHeader("Content-Type", "text/html")
    let mainHTML = fs.readFileSync("./src/errors.html", "utf-8")
    mainHTML = mainHTML.replaceAll("{{METHOD_NAME}}", method)
    mainHTML = mainHTML.replace("{{errorArr}}", "[" + errors + "]")
    res.status(statusCode).send(mainHTML)
}

// app.use(loggingMiddleware)