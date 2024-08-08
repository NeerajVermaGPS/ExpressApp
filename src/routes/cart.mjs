import { Router } from "express";
import { validateCartSchema } from "../utils/validateSchema.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";

const router = Router()
const CART_PATH = "/api/cart"

router.post(`${CART_PATH}`, checkSchema(validateCartSchema), (req, res) =>{
    if(!req.session.user) return res.sendStatus(401);
    const result = validationResult(req)
    const errors = result.errors.map(err => `'${err.msg}'`)
    if(result.isEmpty()){
        const data = matchedData(req)
        if(req.session.cart){
            req.session.cart.push(data)
        } else {
            req.session.cart = [data]
        }
        return res.status(201).send("Cart updated successfully!")
    }
    console.log(errors)
    return res.sendStatus(400)
})

router.get(`${CART_PATH}`, (req, res) => {
    if(!req.session.user) return res.sendStatus(401);
    const cart = req.session.cart
    const cartData = cart.map(item => `${item.item_name}($${item.item_price})`)
    const data = `Hii, ${req.session.user.displayname}! Here is your cart:<br />${cartData}`
    res.status(200).send(data)
})

export default router