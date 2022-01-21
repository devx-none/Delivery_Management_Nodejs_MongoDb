const mongoose = require('mongoose')

const manager = new mongoose.Schema({
    
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    } ,
    password: {
        type: 'string',
        required: true 
    }
})

export const Manager= mongoose.model('Manager', manager)