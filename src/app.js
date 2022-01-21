import 'dotenv/config';
import { app ,connection} from './config'
import {errorHandler ,notFound} from './middlewares'
import { admin ,manager } from './routes';



export const init = () => {

  /* ========================= routes =============================*/

  // admin
   app.use("/admin", admin);
  
   //Manager
   app.use("/manager",manager)


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


 