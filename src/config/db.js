const mongoose = require('mongoose')


export const connection = async () => {

     return mongoose.connect("mongodb+srv://user_test:12345@cluster0.ukb0b.mongodb.net/livraison?retryWrites=true&w=majority")
     
}

