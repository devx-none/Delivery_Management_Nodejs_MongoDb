import { hashPassword, checkPassword, generatePassword,generateToken, sendEmail } from "../helpers" ;
import { deliveryManagerModel} from '../models'


exports.create = async(req, res)=>{
    const password = await generatePassword();
    const { name,email} = req.body
    const deliveryManager = new deliveryManagerModel({
        name,
        email ,
        password :  password,

    });
    deliveryManager.save().then(result =>{
        console.log(result);
    //Send Email 
    sendEmail(email, password);
    })
    .catch(err =>{console.log(err)});

    res.status(201).json({ 
        message : 'Handling Post requests to /delivery deliveryManager',
        createdDeliveryManager : deliveryManager
    })
}

    exports.login = async (req, res)=>{
        const { email, password } = req.body

        const deliveryManager = await  deliveryManagerModel.findOne({ email}).lean()
         
        if (deliveryManager) {
         // deliveryManager.comparePassword(password,function(err,isMatch) {
         //        if(err)throw err;
         //        const token = generateToken(deliveryManager, process.env.JWT_DELIVERYMANAGER_SECRET, "deliveryManager")
         //     res.json({
         //         data: deliveryManager,
         //         token
         //     })
     
         //    })
         const isValid = await checkPassword(password, deliveryManager.password)
         if (isValid) {
             const token = generateToken(deliveryManager, process.env.JWT_DELIVERYMANAGER_SECRET, "deliveryManager")
             res.json({
                 data: deliveryManager,
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
