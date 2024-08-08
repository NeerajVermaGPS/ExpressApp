import { Router } from 'express'
import { validationResult, matchedData, checkSchema } from "express-validator"
import { validateUserSchema, validateQuerySchema } from '../utils/validateSchema.mjs'
import { validateUserIndex, errorHTML } from '../utils/middlewares.mjs'
import { userArr } from '../utils/dataMimic.mjs'
import User from '../mongoose/schemas/user.mjs'

const router = Router()

const USER_URL = "/api/users"

router.get(USER_URL, checkSchema(validateQuerySchema), (req, res)=>{
    const result = validationResult(req)
    const errors = result.errors.map(err=> "'" + err.msg + "'")
    if (result.isEmpty()) {
        const data = matchedData(req)
        const response = userArr.filter(user => user[data.filter].includes(data.value))
        return res.status(200).send(response)
    }
    errorHTML(res, errors, "GET", 400)
})

router.get(`${USER_URL}/:id`, validateUserIndex, (req, res)=>{
    const queryRes = userArr[req.userIndex]
    return res.status(200).send(queryRes)
})

// POST Method
router.post(USER_URL, checkSchema(validateUserSchema), async (req, res) => {
    const result = validationResult(req)
    const errors = result.errors.map(err => "'" + err.msg + "'")
    if(result.isEmpty()){
        const data = matchedData(req)
        // const newUser = {
        //     id: userArr.length + 1,
        //     username: data.username,
        //     displayname: data.displayname
        // }
        // userArr.push(newUser);
        // return res.sendStatus(201)
        
        const newUser = new User(data)
        try{
            const savedUser = await newUser.save()
            return res.status(201).send(savedUser)
        } catch(err) {
            console.log(err.message)
            return res.sendStatus(400)
        }
    } 
    errorHTML(res, errors, "POST", 400)
}) 

// PUT method
router.put(`${USER_URL}/:id`, validateUserIndex, (req, res) => {
    const { body, userIndex } = req;
    if(!body.displayname  || !body.username){ return res.sendStatus(400) }
    const updatedUser = { id: userArr[userIndex].id, ...body}
    userArr[userIndex] = updatedUser
    res.sendStatus(200)
})

// PATCH method
router.patch(`${USER_URL}/:id`, validateUserIndex, (req, res) => {
    const updatedUser = { ...userArr[req.userIndex], ...req.body}
    userArr[req.userIndex] = updatedUser
    res.sendStatus(200)
})

// DELETE method
router.delete(`${USER_URL}/:id`, validateUserIndex, (req, res) => {
    userArr.splice(req.userIndex, 1)
    return res.sendStatus(200)
})

export default router