import { Router } from "express"
import { hashPassword, checkPassword, generatePassword,generateToken, sendEmail } from "../helpers" ;
import { adminModel } from '../models'
import adminController from '../controllers/adminController.js'
const router = Router();

router.get('/',(req, res, next) => {
    res.status(200).json({ 
        message : 'Handling Get requests to /admin'
    })
})

router.post('/create',adminController.create)

router.post('/login',adminController.login)

export { router as admin }