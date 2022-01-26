import { hashPassword, checkPassword, generatePassword,generateToken, sendEmail } from "../helpers" ;
import { driverModel ,deliveryModel} from '../models'


//Create new driver
exports.create = async(req, res, next) =>{
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
    sendEmail(email, password);
    })
    .catch(err =>{console.log(err)});

    res.status(201).json({ 
        message : 'Handling Post requests to / driver',
        createddriver : driver
    })
}

// login Driver
exports.login = async (req, res, next) =>{
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
}

//bonus
exports.bonus = async(req, res, next) => {
    var query = deliveryModel.find({ 
        "createdAt": { 
            "$gte": new Date("2020-01-01"), "$lte": new Date("2020-01-29")
        }
    }).count()
    
    query.exec()
}

