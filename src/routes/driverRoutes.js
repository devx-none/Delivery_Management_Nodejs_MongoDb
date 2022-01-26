import { Router } from "express"
import {isManager} from "../middlewares"
import driver from "../controllers/driverController"

const router = Router();

router.get('/',(req, res, next) => {
    res.status(200).json({ 
        message : 'Handling Get requests to /driver'
    })
})

router.post('/create',isManager,driver.create)

router.post('/Auth',driver.login)

router.get('/bonus',driver.bonus)

export { router as driver }