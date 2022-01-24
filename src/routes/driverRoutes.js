import { Router } from "express"
import { hashPassword, checkPassword, generatePassword,generateToken, sendEmail } from "../helpers" ;
import {isManager} from "../middlewares"
import { driverModel} from '../models'

const router = Router();

router.get('/',(req, res, next) => {
    res.status(200).json({ 
        message : 'Handling Get requests to /driver'
    })
})

router.post('/create',isManager,async(req, res, next) =>{
    const password = await generatePassword();
    const { name,email,car} = req.body
    const driver = new driverModel({
        name,
        email ,
        password :  password,
        car

    });
    driver.save().then(result =>{
        console.log(result);
    //Send Email 
    // sendEmail(email, password);
    })
    .catch(err =>{console.log(err)});

    res.status(201).json({ 
        message : 'Handling Post requests to / driver',
        createddriver : driver
    })
})

router.post('/Auth',async (req, res, next) =>{
    const { email, password } = req.body

   const driver = await  driverModel.findOne({ email}).lean()
    
   if (driver) {
    // driver.comparePassword(password,function(err,isMatch) {
    //        if(err)throw err;
    //        const token = generateToken(driver, process.env.JWT_DRIVER_SECRET, "driver")
    //     res.json({
    //         data: driver,
    //         token
    //     })

    //    })
    const isValid = await checkPassword(password, driver.password)
    if (isValid) {
        const token = generateToken(driver, process.env.JWT_DRIVER_SECRET, "driver")
        res.json({
            data: driver,
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

export { router as driver }