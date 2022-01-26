import {
  distance,
  calculatePrice,
  typeCar,
  checkPassword,
  generatePassword,
  sendEmail,
  EmailConfirmation
} from '../helpers';

import { deliveryModel, driverModel } from '../models';


//Create a new delivery 
exports.create = async (req, res) => {
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
}


exports.validate =  async (req, res) => {
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
  res.json({
      Message :'delivery validate successful'
  })
}




exports.reserved = async (req, res) => {
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
}

