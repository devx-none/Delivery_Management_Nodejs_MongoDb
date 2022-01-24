import { Router } from "express"
import { hashPassword, checkPassword, generatePassword,generateToken, sendEmail } from "../helpers" ;
import { adminModel } from '../models'

const router = Router();

router.get('/',(req, res, next) => {
    res.status(200).json({ 
        message : 'Handling Get requests to /admin'
    })
})

router.post('/create',(req, res, next) =>{
    const { email, password } = req.body
    const admin = new adminModel({
        
        email ,
        password :  password,

    });
    admin.save().then(result =>{
        console.log(result);
    })
    .catch(err =>{log.error(err)});

    res.status(201).json({ 
        message : 'Handling Post requests to /admin',
        createdAdmin : admin
    })
})

router.post('/login',async (req, res, next) =>{
    const { email, password } = req.body

   const admin = await  adminModel.findOne({ email}).lean()
    
   if (admin) {
    // admin.comparePassword(password,function(err,isMatch) {
    //        if(err)throw err;
    //        const token = generateToken(admin, process.env.JWT_ADMIN_SECRET, "admin")
    //     res.json({
    //         data: admin,
    //         token
    //     })

    //    })
    const isValid = await checkPassword(password, admin.password)
    if (isValid) {
        const token = generateToken(admin, process.env.JWT_ADMIN_SECRET, "admin")
        res.json({
            data: admin,
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

export { router as admin }