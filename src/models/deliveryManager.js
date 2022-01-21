const mongoose = require('mongoose')

const deliveryManager = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: string,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    } ,
    password: string 
})

module.exports = mongoose.model('deliveryManager', deliveryManager)