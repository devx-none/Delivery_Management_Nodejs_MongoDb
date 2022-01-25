import { Router } from 'express';
import {
  distance,
  calculatePrice,
  typeCar,
  checkPassword,
  generatePassword,
  sendEmail,
  EmailConfirmation
} from '../helpers';
import { isDeliveryManager } from '../middlewares';
import { deliveryModel, driverModel } from '../models';

const router = Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling Get requests to /manager',
  });
});

router.post('/create', isDeliveryManager, async (req, res, next) => {
  const { type, from, to, weight } = req.body;
  const dist = await distance(req, res);
  const price = await calculatePrice(req, res);
  console.log(dist);
  console.log(`Price :${price}`);
  const delivery = new deliveryModel({
    type,
    from,
    to,
    weight,
    price,
    distance: dist,
  });
  delivery
    .save()
    .then((result) => {
      console.log(result);

      //Send Email
      //  sendEmail(driverByCar.email)
    })
    .catch((err) => {
      console.log(err);
    });

  res.status(201).json({
    message: 'Handling Post requests to /delivery',
    createdManager: delivery,
  });
});

router.get('/validate/:id', async (req, res, next) => {
  const delivery = await deliveryModel.findOne({ _id: req.params.id }).lean();
  console.log(delivery);

  //get type car by weight
  let car =await typeCar(delivery.weight);

  //get driver by type car
  const driver = await driverModel.find({ car: car }).select('name email').exec();
  driver.map(eachResult=>{
      console.log(delivery._id);
      console.log(eachResult._id);
    EmailConfirmation(eachResult.email,delivery._id,eachResult._id);
})
  console.log(driver);
});




router.get('/reserved/:delivery/driver/:driver', async (req, res, next) => {
  const { delivery, driver } = req.params;
  const deliveries = await deliveryModel.findById(delivery);
  if (deliveries.status === 'pending') {
    const updateDelivered = await deliveryModel.findByIdAndUpdate(
      { _id: delivery },
      { status: 'reserved', driver: driver },
      { new: true }
    );
    const driverUpdate = await driverModel.findByIdAndUpdate(
      { _id: driver },
      { $addToSet: { deliveries: delivery } },
      { new: true }
    );
    res.json(updateDelivered);
    
  } else {
    res.status(403).json({
      message: 'Delivery Already Reserved',
    });
  }
});

export { router as delivery };
