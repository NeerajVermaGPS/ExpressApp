import { Router } from "express";
import { cityArr } from "../utils/dataMimic.mjs";

const router = Router()

const CITY_URL = "/api/cities"

router.get(CITY_URL, (req, res) => {
    console.log(req.headers.cookie)
    res.status(200).send(cityArr)
})

export default router