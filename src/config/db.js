const mongoose = require('mongoose')


export const connection = async () => {

     return mongoose.connect("mongodb+srv://user_test:12345@cluster0.ukb0b.mongodb.net/livraison?retryWrites=true&w=majority")
     
}
// const { PORT , MONGO_USER , MONGO_PASS ,DATABASE_NAME} =process.env ;
// const 
// export const connection = (cb) => mongosse.connect(MONGO_URI).then(() => {
//     console.log("Connected to DB");
//     cb()
// }).catch(err => {
//     console.log(err.message)
//     cb()
// })
