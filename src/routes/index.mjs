import { Router } from "express";
import userRouter from './users.mjs'
import cityRouter from './cities.mjs'

const router = Router()
router.use(userRouter)
router.use(cityRouter)

export default router