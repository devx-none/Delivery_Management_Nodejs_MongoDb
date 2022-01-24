import 'dotenv/config';
import { app ,connection} from './config'
import {errorHandler ,notFound} from './middlewares'
import { admin ,manager,driver, deliveryManager, delivery } from './routes';
const logger = require('morgan');
const fs = require('fs');

export const init = () => {

  
 //morgan logs
 //  app.use(morgan(':url :method :body'))

 logger.token('id',(req,res) => {
   return req.id
 })

 const accessLogsStream = fs.createWriteStream(__dirname + "/access.log",{flags:"a"});
 app.use(assignId);
function assignId(req, res ,next) {
  req.id = "Some Id";
  next();
}
app.use(logger('0- :id 1- :remote-addr 2-[:date[clf]] 3-[:date[iso]] 4-[:date[web]] 5- :method 6- :url 7- :http-version 8- :status 9- :res[content-lenght] 10- :referrer 11- :response-time[digits] 13- :req[header]',
{
  stream : accessLogsStream,
  skip: function(req, res){ return res.status === 404 }
}))
/* ========================= routes =============================*/
  
  // admin
   app.use("/admin", admin);
  
   //Manager
   app.use("/manager",manager)

   //Delivery Manager
   app.use("/deliveryManager", deliveryManager)

   //Driver
   app.use("/driver", driver)

   //Delivery 
   app.use("/delivery",delivery);


 //middlewares
 app.use(notFound)
 app.use(errorHandler)



 //init db with server
 connection().then(() => {
  app.listen(process.env.PORT, () => {
      console.log("Server is running on port " + process.env.PORT)
  })
})

}


 