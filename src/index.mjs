import express from "express"
import fs from "node:fs"

const app = express()

// Middlewares to POST data as JSON
app.use(express.json())

// PORT
const PORT = process.env.PORT || 3000

// PATH Constants
const ROOT_URL = "/"
const USER_URL = "/api/users"
const CITY_URL = "/api/cities"

// API Data
const userArr = [
    {id: 1, username: "madam", displayname: "Madam"},
    {id: 2, username: "neeraj", displayname: "Neeraj"},
    {id: 3, username: "krishna", displayname: "Krishna"}
]

const cityArr = [
    {id: 1, name: "Jaipur", state: "Rajasthan"},
    {id: 2, name: "Suratgarh", state: "Rajasthan"},
    {id: 3, name: "Vrindavan", state: "Uttar Pradesh"}
]

// GET Method
app.get(ROOT_URL, (req, res) => {
    res.setHeader("Content-Type", "text/html")
    const mainHTML = fs.readFileSync("./src/index.html", "utf-8")
    res.status(200).send(mainHTML)
})

app.get(USER_URL, (req, res)=>{
    const { query: { filter, value } } = req
    if (filter && value) {
        const response = userArr.filter(user => user[filter].includes(value))
        return res.status(200).send(response)
    } else {
        return res.status(200).send(userArr)
    }
})

app.get(`${USER_URL}/:id`, (req, res)=>{
    const parseId = parseInt(req.params.id)
    if(isNaN(parseId)){
        return res.status(400).send({msg : "Bad request. Invalid ID."})
    }
    const queryRes = userArr.find(user => user.id === parseId)
    if(!queryRes) {
        return res.sendStatus(404)
    }
    return res.status(200).send(queryRes)
})

app.get(CITY_URL, (req, res) => {
    res.status(200).send(cityArr)
})

// POST Method
app.post(USER_URL, (req, res) => {
    if(req.body.username && req.body.displayname){
        const newUser = {
            id: userArr.length + 1,
            username: req.body.username,
            displayname: req.body.displayname
        }
        userArr.push(newUser);
        res.sendStatus(201)
    } else {
        res.sendStatus(400)
    }
}) 

// PUT method
app.put(`${USER_URL}/:id`, (req, res) => {
    const { body, params: {id} } = req;
    const parseId = parseInt(id);
    if(isNaN(parseId) || !body.displayname  || !body.username){ return res.sendStatus(400) }
    const userIndex = userArr.findIndex(user => user.id === parseId)
    if(userIndex === -1){ return res.sendStatus(404) }
    const updatedUser = { id: parseId, ...body}
    userArr[userIndex] = updatedUser
    res.sendStatus(200)
})

// PATCH method
app.patch(`${USER_URL}/:id`, (req, res) => {
    const { body, params: {id} } = req;
    const parseId = parseInt(id);
    if(isNaN(parseId)){ return res.sendStatus(400) }
    const userIndex = userArr.findIndex(user => user.id === parseId)
    if(userIndex === -1){ return res.sendStatus(404) }
    const updatedUser = { ...userArr[userIndex], ...body}
    userArr[userIndex] = updatedUser
    res.sendStatus(200)
})

// DELETE method
app.delete(`${USER_URL}/:id`, (req, res) => {
    const { params: { id } } = req
    const parseId = parseInt(id)
    if(isNaN(parseId)){return res.sendStatus(400)}
    const userIndex = userArr.findIndex(user => user.id === parseId)
    if(userIndex === -1){return res.sendStatus(404)}
    userArr.splice(userIndex, 1)
    return res.sendStatus(200)
})

// Console the listening status
app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})