const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const model = mongoose.model;


const deliverySchema = new Schema({
    type :{
        type : 'string',
        required : true,
        enum:['national', 'international']
    },
    from :{
        type : 'string',
        required : true,
    },
    to :{
        type : 'string',
        required : true,
    },
    weight :{
        type : Number,
        required : true
    },
    price :{
        type : Number,
    },
    distance :{
        type : Number
    },
    status :{
        type: String,
        default: 'pending'

    },
    driver :{
        type : Schema.Types.ObjectId,
        ref :'driver'
    }

},
{
    timestamps:true
});

export const deliveryModel = model('delivery',deliverySchema);