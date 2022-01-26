import { Router } from "express"
import {isManager} from "../middlewares"
import deliveryManagerController  from '../controllers/deliveryManagerController.js'

const router = Router();

router.get('/',(req, res, next) => {
    res.status(200).json({ 
        message : 'Handling Get requests to /admin'
    })
})

router.post('/create',isManager,deliveryManagerController.create)

router.post('/Auth',deliveryManagerController.login)

export { router as deliveryManager }