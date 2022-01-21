import { Router } from "express"
import { hashPassword, checkPassword, generatePassword, sendEmail } from "../helpers" ;
import {isAdmin} from "../middlewares"
import { Manager} from '../models'

const router = Router();

router.get('/',(req, res, next) => {
    res.status(200).json({ 
        message : 'Handling Get requests to /admin'
    })
})

router.post('/create',isAdmin,(req, res, next) =>{
    const password =  generatePassword();
    const { email} = req.body
    const manager = new Manager({
        
        email ,
        password :  hashPassword(password),

    });
    manager.save().then(result =>{
        console.log(result);
    //Send Email 
    sendEmail(email, password);
    })
    .catch(err =>{log.error(err)});

    res.status(201).json({ 
        message : 'Handling Post requests to /manager',
        createdManager : manager
    })
})

export { router as manager }