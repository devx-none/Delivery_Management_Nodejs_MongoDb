import { Router } from "express"
import {  checkPassword, generatePassword,generateToken, sendEmail } from "../helpers" ;
import {isAdmin} from "../middlewares"
import { managerModel} from '../models'

const router = Router();

router.get('/',(req, res, next) => {
    res.status(200).json({ 
        message : 'Handling Get requests to /admin'
    })
})

router.post('/create',isAdmin,async(req, res, next) =>{
    const password = await generatePassword();
    const { name,email} = req.body
    const manager = new managerModel({
        name,
        email ,
        password :  password,

    });
    manager.save().then(result =>{
        console.log(result);
    //Send Email 
    // sendEmail(email, password);
    })
    .catch(err =>{console.log(err)});

    res.status(201).json({ 
        message : 'Handling Post requests to /manager',
        createdManager : manager
    })
})

router.post('/Auth',async (req, res, next) =>{
    const { email, password } = req.body

   const manager = await  managerModel.findOne({ email}).lean()
    
   if (manager) {
    // manager.comparePassword(password,function(err,isMatch) {
    //        if(err)throw err;
    //        const token = generateToken(manager, process.env.JWT_MANAGER_SECRET, "manager")
    //     res.json({
    //         data: manager,
    //         token
    //     })

    //    })
    const isValid = await checkPassword(password, manager.password)
    if (isValid) {
        const token = generateToken(manager, process.env.JWT_MANAGER_SECRET, "manager")
        res.json({
            data: manager,
            token
        })
    } else {
        res.json({
            message: "Invalid password"
        })
    }
} else {
    res.json({
        message: "Invalid email"
    })
}
})

export { router as manager }