import { Router } from "express"
import {distance,calculatePrice,typeCar, checkPassword, generatePassword, sendEmail } from "../helpers" ;
import {isManager} from "../middlewares"
import { deliveryModel ,driverModel} from '../models'

const router = Router();

router.get('/',(req, res, next) => {
    res.status(200).json({ 
        message : 'Handling Get requests to /manager'
    })
})

router.post('/create',isManager,async(req, res, next) =>{
    const { type,from,to,weight } = req.body
    const  dist  = await distance(req,res);
    const price = await calculatePrice(req, res);
    console.log(dist);
    console.log(`Price :${price}`);
    const delivery = new deliveryModel({
        type,
        from ,
        to ,
        weight,
        price,
        distance:dist
        
    });
    delivery.save().then(result =>{
        console.log(result);

    // retourne type car
    // const car = typeCar(weight)

    // Driver By Car
    // const driverByCar =  driverModel.find({car:car}).exec();
    //  console.log(driverByCar);

        //Send Email 
    //  sendEmail(driverByCar.email)
    })
    .catch(err =>{console.log(err)});

    res.status(201).json({ 
        message : 'Handling Post requests to /delivery',
        createdManager : delivery
    })
})


router.get('/reserved',async(req, res, next) => {
    const { id,driver} =  req.params;
    const delivery = await  deliveryModel.findById(id);
    if(delivery.status === 'pending'){

        const updateDelivered = await deliveryModel.findByIdAndUpdate({_id :id},{ status : 'reserved',driver : driver },{new: true});
        const driverUpdate = await driverModel.findByIdAndUpdate({_id:id},{$addToSet:{deliveries: id}},{ new: true }) 
        res.json(updateDelivered)
        res.json(driverUpdate)
    }else {
        res.status(403).json({
            message: 'Delivery Already Reserved'
        })
    }
})
export { router as delivery }