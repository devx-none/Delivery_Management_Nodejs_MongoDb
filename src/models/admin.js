const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true ,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    } ,
    password: {
        type: 'string',
        required: true 
    }

})


export const adminModule= mongoose.model('Admin', adminSchema)