import { Router } from "express"
import { hashPassword, checkPassword, generatePassword,generateToken, sendEmail } from "../helpers" ;
import { adminModel } from '../models'


exports.create = async (req, res) =>{
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
}
    exports.login = async (req, res) =>{
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

    }
