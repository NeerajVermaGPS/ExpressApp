import { Router } from "express";
import userRouter from './users.mjs'
import cityRouter from './cities.mjs'
import authRouter from "./auth.mjs";

const router = Router()
router.use(userRouter)
router.use(cityRouter)
router.use(authRouter)

export default router